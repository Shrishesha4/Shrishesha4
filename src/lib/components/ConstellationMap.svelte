<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
    import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
    import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

    let container: HTMLDivElement;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let galaxy: THREE.Points;
    let reticle: THREE.Object3D | null = null; // Visual indicator for selected star (mesh or line)
    let composer: EffectComposer;

    // Solar System Objects
    let activeSun: THREE.Mesh | null = null;
    let activePlanets: THREE.Mesh[] = [];
    let activeSunPosition: THREE.Vector3 | null = null;

    // Interaction & Animation State
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // View States
    type ViewMode = 'GALAXY' | 'SYSTEM';
    let viewMode: ViewMode = 'GALAXY';
    
    // Targeting Logic (Galaxy Mode)
    let focusedStarPosition: THREE.Vector3 | null = null; // Where the user clicked
    let lastClickedPosition: THREE.Vector3 | null = null; // Track last clicked position for double-click detection
    let targetLookAt: THREE.Vector3 = new THREE.Vector3(0,0,0); // Where controls are looking
    let clickTimeout: number | null = null; // Timeout for delayed camera target change
    const DOUBLE_CLICK_WINDOW = 400; // ms to wait for double-click before changing view

    // Camera transition state (for smooth moves when entering/exiting system)
    let targetCameraPos: THREE.Vector3 | null = null;
    let isTransitioning = false;
    const transitionSpeed = 0.08;
    const DOUBLE_CLICK_THRESHOLD = 20; // Distance threshold to consider it the same star
    const GALAXY_CAMERA_POS = new THREE.Vector3(0, 80, 450);

    // Thresholds
    const ZOOM_ENTER_THRESHOLD = 30; // Distance to trigger system view
    const ZOOM_EXIT_THRESHOLD = 120;  // Distance to trigger galaxy view
    // Runtime threshold (can be adjusted per-star to avoid too-early exits)
    let currentExitThreshold = ZOOM_EXIT_THRESHOLD;

    const parameters = {
        count: 150000,
        size: 1.4,
        radius: 300,
        branches: 30,
        spin: 40,
        randomness: 30,
        randomnessPower: 40, 
        coreColor: '#ffddaa', 
        outerColor: '#1b3984', 
    };

    let clock = new THREE.Clock();

    // --- Texture Generators ---

    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Context fail");
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(canvas);
    }

    // Create a glow texture with a tint color (hex string like '#bfe9ff')
    function createGlowTexture(hexColor: string, size = 128) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Context fail for glow texture');

        const center = size / 2;
        const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
        // Inner brighter
        const rgba = (c: string, a: number) => {
            // Convert hex to r,g,b
            const bigint = parseInt(c.replace('#', ''), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgba(${r},${g},${b},${a})`;
        };
        grad.addColorStop(0, rgba(hexColor, 0.95));
        grad.addColorStop(0.4, rgba(hexColor, 0.5));
        grad.addColorStop(1, rgba(hexColor, 0));

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }

    function createSunTexture(hexColor: string = '#ffaa00') {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        if(!ctx) return new THREE.Texture();

        ctx.fillStyle = hexColor;
        ctx.fillRect(0,0,size,size);

        // Helper to slightly lighten/darken the base color for variation
        function shade(hex: string, percent: number) {
            const bigint = parseInt(hex.replace('#', ''), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            const nr = Math.max(0, Math.min(255, Math.round(r * (1 + percent))));
            const ng = Math.max(0, Math.min(255, Math.round(g * (1 + percent))));
            const nb = Math.max(0, Math.min(255, Math.round(b * (1 + percent))));
            return `rgb(${nr},${ng},${nb})`;
        }

        for(let i=0; i<3000; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const r = Math.random() * 10 + 2;
            ctx.beginPath();
            ctx.arc(x,y,r,0,Math.PI*2);
            ctx.fillStyle = Math.random() > 0.5 ? shade(hexColor, -0.18) : shade(hexColor, 0.12);
            ctx.globalAlpha = 0.15;
            ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }

    function hexToRgb(hex: number) {
        return { r: (hex >> 16) & 255, g: (hex >> 8) & 255, b: hex & 255 };
    }

    function generatePlanetTexture(baseHex: number, size = 1024) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');
        const base = hexToRgb(baseHex);

        ctx.fillStyle = `rgb(${base.r},${base.g},${base.b})`;
        ctx.fillRect(0, 0, size, size);
        for (let i = 0; i < 600; i++) {
            const radius = Math.random() * (size * 0.15) + 5;
            const x = Math.random() * size;
            const y = Math.random() * size;
            const shade = Math.random() > 0.5 ? 40 : -40;
            const r = Math.max(0, Math.min(255, base.r + shade));
            const g = Math.max(0, Math.min(255, base.g + shade));
            const b = Math.max(0, Math.min(255, base.b + shade));
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},0.1)`;
            ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }

    // --- Scene Generation ---

    function generateGalaxy() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorCore = new THREE.Color(parameters.coreColor);
        const colorOuter = new THREE.Color(parameters.outerColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            const branch = i % parameters.branches;
            const branchAngle = (branch / parameters.branches) * Math.PI * 2;

            // Concentrate more stars in core yet allow arms to extend
            const radius = Math.pow(Math.random(), 1.15) * parameters.radius;
            const radiusNorm = radius / parameters.radius;

            // Spin angle scaled with normalized radius (creates spiral winding)
            const spinAngle = radiusNorm * parameters.spin * Math.PI * 2;

            // Angle along spiral arm plus a small, radius-dependent jitter
            const angle = branchAngle + spinAngle + (Math.random() - 0.5) * (0.6 * (1 - radiusNorm));

            // Smaller radial noise for clearer arms
            const radialNoise = (Math.random() - 0.5) * parameters.randomness * (1 - radiusNorm * 0.6) * 0.6 * parameters.radius * 0.01;

            // Thin disk vertically; reduce Y spread as we go outward
            const y = (Math.random() - 0.5) * 10 * (1 - radiusNorm * 0.7);

            positions[i3] = Math.cos(angle) * radius + radialNoise;
            positions[i3 + 1] = y;
            positions[i3 + 2] = Math.sin(angle) * radius + radialNoise * 0.5;

            const mixedColor = colorCore.clone();
            mixedColor.lerp(colorOuter, radiusNorm);
            // slight random brightness variation
            const variation = (Math.random() - 0.5) * 0.06;
            mixedColor.r = Math.min(1, Math.max(0, mixedColor.r + variation));
            mixedColor.g = Math.min(1, Math.max(0, mixedColor.g + variation));
            mixedColor.b = Math.min(1, Math.max(0, mixedColor.b + variation));

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: createStarTexture(),
            transparent: true,
            opacity: 0.6
        });

        galaxy = new THREE.Points(geometry, material);
        scene.add(galaxy);
    }

    function updateReticle(position: THREE.Vector3 | null) {
        if (reticle) {
            scene.remove(reticle);
            // Dispose geometry and material if present (handles Mesh or Line safely)
            const anyRet: any = reticle as any;
            if (anyRet.geometry && typeof anyRet.geometry.dispose === 'function') anyRet.geometry.dispose();
            if (anyRet.material) {
                const mat = anyRet.material;
                if (Array.isArray(mat)) mat.forEach((m: any) => { if (m && typeof m.dispose === 'function') m.dispose(); });
                else if (typeof mat.dispose === 'function') mat.dispose();
            }
            // Also dispose textures on sprites if present
            if (anyRet.children && Array.isArray(anyRet.children)) {
                anyRet.children.forEach((c: any) => {
                    if (c.material && c.material.map && typeof c.material.map.dispose === 'function') c.material.map.dispose();
                    if (c.material && typeof c.material.dispose === 'function') c.material.dispose();
                });
            }
            reticle = null;
        }
        if (position) {
            // Hexagonal ring: use RingGeometry with 6 segments to get a hexagon-like shape
            const innerR = 1.0;
            const outerR = 1.6;
            const segments = 6; // makes the ring hexagonal
            const hexGeo = new THREE.RingGeometry(innerR, outerR, segments);
            const hexMat = new THREE.MeshBasicMaterial({ color: 0xbfe9ff, side: THREE.DoubleSide, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
            const hexMesh = new THREE.Mesh(hexGeo, hexMat);

            // Add a faint outer halo sprite for glow
            const glowTex = createGlowTexture('#bfe9ff', 256);
            const spriteMat = new THREE.SpriteMaterial({ map: glowTex, color: 0xbfe9ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(8, 8, 1);
            sprite.position.set(0, 0, 0.01); // slightly in front

            // Subtle inner line for contrast using LineLoop
            const angleStep = (Math.PI * 2) / 6;
            const points: THREE.Vector3[] = [];
            for (let i = 0; i < 6; i++) {
                const a = i * angleStep;
                points.push(new THREE.Vector3(Math.cos(a) * ((innerR + outerR) / 2), Math.sin(a) * ((innerR + outerR) / 2), 0.02));
            }
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            // Close the loop
            const lastPoint = points[0].clone();
            lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(points.flatMap(p => [p.x, p.y, p.z]), 3));
            const lineMat = new THREE.LineBasicMaterial({ color: 0xbfe9ff, linewidth: 2, transparent: true, opacity: 0.9 });
            const line = new THREE.LineLoop(lineGeo, lineMat);

            const group = new THREE.Group();
            group.add(sprite);
            group.add(hexMesh);
            group.add(line);

            group.position.copy(position);
            group.lookAt(camera.position); // face camera

            reticle = group;
            scene.add(reticle);
        }
    }

    function clearSolarSystem() {
        if (activeSun) {
            scene.remove(activeSun);
            activeSun.geometry.dispose();
            (activeSun.material as THREE.Material).dispose();
            activeSun = null;
        }
        activePlanets.forEach(p => {
            scene.remove(p);
            p.geometry.dispose();
            (p.material as THREE.Material).dispose();
        });
        activePlanets = [];
        activeSunPosition = null;

        // Restore galaxy visibility when clearing the system
        if (galaxy) galaxy.visible = true;

        // Restore the default exit threshold when no system is active
        currentExitThreshold = ZOOM_EXIT_THRESHOLD;
    }

    function createSolarSystem(centerPosition: THREE.Vector3) {
        // Clear previous if any (should be handled by state, but safety check)
        clearSolarSystem();
        activeSunPosition = centerPosition;

        // 1. Create the Sun (randomized type/color/size)
        const starVariants = [
            { name: 'Yellow Dwarf', color: '#ffdd88', intensity: 2.5, roughness: 0.4, glowSize: 30 },
            { name: 'Red Giant', color: '#ff7755', intensity: 3.5, roughness: 0.55, glowSize: 40 },
            { name: 'Blue Giant', color: '#88bfff', intensity: 4.0, roughness: 0.25, glowSize: 20 },
            { name: 'White Dwarf', color: '#ffffff', intensity: 2.0, roughness: 0.15, glowSize: 20 },
            { name: 'Magenta Star', color: '#ff88ff', intensity: 3.0, roughness: 0.35, glowSize: 30 }
        ];
        const sv = starVariants[Math.floor(Math.random() * starVariants.length)];

        const sunSize = 10 + Math.random() * 12; // 10 to 22
        const sunGeo = new THREE.SphereGeometry(sunSize, 64, 64);
        const baseColorHex = sv.color;
        const sunMat = new THREE.MeshStandardMaterial({
            map: createSunTexture(baseColorHex),
            emissive: new THREE.Color(baseColorHex),
            emissiveIntensity: sv.intensity,
            emissiveMap: createSunTexture(baseColorHex),
            color: new THREE.Color(baseColorHex).multiplyScalar(0.9),
            roughness: sv.roughness,
            metalness: 0.05
        });
        activeSun = new THREE.Mesh(sunGeo, sunMat);
        activeSun.position.copy(centerPosition);

        // Add a glow sprite to the sun using the new glow texture
        const glowTex = createGlowTexture(baseColorHex, 512);
        const spriteMat = new THREE.SpriteMaterial({ 
            map: glowTex, 
            color: new THREE.Color(baseColorHex), 
            transparent: true, 
            blending: THREE.AdditiveBlending,
            opacity: 0.85
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(sv.glowSize * (sunSize/12), sv.glowSize * (sunSize/12), 1);
        sprite.position.set(0,0,0.1);
        activeSun.add(sprite);

        scene.add(activeSun);

        // Hide galaxy while in system view to avoid visual clutter
        if (galaxy) galaxy.visible = false;

        // Add light source at the sun (strength and range scaled with size)
        const sunLight = new THREE.PointLight(baseColorHex, sv.intensity * (sunSize/12), 300 + sunSize * 8, 1.5);
        sunLight.position.set(0, 0, 0); // Relative to sun mesh
        activeSun.add(sunLight);

        // Store some animation data so pulsing can occur in the animation loop
        // Set a dynamic exit threshold based on star size so that larger suns require more zoom-out to exit
        currentExitThreshold = Math.max(ZOOM_EXIT_THRESHOLD, sunSize * 25);
        (activeSun as any).userData = { pulseSpeed: 0.8 + Math.random() * 1.6, baseIntensity: sv.intensity, lightRef: sunLight, spriteRef: sprite, exitThreshold: currentExitThreshold };

        // 2. Generate Planets (spaced based on sun size to avoid intersections)
        const planetColors = [0x2266ff, 0xff4422, 0x88cc88, 0xcccccc, 0xaa55aa];
        const planetCount = Math.floor(Math.random() * 4) + 3;

        // Start orbit well outside the star's visible radius + a safety margin
        let currentOrbit = sunSize * 1.6 + 6;

        for (let i = 0; i < planetCount; i++) {
            const colorHex = planetColors[Math.floor(Math.random() * planetColors.length)];
            const pSize = Math.random() * 2 + 1;
            const pGeo = new THREE.SphereGeometry(pSize, 32, 32);
            const pMat = new THREE.MeshStandardMaterial({
                map: generatePlanetTexture(colorHex),
                roughness: 0.8,
                metalness: 0.1
            });
            const planet = new THREE.Mesh(pGeo, pMat);

            // Place planets at increasing distances from the sun so they're never inside it
            const distance = currentOrbit + pSize + Math.random() * 5;
            const angle = Math.random() * Math.PI * 2;
            // Slower orbits for farther planets
            const speed = (0.2 + Math.random() * 0.6) / (distance * 0.06);

            planet.userData = { distance, angle, speed };
            
            planet.position.set(
                centerPosition.x + Math.cos(angle) * distance,
                centerPosition.y + (Math.random()-0.5) * 2,
                centerPosition.z + Math.sin(angle) * distance
            );

            // Increment the orbit baseline to ensure next planet is farther out
            currentOrbit += pSize * 2 + 8;

            if (Math.random() > 0.6) {
                const ringGeo = new THREE.RingGeometry(pSize * 1.4, pSize * 2.2, 32);
                const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                planet.add(ring);
            }

            scene.add(planet);
            activePlanets.push(planet);
        }
    }

    // --- Initialization ---

    // Helper: safe distance calculation for SSR safety
    function safeDistanceTo(target: THREE.Vector3 | null) {
        if (!target) return null;
        if (typeof window === 'undefined') return null;
        if (!camera) return null;
        try { return camera.position.distanceTo(target); } catch { return null; }
    }

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); 
        scene.fog = new THREE.FogExp2(0x000000, 0.001); // Adjusted fog for distance

        camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
        // Position camera to view the galaxy face-on (less edge-on which created a vertical line effect)
        camera.position.set(0, 80, 450);

        renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
        renderer.setSize(container.clientWidth, container.clientHeight);
        // Guard window access for SSR
        const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? Math.min(window.devicePixelRatio, 2) : 1;
        renderer.setPixelRatio(dpr);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        // Removed min/max distance limits so user can zoom freely across thresholds
        
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight), 
            1.5, 0.4, 0.1 
        );

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // Ambient stars
        const bgGeo = new THREE.BufferGeometry();
        const bgPos = new Float32Array(5000 * 3);
        for(let i=0; i<5000*3; i++) bgPos[i] = (Math.random()-0.5)*1500;
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({color:0xffffff, size:0.7, transparent:true, opacity:0.3})));

        scene.add(new THREE.AmbientLight(0x404040, 0.5));

        generateGalaxy();

        // Tilt the galaxy slightly so spiral arms are visible (avoid edge-on vertical line)
        if (galaxy) {
            galaxy.rotation.x = -0.35; // tilt toward the camera
            galaxy.rotation.z = (Math.random() - 0.5) * 0.3; // small random twist
        }

        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('resize', onResize);

        animate();
    }

    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        composer.setSize(container.clientWidth, container.clientHeight);
    }

    function onPointerDown(event: PointerEvent) {
        // Only handle clicks in GALAXY mode for selecting targets
        if (viewMode !== 'GALAXY') return;

        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        raycaster.params.Points.threshold = 3; // Easier to click stars
        const intersects = raycaster.intersectObject(galaxy);

        if (intersects.length > 0) {
            const clickedPoint = intersects[0].point;
            
            // Check if this is a double-click on the same star
            const isSameStar = lastClickedPosition && clickedPoint.distanceTo(lastClickedPosition) < DOUBLE_CLICK_THRESHOLD;
            
            if (isSameStar) {
                // Double-click detected: Clear timeout and auto-zoom into the system
                if (clickTimeout !== null) {
                    clearTimeout(clickTimeout);
                    clickTimeout = null;
                }
                
                focusedStarPosition = clickedPoint.clone();
                targetLookAt.copy(focusedStarPosition);
                updateReticle(null); // Remove reticle immediately
                
                // Force transition to system view
                viewMode = 'SYSTEM';
                createSolarSystem(focusedStarPosition);
                
                // Set up smooth camera transition
                const starPos = focusedStarPosition.clone();
                let dir = camera.position.clone().sub(starPos);
                if (dir.length() < 0.1) dir = new THREE.Vector3(0, 10, 40);
                dir.normalize();
                
                const sunRadius = (activeSun && (activeSun.geometry as any)?.parameters?.radius) ?? 12;
                const desiredDistance = Math.max(80, sunRadius * 4);
                
                targetCameraPos = starPos.clone().add(dir.multiplyScalar(desiredDistance));
                targetLookAt = starPos.clone();
                isTransitioning = true;
                controls.autoRotate = false;
                
                lastClickedPosition = null; // Reset after double-click
            } else {
                // First click: Show reticle but delay camera target change
                if (clickTimeout !== null) {
                    clearTimeout(clickTimeout);
                }
                
                focusedStarPosition = clickedPoint.clone();
                lastClickedPosition = clickedPoint.clone();
                updateReticle(focusedStarPosition);
                controls.autoRotate = false; // Stop rotation so we can focus
                
                // Delay the camera target change to allow for double-click
                clickTimeout = setTimeout(() => {
                    if (focusedStarPosition) {
                        targetLookAt.copy(focusedStarPosition);
                    }
                    clickTimeout = null;
                }, DOUBLE_CLICK_WINDOW) as unknown as number;
            }
        } else {
            // Clicked background: Reset target to center
            if (clickTimeout !== null) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
            }
            focusedStarPosition = null;
            lastClickedPosition = null;
            targetLookAt.set(0,0,0);
            updateReticle(null);
            controls.autoRotate = true;
        }
    }

    // --- Animation Loop ---

    function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();

        // 1. Smoothly interpolate Controls Target to the desired LookAt point
        // If we are mid-transition, smoothly move the camera towards the target position and lookAt target
        if (isTransitioning && targetCameraPos && targetLookAt) {
            camera.position.lerp(targetCameraPos, transitionSpeed);
            controls.target.lerp(targetLookAt, transitionSpeed);

            // Finish transition when close enough
            if (camera.position.distanceTo(targetCameraPos) < 1.0) {
                isTransitioning = false;
                // Re-enable auto-rotate only when returning to galaxy
                if (viewMode === 'GALAXY') controls.autoRotate = true;
            }
        }

        controls.target.lerp(targetLookAt, 0.05);

        // 2. Handle State Transitions based on Distance
        if (viewMode === 'GALAXY') {
            // Logic: Check distance to the focused star
            if (focusedStarPosition) {
                const dist = camera.position.distanceTo(focusedStarPosition);
                
                // Reticle follows the point
                if(reticle) {
                    reticle.position.copy(focusedStarPosition);
                    reticle.lookAt(camera.position);
                    // Animate reticle scale
                    const scale = 1 + Math.sin(clock.elapsedTime * 5) * 0.2;
                    reticle.scale.set(scale, scale, scale);
                }

                // ZOOM IN THRESHOLD
                if (dist < ZOOM_ENTER_THRESHOLD) {
                    // Switch to System View
                    viewMode = 'SYSTEM';
                    createSolarSystem(focusedStarPosition);
                    updateReticle(null); // Remove reticle

                    // Compute a camera position that is a comfortable distance away from the star
                    // Prefer keeping the same viewing direction by using the current camera->star vector
                    const starPos = focusedStarPosition!.clone();
                    let dir = camera.position.clone().sub(starPos);
                    if (dir.length() < 0.1) dir = new THREE.Vector3(0, 10, 40);
                    dir.normalize();

                    // Determine desired distance: at least 80 units or scaled to star size
                    const sunRadius = (activeSun && (activeSun.geometry as any)?.parameters?.radius) ?? 12;
                    const desiredDistance = Math.max(80, sunRadius * 4);

                    targetCameraPos = starPos.clone().add(dir.multiplyScalar(desiredDistance));
                    targetLookAt = starPos.clone();
                    isTransitioning = true;

                    // Keep auto-rotate off while we're transitioning into the system
                    controls.autoRotate = false;
                }
            } else {
                // No target, just looking at galaxy
                if(galaxy) galaxy.rotation.y += 0.0005;
            }
        } 
        else if (viewMode === 'SYSTEM') {
            // Logic: Animate planets & Check distance to Sun
            if (activeSun && activeSunPosition) {
                const dist = camera.position.distanceTo(activeSunPosition);

                // Animate Sun
                activeSun.rotation.y += 0.002;

                // Subtle pulsing of the sun's light and glow (if present)
                const sUD = (activeSun as any).userData;
                if (sUD && sUD.lightRef) {
                    const flicker = Math.sin(clock.getElapsedTime() * sUD.pulseSpeed) * 0.35;
                    sUD.lightRef.intensity = Math.max(0.1, sUD.baseIntensity + flicker);
                    // Adjust glow sprite a bit
                    if (sUD.spriteRef) {
                        const mat: any = sUD.spriteRef.material;
                        if (mat) mat.opacity = 0.75 + (flicker * 0.25);
                        const baseScale = sUD.spriteRef.__baseScale || sUD.spriteRef.scale.x || 1;
                        // store base scale once
                        if (!sUD.spriteRef.__baseScale) sUD.spriteRef.__baseScale = baseScale;
                        const bs = sUD.spriteRef.__baseScale;
                        sUD.spriteRef.scale.set(bs * (1 + flicker * 0.12), bs * (1 + flicker * 0.12), 1);
                    }
                }

                // Animate Planets
                activePlanets.forEach(p => {
                    const ud = p.userData;
                    ud.angle += ud.speed * dt;
                    p.position.x = activeSunPosition!.x + Math.cos(ud.angle) * ud.distance;
                    p.position.z = activeSunPosition!.z + Math.sin(ud.angle) * ud.distance;
                    p.rotation.y += 0.01;
                });

                // ZOOM OUT THRESHOLD (uses dynamic currentExitThreshold)
                if (dist > currentExitThreshold) {
                    // Switch back to Galaxy View
                    viewMode = 'GALAXY';
                    clearSolarSystem();
                    
                    // Reset target to center so we don't stare at the empty space where the sun was
                    focusedStarPosition = null;
                    targetLookAt.set(0,0,0);

                    // Smoothly move back to the galaxy overview camera position; re-enable auto-rotate after transition completes
                    targetCameraPos = GALAXY_CAMERA_POS.clone();
                    isTransitioning = true;
                    controls.autoRotate = false;
                }
            }
        }

        controls.update();
        composer.render();
    }

    onMount(() => {
        init();
    });

    onDestroy(() => {
        if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
        }
        if (container) container.removeEventListener('pointerdown', onPointerDown);
        // Guard window access for SSR
        if (typeof window !== 'undefined') window.removeEventListener('resize', onResize);
        // dispose geometries/materials...
    });
</script>

<!-- Container -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={container} class="w-full h-full absolute inset-0 bg-black cursor-crosshair" />

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
    let targetLookAt: THREE.Vector3 = new THREE.Vector3(0,0,0); // Where controls are looking

    // Thresholds
    const ZOOM_ENTER_THRESHOLD = 30; // Distance to trigger system view
    const ZOOM_EXIT_THRESHOLD = 120;  // Distance to trigger galaxy view
    // Runtime threshold (can be adjusted per-star to avoid too-early exits)
    let currentExitThreshold = ZOOM_EXIT_THRESHOLD;

    const parameters = {
        count: 150000,
        size: 0.3,
        radius: 300,
        branches: 5,
        spin: 1,
        randomness: 0.5,
        randomnessPower: 3, 
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
            const radius = Math.pow(Math.random(), 1.5) * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY * (radius * 0.05) + (Math.random() - 0.5) * 20; 
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorCore.clone();
            mixedColor.lerp(colorOuter, radius / parameters.radius);
            
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

        // Add light source at the sun (strength and range scaled with size)
        const sunLight = new THREE.PointLight(baseColorHex, sv.intensity * (sunSize/12), 300 + sunSize * 8, 1.5);
        sunLight.position.set(0, 0, 0); // Relative to sun mesh
        activeSun.add(sunLight);

        // Store some animation data so pulsing can occur in the animation loop
        // Set a dynamic exit threshold based on star size so that larger suns require more zoom-out to exit
        currentExitThreshold = Math.max(ZOOM_EXIT_THRESHOLD, sunSize * 25);
        (activeSun as any).userData = { pulseSpeed: 0.8 + Math.random() * 1.6, baseIntensity: sv.intensity, lightRef: sunLight, spriteRef: sprite, exitThreshold: currentExitThreshold };

        // 2. Generate Planets
        const planetColors = [0x2266ff, 0xff4422, 0x88cc88, 0xcccccc, 0xaa55aa];
        const planetCount = Math.floor(Math.random() * 4) + 3; 

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

            const distance = 25 + (i * 12) + Math.random() * 5;
            const angle = Math.random() * Math.PI * 2;
            const speed = (0.5 + Math.random() * 0.5) / (distance * 0.1);

            planet.userData = { distance, angle, speed };
            
            planet.position.set(
                centerPosition.x + Math.cos(angle) * distance,
                centerPosition.y + (Math.random()-0.5)*2,
                centerPosition.z + Math.sin(angle) * distance
            );

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

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); 
        scene.fog = new THREE.FogExp2(0x000000, 0.001); // Adjusted fog for distance

        camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
        camera.position.set(0, 180, 250); 

        renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
            // Clicked a star: Set target
            focusedStarPosition = intersects[0].point;
            targetLookAt.copy(focusedStarPosition);
            updateReticle(focusedStarPosition);
            controls.autoRotate = false; // Stop rotation so we can focus
        } else {
            // Clicked background: Reset target to center
            focusedStarPosition = null;
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
                    controls.autoRotate = true;
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
        if (container) container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('resize', onResize);
        // dispose geometries/materials...
    });
</script>

<!-- Container -->
<div bind:this={container} class="w-full h-full absolute inset-0 bg-black cursor-crosshair" />

<!-- UI Instructions -->
<div class="absolute top-4 left-4 pointer-events-none text-white/60 text-sm font-sans select-none flex flex-col gap-2">
    {#if viewMode === 'GALAXY'}
        <div class="bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
            <h2 class="font-bold text-cyan-400 mb-1">GALAXY MODE</h2>
            <p>1. Click any star to target it (Green Reticle).</p>
            <p>2. Scroll to <span class="text-white font-bold">ZOOM IN</span> until you enter the system.</p>
            <p class="mt-2 text-xs italic text-white/40">Target distance: {focusedStarPosition ? camera.position.distanceTo(focusedStarPosition).toFixed(1) : "--"} / {ZOOM_ENTER_THRESHOLD}</p>
        </div>
    {:else}
        <div class="bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
            <h2 class="font-bold text-orange-400 mb-1">SYSTEM MODE</h2>
            <p>Explore the planets.</p>
            <p>Scroll to <span class="text-white font-bold">ZOOM OUT</span> to return to Galaxy.</p>
            <p class="mt-2 text-xs italic text-white/40">Distance to Sun: {activeSunPosition ? camera.position.distanceTo(activeSunPosition).toFixed(1) : "--"} / {currentExitThreshold.toFixed(1)}</p>
        </div>
    {/if}
</div>
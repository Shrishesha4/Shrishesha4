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
    let galaxyDust: THREE.Points;
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
    const TRANSITION_DELAY = 1000; // ms delay before camera starts moving on double-click

    // Thresholds
    const ZOOM_ENTER_THRESHOLD = 30; // Distance to trigger system view
    const ZOOM_EXIT_THRESHOLD = 120;  // Distance to trigger galaxy view
    // Runtime threshold (can be adjusted per-star to avoid too-early exits)
    let currentExitThreshold = ZOOM_EXIT_THRESHOLD;

    const parameters = {
        count: 50000,
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

    // Store original overflow styles so we can restore them when leaving the view
    let prevHtmlOverflow: string | null = null;
    let prevBodyOverflow: string | null = null;

    // --- Texture Generators ---

    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Context fail");
        
        ctx.clearRect(0, 0, 64, 64);
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.05, 'rgba(255,255,255,0.9)');
        grad.addColorStop(0.15, 'rgba(255,255,255,0.3)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a tiny core flare
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.arc(32, 32, 2, 0, Math.PI * 2);
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }

    function createDustTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Context fail");
        
        ctx.clearRect(0, 0, 128, 128);
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(255,255,255,0.15)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(64, 64, 64, 0, Math.PI * 2);
        ctx.fill();
        
        return new THREE.CanvasTexture(canvas);
    }

    // Create a glow texture with a tint color (hex string like '#bfe9ff')
    function createGlowTexture(hexColor: string, size = 128) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Context fail for glow texture');
        
        // Ensure clear canvas
        ctx.clearRect(0, 0, size, size);

        const center = size / 2;
        const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
        
        // Convert hex to rgb string for gradient steps
        const bigint = parseInt(hexColor.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        const rgb = `${r},${g},${b}`;

        grad.addColorStop(0, `rgba(${rgb}, 0.8)`);
        grad.addColorStop(0.3, `rgba(${rgb}, 0.3)`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`); // Fully transparent at edge

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
        const starTexture = createStarTexture();
        const dustTexture = createDustTexture();

        // --- STARS ---
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const colorCore = new THREE.Color(parameters.coreColor);
        const colorOuter = new THREE.Color(parameters.outerColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            const branch = i % parameters.branches;
            const branchAngle = (branch / parameters.branches) * Math.PI * 2;
            const radius = Math.pow(Math.random(), 1.15) * parameters.radius;
            const radiusNorm = radius / parameters.radius;
            const spinAngle = radiusNorm * parameters.spin * Math.PI * 2;
            const angle = branchAngle + spinAngle + (Math.random() - 0.5) * (0.6 * (1 - radiusNorm));
            const radialNoise = (Math.random() - 0.5) * parameters.randomness * (1 - radiusNorm * 0.6) * 0.6 * parameters.radius * 0.01;
            const y = (Math.random() - 0.5) * 10 * (1 - radiusNorm * 0.7);

            positions[i3] = Math.cos(angle) * radius + radialNoise;
            positions[i3 + 1] = y;
            positions[i3 + 2] = Math.sin(angle) * radius + radialNoise * 0.5;

            const mixedColor = colorCore.clone();
            mixedColor.lerp(colorOuter, radiusNorm);
            const variation = (Math.random() - 0.5) * 0.1;
            mixedColor.r = Math.min(1, Math.max(0, mixedColor.r + variation));
            mixedColor.g = Math.min(1, Math.max(0, mixedColor.g + variation));
            mixedColor.b = Math.min(1, Math.max(0, mixedColor.b + variation));

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        galaxy = new THREE.Points(geometry, new THREE.PointsMaterial({
            size: parameters.size * 1.2,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: starTexture,
            transparent: true,
            opacity: 1.0
        }));
        scene.add(galaxy);

        // --- DUST ---
        const dustCount = Math.floor(parameters.count / 4);
        const dustGeometry = new THREE.BufferGeometry();
        const dustPositions = new Float32Array(dustCount * 3);
        const dustColors = new Float32Array(dustCount * 3);

        for (let i = 0; i < dustCount; i++) {
            const i3 = i * 3;
            const branch = i % parameters.branches;
            const branchAngle = (branch / parameters.branches) * Math.PI * 2;
            const radius = Math.pow(Math.random(), 1.2) * parameters.radius;
            const radiusNorm = radius / parameters.radius;
            const spinAngle = radiusNorm * parameters.spin * Math.PI * 2;
            const angle = branchAngle + spinAngle + (Math.random() - 0.5) * 1.5; // More spread
            const radialNoise = (Math.random() - 0.5) * 60 * (1 - radiusNorm * 0.5); // Much noisier
            const y = (Math.random() - 0.5) * 30 * (1 - radiusNorm * 0.5);

            dustPositions[i3] = Math.cos(angle) * radius + radialNoise;
            dustPositions[i3 + 1] = y;
            dustPositions[i3 + 2] = Math.sin(angle) * radius + radialNoise;

            const dColor = colorOuter.clone();
            dColor.lerp(new THREE.Color('#440066'), Math.random()); // Add some purple/deep hues
            dustColors[i3] = dColor.r;
            dustColors[i3 + 1] = dColor.g;
            dustColors[i3 + 2] = dColor.b;
        }

        dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
        dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

        galaxyDust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({
            size: parameters.size * 6, // Much larger particles for "dust clouds"
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: dustTexture,
            transparent: true,
            opacity: 0.35
        }));
        scene.add(galaxyDust);
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
                    if (c.geometry && typeof c.geometry.dispose === 'function') c.geometry.dispose();
                    if (c.material && c.material.map && typeof c.material.map.dispose === 'function') c.material.map.dispose();
                    if (c.material && typeof c.material.dispose === 'function') c.material.dispose();
                });
            }
            reticle = null;
        }
        if (position) {
            const group = new THREE.Group();

            // 1. Wormhole Particles (Spiral)
            const particlesCount = 200;
            const particleGeo = new THREE.BufferGeometry();
            const particlePos = new Float32Array(particlesCount * 3);
            const particleSizes = new Float32Array(particlesCount);
            
            for(let i=0; i<particlesCount; i++) {
                const angle = (i / particlesCount) * Math.PI * 10; // Multiple spirals
                const radius = 1 + (i/particlesCount) * 1.5;
                // Add some randomness to create a "cloud" feel
                const spread = (Math.random() - 0.5) * 0.2; 
                
                particlePos[i*3] = Math.cos(angle) * (radius + spread);
                particlePos[i*3+1] = Math.sin(angle) * (radius + spread);
                particlePos[i*3+2] = (Math.random() - 0.5) * 0.5; // Depth
                
                particleSizes[i] = Math.random() * 0.5 + 0.1;
            }
            
            particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
            particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
            
            const particleMat = new THREE.PointsMaterial({
                color: 0x88ccff,
                size: 0.2,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            
            const swirl = new THREE.Points(particleGeo, particleMat);
            group.add(swirl);

            // 2. Central Glow Sprite
            const glowTex = createGlowTexture('#00ffff', 128);
            const spriteMat = new THREE.SpriteMaterial({ 
                map: glowTex, 
                color: 0x00ffff, 
                transparent: true, 
                opacity: 0.6, 
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(4, 4, 1);
            group.add(sprite);

            // 3. Outer Ring (Event Horizonish)
            const ringGeo = new THREE.RingGeometry(2.8, 3.0, 64);
            const ringMat = new THREE.MeshBasicMaterial({ 
                color: 0xffffff, 
                side: THREE.DoubleSide, 
                transparent: true, 
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            group.add(ring);

            group.position.copy(position);
            group.lookAt(camera.position); // Face camera
            
            // Store reference for animation
            group.userData = { swirl: swirl, ring: ring };

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
        if (galaxyDust) galaxyDust.visible = true;
        
        // Reset controls
        if (controls) {
            controls.enablePan = true;
            controls.minDistance = 0;
            controls.maxDistance = Infinity;
        }

        // Restore the default exit threshold when no system is active
        currentExitThreshold = ZOOM_EXIT_THRESHOLD;
    }

    function createSolarSystem(centerPosition: THREE.Vector3) {
        // Clear previous if any (should be handled by state, but safety check)
        clearSolarSystem();
        activeSunPosition = centerPosition;

        // ... (existing sun logic) ...
        // [Existing starVariants array and sun creation logic should remain intact]
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
        if (galaxyDust) galaxyDust.visible = false;

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
        const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? Math.min(window.devicePixelRatio, 1.5) : 1;
        renderer.setPixelRatio(dpr);
        
        // Reverting to standard sRGB to fix runtime error
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        // Removed min/max distance limits so user can zoom freely across thresholds
        
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth / 2, container.clientHeight / 2), 
            2.5, 0.5, 0.05 
        );

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // Ambient stars
        const bgGeo = new THREE.BufferGeometry();
        const bgPos = new Float32Array(5000 * 3);
        for(let i=0; i<5000*3; i++) bgPos[i] = (Math.random()-0.5)*1500;
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
            color: 0xffffff, 
            size: 1.0, 
            transparent: true, 
            opacity: 0.4, 
            map: createStarTexture(), 
            depthWrite: false, 
            blending: THREE.AdditiveBlending 
        })));

        scene.add(new THREE.AmbientLight(0x404040, 0.5));

        generateGalaxy();

        // Tilt the galaxy slightly so spiral arms are visible (avoid edge-on vertical line)
        if (galaxy) {
            galaxy.rotation.x = -0.35; // tilt toward the camera
            galaxy.rotation.z = (Math.random() - 0.5) * 0.3; // small random twist
            if (galaxyDust) {
                galaxyDust.rotation.x = galaxy.rotation.x;
                galaxyDust.rotation.z = galaxy.rotation.z;
            }
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
        // Ignore multi-touch events (e.g., pinch-to-zoom secondary finger)
        if (!event.isPrimary) return;

        event.preventDefault(); // Prevent default browser actions
        
        const rect = container.getBoundingClientRect();
        const clientX = event.clientX;
        const clientY = event.clientY;

        // Calculate Normalized Device Coordinates (NDC) -1 to +1
        // Ensure we are strictly within the container bounds
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        
        // Handle SYSTEM mode double-click to exit
        if (viewMode === 'SYSTEM') {
            const now = Date.now();
            // Use a separate variable for system click time to avoid confusion
            if ((activeSun as any)?.__lastClickTime && (now - (activeSun as any).__lastClickTime) < DOUBLE_CLICK_WINDOW) {
                // Double click detected in system view -> Exit to Galaxy
                 viewMode = 'GALAXY';
                 clearSolarSystem();
                 
                 focusedStarPosition = null;
                 targetLookAt.set(0,0,0);

                 targetCameraPos = GALAXY_CAMERA_POS.clone();
                 isTransitioning = true;
                 controls.autoRotate = true;
                 
                 lastClickedPosition = null;
                 if (activeSun) (activeSun as any).__lastClickTime = 0;
                 return;
            }
            if (activeSun) (activeSun as any).__lastClickTime = now;
            return;
        }

        // GALAXY MODE INTERACTION
        raycaster.setFromCamera(mouse, camera);
        raycaster.params.Points.threshold = 3;
        const intersects = raycaster.intersectObject(galaxy);

        if (intersects.length > 0) {
            // For a Points geometry, we need to find the actual star position
            // intersects[0].index gives us which point was clicked
            const intersection = intersects[0];
            const positions = (galaxy.geometry as THREE.BufferGeometry).getAttribute('position') as THREE.BufferAttribute;
            
            let clickedPoint: THREE.Vector3;
            if (intersection.index !== null && intersection.index !== undefined) {
                // Use the exact star position from the geometry (local coordinates)
                const idx = (intersection.index as number) * 3;
                clickedPoint = new THREE.Vector3(
                    positions.array[idx],
                    positions.array[idx + 1],
                    positions.array[idx + 2]
                );
                // Transform from local galaxy coordinates to world coordinates
                galaxy.updateMatrixWorld();
                clickedPoint.applyMatrix4(galaxy.matrixWorld);
            } else {
                // Fallback to intersection point if index is not available (already in world space)
                clickedPoint = intersection.point.clone();
            }
            
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
                
                // Delay camera transition to give visual feedback
                setTimeout(() => {
                    if (focusedStarPosition && activeSun) {
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
                    }
                }, TRANSITION_DELAY);
                
                controls.autoRotate = false;
                lastClickedPosition = null; // Reset after double-click
            } else {
                // First click: Show reticle but keep rotating around it
                if (clickTimeout !== null) {
                    clearTimeout(clickTimeout);
                }
                
                focusedStarPosition = clickedPoint.clone();
                lastClickedPosition = clickedPoint.clone();
                updateReticle(focusedStarPosition);

                // Delay to allow for potential double-click
                clickTimeout = setTimeout(() => {
                    clickTimeout = null;
                    // Only update anchor AFTER double-click window expires (no double-click detected)
                    if (focusedStarPosition) {
                        targetLookAt.copy(focusedStarPosition);
                        controls.autoRotate = true; // Start rotating only after double-click window expires
                    }
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
            if (camera.position.distanceTo(targetCameraPos) < 5.0) {
                isTransitioning = false;
                // Re-enable auto-rotate only when returning to galaxy
                if (viewMode === 'GALAXY') controls.autoRotate = true;
            }
        }

        // Only enforce target lerping if we have a specific focus or are transitioning
        if (isTransitioning) {
            controls.target.lerp(targetLookAt, 0.05);
        } else if (focusedStarPosition) {
            controls.target.lerp(targetLookAt, 0.05);
        }

        // 2. Handle State Transitions based on Distance
        if (viewMode === 'GALAXY') {
            // Logic: Check distance to the focused star
            if (focusedStarPosition) {
                const dist = camera.position.distanceTo(focusedStarPosition);
                
                // Reticle follows the point
                if(reticle) {
                    reticle.position.copy(focusedStarPosition);
                    reticle.lookAt(camera.position);
                    
                    // Animate wormhole components
                    const ud = reticle.userData;
                    if (ud.swirl) {
                        ud.swirl.rotation.z -= 0.05; // Spin the swirl
                    }
                    if (ud.ring) {
                        const pulse = 1 + Math.sin(clock.elapsedTime * 8) * 0.05;
                        ud.ring.scale.set(pulse, pulse, 1);
                    }
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
                if(galaxyDust) galaxyDust.rotation.y += 0.0005;
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
        // Prevent page scrolling while the map is active
        if (typeof document !== 'undefined') {
            prevHtmlOverflow = document.documentElement.style.overflow || '';
            prevBodyOverflow = document.body.style.overflow || '';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        init();
    });

    onDestroy(() => {
        if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
        }
        if (container) container.removeEventListener('pointerdown', onPointerDown);
        // Guard window access for SSR
        if (typeof window !== 'undefined') window.removeEventListener('resize', onResize);

        // Restore document scroll behavior
        if (typeof document !== 'undefined') {
            document.documentElement.style.overflow = prevHtmlOverflow ?? '';
            document.body.style.overflow = prevBodyOverflow ?? '';
        }

        // Dispose Three.js resources to prevent memory leaks
        if (galaxy) {
            galaxy.geometry.dispose();
            (galaxy.material as THREE.Material).dispose();
        }
        if (galaxyDust) {
            galaxyDust.geometry.dispose();
            (galaxyDust.material as THREE.Material).dispose();
        }
        
        // Clear solar system resources
        clearSolarSystem();
        
        // Clear reticle
        updateReticle(null);
        
        // Dispose post-processing
        if (composer) {
            composer.dispose();
        }
        
        // Dispose renderer and release WebGL context
        if (renderer) {
            renderer.dispose();
            renderer.forceContextLoss();
        }
        
        // Dispose controls
        if (controls) {
            controls.dispose();
        }
        
        // Clear the scene
        if (scene) {
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry?.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(m => m.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                } else if (object instanceof THREE.Points) {
                    object.geometry?.dispose();
                    if (object.material) {
                        (object.material as THREE.Material).dispose();
                    }
                }
            });
            scene.clear();
        }
    });
</script>

<!-- Container -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={container} class="fixed inset-0 bg-black cursor-crosshair z-10"></div>
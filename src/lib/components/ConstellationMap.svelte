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
    let dust: THREE.Points;
    let planets: THREE.Mesh[] = []; 
    let composer: EffectComposer;

    // Raycaster for clicking planets
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetPlanetPosition: THREE.Vector3 | null = null;
    let isTraveling = false;
    let animationSpeed = 0.02; // Speed of the "Interstellar" travel

    const parameters = {
        count: 100000,
        dustCount: 15000,
        size: 0.25,
        radius: 150,
        branches: 4,
        spin: 1,
        randomness: 0.5,
        randomnessPower: 2.5, 
        
        coreColor: '#ffddaa', 
        innerArmColor: '#ff4422', // Redder inner arms
        nebulaColor: '#cc00ff',
        outerArmColor: '#2266ff', // Brighter blue
        dustColor: '#110022',
    };

    let clock = new THREE.Clock();

    // Drag / cancel helpers so user can interrupt camera travel and freely look around
    let pointerDownPos: { x: number; y: number } | null = null;
    let isPointerDragging = false;
    const DRAG_THRESHOLD = 6; // px

    function cancelTravel() {
        isTraveling = false;
        targetPlanetPosition = null;
        planets.forEach(p => ((p.userData as any).isTarget = false));
        if (controls) {
            controls.autoRotate = false; // let user take control
            controls.enabled = true;
        }
    }

    function handlePointerDownGlobal(e: PointerEvent) {
        pointerDownPos = { x: e.clientX, y: e.clientY };
        isPointerDragging = false;
    }

    function handlePointerMoveGlobal(e: PointerEvent) {
        if (!pointerDownPos) return;
        const dx = e.clientX - pointerDownPos.x;
        const dy = e.clientY - pointerDownPos.y;
        if (!isPointerDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
            isPointerDragging = true;
            // If we are traveling, stop travel so user can inspect freely
            if (isTraveling) cancelTravel();
            // While dragging, make sure autoRotate is off
            if (controls) controls.autoRotate = false;
        }
    }

    function handlePointerUpGlobal() {
        pointerDownPos = null;
        isPointerDragging = false;
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && isTraveling) cancelTravel();
    }

    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const context = canvas.getContext('2d');
        if (!context) throw new Error("Context fail");

        context.clearRect(0, 0, 64, 64);
        const center = 32;
        const gradient = context.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Pure transparent edge
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(canvas);
    }

    // --- Planet texture generator (procedural) ---
    function hexToRgb(hex: number) {
        return { r: (hex >> 16) & 255, g: (hex >> 8) & 255, b: hex & 255 };
    }

    function rgbToCss(rgb: { r: number; g: number; b: number }, a = 1) {
        return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
    }

    function generatePlanetTexture(baseHex: number, size = 1024) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        const base = hexToRgb(baseHex);

        // Base fill
        ctx.fillStyle = rgbToCss(base, 1);
        ctx.fillRect(0, 0, size, size);

        // Layered blotches to simulate rocky / marbled surface
        for (let i = 0; i < 700; i++) {
            const radius = Math.random() * (size * 0.2) + size * 0.01;
            const x = Math.random() * size;
            const y = Math.random() * size;
            const variation = 0.6 + Math.random() * 0.8;
            const r = Math.max(0, Math.min(255, Math.floor(base.r * variation + (Math.random() * 60 - 30))));
            const g = Math.max(0, Math.min(255, Math.floor(base.g * variation + (Math.random() * 60 - 30))));
            const b = Math.max(0, Math.min(255, Math.floor(base.b * variation + (Math.random() * 60 - 30))));
            const alpha = (Math.random() * 0.25 + 0.05).toFixed(2);

            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
            grad.addColorStop(1, `rgba(${Math.floor(r * 0.5)},${Math.floor(g * 0.5)},${Math.floor(b * 0.5)},0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Subtle veins / streaks
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < 40; i++) {
            ctx.strokeStyle = `rgba(${Math.floor(base.r * 0.6)},${Math.floor(base.g * 0.6)},${Math.floor(base.b * 0.6)},0.08)`;
            ctx.lineWidth = Math.random() * (size * 0.01) + 1;
            ctx.beginPath();
            const startX = Math.random() * size;
            const startY = Math.random() * size;
            ctx.moveTo(startX, startY);
            for (let j = 0; j < 4; j++) {
                ctx.lineTo(startX + (Math.random() - 0.5) * size * 0.35, startY + (Math.random() - 0.5) * size * 0.35);
            }
            ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';

        // Craters / pockmarks
        for (let i = 0; i < 30; i++) {
            const r = size * (0.02 + Math.random() * 0.06);
            const x = Math.random() * size;
            const y = Math.random() * size;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,0,0,0.22)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        // Use renderer anisotropy when available (renderer exists by the time createPlanets is called)
        // @ts-ignore
        texture.anisotropy = renderer?.capabilities?.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1;
        texture.needsUpdate = true;
        return texture;
    }

    function generateGalaxy() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorCore = new THREE.Color(parameters.coreColor);
        const colorInner = new THREE.Color(parameters.innerArmColor);
        const colorNebula = new THREE.Color(parameters.nebulaColor);
        const colorOuter = new THREE.Color(parameters.outerArmColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            
            // Cluster stars heavily in center
            const radius = Math.pow(Math.random(), 2) * parameters.radius;
            
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY * (radius * 0.05); 
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = new THREE.Color();
            const distanceRatio = radius / parameters.radius;

            if (distanceRatio < 0.15) {
                mixedColor.copy(colorCore);
            } else if (distanceRatio < 0.5) {
                mixedColor.copy(colorCore).lerp(colorInner, (distanceRatio - 0.15) * 2.5);
                if (Math.random() > 0.85) mixedColor.lerp(colorNebula, 0.8);
            } else {
                mixedColor.copy(colorInner).lerp(colorOuter, (distanceRatio - 0.5) * 2);
                if (Math.random() > 0.9) mixedColor.lerp(colorNebula, 0.6);
            }

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
            opacity: 0.45 // reduced so planets are not visually occluded
        });

        if (galaxy) scene.remove(galaxy);
        galaxy = new THREE.Points(geometry, material);
        scene.add(galaxy);
    }

    function generateDust() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.dustCount * 3);
        const dustColor = new THREE.Color(parameters.dustColor);

        for (let i = 0; i < parameters.dustCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
            
            const spread = parameters.randomness * 2.5; 
            const randomX = (Math.random() - 0.5) * spread * radius;
            const randomY = (Math.random() - 0.5) * spread * radius * 0.1;
            const randomZ = (Math.random() - 0.5) * spread * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: dustColor,
            size: 15,
            map: createStarTexture(), 
            transparent: true,
            opacity: 0.02, // Very subtle to avoid blocking view
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        if (dust) scene.remove(dust);
        dust = new THREE.Points(geometry, material);
        scene.add(dust);
    }

    function createPlanets() {
        planets.forEach(p => scene.remove(p));
        planets = [];

        // A few curated palettes to create distinct planet looks
        const planetPalettes = [
            [0x6b3d1f, 0xcc8a45, 0x8b5a2b], // rocky / desert
            [0x33374a, 0x8fa8d6, 0x5b6f88], // icy / blue
            [0x4b2a2a, 0xaa3b1b, 0x2b1a18], // volcanic
            [0x6a6a6a, 0x9b9b9b, 0x3f3f3f], // grey rock
            [0xffaa66, 0xff7744, 0x6b3d1f]  // warm / dusty
        ];

        for (let i = 0; i < 8; i++) {
            const basePalette = planetPalettes[Math.floor(Math.random() * planetPalettes.length)];
            const baseColor = basePalette[Math.floor(Math.random() * basePalette.length)];

            // Larger planets so they are visible at orbit distances
            const size = Math.random() * 6 + 3;
            const geometry = new THREE.SphereGeometry(size, 64, 64);

            // Procedural texture
            const texture = generatePlanetTexture(baseColor, 1024);

            const material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.85,
                metalness: 0.03,
                // Add a subtle emissive tint based on base color so planets pop against dark background
                emissive: new THREE.Color(baseColor).multiplyScalar(0.06),
                emissiveIntensity: 0.18
            });

            const planet = new THREE.Mesh(geometry, material);

            // Ensure planet renders above faint galaxy overlay if needed
            planet.renderOrder = 100;
            // Subtle depthTest left enabled but add a small bright debug marker to help visibility
            (planet.material as any).depthTest = true;

            // Add a small bright debug marker at planet center so we can visually confirm generation (remove later)
            const markerGeo = new THREE.SphereGeometry(Math.max(size * 0.12, 0.4), 8, 8);
            const markerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
            const marker = new THREE.Mesh(markerGeo, markerMat);
            marker.position.set(0, 0, 0);
            marker.renderOrder = 999;
            planet.add(marker);

            const angle = Math.random() * Math.PI * 2;
            // Bring planets a bit closer to the camera / origin so they are easier to see
            const distance = 120 + Math.random() * 280;
            const height = (Math.random() - 0.5) * 120;

            planet.position.set(
                Math.cos(angle) * distance,
                height,
                Math.sin(angle) * distance
            );

            // Add a thin atmosphere/glow for some planets
            if (Math.random() > 0.75) {
                const atmosphereGeo = new THREE.SphereGeometry(size * 1.06, 32, 32);
                const atmosphereMat = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.06,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });
                const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
                planet.add(atmosphere);
            }

            // Add Ring randomly (slightly tinted based on base color)
            if (Math.random() > 0.7) {
                const ringGeo = new THREE.RingGeometry(size * 1.4, size * 2.2, 64);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: baseColor,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.25
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                ring.rotation.y = (Math.random() - 0.5);
                planet.add(ring);
            }

            // Assign unique orbit speed
            planet.userData = {
                orbitSpeed: 0.1 + Math.random() * 0.2,
                distance: distance,
                angle: angle,
                height: height
            };

            scene.add(planet);
            planets.push(planet);
        }

        console.log(`Generated ${planets.length} planets`); // debug: confirm generation
    }

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505); // Dark grey/black
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 2000);
        // Slightly closer and lower for a more 'zoomed-in' default view
        camera.position.set(0, 60, 140);

        renderer = new THREE.WebGLRenderer({ antialias: false }); // Post-processing handles AA mostly
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better for high contrast
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;

        // --- Post Processing ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight), 
            1.2, // Strength
            0.4, // Radius
            0.85 // Threshold (Higher to reduce artifacts on black background)
        );

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        
        const sunLight = new THREE.PointLight(0xffaa33, 4.5, 1000); // Increased intensity and range to better light planets
        sunLight.position.set(0, 0, 0);
        scene.add(sunLight);

        generateGalaxy();
        generateDust();
        createPlanets();

        // Background Stars
        const bgGeo = new THREE.BufferGeometry();
        const bgCount = 2000;
        const bgPos = new Float32Array(bgCount * 3);
        for(let i=0; i<bgCount*3; i++) {
            bgPos[i] = (Math.random() - 0.5) * 1500;
        }
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        const bgMat = new THREE.PointsMaterial({size: 0.8, sizeAttenuation: true, color: 0xffffff, transparent: true, opacity: 0.25});
        scene.add(new THREE.Points(bgGeo, bgMat));

        // Event Listener for clicking
        container.addEventListener('pointerdown', onPointerDown);

        // Global pointer listeners to detect dragging and allow cancelling travel
        container.addEventListener('pointerdown', handlePointerDownGlobal, { passive: true });
        container.addEventListener('pointermove', handlePointerMoveGlobal, { passive: true });
        container.addEventListener('pointerup', handlePointerUpGlobal, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        window.addEventListener("resize", () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        });

        onDestroy(() => {
            if (container) {
                container.removeEventListener('pointerdown', onPointerDown);
                container.removeEventListener('pointerdown', handlePointerDownGlobal);
                container.removeEventListener('pointermove', handlePointerMoveGlobal);
                container.removeEventListener('pointerup', handlePointerUpGlobal);
            }
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', () => {});
        });

        animate();
    }

    function onPointerDown(event: PointerEvent) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets);

        // Clear any previous targets so new clicks always take precedence
        planets.forEach(p => ((p.userData as any).isTarget = false));

        if (intersects.length > 0) {
            // Determine the actual planet mesh (clicked object may be a child like a marker or ring)
            let clicked: THREE.Object3D | null = intersects[0].object;
            let planetMesh: THREE.Mesh | null = null;
            while (clicked) {
                if (planets.includes(clicked as THREE.Mesh)) {
                    planetMesh = clicked as THREE.Mesh;
                    break;
                }
                clicked = clicked.parent;
            }

            // Fallback to the intersected object if we couldn't find the parent mesh (rare)
            if (!planetMesh) planetMesh = intersects[0].object as THREE.Mesh;

            // Calculate a world-space target position slightly offset from the planet so the camera doesn't sit exactly on the surface
            const offset = new THREE.Vector3(10, 5, 10); // Viewing angle offset
            const worldPos = new THREE.Vector3();
            planetMesh.getWorldPosition(worldPos);

            targetPlanetPosition = worldPos.clone().add(offset);
            isTraveling = true;
            controls.autoRotate = false; // Stop auto-rotation when traveling

            // Mark the planet as the current target so animate() can update the target as it orbits
            (planetMesh.userData as any).isTarget = true;
        } else {
            // No planet clicked: treat as a request to return to origin/center view
            const centerView = new THREE.Vector3(0, 60, 140); // same as default camera position
            targetPlanetPosition = centerView.clone();
            // Ensure controls.target will lerp back to origin
            planets.forEach(p => ((p.userData as any).isTarget = false));
            isTraveling = true;
            controls.autoRotate = false; // Wait until arrival to re-enable
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate Galaxy
        if(galaxy) galaxy.rotation.y = elapsedTime * 0.05;
        if(dust) dust.rotation.y = elapsedTime * 0.04;

        // Animate Planets
        planets.forEach((planet) => {
            const data = planet.userData as any;
            data.angle += 0.0005 * data.orbitSpeed; // Orbit speed
            
            planet.position.x = Math.cos(data.angle) * data.distance;
            planet.position.z = Math.sin(data.angle) * data.distance;
            
            planet.rotation.y += 0.01;
            
            // Update the target position if we are traveling to THIS planet
            if (isTraveling && targetPlanetPosition && data.isTarget) {
                // Recalculate the target offset position as the planet moves
                const offset = new THREE.Vector3(15, 5, 15); 
                targetPlanetPosition.copy(planet.position).add(offset);
            }
        });

        // Handle Interstellar Travel Animation
        if (isTraveling && targetPlanetPosition) {
            // Smoothly move camera (Lerp)
            camera.position.lerp(targetPlanetPosition, animationSpeed);

            // Determine where the controls should target: an orbiting planet (world position) or origin when returning
            const targetPlanet = planets.find(p => (p.userData as any).isTarget);
            if (targetPlanet) {
                const world = new THREE.Vector3();
                targetPlanet.getWorldPosition(world);
                controls.target.lerp(world, animationSpeed);
            } else {
                // No current planet target -> return focus to scene origin
                controls.target.lerp(new THREE.Vector3(0, 0, 0), animationSpeed);
            }

            // Check if we are close enough to stop
            const dist = camera.position.distanceTo(targetPlanetPosition);
            if (dist < 1.0) {
                isTraveling = false; // Arrived
                // Clear any target flags and resume auto-rotation
                planets.forEach(p => ((p.userData as any).isTarget = false));
                controls.autoRotate = true;
            }
        }

        controls.update();
        composer.render(); 
    }

    onMount(() => {
        init();
    });
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={container} class="w-full h-full absolute inset-0" />
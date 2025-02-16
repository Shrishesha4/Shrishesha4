<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    let container: HTMLDivElement;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let galaxy: THREE.Points;
    let nebula: THREE.Mesh;

    const params = {
        count: 100000, // Number of stars (kept reasonable)
        size: 0.8, // Star size
        radius: 200, // Galaxy radius
        branches: 8, // Spiral arms
        spin: 1.2, // How much the arms twist
        randomness: 0.2, // Spread of stars
        coreColor: 0xffcc66, // Core (warm yellow)
        armColor: 0x88bbff, // Arms (cool blue)
        dustColor: 0x220011, // Dark red-brown nebula color
        glowIntensity: 1.5, // Strength of central glow
        xScale: 1.5, // Add this new parameter for horizontal stretch
        zScale: 0.8, // Add this new parameter for depth compression
    };

    // Add this function to create star texture
    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        
        const context = canvas.getContext('2d');
        const gradient = context!.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.8, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        context!.fillStyle = gradient;
        context!.fillRect(0, 0, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    function generateGalaxy() {
        if (galaxy) scene.remove(galaxy);

        const positions = new Float32Array(params.count * 3);
        const colors = new Float32Array(params.count * 3);
        const coreColor = new THREE.Color(params.coreColor);
        const armColor = new THREE.Color(params.armColor);

        for (let i = 0; i < params.count; i++) {
            const branchAngle = (i % params.branches) * ((2 * Math.PI) / params.branches);
            const distance = Math.pow(Math.random(), 1.1) * params.radius;
            const spinAngle = distance * params.spin;

            const randomX = Math.pow(Math.random(), 3) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * distance;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * distance;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * distance;

            // Apply scaling to create oval shape
            positions[i * 3] = (Math.cos(branchAngle + spinAngle) * distance + randomX) * params.xScale;
            positions[i * 3 + 1] = randomY * 0.3;
            positions[i * 3 + 2] = (Math.sin(branchAngle + spinAngle) * distance + randomZ) * params.zScale;

            // Color blending (brighter towards the core)
            const mixRatio = distance / params.radius;
            const starColor = coreColor.clone().lerp(armColor, mixRatio);
            colors[i * 3] = starColor.r;
            colors[i * 3 + 1] = starColor.g;
            colors[i * 3 + 2] = starColor.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: params.size,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            map: createStarTexture(),
            alphaMap: createStarTexture(),
            depthWrite: false,
        });

        galaxy = new THREE.Points(geometry, material);
        scene.add(galaxy);
    }

    function addNebula() {
        if (nebula) scene.remove(nebula);

        const nebulaGeometry = new THREE.SphereGeometry(params.radius * 0.6, 32, 32);
        const nebulaMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(params.dustColor) },
                glowIntensity: { value: params.glowIntensity },
            },
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                uniform vec3 color;
                uniform float glowIntensity;

                void main() {
                    float strength = 1.0 - length(vPosition) / ${params.radius * 0.6};
                    strength = pow(strength, 2.0) * glowIntensity;
                    gl_FragColor = vec4(color * strength, strength);
                }
            `,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });

        nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);
    }

    function init() {
        scene = new THREE.Scene();
        // Increase far clipping plane from 1000 to 10000 to accommodate the large galaxy
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100000);
        camera.position.set(0, 50, 400);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Add elements
        generateGalaxy();
        addNebula();

        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        // Core Glow (Simulated with a point light)
        const coreLight = new THREE.PointLight(0xffddaa, 2, 400);
        coreLight.position.set(0, 0, 0);
        scene.add(coreLight);

        // Resize Event
        window.addEventListener("resize", () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        galaxy.rotation.y += 0.0005;
        nebula.rotation.y += 0.0002; // Slow rotation for realism
        renderer.render(scene, camera);
    }

    onMount(() => {
        init();
    });
</script>
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={container} class="w-full h-full absolute inset-0" />

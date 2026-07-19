"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function ConstellationMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let galaxy: THREE.Points;
    let galaxyDust: THREE.Points;
    let reticle: THREE.Group | null = null;
    let composer: EffectComposer;

    let activeSun: THREE.Mesh | null = null;
    let activePlanets: THREE.Mesh[] = [];
    let activeSunPosition: THREE.Vector3 | null = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    type ViewMode = "GALAXY" | "SYSTEM";
    let viewMode: ViewMode = "GALAXY";

    let focusedStarPosition: THREE.Vector3 | null = null;
    let lastClickedPosition: THREE.Vector3 | null = null;
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    let clickTimeout: ReturnType<typeof setTimeout> | null = null;
    const DOUBLE_CLICK_WINDOW = 400;

    let targetCameraPos: THREE.Vector3 | null = null;
    let isTransitioning = false;
    const transitionSpeed = 0.08;
    const DOUBLE_CLICK_THRESHOLD = 20;
    const GALAXY_CAMERA_POS = new THREE.Vector3(0, 80, 450);
    const TRANSITION_DELAY = 1000;

    const ZOOM_ENTER_THRESHOLD = 30;
    const ZOOM_EXIT_THRESHOLD = 120;
    let currentExitThreshold = ZOOM_EXIT_THRESHOLD;

    const parameters = {
      count: 50000,
      size: 1.4,
      radius: 300,
      branches: 30,
      spin: 40,
      randomness: 30,
      coreColor: "#ffddaa",
      outerColor: "#1b3984",
    };

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function createStarTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 64, 64);
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.05, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.15, "rgba(255,255,255,0.3)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.beginPath();
      ctx.arc(32, 32, 2, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }

    function createDustTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 128, 128);
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255,255,255,0.15)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.05)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }

    function createGlowTexture(hexColor: string, size = 128) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, size, size);
      const center = size / 2;
      const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
      const bigint = parseInt(hexColor.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const rgb = `${r},${g},${b}`;
      grad.addColorStop(0, `rgba(${rgb}, 0.8)`);
      grad.addColorStop(0.3, `rgba(${rgb}, 0.3)`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    function createSunTexture(hexColor = "#ffaa00") {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = hexColor;
      ctx.fillRect(0, 0, size, size);

      function shade(hex: string, percent: number) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        const nr = Math.max(0, Math.min(255, Math.round(r * (1 + percent))));
        const ng = Math.max(0, Math.min(255, Math.round(g * (1 + percent))));
        const nb = Math.max(0, Math.min(255, Math.round(b * (1 + percent))));
        return `rgb(${nr},${ng},${nb})`;
      }

      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 10 + 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
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
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
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

    function generateGalaxy() {
      const starTexture = createStarTexture();
      const dustTexture = createDustTexture();

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

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      galaxy = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          size: parameters.size * 1.2,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          map: starTexture,
          transparent: true,
          opacity: 1.0,
        })
      );
      scene.add(galaxy);

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
        const angle = branchAngle + spinAngle + (Math.random() - 0.5) * 1.5;
        const radialNoise = (Math.random() - 0.5) * 60 * (1 - radiusNorm * 0.5);
        const y = (Math.random() - 0.5) * 30 * (1 - radiusNorm * 0.5);

        dustPositions[i3] = Math.cos(angle) * radius + radialNoise;
        dustPositions[i3 + 1] = y;
        dustPositions[i3 + 2] = Math.sin(angle) * radius + radialNoise;

        const dColor = colorOuter.clone();
        dColor.lerp(new THREE.Color("#440066"), Math.random());
        dustColors[i3] = dColor.r;
        dustColors[i3 + 1] = dColor.g;
        dustColors[i3 + 2] = dColor.b;
      }

      dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
      dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

      galaxyDust = new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
          size: parameters.size * 6,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          map: dustTexture,
          transparent: true,
          opacity: 0.35,
        })
      );
      scene.add(galaxyDust);
    }

    function disposeObject3D(obj: THREE.Object3D) {
      const anyObj = obj as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
      anyObj.geometry?.dispose();
      if (anyObj.material) {
        if (Array.isArray(anyObj.material)) anyObj.material.forEach((m) => m.dispose());
        else anyObj.material.dispose();
      }
    }

    function updateReticle(position: THREE.Vector3 | null) {
      if (reticle) {
        scene.remove(reticle);
        reticle.children.forEach(disposeObject3D);
        reticle = null;
      }
      if (position) {
        const group = new THREE.Group();

        const particlesCount = 200;
        const particleGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particlesCount * 3);
        const particleSizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
          const angle = (i / particlesCount) * Math.PI * 10;
          const radius = 1 + (i / particlesCount) * 1.5;
          const spread = (Math.random() - 0.5) * 0.2;
          particlePos[i * 3] = Math.cos(angle) * (radius + spread);
          particlePos[i * 3 + 1] = Math.sin(angle) * (radius + spread);
          particlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
          particleSizes[i] = Math.random() * 0.5 + 0.1;
        }

        particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
        particleGeo.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));

        const particleMat = new THREE.PointsMaterial({
          color: 0x88ccff,
          size: 0.2,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const swirl = new THREE.Points(particleGeo, particleMat);
        group.add(swirl);

        const glowTex = createGlowTexture("#00ffff", 128);
        const spriteMat = new THREE.SpriteMaterial({
          map: glowTex,
          color: 0x00ffff,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(4, 4, 1);
        group.add(sprite);

        const ringGeo = new THREE.RingGeometry(2.8, 3.0, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        group.add(ring);

        group.position.copy(position);
        group.lookAt(camera.position);
        group.userData = { swirl, ring };

        reticle = group;
        scene.add(reticle);
      }
    }

    function clearSolarSystem() {
      if (activeSun) {
        scene.remove(activeSun);
        disposeObject3D(activeSun);
        activeSun = null;
      }
      activePlanets.forEach((p) => {
        scene.remove(p);
        disposeObject3D(p);
      });
      activePlanets = [];
      activeSunPosition = null;

      if (galaxy) galaxy.visible = true;
      if (galaxyDust) galaxyDust.visible = true;

      if (controls) {
        controls.enablePan = true;
        controls.minDistance = 0;
        controls.maxDistance = Infinity;
      }

      currentExitThreshold = ZOOM_EXIT_THRESHOLD;
    }

    function createSolarSystem(centerPosition: THREE.Vector3) {
      clearSolarSystem();
      activeSunPosition = centerPosition;

      const starVariants = [
        { name: "Yellow Dwarf", color: "#ffdd88", intensity: 2.5, roughness: 0.4, glowSize: 30 },
        { name: "Red Giant", color: "#ff7755", intensity: 3.5, roughness: 0.55, glowSize: 40 },
        { name: "Blue Giant", color: "#88bfff", intensity: 4.0, roughness: 0.25, glowSize: 20 },
        { name: "White Dwarf", color: "#ffffff", intensity: 2.0, roughness: 0.15, glowSize: 20 },
        { name: "Magenta Star", color: "#ff88ff", intensity: 3.0, roughness: 0.35, glowSize: 30 },
      ];
      const sv = starVariants[Math.floor(Math.random() * starVariants.length)];

      const sunSize = 10 + Math.random() * 12;
      const sunGeo = new THREE.SphereGeometry(sunSize, 64, 64);
      const baseColorHex = sv.color;
      const sunMat = new THREE.MeshStandardMaterial({
        map: createSunTexture(baseColorHex),
        emissive: new THREE.Color(baseColorHex),
        emissiveIntensity: sv.intensity,
        emissiveMap: createSunTexture(baseColorHex),
        color: new THREE.Color(baseColorHex).multiplyScalar(0.9),
        roughness: sv.roughness,
        metalness: 0.05,
      });
      activeSun = new THREE.Mesh(sunGeo, sunMat);
      activeSun.position.copy(centerPosition);

      const glowTex = createGlowTexture(baseColorHex, 512);
      const spriteMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: new THREE.Color(baseColorHex),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.85,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(sv.glowSize * (sunSize / 12), sv.glowSize * (sunSize / 12), 1);
      sprite.position.set(0, 0, 0.1);
      activeSun.add(sprite);

      scene.add(activeSun);

      if (galaxy) galaxy.visible = false;
      if (galaxyDust) galaxyDust.visible = false;

      const sunLight = new THREE.PointLight(baseColorHex, sv.intensity * (sunSize / 12), 300 + sunSize * 8, 1.5);
      sunLight.position.set(0, 0, 0);
      activeSun.add(sunLight);

      currentExitThreshold = Math.max(ZOOM_EXIT_THRESHOLD, sunSize * 25);
      activeSun.userData = {
        pulseSpeed: 0.8 + Math.random() * 1.6,
        baseIntensity: sv.intensity,
        lightRef: sunLight,
        spriteRef: sprite,
        exitThreshold: currentExitThreshold,
      };

      const planetColors = [0x2266ff, 0xff4422, 0x88cc88, 0xcccccc, 0xaa55aa];
      const planetCount = Math.floor(Math.random() * 4) + 3;
      let currentOrbit = sunSize * 1.6 + 6;

      for (let i = 0; i < planetCount; i++) {
        const colorHex = planetColors[Math.floor(Math.random() * planetColors.length)];
        const pSize = Math.random() * 2 + 1;
        const pGeo = new THREE.SphereGeometry(pSize, 32, 32);
        const pMat = new THREE.MeshStandardMaterial({
          map: generatePlanetTexture(colorHex),
          roughness: 0.8,
          metalness: 0.1,
        });
        const planet = new THREE.Mesh(pGeo, pMat);

        const distance = currentOrbit + pSize + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.2 + Math.random() * 0.6) / (distance * 0.06);

        planet.userData = { distance, angle, speed };
        planet.position.set(
          centerPosition.x + Math.cos(angle) * distance,
          centerPosition.y + (Math.random() - 0.5) * 2,
          centerPosition.z + Math.sin(angle) * distance
        );

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

    function onResize() {
      camera.aspect = container!.clientWidth / container!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container!.clientWidth, container!.clientHeight);
      composer.setSize(container!.clientWidth, container!.clientHeight);
    }

    function onPointerDown(event: PointerEvent) {
      if (!event.isPrimary) return;
      event.preventDefault();

      const rect = container!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (viewMode === "SYSTEM") {
        const now = Date.now();
        const sunData = activeSun?.userData as { __lastClickTime?: number } | undefined;
        if (sunData?.__lastClickTime && now - sunData.__lastClickTime < DOUBLE_CLICK_WINDOW) {
          viewMode = "GALAXY";
          clearSolarSystem();
          focusedStarPosition = null;
          targetLookAt.set(0, 0, 0);
          targetCameraPos = GALAXY_CAMERA_POS.clone();
          isTransitioning = true;
          controls.autoRotate = true;
          lastClickedPosition = null;
          if (activeSun) (activeSun.userData as { __lastClickTime?: number }).__lastClickTime = 0;
          return;
        }
        if (activeSun) (activeSun.userData as { __lastClickTime?: number }).__lastClickTime = now;
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      raycaster.params.Points!.threshold = 3;
      const intersects = raycaster.intersectObject(galaxy);

      if (intersects.length > 0) {
        const intersection = intersects[0];
        const positions = galaxy.geometry.getAttribute("position") as THREE.BufferAttribute;

        let clickedPoint: THREE.Vector3;
        if (intersection.index !== null && intersection.index !== undefined) {
          const idx = intersection.index * 3;
          clickedPoint = new THREE.Vector3(positions.array[idx], positions.array[idx + 1], positions.array[idx + 2]);
          galaxy.updateMatrixWorld();
          clickedPoint.applyMatrix4(galaxy.matrixWorld);
        } else {
          clickedPoint = intersection.point.clone();
        }

        const isSameStar = lastClickedPosition && clickedPoint.distanceTo(lastClickedPosition) < DOUBLE_CLICK_THRESHOLD;

        if (isSameStar) {
          if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
          }

          focusedStarPosition = clickedPoint.clone();
          targetLookAt.copy(focusedStarPosition);
          updateReticle(null);

          viewMode = "SYSTEM";
          createSolarSystem(focusedStarPosition);

          setTimeout(() => {
            if (focusedStarPosition && activeSun) {
              const starPos = focusedStarPosition.clone();
              let dir = camera.position.clone().sub(starPos);
              if (dir.length() < 0.1) dir = new THREE.Vector3(0, 10, 40);
              dir.normalize();

              const sunGeoParams = (activeSun.geometry as THREE.SphereGeometry).parameters;
              const sunRadius = sunGeoParams?.radius ?? 12;
              const desiredDistance = Math.max(80, sunRadius * 4);

              targetCameraPos = starPos.clone().add(dir.multiplyScalar(desiredDistance));
              targetLookAt.copy(starPos);
              isTransitioning = true;
            }
          }, TRANSITION_DELAY);

          controls.autoRotate = false;
          lastClickedPosition = null;
        } else {
          if (clickTimeout !== null) clearTimeout(clickTimeout);

          focusedStarPosition = clickedPoint.clone();
          lastClickedPosition = clickedPoint.clone();
          updateReticle(focusedStarPosition);

          clickTimeout = setTimeout(() => {
            clickTimeout = null;
            if (focusedStarPosition) {
              targetLookAt.copy(focusedStarPosition);
              controls.autoRotate = true;
            }
          }, DOUBLE_CLICK_WINDOW);
        }
      } else {
        if (clickTimeout !== null) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }
        focusedStarPosition = null;
        lastClickedPosition = null;
        targetLookAt.set(0, 0, 0);
        updateReticle(null);
        controls.autoRotate = true;
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      if (isTransitioning && targetCameraPos) {
        camera.position.lerp(targetCameraPos, transitionSpeed);
        controls.target.lerp(targetLookAt, transitionSpeed);

        if (camera.position.distanceTo(targetCameraPos) < 5.0) {
          isTransitioning = false;
          if (viewMode === "GALAXY") controls.autoRotate = true;
        }
      }

      if (isTransitioning) {
        controls.target.lerp(targetLookAt, 0.05);
      } else if (focusedStarPosition) {
        controls.target.lerp(targetLookAt, 0.05);
      }

      if (viewMode === "GALAXY") {
        if (focusedStarPosition) {
          const dist = camera.position.distanceTo(focusedStarPosition);

          if (reticle) {
            reticle.position.copy(focusedStarPosition);
            reticle.lookAt(camera.position);

            const ud = reticle.userData as { swirl?: THREE.Points; ring?: THREE.Mesh };
            if (ud.swirl) ud.swirl.rotation.z -= 0.05;
            if (ud.ring) {
              const pulse = 1 + Math.sin(clock.elapsedTime * 8) * 0.05;
              ud.ring.scale.set(pulse, pulse, 1);
            }
          }

          if (dist < ZOOM_ENTER_THRESHOLD) {
            viewMode = "SYSTEM";
            createSolarSystem(focusedStarPosition);
            updateReticle(null);

            const starPos = focusedStarPosition.clone();
            let dir = camera.position.clone().sub(starPos);
            if (dir.length() < 0.1) dir = new THREE.Vector3(0, 10, 40);
            dir.normalize();

            const sunGeoParams = (activeSun!.geometry as THREE.SphereGeometry).parameters;
            const sunRadius = sunGeoParams?.radius ?? 12;
            const desiredDistance = Math.max(80, sunRadius * 4);

            targetCameraPos = starPos.clone().add(dir.multiplyScalar(desiredDistance));
            targetLookAt.copy(starPos);
            isTransitioning = true;
            controls.autoRotate = false;
          }
        } else {
          if (galaxy) galaxy.rotation.y += 0.0005;
          if (galaxyDust) galaxyDust.rotation.y += 0.0005;
        }
      } else if (viewMode === "SYSTEM") {
        if (activeSun && activeSunPosition) {
          const dist = camera.position.distanceTo(activeSunPosition);
          activeSun.rotation.y += 0.002;

          const sUD = activeSun.userData as {
            lightRef?: THREE.PointLight;
            spriteRef?: THREE.Sprite & { __baseScale?: number };
            pulseSpeed?: number;
            baseIntensity?: number;
          };
          if (sUD?.lightRef) {
            const flicker = Math.sin(clock.elapsedTime * (sUD.pulseSpeed ?? 1)) * 0.35;
            sUD.lightRef.intensity = Math.max(0.1, (sUD.baseIntensity ?? 1) + flicker);
            if (sUD.spriteRef) {
              const mat = sUD.spriteRef.material;
              if (mat) mat.opacity = 0.75 + flicker * 0.25;
              if (!sUD.spriteRef.__baseScale) sUD.spriteRef.__baseScale = sUD.spriteRef.scale.x || 1;
              const bs = sUD.spriteRef.__baseScale;
              sUD.spriteRef.scale.set(bs * (1 + flicker * 0.12), bs * (1 + flicker * 0.12), 1);
            }
          }

          activePlanets.forEach((p) => {
            const ud = p.userData as { angle: number; speed: number; distance: number };
            ud.angle += ud.speed * dt;
            p.position.x = activeSunPosition!.x + Math.cos(ud.angle) * ud.distance;
            p.position.z = activeSunPosition!.z + Math.sin(ud.angle) * ud.distance;
            p.rotation.y += 0.01;
          });

          if (dist > currentExitThreshold) {
            viewMode = "GALAXY";
            clearSolarSystem();
            focusedStarPosition = null;
            targetLookAt.set(0, 0, 0);
            targetCameraPos = GALAXY_CAMERA_POS.clone();
            isTransitioning = true;
            controls.autoRotate = false;
          }
        }
      }

      controls.update();
      composer.render();
    }

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.FogExp2(0x000000, 0.001);

      camera = new THREE.PerspectiveCamera(60, container!.clientWidth / container!.clientHeight, 0.1, 2000);
      camera.position.set(0, 80, 450);

      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
      renderer.setSize(container!.clientWidth, container!.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      container!.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;

      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(container!.clientWidth / 2, container!.clientHeight / 2), 2.5, 0.5, 0.05);

      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      const bgGeo = new THREE.BufferGeometry();
      const bgPos = new Float32Array(5000 * 3);
      for (let i = 0; i < 5000 * 3; i++) bgPos[i] = (Math.random() - 0.5) * 1500;
      bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
      scene.add(
        new THREE.Points(
          bgGeo,
          new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.0,
            transparent: true,
            opacity: 0.4,
            map: createStarTexture(),
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );

      scene.add(new THREE.AmbientLight(0x404040, 0.5));

      generateGalaxy();

      if (galaxy) {
        galaxy.rotation.x = -0.35;
        galaxy.rotation.z = (Math.random() - 0.5) * 0.3;
        if (galaxyDust) {
          galaxyDust.rotation.x = galaxy.rotation.x;
          galaxyDust.rotation.z = galaxy.rotation.z;
        }
      }

      container!.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("resize", onResize);

      animate();
    }

    const prevHtmlOverflow = document.documentElement.style.overflow || "";
    const prevBodyOverflow = document.body.style.overflow || "";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    init();

    return () => {
      if (clickTimeout !== null) clearTimeout(clickTimeout);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;

      cancelAnimationFrame(animationFrameId);

      clearSolarSystem();
      updateReticle(null);

      if (galaxy) disposeObject3D(galaxy);
      if (galaxyDust) disposeObject3D(galaxyDust);

      composer?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      controls?.dispose();

      scene?.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          disposeObject3D(object);
        }
      });
      scene?.clear();

      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-10 cursor-crosshair bg-black" />;
}

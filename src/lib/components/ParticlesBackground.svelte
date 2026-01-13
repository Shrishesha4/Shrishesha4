<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    interface Props {
        quantity?: number;
        staticity?: number;
        ease?: number;
        speed?: number;
    }

    let { quantity = 30, staticity = 50, ease = 50, speed = 1 }: Props = $props();
    
    let canvas: HTMLCanvasElement;
    let container: HTMLDivElement;
    let context: CanvasRenderingContext2D | null = null;
    let circles: Circle[] = [];
    let mouse = { x: 0, y: 0 };
    let canvasSize = { w: 0, h: 0 };
    let animationFrame: number;
    let dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1; // Cap DPR for performance
    let isMobile = false;
    let isReducedMotion = false;

    // Performance optimizations
    let lastFrameTime = 0;
    const TARGET_FPS = 30; // Lower FPS for better battery life
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let destroyed = false; // Flag to stop animation after component unmount

    // Check for reduced motion preference
    function checkReducedMotion() {
        if (typeof window !== 'undefined') {
            isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    }

    // Add check for mobile
    function checkMobile() {
        isMobile = window.innerWidth < 768;
        initCanvas(); // Reinitialize canvas when screen size changes
    }

    function getParticleCount() {
        if (isReducedMotion) return Math.floor(quantity / 4);
        return isMobile ? Math.floor(quantity / 10) : quantity;
    }

    type Circle = {
        x: number;
        y: number;
        translateX: number;
        translateY: number;
        size: number;
        alpha: number;
        targetAlpha: number;
        dx: number;
        dy: number;
        magnetism: number;
        isComet?: boolean;
        trail?: number;
        angle?: number;
        speed?: number;
        twinkleSpeed?: number;
        twinklePhase?: number;
    };

    function circleParams(): Circle {
        const x = Math.floor(Math.random() * canvasSize.w);
        const y = Math.floor(Math.random() * canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const size = Math.floor(Math.random() * 2) + 0.1;
        const alpha = 0;
        const isComet = Math.random() < 0.0008;
        const trail = isComet ? Math.floor(Math.random() * 60) + 65 : 0; // Longer trail for faster comets
        const baseSpeed = isComet ? 8 + Math.random() * 7 : 0.1 + Math.random() * 0.15;  // Much faster comets
        const adjustedSpeed = baseSpeed * speed;
        const angle = Math.random() * Math.PI * 2;
        const dx = Math.cos(angle) * adjustedSpeed;
        const dy = Math.sin(angle) * adjustedSpeed;
        const targetAlpha = isComet ? 1 : parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const magnetism = 0.3 + Math.random() * 1.5;
        
        const twinkleSpeed = Math.random() * 0.01 + 0.005;
        const twinklePhase = Math.random() * Math.PI * 2;
    
        return {
            x, y, translateX, translateY, size,
            alpha, targetAlpha, dx, dy, magnetism,
            isComet, trail, angle, speed,
            twinkleSpeed, twinklePhase
        };
    }

    let lastTime = 0;
    let deltaTime = 0;

    function animate(currentTime: number) {
        // Stop animation if component was destroyed
        if (destroyed) return;
        
        // Frame limiting for performance
        const elapsed = currentTime - lastFrameTime;
        if (elapsed < FRAME_INTERVAL) {
            animationFrame = requestAnimationFrame(animate);
            return;
        }
        lastFrameTime = currentTime - (elapsed % FRAME_INTERVAL);
        
        deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        clearContext();
        
        const now = currentTime; // Use passed time instead of Date.now() for consistency
        const circleCount = circles.length;
        const halfW = canvasSize.w / 2;
        const halfH = canvasSize.h / 2;
        
        for (let i = 0; i < circleCount; i++) {
            const circle = circles[i];
            
            // Simplified edge calculation
            const posX = circle.x + circle.translateX;
            const posY = circle.y + circle.translateY;
            const closestEdge = Math.min(
                posX - circle.size,
                canvasSize.w - posX - circle.size,
                posY - circle.size,
                canvasSize.h - posY - circle.size
            );
            const remapClosestEdge = closestEdge <= 0 ? 0 : Math.min(1, closestEdge / 20);

            // Simplified alpha calculation
            circle.alpha = circle.targetAlpha * remapClosestEdge;

            // Simplified movement (skip sin/cos variations on mobile for performance)
            if (!isMobile && !isReducedMotion) {
                const timeOffset = now * 0.0005 + i;
                circle.x += (circle.dx * speed) + Math.sin(timeOffset) * (0.05 * speed);
                circle.y += (circle.dy * speed) + Math.cos(timeOffset) * (0.05 * speed);
            } else {
                circle.x += circle.dx * speed;
                circle.y += circle.dy * speed;
            }
            
            // Mouse interaction (simplified)
            const moveX = (mouse.x - halfW) / (staticity / circle.magnetism);
            const moveY = (mouse.y - halfH) / (staticity / circle.magnetism);
            
            circle.translateX += (moveX - circle.translateX) / (ease * 1.5);
            circle.translateY += (moveY - circle.translateY) / (ease * 1.5);

            // Reset particles when they go off screen
            if (
                circle.x < -circle.size ||
                circle.x > canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.h + circle.size
            ) {
                Object.assign(circles[i], circleParams());
                lastPositions.delete(circle);
            } else if (circle.alpha > 0.01) {
                // Only draw if visible
                drawCircleDirect(circle, circle.alpha);
            }
        }
        animationFrame = requestAnimationFrame(animate);
    }

    // Update the init function to start animation with proper timing
    function init() {
        resizeCanvas();
        drawParticles();
        lastTime = performance.now();
        lastFrameTime = lastTime;
        animate(lastTime);
    }

    // Add these variables at the top of the script
    let lastPositions: Map<Circle, { x: number; y: number }> = new Map();

    // Optimized direct draw function that avoids object creation
    function drawCircleDirect(circle: Circle, clampedAlpha: number) {
        if (!context || clampedAlpha < 0.01) return;
        
        const { x, y, translateX, translateY, size, isComet, trail, dx, dy } = circle;
        const posX = x + translateX;
        const posY = y + translateY;
        
        // Skip motion blur on mobile for performance
        if (!isMobile && !isReducedMotion) {
            const lastPos = lastPositions.get(circle);
            if (lastPos) {
                const moveSpeed = Math.sqrt(
                    (x - lastPos.x) ** 2 + (y - lastPos.y) ** 2
                );
                
                // Only draw motion blur for faster moving particles
                if (moveSpeed > 0.5 && isComet) {
                    // Simplified motion blur - just 2 steps
                    const trailX = lastPos.x + (x - lastPos.x) * 0.5;
                    const trailY = lastPos.y + (y - lastPos.y) * 0.5;
                    
                    context.beginPath();
                    context.arc(trailX + translateX, trailY + translateY, size, 0, Math.PI * 2);
                    context.fillStyle = `rgba(255, 255, 255, ${clampedAlpha * 0.2})`;
                    context.fill();
                }
            }
        }

        // Store current position for next frame
        lastPositions.set(circle, { x, y });
        
        // Simplified comet rendering for mobile
        if (isComet && trail && !isMobile && !isReducedMotion) {
            context.save();
            context.translate(posX, posY);
            context.rotate(Math.atan2(dy, dx));
            
            // Simplified gradient with fewer color stops
            const gradient = context.createLinearGradient(-trail * 0.5, 0, size, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(1, `rgba(255, 255, 255, ${clampedAlpha})`);
            
            // Skip shadow on mobile
            context.shadowColor = 'rgba(255, 255, 255, 0.5)';
            context.shadowBlur = 8;
            
            // Simpler triangle trail
            context.beginPath();
            context.moveTo(-trail * 0.5, 0);
            context.lineTo(size, -size * 1.5);
            context.lineTo(size, size * 1.5);
            context.closePath();
            
            context.fillStyle = gradient;
            context.fill();
            context.shadowBlur = 0;
            context.restore();
        }

        // Draw the main particle
        context.beginPath();
        context.arc(posX, posY, isComet ? size * 2 : size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${clampedAlpha})`;
        context.fill();
    }

    // Simplified drawCircle for initial particle creation only
    function drawCircle(circle: Circle, update = false) {
        if (context) {
            const { x, y, translateX, translateY, size, alpha, isComet } = circle;
            
            // Simple initial draw - animation loop handles complex effects
            context.beginPath();
            context.arc(x + translateX, y + translateY, 
                isComet ? size * 2 : size, 0, Math.PI * 2);
            context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            context.fill();

            if (!update) {
                circles.push(circle);
            }
        }
    }

    function initCanvas() {
        resizeCanvas();
        drawParticles();
    }

    function resizeCanvas() {
        if (container && canvas && context) {
            circles = [];
            lastPositions.clear(); // Clear position cache on resize
            canvasSize.w = container.offsetWidth;
            canvasSize.h = container.offsetHeight;
            canvas.width = canvasSize.w * dpr;
            canvas.height = canvasSize.h * dpr;
            canvas.style.width = `${canvasSize.w}px`;
            canvas.style.height = `${canvasSize.h}px`;
            context.scale(dpr, dpr);
        }
    }

    function clearContext() {
        if (context) {
            // Adjust alpha value for better trail persistence
            context.fillStyle = 'rgba(0, 0, 0, 0.3)';
            context.fillRect(0, 0, canvasSize.w, canvasSize.h);
        }
    }

    function drawParticles() {
        clearContext();
        const particleCount = getParticleCount();
        for (let i = 0; i < particleCount; i++) {
            const circle = circleParams();
            drawCircle(circle);
        }
    }

    let gyroEnabled = false;
    let gyroMouse = { x: 0, y: 0 };

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
        if (!isMobile) return;
        
        // Convert gamma (-90 to 90) and beta (-180 to 180) to normalized coordinates
        const x = (event.gamma || 0) / 45; // Normalize to roughly -2 to 2
        const y = (event.beta || 0) / 90;  // Normalize to roughly -2 to 2
        
        // Update virtual mouse position based on device orientation
        gyroMouse = {
            x: (canvasSize.w / 2) + (x * canvasSize.w / 4),
            y: (canvasSize.h / 2) + (y * canvasSize.h / 4)
        };
    }

    // Modify handleMouseMove to incorporate gyroscope data
    function handleMouseMove(event: MouseEvent) {
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            if (!isMobile || !gyroEnabled) {
                mouse = {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                };
            } else {
                mouse = gyroMouse;
            }
        }
    }

    // Update onMount to request and handle device orientation
    // Update onMount to handle async properly
    onMount(() => {
        const init = async () => {
            context = canvas.getContext('2d');
            checkReducedMotion(); // Check for reduced motion preference
            checkMobile();
            animate(performance.now());

            // Listen for reduced motion preference changes
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            mediaQuery.addEventListener('change', checkReducedMotion);

            if (isMobile && DeviceOrientationEvent) {
                try {
                    const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as {
                        requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
                    };

                    if (typeof DeviceOrientationEventiOS.requestPermission === 'function') {
                        const permission = await DeviceOrientationEventiOS.requestPermission();
                        gyroEnabled = permission === 'granted';
                    } else {
                        gyroEnabled = true;
                    }

                    if (gyroEnabled) {
                        window.addEventListener('deviceorientation', handleDeviceOrientation);
                    }
                } catch (error) {
                    console.log('Gyroscope not available');
                }
            }
            
            window.addEventListener('resize', checkMobile);
            window.addEventListener('mousemove', handleMouseMove);
        };

        init();

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
            if (gyroEnabled) {
                window.removeEventListener('deviceorientation', handleDeviceOrientation);
            }
        };
    });

    function remapValue(
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ): number {
        const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    }

    onDestroy(() => {
        destroyed = true; // Prevent any pending animation frames from running
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        lastPositions.clear(); // Clear the Map to free memory
    });
</script>

<div 
    class="fixed inset-0 -z-10 pointer-events-auto" 
    bind:this={container}
    aria-hidden="true"
>
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <canvas bind:this={canvas} />
</div>
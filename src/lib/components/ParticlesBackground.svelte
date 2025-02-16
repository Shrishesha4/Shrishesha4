<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    export let quantity = 30;
    export let staticity = 50;
    export let ease = 50;
    export let speed = 1; // New parameter for controlling particle speed
    
    let canvas: HTMLCanvasElement;
    let container: HTMLDivElement;
    let context: CanvasRenderingContext2D | null = null;
    let circles: Circle[] = [];
    let mouse = { x: 0, y: 0 };
    let canvasSize = { w: 0, h: 0 };
    let animationFrame: number;
    let dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    let isMobile = false;

    // Add check for mobile
    function checkMobile() {
        isMobile = window.innerWidth < 768;
        initCanvas(); // Reinitialize canvas when screen size changes
    }

    function getParticleCount() {
        return isMobile ? Math.floor(quantity / 5) : quantity;
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
        const trail = isComet ? Math.floor(Math.random() * 40) + 45 : 0;
        const baseSpeed = isComet ? 2 + Math.random() * 3 : 0.1 + Math.random() * 0.15;
        const adjustedSpeed = baseSpeed * speed; // Apply speed multiplier
        const angle = Math.random() * Math.PI * 2;
        const dx = Math.cos(angle) * adjustedSpeed;
        const dy = Math.sin(angle) * adjustedSpeed;
        const targetAlpha = isComet ? 1 : parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const magnetism = 0.3 + Math.random() * 1.5; // Reduced magnetism for slower mouse interaction
        
        // Initialize twinkle properties
        const twinkleSpeed = Math.random() * 0.01 + 0.005;
        const twinklePhase = Math.random() * Math.PI * 2;
    
        return {
            x, y, translateX, translateY, size,
            alpha, targetAlpha, dx, dy, magnetism,
            isComet, trail, angle, speed,
            twinkleSpeed, twinklePhase
        };
    }

    function animate() {
        clearContext();
        circles.forEach((circle, i) => {
            const edge = [
                circle.x + circle.translateX - circle.size,
                canvasSize.w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                canvasSize.h - circle.y - circle.translateY - circle.size,
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(
                remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
            );

            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                // Add twinkling effect
                const twinkle = Math.sin(Date.now() * circle.twinkleSpeed! + circle.twinklePhase!) * 0.3;
                const baseAlpha = circle.targetAlpha * remapClosestEdge;
                circle.alpha = baseAlpha + (circle.isComet ? twinkle * 0.2 : twinkle);

                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            // Increase movement speed and responsiveness
            // Add natural flowing movement
            // Reduce the natural movement amplitude
            // Adjust movement speed with the speed parameter
            circle.x += (circle.dx * speed) + Math.sin(Date.now() * 0.0005 + i) * (0.05 * speed);
            circle.y += (circle.dy * speed) + Math.cos(Date.now() * 0.0005 + i) * (0.05 * speed);
            
            
            // Enhanced particle movement with slower response
            const moveX = (mouse.x - canvasSize.w / 2) / (staticity / circle.magnetism);
            const moveY = (mouse.y - canvasSize.h / 2) / (staticity / circle.magnetism);
            
            circle.translateX += (moveX - circle.translateX) / (ease * 1.5); // Increased ease factor
            circle.translateY += (moveY - circle.translateY) / (ease * 1.5);

            // Reset particles when they go off screen
            if (
                circle.x < -circle.size ||
                circle.x > canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.h + circle.size
            ) {
                circles[i] = circleParams();
            } else {
                drawCircle(
                    {
                        ...circle,
                        x: circle.x,
                        y: circle.y,
                        translateX: circle.translateX,
                        translateY: circle.translateY,
                        alpha: Math.max(0, Math.min(1, circle.alpha)), // Clamp alpha between 0 and 1
                    },
                    true
                );
            }
        });
        animationFrame = requestAnimationFrame(animate);
    }

    function drawCircle(circle: Circle, update = false) {
        if (context) {
            const { x, y, translateX, translateY, size, alpha, isComet, trail } = circle;
            
            if (isComet && trail) {
                context.save();
                context.translate(x + translateX, y + translateY);
                context.rotate(Math.atan2(circle.dy, circle.dx));
                
                // Brighter gradient for comet trail
                const gradient = context.createLinearGradient(
                    -trail, 0,
                    size * 2, 0
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.6})`);
                gradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.8})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);
                
                // Add glow effect
                context.shadowColor = 'rgba(255, 255, 255, 0.8)';
                context.shadowBlur = 15;
                
                // Draw tapered trail
                context.beginPath();
                context.moveTo(-trail, -size * 0.1);
                context.lineTo(size * 2, -size * 2);
                context.lineTo(size * 2, size * 2);
                context.lineTo(-trail, size * 0.1);
                context.closePath();
                
                context.fillStyle = gradient;
                context.fill();
                
                // Reset shadow for other elements
                context.shadowBlur = 0;
                context.restore();
            }

            // Draw the main particle with glow for comets
            if (isComet) {
                context.shadowColor = 'rgba(255, 255, 255, 0.8)';
                context.shadowBlur = 20;
            }
            
            context.beginPath();
            context.arc(x + translateX, y + translateY, 
                isComet ? size * 3 : size, 0, 2 * Math.PI);
            context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            context.fill();
            
            // Reset shadow
            context.shadowBlur = 0;

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
            context.clearRect(0, 0, canvasSize.w, canvasSize.h);
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

    onMount(() => {
        context = canvas.getContext('2d');
        checkMobile(); // Check initial screen size
        animate();
        
        window.addEventListener('resize', checkMobile);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
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

    function handleMouseMove(event: MouseEvent) {
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            // Update mouse position relative to canvas
            mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
    }

    onDestroy(() => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
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
<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { profile } from '$lib/stores/profile';

    let container: HTMLElement;
    let rows: string[][] = [];

    /**
     * ACCURATE TEXT WIDTH MEASUREMENT
     * Uses a canvas to measure exactly how wide the text will be
     * with the current font settings (Tailwind text-xs = 12px).
     */
    function measureText(text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return text.length * 8; // Fallback

        // Match your Tailwind classes: text-xs (12px), font-medium (500)
        context.font = '500 12px "Inter", sans-serif'; 
        return context.measureText(text).width;
    }

    /**
     * PERFECTLY BALANCED ROW PACKING
     * Creates visually balanced rows by strategically mixing
     * long and short words to achieve even visual weight.
     * For each row: alternate picking longest remaining (for odd positions)
     * and shortest remaining (for even positions) that fits.
     */
    const calculateRows = () => {
        if (!container) return;

        // 1. Get available width (subtract padding)
        const containerWidth = container.clientWidth - 16;
        
        // 2. Prepare Skills with measurements
        const allSkills = Array.from(new Set([...$profile.skills, ...$profile.techStack]));
        
        // Calculate dimensions
        const padding = 24;
        const gap = 4; // reduced gap for tighter badge spacing
        const border = 2;
        
        // Create skill objects with width measurements
        const skillItems = allSkills.map(skill => ({
            text: skill,
            width: measureText(skill) + padding + border
        }));
        
        // 3. Pack rows by alternating long/short picks
        let remaining = [...skillItems];
        const newRows: string[][] = [];
        
        while (remaining.length > 0) {
            const row: string[] = [];
            let currentRowWidth = 0;
            
            while (true) {
                let best = null as { text: string; width: number } | null;
                
                // Determine if we prefer long (odd positions: 0,2,4...) or short (even: 1,3,5...)
                const isLongTurn = (row.length % 2 === 0);
                
                // Find the best fit candidate among remaining
                for (let s of remaining) {
                    const addGap = row.length > 0 ? gap : 0;
                    const potentialWidth = currentRowWidth + addGap + s.width;
                    
                    if (potentialWidth <= containerWidth) {
                        if (isLongTurn) {
                            // Prefer longest
                            if (best === null || s.width > best.width) {
                                best = s;
                            }
                        } else {
                            // Prefer shortest
                            if (best === null || s.width < best.width) {
                                best = s;
                            }
                        }
                    }
                }
                
                if (best === null) {
                    break;
                }
                
                // Add to row
                const addGap = row.length > 0 ? gap : 0;
                currentRowWidth += addGap + best.width;
                row.push(best.text);
                
                // Remove from remaining
                remaining = remaining.filter(r => r.text !== best!.text);
            }
            
            if (row.length > 0) {
                newRows.push(row);
            }
        }

        rows = newRows;
    };

    // Load data and calculate layout on mount
    $: if ($profile.skills || $profile.techStack) {
        tick().then(calculateRows);
    }

    // Re-calculate on resize to maintain straight edges
    const handleResize = () => calculateRows();

    onMount(() => {
        // Use ResizeObserver for accurate detection of container size changes
        const resizeObserver = new ResizeObserver(() => calculateRows());
        if (container) resizeObserver.observe(container);

        window.addEventListener('resize', handleResize);
        // Initial calculation
        calculateRows();

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    });
</script>

<style>
    /* 
     * VISUAL STYLES 
     */
    .skills-rows {
        /* Ensure we take full width for calculation */
        width: 100%;
    }

    .skill-row {
        display: flex;
        justify-content: flex-start; /* keep items packed to the left */
        gap: 0.25rem; /* much smaller gap between badges */
        align-items: center;
        width: 100%;
        margin-bottom: 0.5rem; /* gap-2 */
    }

    .skill-badge {
        /* 
         * CRITICAL: width: auto ensures badges are variable length.
         * "Git" stays short, "Problem Solving" stays wide.
         */
        width: auto;
        
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        
        /* Transition for hover */
        transition: transform 0.1s ease;
    }
    
    .last-row-left {
        justify-content: flex-start;
        gap: 0.25rem;
    }
    .skill-badge:hover {
        transform: translateY(-1px);
        z-index: 10;
    }
</style>

<section class="mb-6" bind:this={container}>
    <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
        Technical Skills
    </h3>

    {#if rows.length > 0}
        <div class="skills-rows">
            {#each rows as row, index}
                <!-- 
                     Logic: Render a flex row for each group.
                     We use justify-between to spread them evenly.
                -->
                <div 
                    class="skill-row" 
                    class:last-row-left={index === rows.length - 1 && row.length < 3}
                >
                    {#each row as skill}
                        <!-- 
                             Visuals: Standard Tailwind classes 
                             Layout: .skill-badge ensures variable width
                        -->
                        <span class="skill-badge px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200 print:border-gray-300 print:bg-white">
                            {skill}
                        </span>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
</section>
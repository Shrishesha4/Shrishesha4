<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { profile } from '$lib/stores/profile';
    import { projects } from '$lib/stores/projects';
    import { contact } from '$lib/stores/contact';
    
    import ResumeHeader from '$lib/components/resume/ResumeHeader.svelte';
    import ResumeSummary from '$lib/components/resume/ResumeSummary.svelte';
    import ResumeSkills from '$lib/components/resume/ResumeSkills.svelte';
    import ResumeExperience from '$lib/components/resume/ResumeExperience.svelte';
    import ResumeEducation from '$lib/components/resume/ResumeEducation.svelte';
    import ResumeProjects from '$lib/components/resume/ResumeProjects.svelte';

    onMount(async () => {
        await Promise.all([
            profile.load(),
            projects.load(),
            contact.load()
        ]);
        
        // Force light mode for this page if possible, or just style the container explicitly
        document.documentElement.classList.remove('dark');
    });

    onDestroy(() => {
         // Optionally restore theme, but navigating away reloads layout usually or we can rely on theme store
    });

    function handlePrint() {
        window.print();
    }
</script>

<svelte:head>
    <title>{$profile.name || 'Resume'} - Resume</title>
</svelte:head>

<!-- Print Button Container -->
<div class="fixed bottom-8 right-8 z-50 print:hidden">
    <button
        on:click={handlePrint}
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-medium"
    >
        <i class="fa-solid fa-download"></i>
        Download PDF
    </button>
</div>

<div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
    <!-- Resume Paper -->
    <div class="max-w-[21cm] mx-auto bg-white shadow-xl print:shadow-none p-8 md:p-12 print:p-6 min-h-[29.7cm] text-gray-900">
        
        <ResumeHeader />
        
        <div class="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-8 print:gap-8">
            <!-- Main Column -->
            <div class="md:col-span-2 print:col-span-2">
                <ResumeSummary />
                <ResumeExperience />
                <ResumeProjects />
            </div>

            <!-- Sidebar Column -->
            <div class="md:col-span-1 print:col-span-1 border-l border-gray-100 pl-0 md:pl-8 print:border-l print:pl-8">
                 <!-- On mobile/print, we might want skills/education to flow naturally or stay sidebar style? 
                      For simple print, flowing vertically is safer usually, but sidebar looks nice.
                      Let's try to keep sidebar for screen, but for print, CSS grid might behave differently depending on browser.
                      Usually for print, a single column is safest, or ensuring the grid fits.
                      Let's adjust classes for print to be single column if needed, or keep 2-column if it fits A4.
                      Standard A4 is ~21cm width.
                  -->
                <ResumeSkills />
                <ResumeEducation />
            </div>
        </div>
        
    </div>
</div>

<style>
    @media print {
        @page {
            margin: 1.5cm;
            size: auto;
        }
        :global(body) {
            background: white;
            color: black;
        }
        
        /* Ensure background graphics are printed if necessary (usually for badges etc) */
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    }
</style>
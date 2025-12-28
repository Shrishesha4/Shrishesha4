<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';

    export let text: string;
    export let isPlaying = false;

    const dispatch = createEventDispatcher();

    let showSettings = false;
    let error: string | null = null;
    let synth: SpeechSynthesis | null = null;
    let utterance: SpeechSynthesisUtterance | null = null;
    let voices: SpeechSynthesisVoice[] = [];
    let selectedVoiceURI = '';
    let playbackRate = 1.0;

    // Determine clean text locally or use what's passed. 
    // Assuming 'text' passed from parent is already stripped of HTML.
    $: cleanText = text.trim();

    onMount(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            synth = window.speechSynthesis;
            
            // Force load voices immediately for Chrome/Android
            synth.getVoices();

            const loadVoices = () => {
                // Filter for English, but fallback to all if needed
                let allVoices = synth!.getVoices();
                
                // Prioritize English
                voices = allVoices.filter(v => v.lang.startsWith('en'));
                if (voices.length === 0) voices = allVoices;
                
                // Set default
                if (!selectedVoiceURI && voices.length > 0) {
                    selectedVoiceURI = voices[0].voiceURI;
                }
                
                // Validate current selection
                const exists = voices.find(v => v.voiceURI === selectedVoiceURI);
                if (!exists && voices.length > 0) {
                    selectedVoiceURI = voices[0].voiceURI;
                }
            };

            loadVoices();
            
            // Chrome loads voices asynchronously
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = loadVoices;
            }
        } else {
            error = "TTS not supported.";
        }
    });

    function play() {
        if (!synth || !cleanText) return;
        
        // Mobile fix: Cancel any pending speech to prevent queue buildup
        synth.cancel();

        utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Mobile Garbage Collection Fix:
        // Keep a reference to the utterance on the window object so 
        // the browser doesn't kill it mid-sentence.
        (window as any).svelteUtterance = utterance;

        utterance.rate = playbackRate;
        utterance.pitch = 1;
        
        const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (voice) utterance.voice = voice;

        utterance.onstart = () => {
            isPlaying = true;
        };

        utterance.onend = () => {
            isPlaying = false;
            (window as any).svelteUtterance = null;
        };

        utterance.onboundary = (e) => {
            // Some mobile browsers fire boundary events frequently
            // We only care about 'word'
            if (e.name === 'word') {
                dispatch('speech', e);
            }
        };

        utterance.onerror = (e) => {
            console.error('TTS Error:', e);
            // 'interrupted' is common when toggling, ignore it
            // 'canceled' is common when stopping
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
                error = "Playback error.";
                isPlaying = false;
            }
        };

        synth.speak(utterance);
    }

    function togglePlay() {
        if (!synth) return;

        if (synth.speaking) {
            if (synth.paused) {
                synth.resume();
                isPlaying = true;
            } else {
                synth.pause();
                isPlaying = false;
            }
        } else {
            play();
        }
    }

    function handleSpeedChange() {
        if (isPlaying) play(); // Restart to apply speed
    }

    function handleVoiceChange() {
        if (isPlaying) play(); // Restart to apply voice
    }

    onDestroy(() => {
        if (synth) {
            synth.cancel();
            (window as any).svelteUtterance = null;
        }
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
    {#if showSettings}
        <div class="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 mb-2 w-72 border border-neutral-200 dark:border-neutral-700 animate-slide-up-fade">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wide">Voice Settings</h3>
                <button 
                    on:click={() => showSettings = false} 
                    class="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                    aria-label="Close settings"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Voice Selection -->
            <div class="mb-4">
                <label for="voice-select" class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Voice</label>
                <div class="relative">
                    <select 
                        id="voice-select"
                        bind:value={selectedVoiceURI} 
                        on:change={handleVoiceChange}
                        class="w-full appearance-none rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm p-2.5 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                    >
                        {#each voices as voice}
                            <option value={voice.voiceURI}>
                                {voice.name} ({voice.lang})
                            </option>
                        {/each}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                        <i class="fas fa-chevron-down text-xs"></i>
                    </div>
                </div>
            </div>

            <!-- Speed Selection -->
            <div>
                <div class="flex justify-between mb-1">
                    <label for="speed-select" class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Speed</label>
                    <span class="text-xs font-mono text-primary-600 dark:text-primary-400 font-bold">{playbackRate}x</span>
                </div>
                <input 
                    id="speed-select"
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    bind:value={playbackRate} 
                    on:input={handleSpeedChange}
                    class="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
            </div>
        </div>
    {/if}

    <!-- Main Controller -->
    <div class="flex items-center gap-3">
        {#if error}
            <div class="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs shadow-lg animate-fade-in flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i> {error}
            </div>
        {/if}

        <button 
            on:click={() => showSettings = !showSettings}
            class="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-neutral-200 dark:border-neutral-700 z-50"
            title="Voice Settings"
            aria-label="Voice Settings"
            class:rotate-90={showSettings}
        >
            <i class="fas fa-sliders-h transition-transform"></i>
        </button>

        <button 
            on:click={togglePlay}
            class="w-16 h-16 rounded-full bg-primary-600 text-white shadow-xl shadow-primary-900/20 hover:shadow-primary-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-2xl relative overflow-hidden z-50"
            aria-label={isPlaying ? "Pause Speech" : "Start Speech"}
        >
            {#if isPlaying}
                <div class="absolute inset-0 bg-white/10 animate-pulse rounded-full"></div>
                <i class="fas fa-pause relative z-10"></i>
            {:else}
                <i class="fas fa-headphones relative z-10 pl-1"></i>
            {/if}
        </button>
    </div>
</div>

<style>
    @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    .animate-slide-up-fade {
        animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
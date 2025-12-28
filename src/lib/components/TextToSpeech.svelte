<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    export let text: string;

    let isPlaying = false;
    let showSettings = false;
    let error: string | null = null;
    let synth: SpeechSynthesis | null = null;
    let utterance: SpeechSynthesisUtterance | null = null;
    let voices: SpeechSynthesisVoice[] = [];
    let selectedVoiceURI = '';
    let playbackRate = 1.0;

    // Strip HTML tags for TTS
    $: cleanText = text.replace(/<[^>]*>?/gm, '');

    onMount(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            synth = window.speechSynthesis;
            const loadVoices = () => {
                // Filter for English voices by default, but allow user to pick
                voices = synth!.getVoices().filter(v => v.lang.startsWith('en'));
                if (voices.length === 0) {
                     // Fallback if no English voices found (rare but possible)
                     voices = synth!.getVoices();
                }
                
                // Set default voice if none selected or current selection is invalid
                if (!selectedVoiceURI && voices.length > 0) {
                    selectedVoiceURI = voices[0].voiceURI;
                } else if (selectedVoiceURI && !voices.find(v => v.voiceURI === selectedVoiceURI)) {
                     // If previously selected voice is gone, reset to first available
                     if (voices.length > 0) selectedVoiceURI = voices[0].voiceURI;
                }
            };
            loadVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = loadVoices;
            }
        } else {
            error = "Text-to-speech not supported in this browser.";
        }
    });

    function play() {
        if (!synth) return;
        
        // Cancel any current speaking
        synth.cancel();

        utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = playbackRate;
        
        const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onend = () => {
            isPlaying = false;
        };

        utterance.onerror = (e) => {
            if (e.error === 'interrupted') {
                return;
            }
            console.error('Browser TTS error:', e);
            isPlaying = false;
            error = "Playback error.";
        };

        synth.speak(utterance);
        isPlaying = true;
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
        // Browser TTS often requires restart to apply speed change effectively
        if (isPlaying) play();
    }

    function handleVoiceChange() {
        if (isPlaying) play();
    }

    onDestroy(() => {
        if (synth) {
            synth.cancel();
        }
    });
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
    {#if showSettings}
        <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-4 mb-2 w-64 border border-neutral-200 dark:border-neutral-700 animate-slide-up-fade">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-neutral-900 dark:text-white">Voice Settings</h3>
                <button 
                    on:click={() => showSettings = false} 
                    class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Voice Selection -->
            <div class="mb-4">
                <label for="voice-select" class="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Voice</label>
                <select 
                    id="voice-select"
                    bind:value={selectedVoiceURI} 
                    on:change={handleVoiceChange}
                    class="w-full rounded-lg bg-neutral-100 dark:bg-neutral-700 border-none text-sm p-2 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                    {#each voices as voice}
                        <option value={voice.voiceURI}>
                            {voice.localService ? '📍 ' : ''}{voice.name} ({voice.lang})
                        </option>
                    {/each}
                </select>
                {#if voices.length === 0}
                    <p class="text-xs text-neutral-400 mt-1">Loading voices...</p>
                {/if}
            </div>

            <!-- Speed Selection -->
            <div>
                <label for="speed-select" class="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Speed ({playbackRate}x)</label>
                <input 
                    id="speed-select"
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    bind:value={playbackRate} 
                    on:input={handleSpeedChange}
                    class="w-full accent-primary-500 h-2 bg-neutral-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    {/if}

    <!-- Main Controller -->
    <div class="flex items-center gap-2">
        {#if error}
            <div class="bg-red-500 text-white px-3 py-1 rounded-full text-xs animate-fade-in">
                {error}
            </div>
        {/if}

        <button 
            on:click={() => showSettings = !showSettings}
            class="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center border border-neutral-200 dark:border-neutral-700"
            title="Voice Settings"
        >
            <i class="fas fa-sliders-h"></i>
        </button>

        <button 
            on:click={togglePlay}
            class="w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:shadow-primary-600/30 hover:scale-105 transition-all flex items-center justify-center text-xl relative overflow-hidden"
            title={isPlaying ? "Pause" : "Listen to this article"}
        >
            {#if isPlaying}
                <i class="fas fa-pause"></i>
                <!-- Audio Wave Animation -->
                <div class="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div class="w-full h-full bg-white/20 animate-ping rounded-full"></div>
                </div>
            {:else}
                <i class="fas fa-headphones"></i>
            {/if}
        </button>
    </div>
</div>

<style>
    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-slide-up-fade {
        animation: slideUpFade 0.2s ease-out forwards;
    }

    .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>

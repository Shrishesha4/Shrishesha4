<script lang="ts">
    import { onMount } from 'svelte';
    import { debugFirestore } from '$lib/firebase/database';
    import { auth } from '$lib/firebase/config';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { saveProfile, saveProjects } from '$lib/firebase/database';

    let debugResult = 'Testing...';
    let isLoggedIn = false;
    let migrationStatus = '';

    let email = '';
    let password = '';
    let loginError = '';

    async function login() {
        try {
            loginError = '';
            await signInWithEmailAndPassword(auth, email, password);
            isLoggedIn = true;
            const result = await debugFirestore();
            debugResult = JSON.stringify(result, null, 2);
        } catch (e) {
            loginError = (e as Error).message;
            console.error('Login error:', e);
        }
    }

    async function initializeData() {
        if (!auth.currentUser) {
            migrationStatus = 'Error: Not logged in';
            return;
        }
    
        try {
            migrationStatus = 'Initializing profile...';
            const initialProfile = {
                name: '',
                title: '',
                bio: '',
                skills: [],
                experience: [],
                education: []
            };
            await saveProfile(auth.currentUser.uid, initialProfile);
            
            migrationStatus = 'Initializing projects...';
            await saveProjects(auth.currentUser.uid, []);
            
            migrationStatus = 'Initialization completed successfully!';
            const result = await debugFirestore();
            debugResult = JSON.stringify(result, null, 2);
        } catch (error) {
            migrationStatus = `Initialization failed: ${(error as Error).message}`;
            console.error('Initialization error:', error);
        }
    }

    onMount(async () => {
        isLoggedIn = !!auth.currentUser;
        const result = await debugFirestore();
        debugResult = JSON.stringify(result, null, 2);
    });
</script>

<div class="p-4 pb-32 md:pb-4"> <!-- Added bottom padding for mobile -->
    <h1 class="text-2xl mb-4">Firebase Debug</h1>
    
    {#if !isLoggedIn}
        <div class="mb-6 space-y-4">
            <div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="block text-sm mb-1">Email</label>
                <input 
                    type="email" 
                    bind:value={email} 
                    class="w-full p-2 border rounded dark:bg-neutral-700"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="block text-sm mb-1">Password</label>
                <input 
                    type="password" 
                    bind:value={password} 
                    class="w-full p-2 border rounded dark:bg-neutral-700"
                    placeholder="Enter your password"
                />
            </div>
            <button 
                on:click={login}
                class="w-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
                Login
            </button>
            {#if loginError}
                <p class="text-red-500 text-sm">{loginError}</p>
            {/if}
        </div>
    {/if}

    <div class="mb-4">
        <strong>Auth Status:</strong> {isLoggedIn ? 'Logged In' : 'Not Logged In'}
    </div>
    
    <div class="mb-4">
        <button 
            class="bg-primary-600 text-white px-4 py-2 rounded mr-2"
            on:click={initializeData}
            disabled={!isLoggedIn}
        >
            Initialize Firestore Data
        </button>
        {#if migrationStatus}
            <span class={migrationStatus.includes('Error') ? 'text-red-500' : 
                        migrationStatus.includes('completed') ? 'text-green-500' : 
                        'text-blue-500'}>
                {migrationStatus}
            </span>
        {/if}
    </div>
    
    <pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded">
        {debugResult}
    </pre>
    
    <button 
        class="mt-4 bg-primary-600 text-white px-4 py-2 rounded"
        on:click={() => location.reload()}
    >
        Retry Test
    </button>
</div>
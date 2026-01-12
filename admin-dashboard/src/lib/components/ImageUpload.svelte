<script lang="ts">
    import { uploadImage } from '$lib/utils/imageUpload';
    import { loading } from '$lib/stores/loading';
    
    interface Props {
        currentImage?: string;
        onImageUploaded: (url: string) => void;
    }

    let { currentImage = '', onImageUploaded }: Props = $props();
    
    let fileInput: HTMLInputElement;
    let uploadedUrl: string = $state('');
    let previewUrl: string = $derived(uploadedUrl || currentImage);
    let error: string = $state('');

    async function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            error = 'Please select an image file';
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            error = 'Image size should be less than 10MB';
            return;
        }
        
        try {
            error = '';
            loading.show();
            
            uploadedUrl = URL.createObjectURL(file);
            const imageUrl = await uploadImage(file);
            onImageUploaded(imageUrl);
            
        } catch (err) {
            error = 'Failed to upload image';
            console.error('Upload error:', err);
        } finally {
            loading.hide();
        }
    }
</script>

<div class="flex flex-col items-center gap-4">
    {#if previewUrl}
        <div class="relative group glass-card-hover">
            <img
                src={previewUrl}
                alt="Preview"
                class="w-full h-48 object-cover rounded-lg"
            />
            <button
                type="button"
                class="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                onclick={() => fileInput.click()}
            >
                Change Image
            </button>
        </div>
    {:else}
        <button
            type="button"
            class="w-full h-48 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center hover:border-primary-500 transition-colors"
            onclick={() => fileInput.click()}
        >
            <div class="text-center">
                <i class="fas fa-cloud-upload-alt text-white text-2xl mb-2"></i>
                <p class="text-white">Click to upload image</p>
                <p class="text-sm text-neutral-100">Max size: 10MB</p>
            </div>
        </button>
    {/if}
    
    <input
        type="file"
        accept="image/*"
        class="hidden"
        bind:this={fileInput}
        onchange={handleFileSelect}
    />
    
    {#if error}
        <p class="text-red-500 text-sm">{error}</p>
    {/if}
</div>
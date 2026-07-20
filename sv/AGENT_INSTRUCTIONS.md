# Agent Instructions: Auto-Updating Svelte (No Refresh) Pattern

These instructions describe how to implement live, reactive data updates in a SvelteKit 5 app  
using Svelte's Runes system (`$state`, `$derived`, `$effect`, `$bindable`, `$props`) and  
Firebase `onSnapshot` listeners — **without ever triggering a full page refresh or component remount**.

The reference implementation is the `shrishesha4` portfolio codebase. Every pattern below is  
extracted directly from it and battle-tested in production.

---

## 1. Core Principle

The goal is a **single write path**:

```
External data source (Firebase / API / any async source)
  └── store.set(newData)          ← one writable store updated
        └── $store auto-subscription in every component
              └── Svelte DOM-patches only the changed nodes
```

Nothing else is required. No `location.reload()`, no `invalidate()`, no `invalidateAll()`,  
no `setInterval`, no component remount.

---

## 2. Store Factory Pattern (Single Source of Truth)

Wrap every `writable` in a **factory function** that owns its own deduplication state.  
Never expose `set` directly to consumers — only expose `.load()`, `.cleanup()`, and the  
`subscribe` function (which powers the `$store` syntax).

### Template

```ts
// src/lib/stores/myData.ts
import { writable, get } from 'svelte/store';

function createMyDataStore() {
    const { subscribe, set } = writable<MyType[]>([]);
    let unsubscribe: (() => void) | null = null;
    let isLoading = false;
    let loadPromise: Promise<MyType[]> | null = null;
    let isInitialized = false;

    return {
        subscribe,                          // enables $myData in components

        load: async (): Promise<MyType[]> => {
            // Guard 1: already has data → return it immediately (no re-fetch)
            const current = get({ subscribe });
            if (isInitialized && current.length > 0) return current;

            // Guard 2: a load is in flight → share the same promise
            if (isLoading && loadPromise) return loadPromise;

            isLoading = true;
            loadPromise = new Promise<MyType[]>(async (resolve) => {
                try {
                    if (unsubscribe) unsubscribe();          // tear down stale listener

                    // ── set up your real-time listener here (see §3) ──

                } catch (err) {
                    console.error('Error loading myData:', err);
                    set([]);
                    isLoading = false;
                    resolve([]);
                }
            });

            return loadPromise;
        },

        cleanup: () => {
            if (unsubscribe) { unsubscribe(); unsubscribe = null; }
            isLoading = false;
            loadPromise = null;
            isInitialized = false;
        }
    };
}

export const myData = createMyDataStore();
```

**Why this matters for no-refresh updates:**  
- The `isInitialized` guard means calling `.load()` multiple times from different components  
  (layout + page + child) only creates **one** Firebase listener. All components share the same  
  store and receive the same reactive updates.
- The `isLoading && loadPromise` guard prevents a second concurrent load from creating a  
  second listener that would stomp the first.

---

## 3. Real-Time Listener Setup Inside `load()`

### 3a. Firebase — when you need to find the doc ID first

Use this when your data lives in a single document inside a collection (the ID is unknown):

```ts
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';

// Inside the loadPromise executor:
const snapshot = await getDocs(collection(db, 'myCollection'));
if (!snapshot.empty) {
    const firstDoc = snapshot.docs[0];
    let firstLoad = true;

    unsubscribe = onSnapshot(
        doc(db, 'myCollection', firstDoc.id),
        (docSnap) => {
            if (docSnap.exists()) {
                const data: MyType[] = docSnap.data().items || [];
                set(data);                  // ← triggers Svelte reactivity everywhere
                if (firstLoad) {
                    firstLoad = false;
                    isInitialized = true;
                    isLoading = false;
                    resolve(data);          // unblocks the await in onMount
                }
            } else {
                set([]);
                if (firstLoad) {
                    firstLoad = false;
                    isInitialized = true;
                    isLoading = false;
                    resolve([]);
                }
            }
        },
        (error) => {
            console.error('Listener error:', error);
            set([]);
            if (firstLoad) { firstLoad = false; isLoading = false; resolve([]); }
        }
    );
} else {
    set([]);
    isInitialized = true;
    isLoading = false;
    resolve([]);
}
```

### 3b. Firebase — when the path is known (config docs, etc.)

Use this for documents at a fixed known path (e.g. `config/contact`):

```ts
import { doc, onSnapshot } from 'firebase/firestore';

// Inside loadPromise executor:
unsubscribe = onSnapshot(
    doc(db, 'config', 'myConfig'),
    (docSnap) => {
        set(docSnap.exists() ? (docSnap.data() as MyType) : defaultValue);
    },
    (error) => {
        console.error('Config listener error:', error);
        set(defaultValue);
    }
);
isLoading = false;
// Note: no resolve() needed if load() returns Promise<void>
```

### 3c. Any async/polling source (non-Firebase)

Replace `onSnapshot` with a manual interval or WebSocket subscription, but keep the same  
`set()` pattern so Svelte reactivity still drives DOM updates:

```ts
// Example: fetch every 30s
unsubscribe = (() => {
    const id = setInterval(async () => {
        const fresh = await fetchMyData();
        set(fresh);
    }, 30_000);
    return () => clearInterval(id);
})();
```

---

## 4. Component Subscription — Always Use `$store` Syntax

In any Svelte 5 component, auto-subscribe with the `$` prefix. Never call `.subscribe()`  
manually in components.

```svelte
<script lang="ts">
    import { myData } from '$lib/stores/myData';
    import { onMount } from 'svelte';

    onMount(async () => {
        await myData.load();       // idempotent — safe to call in every component
    });
</script>

<!-- $myData is live — updates without any refresh -->
{#each $myData as item}
    <p>{item.title}</p>
{/each}
```

When the Firebase `onSnapshot` fires and the store calls `set()`, every component that  
references `$myData` in its template gets a surgical DOM update — no teardown, no remount.

---

## 5. Derived Values — `$derived()`

Compute filtered/sorted views directly from the store. They recompute automatically when  
the store changes.

```svelte
<script lang="ts">
    import { myData } from '$lib/stores/myData';

    let searchQuery = $state('');
    let selectedFilter = $state('all');

    // Recomputes whenever $myData, searchQuery, or selectedFilter changes
    let filteredItems = $derived(
        $myData
            .filter(item => {
                const matchSearch = !searchQuery ||
                    item.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchFilter = selectedFilter === 'all' || item.category === selectedFilter;
                return matchSearch && matchFilter;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
</script>

{#each filteredItems as item}
    <p>{item.title}</p>
{/each}
```

**Key point:** `$derived()` is the Svelte 5 replacement for `$: filtered = ...` reactive  
statements. It is declarative and does not require manual invalidation.

---

## 6. Side Effects On Store Change — `$effect()`

Use `$effect()` when you need to run imperative code whenever store data changes  
(e.g. rebuild a tag list, update the favicon, reset pagination).

```svelte
<script lang="ts">
    import { myData } from '$lib/stores/myData';

    let availableCategories: string[] = $state([]);

    $effect(() => {
        // This runs whenever $myData changes
        const cats = new Set($myData.map(item => item.category));
        availableCategories = Array.from(cats);
    });
</script>
```

Do **not** put the effect inside `onMount` unless you only want it to run once at mount.  
`$effect()` at the top level of `<script>` re-runs on every reactive dependency change.

---

## 7. Two-Way Binding Between Parent and Child — `$bindable()`

When a child component needs to read AND write a value that lives in the parent:

### Child component

```svelte
<!-- SearchableList.svelte -->
<script lang="ts">
    interface Props {
        searchQuery?: string;        // optional default
        selectedFilter?: string;
    }

    // Declare as $bindable so the parent's variable is updated when the child writes it
    let { searchQuery = $bindable(''), selectedFilter = $bindable('all') }: Props = $props();

    let filteredItems = $derived(/* ... filter using searchQuery and selectedFilter ... */);
</script>

<!-- Child can write to searchQuery; parent sees the change immediately -->
<input bind:value={searchQuery} placeholder="Search..." />
```

### Parent component

```svelte
<!-- +page.svelte -->
<script lang="ts">
    import SearchableList from './SearchableList.svelte';

    let searchQuery = $state('');
    let selectedFilter = $state('all');
</script>

<!-- bind: passes the variable by reference; child writes update the parent's $state -->
<SearchableList bind:searchQuery bind:selectedFilter />

<!-- This also works without bind: if the child only reads (no $bindable needed) -->
<SearchableList {searchQuery} {selectedFilter} />
```

**Rule of thumb:**  
- Use `bind:propName` + `$bindable()` only when the child **modifies** the value.  
- Use regular props when the child only **reads** the value.

---

## 8. Lifecycle: Where to Call `.load()` and `.cleanup()`

### Load — call everywhere that needs the data

```svelte
<!-- In any component or page -->
onMount(async () => {
    await myData.load();    // safe to call multiple times — deduplication guard prevents double-fetch
});
```

### Cleanup — call ONLY in the root layout's `onDestroy`

**Critical:** calling `cleanup()` in a child component or page will destroy the Firebase  
listener for ALL subscribers, not just that one component. Always centralize cleanup.

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { myData, anotherStore } from '$lib/stores/...';

    onMount(async () => {
        await myData.load();
        await anotherStore.load();
    });

    onDestroy(() => {
        myData.cleanup();
        anotherStore.cleanup();
    });
</script>
```

Do NOT call `.cleanup()` in `+page.svelte` or any child component. Add a comment to those  
files explaining why:

```svelte
<!-- hero.svelte -->
onMount(async () => {
    await profile.load();
    // Note: cleanup is intentionally handled in +layout.svelte onDestroy
    // to avoid prematurely destroying shared Firebase listeners
});
```

---

## 9. State Variables — `$state()` vs `let`

All mutable local variables in Svelte 5 components must use `$state()`. Plain `let` is not  
reactive in Svelte 5 (Runes mode).

```svelte
<script lang="ts">
    // ✅ Reactive — DOM updates when these change
    let searchQuery = $state('');
    let isOpen = $state(false);
    let items: string[] = $state([]);

    // ❌ Not reactive in Runes mode — DOM won't update
    let staleVar = '';
</script>
```

---

## 10. Complete Worked Example

Below is a minimal but complete page that gets live updates from a store without any refresh.

### Store (`src/lib/stores/posts.ts`)

```ts
import { writable, get } from 'svelte/store';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase/config';

export interface Post { id: string; title: string; body: string; date: string; }

function createPostsStore() {
    const { subscribe, set } = writable<Post[]>([]);
    let unsubscribe: (() => void) | null = null;
    let isLoading = false;
    let loadPromise: Promise<Post[]> | null = null;
    let isInitialized = false;

    return {
        subscribe,
        load: async (): Promise<Post[]> => {
            const current = get({ subscribe });
            if (isInitialized && current.length > 0) return current;
            if (isLoading && loadPromise) return loadPromise;
            isLoading = true;
            loadPromise = new Promise<Post[]>(async (resolve) => {
                try {
                    if (unsubscribe) unsubscribe();
                    const snap = await getDocs(collection(db, 'posts'));
                    if (!snap.empty) {
                        let firstLoad = true;
                        unsubscribe = onSnapshot(doc(db, 'posts', snap.docs[0].id), (d) => {
                            const posts: Post[] = d.exists() ? d.data().posts || [] : [];
                            set(posts);
                            if (firstLoad) {
                                firstLoad = false; isInitialized = true; isLoading = false; resolve(posts);
                            }
                        }, (err) => {
                            console.error(err); set([]);
                            if (firstLoad) { firstLoad = false; isLoading = false; resolve([]); }
                        });
                    } else {
                        set([]); isInitialized = true; isLoading = false; resolve([]);
                    }
                } catch (err) {
                    set([]); isLoading = false; resolve([]);
                }
            });
            return loadPromise;
        },
        cleanup: () => {
            if (unsubscribe) { unsubscribe(); unsubscribe = null; }
            isLoading = false; loadPromise = null; isInitialized = false;
        }
    };
}

export const posts = createPostsStore();
```

### Page (`src/routes/posts/+page.svelte`)

```svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { posts } from '$lib/stores/posts';

    let searchQuery = $state('');

    onMount(async () => {
        await posts.load();
        // cleanup() is handled in +layout.svelte onDestroy
    });

    let filtered = $derived(
        $posts
            .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
</script>

<input bind:value={searchQuery} placeholder="Search posts..." />

{#each filtered as post (post.id)}
    <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </article>
{/each}
```

### Layout (`src/routes/+layout.svelte` — add cleanup here only)

```svelte
<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { posts } from '$lib/stores/posts';
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();

    onMount(async () => {
        await posts.load();
    });

    onDestroy(() => {
        posts.cleanup();
    });
</script>

{@render children()}
```

---

## 11. What NOT To Do

| Anti-pattern | Why it causes refreshes / bugs |
|---|---|
| `location.reload()` | Full page reload — destroys all state |
| `invalidateAll()` / `invalidate()` | Re-runs SvelteKit `load()` functions; only useful if using `+page.server.ts` |
| `setInterval` polling to re-call `.load()` | Creates a new Firebase listener every interval, leaking listeners |
| Calling `.cleanup()` in a child component | Destroys the shared listener for ALL components subscribed to that store |
| `let x = ...` without `$state()` in Svelte 5 | Variable is not reactive; DOM won't update when it changes |
| Calling `.subscribe()` manually in components | Requires manual unsubscription; use `$store` syntax instead |
| Passing a store itself as a prop | Leads to double-subscription confusion; pass `$store` values as props instead |

---

## 12. Checklist for Applying This Pattern to a New Codebase

- [ ] Create a store file per data type using the factory pattern in §2
- [ ] Wire Firebase `onSnapshot` (or equivalent) inside the store's `load()` per §3
- [ ] In every component that needs data: call `store.load()` in `onMount`; read via `$store` in template
- [ ] In root `+layout.svelte`: call all `store.load()` in `onMount`; call all `store.cleanup()` in `onDestroy`
- [ ] Never call `store.cleanup()` anywhere except the root layout
- [ ] Replace all `let x = ...` reactive variables with `let x = $state(...)`
- [ ] Replace all `$: derived = ...` statements with `let derived = $derived(...)`
- [ ] Replace all `$: { sideEffect(); }` statements with `$effect(() => { sideEffect(); })`
- [ ] Use `$bindable()` + `bind:prop` only when a child component needs to write to a parent variable
- [ ] Verify no `location.reload()`, `invalidate()`, or polling exists in the codebase

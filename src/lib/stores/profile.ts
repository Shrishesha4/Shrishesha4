import { writable } from 'svelte/store';
import { saveProfile } from '$lib/firebase/database';
import { auth, db } from '$lib/firebase/config';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

export interface Education {
    year: string;
    degree: string;
    institution: string;
}


export interface Profile {
    name: string;
    title: string;
    sub_title: string[];
    bio: string;
    location: string;
    skills: string[];
    experience: string[];
    education: Education[];
    typingStrings: string[];
    favicon: string;
    profileImage: string;
    techStack: string[];
    particlesQuantity: number;
}

export const techMap: { [key: string]: string } = {
   "javascript": "devicon-javascript-plain colored",
   "typescript": "devicon-typescript-plain colored",
   "python": "devicon-python-plain colored",
   "java": "devicon-java-plain colored",
   "c++": "devicon-cplusplus-plain colored",
   "c#": "devicon-csharp-plain colored",
   "ruby": "devicon-ruby-plain colored",
   "go": "devicon-go-plain colored",
   "rust": "devicon-rust-plain",  // Removed 'colored' for dark bg visibility

   "blender": "devicon-blender-plain colored",
   "unity3d": "devicon-unity-original colored",
   "fastapi": "devicon-fastapi-plain colored",

   "react": "devicon-react-original colored",
   "vue": "devicon-vuejs-plain colored",
   "angular": "devicon-angularjs-plain colored",
   "svelte": "devicon-svelte-plain colored",
   "nextjs": "devicon-nextjs-original-wordmark",
   "tailwind": "devicon-tailwindcss-plain colored",
   "html": "devicon-html5-plain colored",
   "css": "devicon-css3-plain colored",
   "sass": "devicon-sass-original colored",
   "bootstrap": "devicon-bootstrap-plain colored",

   "node": "devicon-nodejs-plain colored",
   "express": "devicon-express-original colored",
   "django": "devicon-django-plain colored",
   "flask": "devicon-flask-original",
   "spring": "devicon-spring-original colored",
   "laravel": "devicon-laravel-plain colored",

   "mongodb": "devicon-mongodb-plain colored",
   "mysql": "devicon-mysql-plain colored",
   "postgresql": "devicon-postgresql-plain colored",
   "redis": "devicon-redis-plain colored",

   "aws": "devicon-amazonwebservices-original colored",
   "azure": "devicon-azure-plain colored",
   "docker": "devicon-docker-plain colored",
   "kubernetes": "devicon-kubernetes-plain colored",
   "jenkins": "devicon-jenkins-plain colored",

   "git": "devicon-git-plain colored",
   "github": "devicon-github-original colored",
   "vscode": "devicon-vscode-plain colored",
   "linux": "devicon-linux-plain",
   "nginx": "devicon-nginx-original colored",
   "firebase": "devicon-firebase-plain colored",
   "default": "fas fa-code"
};


export const defaultProfile: Profile = {
    name: "",
    title: "",
    sub_title: [''],
    bio: "",
    location: "",
    skills: [],
    experience: [],
    education: [],
    typingStrings: [''],
    favicon: "",
    profileImage: "",
    techStack: [],
    particlesQuantity: 1000
};

function createProfileStore() {
    const { subscribe, set } = writable<Profile>(defaultProfile);
    let unsubscribe: (() => void) | null = null;

    return {
        subscribe,
        set: async (value: Profile) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save profile');
                }
                await saveProfile(auth.currentUser.uid, value);
                set(value);
            } catch (error) {
                console.error('Error saving profile:', error);
                throw error;
            }
        },
        load: async () => {
            try {
                if (unsubscribe) {
                    unsubscribe();
                }

                const profilesRef = collection(db, 'profiles');
                const profileSnapshot = await getDocs(profilesRef);
                
                if (!profileSnapshot.empty) {
                    const firstDoc = profileSnapshot.docs[0];
                    unsubscribe = onSnapshot(
                        doc(db, 'profiles', firstDoc.id),
                        (docSnapshot) => {
                            if (docSnapshot.exists()) {
                                set(docSnapshot.data() as Profile);
                            } else {
                                set(defaultProfile);
                            }
                        },
                        (error) => {
                            console.error('Profile snapshot error:', error);
                            set(defaultProfile);
                        }
                    );
                } else {
                    set(defaultProfile);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
                set(defaultProfile);
            }
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    };
}

export const profile = createProfileStore();
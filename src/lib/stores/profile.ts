import { writable } from 'svelte/store';
import { saveProfile } from '$lib/firebase/database';
import { auth, db } from '$lib/firebase/config';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

export interface Education {
    year: string;
    degree: string;
    institution: string;
}

export interface Badge {
    title: string;
    imageUrl: string;
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
    badges: Badge[];
}

export const techMap: { [key: string]: string } = {
   // Programming Languages
   "javascript": "devicon-javascript-plain colored",
   "typescript": "devicon-typescript-plain colored",
   "python": "devicon-python-plain colored",
   "java": "devicon-java-plain colored",
   "c++": "devicon-cplusplus-plain colored",
   "c": "devicon-c-plain colored",
   "c#": "devicon-csharp-plain colored",
   "ruby": "devicon-ruby-plain colored",
   "go": "devicon-go-plain colored",
   "rust": "devicon-rust-plain",
   "php": "devicon-php-plain colored",
   "swift": "devicon-swift-plain colored",
   "kotlin": "devicon-kotlin-plain colored",
   "dart": "devicon-dart-plain colored",
   "scala": "devicon-scala-plain colored",
   "r": "devicon-r-plain colored",

   // 3D & Game Development
   "blender": "https://cdn.simpleicons.org/blender",
   "n8n": "https://cdn.simpleicons.org/n8n"
   "unity3d": "devicon-unity-original colored",
   "unreal": "devicon-unrealengine-original colored",
   "godot": "devicon-godot-plain colored",

   // Frontend Frameworks & Libraries
   "react": "devicon-react-original colored",
   "vue": "devicon-vuejs-plain colored",
   "angular": "devicon-angularjs-plain colored",
   "svelte": "devicon-svelte-plain colored",
   "nextjs": "devicon-nextjs-original-wordmark",
   "nuxt": "devicon-nuxtjs-plain colored",
   "gatsby": "devicon-gatsby-plain colored",
   "tailwind": "devicon-tailwindcss-plain colored",
   "html": "devicon-html5-plain colored",
   "css": "devicon-css3-plain colored",
   "sass": "devicon-sass-original colored",
   "less": "devicon-less-plain-wordmark colored",
   "bootstrap": "devicon-bootstrap-plain colored",
   "materialui": "devicon-materialui-plain colored",
   "jquery": "devicon-jquery-plain colored",
   "redux": "devicon-redux-original colored",

   // Backend Frameworks
   "node": "devicon-nodejs-plain colored",
   "nodejs": "devicon-nodejs-plain colored",
   "express": "devicon-express-original colored",
   "fastapi": "https://cdn.simpleicons.org/fastapi",
   "django": "devicon-django-plain colored",
   "flask": "devicon-flask-original",
   "spring": "devicon-spring-original colored",
   "springboot": "devicon-spring-original colored",
   "laravel": "devicon-laravel-plain colored",
   "rails": "devicon-rails-plain colored",
   "asp.net": "devicon-dotnetcore-plain colored",
   "graphql": "devicon-graphql-plain colored",

   // Databases
   "mongodb": "devicon-mongodb-plain colored",
   "mysql": "devicon-mysql-plain colored",
   "postgresql": "devicon-postgresql-plain colored",
   "redis": "devicon-redis-plain colored",
   "sqlite": "devicon-sqlite-plain colored",
   "mariadb": "https://cdn.simpleicons.org/mariadb",
   "cassandra": "devicon-cassandra-plain colored",
   "elasticsearch": "https://cdn.simpleicons.org/elasticsearch",
   "oracle": "devicon-oracle-original colored",

   // Cloud & DevOps
   "aws": "devicon-amazonwebservices-original colored",
   "azure": "devicon-azure-plain colored",
   "gcp": "https://cdn.simpleicons.org/googlecloud",
   "heroku": "devicon-heroku-plain colored",
   "digitalocean": "devicon-digitalocean-plain colored",
   "docker": "devicon-docker-plain colored",
   "kubernetes": "devicon-kubernetes-plain colored",
   "terraform": "devicon-terraform-plain colored",
   "jenkins": "devicon-jenkins-plain colored",
   "gitlab": "devicon-gitlab-plain colored",
   "circleci": "https://cdn.simpleicons.org/circleci",
   "ansible": "devicon-ansible-plain colored",

   // Tools & IDEs
   "git": "devicon-git-plain colored",
   "github": "devicon-github-original colored",
   "bitbucket": "devicon-bitbucket-original colored",
   "vscode": "devicon-vscode-plain colored",
   "intellij": "devicon-intellij-plain colored",
   "pycharm": "devicon-pycharm-plain colored",
   "webstorm": "devicon-webstorm-plain colored",
   "vim": "devicon-vim-plain colored",
   "linux": "devicon-linux-plain",
   "ubuntu": "devicon-ubuntu-plain colored",
   "debian": "devicon-debian-plain colored",
   "nginx": "devicon-nginx-original colored",
   "apache": "devicon-apache-plain colored",

   // Mobile Development
   "android": "devicon-android-plain colored",
   "ios": "https://cdn.simpleicons.org/ios",
   "flutter": "devicon-flutter-plain colored",
   "reactnative": "devicon-react-original colored",
   "ionic": "devicon-ionic-original colored",

   // Testing & Quality
   "jest": "devicon-jest-plain colored",
   "mocha": "devicon-mocha-plain colored",
   "pytest": "devicon-pytest-plain colored",
   "selenium": "devicon-selenium-original colored",
   "cypress": "https://cdn.simpleicons.org/cypress",

   // Other
   "firebase": "devicon-firebase-plain colored",
   "supabase": "https://cdn.simpleicons.org/supabase",
   "prisma": "https://cdn.simpleicons.org/prisma",
   "webpack": "devicon-webpack-plain colored",
   "vite": "devicon-vitejs-plain colored",
   "babel": "devicon-babel-plain colored",
   "npm": "devicon-npm-original-wordmark colored",
   "yarn": "devicon-yarn-plain colored",
   "figma": "devicon-figma-plain colored",
   "photoshop": "devicon-photoshop-plain colored",
   "illustrator": "https://cdn.simpleicons.org/adobeillustrator",
   "xd": "devicon-xd-plain colored",
   "postman": "https://cdn.simpleicons.org/postman",
   "insomnia": "https://cdn.simpleicons.org/insomnia",
   "jira": "devicon-jira-plain colored",
   "confluence": "devicon-confluence-plain colored",
   "slack": "devicon-slack-plain colored",
   "trello": "devicon-trello-plain colored",
   "notion": "https://cdn.simpleicons.org/notion",
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
    particlesQuantity: 1000,
    badges: []
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
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
   "go": "devicon-go-original-wordmark colored",
   "rust": "https://cdn.simpleicons.org/rust/orange",
   "php": "devicon-php-plain colored",
   "swift": "devicon-swift-plain colored",
   "kotlin": "devicon-kotlin-plain colored",
   "dart": "devicon-dart-plain colored",
   "scala": "devicon-scala-plain colored",
   "r": "devicon-r-plain colored",

   // 3D & Game Development
   "blender": "devicon-blender-original colored",
   "threejs": "https://cdn.simpleicons.org/three.js/white",
   "three.js": "https://cdn.simpleicons.org/three.js/white",
   "webgl": "https://cdn.simpleicons.org/opengl", // WebGL uses OpenGL logo often
   "shaders": "https://cdn.simpleicons.org/opengl",
   "n8n": "https://cdn.simpleicons.org/n8n",
   "unity3d": "devicon-unity-original colored",
   "unreal": "devicon-unrealengine-original colored",
   "godot": "devicon-godot-plain colored",

   // Frontend Frameworks & Libraries
   "react": "devicon-react-original colored",
   "vue": "devicon-vuejs-plain colored",
   "angular": "devicon-angularjs-plain colored",
   "svelte": "devicon-svelte-original", 
   "nextjs": "https://cdn.simpleicons.org/next.js/white",
   "nuxt": "devicon-nuxtjs-plain colored",
   "gatsby": "devicon-gatsby-plain colored",
   "tailwind": "devicon-tailwindcss-original colored",
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
   "flask": "https://cdn.simpleicons.org/flask/white",
   "spring": "devicon-spring-original colored",
   "springboot": "devicon-spring-original colored",
   "laravel": "devicon-laravel-plain colored",
   "rails": "devicon-rails-plain colored",
   "asp.net": "devicon-dotnetcore-plain colored",
   "graphql": "devicon-graphql-plain colored",

   // Databases
   "sql": "devicon-postgresql-original", // Proxy for generic SQL
   "nosql": "devicon-mongodb-plain colored", // Proxy for generic NoSQL
   "mongodb": "devicon-mongodb-plain colored",
   "mysql": "devicon-mysql-original",
   "postgresql": "devicon-postgresql-original",
   "redis": "devicon-redis-plain colored",
   "sqlite": "devicon-sqlite-plain colored",
   "mariadb": "https://cdn.simpleicons.org/mariadb",
   "cassandra": "devicon-cassandra-plain colored",
   "elasticsearch": "https://cdn.simpleicons.org/elasticsearch",
   "oracle": "devicon-oracle-original colored",

   // Cloud & DevOps
   "aws": "devicon-amazonwebservices-original-wordmark colored",
   "azure": "devicon-azure-plain colored",
   "gcp": "devicon-googlecloud-plain colored",
   "heroku": "devicon-heroku-plain colored",
   "digitalocean": "devicon-digitalocean-plain colored",
   "docker": "devicon-docker-original colored",
   "kubernetes": "devicon-kubernetes-plain colored",
   "terraform": "devicon-terraform-plain colored",
   "jenkins": "devicon-jenkins-plain colored",
   "gitlab": "devicon-gitlab-plain colored",
   "circleci": "devicon-circleci-plain colored", // circleci has a devicon? checked: yes, usually
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
   "linux": "devicon-linux-original",
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
   "notion": "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg",
   "default": "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/javascript.svg"
};

export function getTechIconUrl(tech: string): string | null {
    const key = tech.toLowerCase().trim();
    
    // Direct mapping check
    let iconClass = techMap[key] || techMap[key.replace(/[^a-z0-9]/g, '')];

    // If explicit mapping exists
    if (iconClass) {
        if (iconClass.startsWith('http')) return iconClass;
        
        // Handle devicon classes (legacy support from old project, mostly converted to URLs above or here)
                // If still have "devicon-" classes in the map, convert them to URLs
                if (iconClass.startsWith('devicon-')) {
                     const parts = iconClass.split(' ');
                     const mainClass = parts[0]; 
                     const nameAndStyle = mainClass.replace('devicon-', '');
                     let folderName = nameAndStyle.split('-')[0];
                     
                     // Handle special cases where folder name doesn't match the prefix exactly or needs adjustment
                     // Most are consistent (e.g. javascript-plain -> javascript), but some might vary
                     
                     return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${folderName}/${nameAndStyle}.svg`;
                }
                return iconClass;
            }
    // REMOVED: Dynamic fallback to simple-icons. 
    // This prevents trying to load icons for abstract skills like "Reasoning" or "Rational Thinker".
    // If it's not in the map, we assume it's not a tech icon and return null.
    
    return null; 
}

 Proposed Plan

   1. Scaffold Project:
       * Initialize a Next.js (App Router) project with TypeScript and Tailwind CSS.
       * Install core dependencies: three, @react-three/fiber, @react-three/drei, framer-motion, lenis, and lucide-react.

   2. Design System & Global Styles:
       * Fonts: Import Orbitron and Rajdhani from Google Fonts.
       * Colors: Configure Tailwind with the specific neon palette (Neon Pink, Electric Blue, Acid Green) and dark backgrounds.
       * Base: Set up global CSS for the "dark mode by default" look and custom scrollbar.

   3. Core Architecture:
       * Smooth Scroll: Implement a Lenis wrapper for that "buttery-smooth" feel.
       * 3D Background: Create a persistent R3F Canvas layer (z-index -1) with a Stars/Grid/Fog scene that reacts to scroll.

   4. Feature Implementation (Iterative):
       * UI Components: Create reusable GlitchText, HolographicCard, and NeonButton components.
       * Hero Section: 3D Floating text/shapes + Glitch intro animation.
       * Projects Section: Implement the "Stacking Card" effect using framer-motion scroll transforms.
       * Skills Section: A 3D orbiting cloud of simple geometric shapes (representing tech stacks) or floating text.
       * Contact Section: A terminal-styled form interface.

   5. Interactions & Polish:
       * Add a custom Cyberpunk Crosshair Cursor.
       * Implement Scroll Progress indicators.
       * Ensure mobile responsiveness (reducing 3D complexity on small screens).

  Note on Assets: For this prototype, I will use procedural 3D shapes (cubes, spheres, torus knots) and CSS effects instead of loading heavy external models. This ensures the app works immediately without
  needing external hosting/CDN setup.
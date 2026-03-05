# Perfect Rebuild Blueprint: Kafui Kumah Portfolio

This document contains a comprehensive breakdown of the architecture, design system, and content structure of the original application, along with exact prompts you can feed into an AI or hand to a senior software engineer to recreate the project 1:1 from scratch.

---

## 🏗️ Architecture & Stack
- **Framework**: Next.js (App Router) v15+ (turbopack enabled)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion (v11) & Tailwind CSS Keyframes
- **Content Management**: Contentlayer (for parsing `.mdx` files)
- **Icons**: Heroicons (v2) & Lucide React
- **Headless UI**: `@headlessui/react` (v2 for React 19 support)
- **Fonts**: `next/font/google` (Inter for headings, Lekton for sans body)

---

## 🎨 Design System & Styling Rules

### 1. Color Palette (Radix UI Colors)
The original project relies heavily on **Radix UI colors** for consistency and dark mode compatibility, specifically:
- `gray` and `gray-dark`
- `jade` and `jade-dark` (used heavily in the terminal/code highlighting theme)
- `blue` and `blue-dark`

**CSS Variables mapped in Tailwind `tailwind.config.js`:**
- `primary`: Text color `var(--gray-12)`, Bg color `var(--gray-1)`
- `secondary`: Text color `var(--gray-11)`, Bg color `var(--gray-4)`
- `tertiary`: Text color `var(--gray-9)`, Bg color `var(--gray-3)`
- `brand`: Custom hex `#6166dc`

### 2. Typography
- Headings (`h1`, `h2`, `h3`): **Inter** (`font-heading`)
- Body Text: **Lekton** (`font-sans`)

### 3. Animations
- **Micro-interactions**: Uses Framer Motion for complex transitions (e.g., ThemeSwitcher dropdown).
- **Page Load Animations**: A custom `.animate-in` class is used heavily to stagger content entry. 
  - CSS rule: `animation: in .6s both; animation-delay: calc(var(--index) * 130ms);`
  - Usage: `<div className="animate-in" style={{ "--index": 1 }}>...</div>`

---

## 📁 Content Structure (Backup Provided)
All rich content is backed up in the `content/` and `pages/` folders.
- **Dynamic Content (`content/`)**: Contains `blog/` and `project/` directories filled with MDX files.
- **Static Content (`pages/`)**: Contains markdown extracts of the hardcoded text from the Home, About, Links, Projects, and Blog static routes.
- **Assets (`public/`)**: Contains all logos, avatars, CV PDFs, and generic assets.

---

## 🚀 Rebuild Prompts

*Feed these prompts sequentially to an AI coding assistant or a Senior Software Engineer to perfectly rebuild the application layer by layer.*

### Prompt 1: Project Initialization & Core Setup
> "Initialize a new Next.js 15+ App Router project with TypeScript and Tailwind CSS. Install the following core dependencies: `framer-motion`, `@headlessui/react`, `@heroicons/react`, `lucide-react`, `clsx`, `next-themes`, and `@tailwindcss/typography`. Configure `next/font/google` in `app/layout.tsx` to load 'Inter' (as `--font-inter`) and 'Lekton' (as `--font-lekton`). Setup the Tailwind config to map these fonts, and add the core standard custom colors (`primary`, `secondary`, `tertiary`) mapped to generic CSS variables that we will inject later. Ensure the `layout.tsx` centers a max-width container (`max-w-[700px]`) for the main `children` wrapper."

### Prompt 2: Design System & Globals
> "Update the `app/globals.css` file to establish the core design system. First, import Radix UI colors (`gray`, `jade`, `blue`) at the very top of the file before Tailwind directives. Then, create a `@layer base` block that sets up light and dark mode CSS variables mapping to those Radix colors for `--gray-1` through `--gray-12`. Finally, add a custom animation class `.animate-in` that uses a translateY keyframe and accepts a `--index` CSS variable to stagger the animation delay. Add Prose typography overrides for dark/light mode readability."

### Prompt 3: Global Components (Navigation, Footer, ThemeSwitcher)
> "Build the core global UI components. 
> 1. Create a `<Navigation />` component that links to Home, About, Projects, and Blog.
> 2. Create a `<ThemeSwitcher />` component using `@headlessui/react`'s `Listbox` and `framer-motion` for a smooth dropdown toggle between Light, Dark, and System themes (wrap the `Listbox.Options` in an `AnimatePresence` `motion.div`). 
> 3. Create a `<Footer />` component. Stick the Navigation and ThemeSwitcher at the top of the `app/layout.tsx`."

### Prompt 4: Static Routes Implementation
> "Read the markdown files provided in the `rebuild_backup/pages/` folder. Use that exact text to build the static pages for the application: `app/page.tsx` (Home), `app/about/page.tsx` (About), and `app/links/page.tsx`. For every section heading or paragraph, wrap it in a `div` or `p` tag with the `.animate-in` class and pass a staggered `--index` numerical style prop to create a cascading entrance animation when the page loads. For the About page, recreate the 'Workplaces' list using Next.js `<Image />` tags linking to the local logos in `public/work/`."

### Prompt 5: Contentlayer & Dynamic Routes
> "Install and configure `contentlayer` and `next-contentlayer`. Define object schemas for `Post` (Blog) and `Project`. The `Post` schema needs `title`, `publishedAt`, `summary`, and `slug`. The `Project` schema needs `title`, `description`, `url`, `image`, and `time`. 
> Then, use these generated collections to build two dynamic routes: `app/blog/[slug]/page.tsx` and `app/projects/[slug]/page.tsx`. Use Tailwind Prose (`prose prose-invert`) to style the MDX output. For the dynamic pages, ensure you render custom MDX components like a custom Link, Parallax image wrapper, and an Alert box."

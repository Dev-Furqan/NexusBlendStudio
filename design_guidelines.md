# Nexus Blend Design Guidelines

## Design Approach
**Selected Approach**: Reference-Based with Modern Tech Agency Aesthetics

Drawing inspiration from premium tech brands like Vercel, Linear, and Stripe, combined with immersive 3D experiences. The design emphasizes futuristic elegance through depth, motion, and sophisticated minimalism.

**Key Design Principles**:
- Depth through 3D layers and parallax effects
- Smooth, physics-based animations that feel premium
- Generous whitespace with strategic content density
- High contrast typography for readability
- Immersive scrolling experiences

---

## Typography System

**Font Families**:
- Primary: Inter (headings, UI elements, navigation)
- Secondary: Poppins (body text, descriptions)

**Hierarchy**:
- Hero Headlines: text-6xl to text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl to text-5xl, font-semibold
- Subsections: text-2xl to text-3xl, font-medium
- Body Text: text-base to text-lg, font-normal, leading-relaxed
- Captions/Meta: text-sm, font-light, tracking-wide uppercase for labels

---

## Layout System

**Spacing Primitives**: 
Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 for consistent rhythm
- Micro spacing: p-4, m-6, gap-4
- Component spacing: p-8, m-12, gap-8
- Section spacing: py-20 to py-32 desktop, py-12 to py-16 mobile

**Container Strategy**:
- Full-width hero sections: w-full with inner max-w-7xl mx-auto px-6
- Content sections: max-w-6xl mx-auto px-6
- Text-heavy content: max-w-4xl for optimal readability

**Grid Systems**:
- Portfolio/Projects: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8
- Services: grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-6
- Team Members: grid-cols-1 md:grid-cols-3 lg:grid-cols-4, gap-8
- Testimonials: Single column carousel with navigation

---

## Component Library

### Navigation
- Fixed top navigation with backdrop blur (backdrop-blur-md)
- Logo left-aligned, navigation links center, CTA button right
- Mobile: Hamburger menu with full-screen overlay slide-in
- Smooth scroll-based opacity changes

### Hero Sections
- Full viewport height (min-h-screen) with 3D canvas background
- Center-aligned content with z-index layering
- Headline + tagline + dual CTA buttons (primary + secondary ghost button)
- Subtle scroll indicator at bottom

### Cards (Projects, Services, Team)
- Elevated appearance with subtle borders
- Rounded corners: rounded-xl to rounded-2xl
- Hover state: translate-y lift effect with smooth transition
- Image aspect ratio: aspect-video for projects, aspect-square for team
- Padding: p-6 to p-8

### Buttons
- Primary CTA: Large (px-8 py-4), rounded-full, font-semibold
- Secondary: Ghost style with border, same sizing
- Icon buttons: Square (w-12 h-12), rounded-full for social links
- Blur background for buttons over images/3D scenes

### Forms (Contact Page)
- Floating labels with smooth transition
- Input fields: rounded-lg, p-4, with focus ring effect
- Full-width on mobile, 2-column grid on desktop
- Submit button: Full-width mobile, auto desktop, positioned bottom-right

### Modals (Project Details)
- Full-screen overlay with backdrop blur
- Center-positioned content card: max-w-4xl
- Close button: top-right corner, large touch target
- Smooth scale and fade-in animation

### Timeline (About Page)
- Vertical timeline with alternating left/right content
- Central line with milestone markers
- Card-based content blocks with icons
- Stagger animation on scroll reveal

---

## Page-Specific Layouts

### Home Page
1. Hero: Full viewport 3D background, centered headline, dual CTAs
2. Services Preview: 4-column grid with icons, title, brief description, "View All" link
3. Featured Projects: 3-column grid, 3-6 projects, "View Portfolio" CTA
4. Testimonials Carousel: Single prominent testimonial with client photo, navigation dots
5. Stats/Trust Section: 4-column metrics (projects completed, clients served, years experience, awards)
6. CTA Section: Full-width with 3D background, centered message and contact button
7. Footer: Multi-column (Services, Company, Contact, Social), newsletter signup

### Portfolio Page
- Filter pills at top (All, Web Apps, E-commerce, Mobile, etc.)
- 3-column masonry grid layout
- Each card: project image, title, category tags, hover overlay with "View Details" button
- Modal opens with full project details, multiple images, tech stack, live/code links

### Services Page
- Hero: Brief introduction with 3D element
- Service blocks: Alternating left/right layout with image/icon and detailed description
- Each service: Icon, title, description, feature list, pricing range indicator
- Final CTA section

### About Page
- Hero: Company introduction with team photo or 3D visual
- Mission/Vision: Side-by-side cards
- Timeline: Vertical with growth milestones
- Values: 3-column grid with icons
- Team preview: "Meet the Team" CTA linking to Team page

### Team Page
- Grid of team member cards (4 columns desktop, 1 mobile)
- Each card: Photo, name, role, brief bio, social links
- Hover: Smooth reveal of bio text overlay

### Contact Page
- 2-column split on desktop: Form left, info/map placeholder right
- 3D animated background similar to hero
- Contact info: Email, phone, address with icons
- Social media links
- Form validation states with clear error messages

### Admin Dashboard
- Sidebar navigation (Projects, Services, Team, Testimonials, Analytics)
- Main content area with data tables
- Action buttons: Add New, Edit, Delete with confirmation modals
- Analytics cards at top: Total counts, recent activity
- Simple, functional dark interface prioritizing usability

---

## Animations & Interactions

**3D Backgrounds**:
- Hero sections: Particle systems, geometric shapes, or abstract 3D models
- Subtle mouse parallax effect for depth
- Smooth rotation/float animations (2-4 second loops)

**Scroll Animations** (GSAP):
- Fade-in-up for text content (stagger for lists)
- Scale-in for cards and images
- Parallax scrolling for background elements
- Progress indicators for long pages

**Micro-interactions**:
- Button hover: Subtle scale (scale-105) and glow effect
- Card hover: Lift (translate-y-2) with shadow increase
- Link hover: Underline slide-in animation
- Form focus: Smooth border and label transitions

**Page Transitions** (Framer Motion):
- Fade and slight slide between pages
- Modal: Scale from 0.95 to 1 with fade
- Navigation: Smooth height expansion for mobile menu

---

## Images

### Hero Section Images:
- **Home Hero**: Abstract 3D render or particle effect visualization (no photo needed - Three.js canvas)
- **About Hero**: Professional team workspace photo or modern office environment
- **Contact Hero**: Abstract geometric 3D background (Three.js canvas)

### Content Images:
- **Portfolio Projects**: High-quality screenshots/mockups of websites and applications (6-9 project images minimum)
- **Team Members**: Professional headshots with consistent styling/background (4-8 team photos)
- **Services Icons**: Modern line-art style icons or 3D isometric illustrations for each service (6-8 unique icons)
- **Testimonial Avatars**: Client headshots or company logos (5-6 testimonials)
- **About Timeline**: Milestone illustrations or photos representing company growth

All images should have consistent treatment, sharp quality, and support the futuristic aesthetic.

---

## Accessibility
- Maintain WCAG AA contrast standards for all text
- Keyboard navigation for all interactive elements
- Focus indicators with visible outlines
- ARIA labels for icon buttons and 3D elements
- Form error messages announced to screen readers
- Skip navigation link for keyboard users
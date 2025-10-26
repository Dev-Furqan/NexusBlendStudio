# Nexus Blend - Web Development Agency Website

## Overview

Nexus Blend is a premium web development agency website built with a modern full-stack architecture. The application showcases the agency's portfolio, services, team members, and testimonials while providing an admin dashboard for content management. The design emphasizes futuristic elegance through depth, motion, and sophisticated 3D visual experiences inspired by premium tech brands like Vercel, Linear, and Stripe.

**Tagline**: "Blending Design and Code into Digital Perfection"

**Primary Purpose**: Serve as a professional agency website with dynamic content management capabilities and immersive user experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- **React with TypeScript**: Component-based UI built with React 18+ and full TypeScript support
- **Wouter**: Lightweight client-side routing library for navigation between pages
- **Vite**: Modern build tool providing fast development experience with HMR (Hot Module Replacement)

**UI Component System**
- **Shadcn/ui**: Accessible, customizable component library based on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Design System**: "New York" style variant with neutral base color scheme and CSS variables for theming
- **Typography**: Inter font for headings/UI, Poppins for body text
- **Color Scheme**: Dark theme with futuristic aesthetics using HSL color values for dynamic theming

**3D Graphics & Animations**
- **Three.js**: WebGL-based 3D rendering for immersive background animations
- **Animation Variants**: Supports particles, waves, and geometric 3D backgrounds
- **Performance**: Optimized with pixel ratio limiting and responsive canvas sizing

**State Management & Data Fetching**
- **TanStack Query (React Query)**: Server state management with caching, background updates, and optimistic UI
- **React Hook Form**: Form state management with @hookform/resolvers for validation
- **Zod**: Schema validation integrated with forms and API contracts

### Backend Architecture

**Server Framework**
- **Express.js**: Node.js web application framework handling HTTP requests
- **TypeScript**: Type-safe server-side code with ES modules
- **Development**: Custom Vite middleware integration for SSR and development workflow

**API Design**
- **RESTful Endpoints**: Prefix all routes with `/api` for clear separation
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Middleware**: Request logging, JSON parsing, and token verification

**Storage Layer**
- **In-Memory Storage (Development)**: `MemStorage` class implementing IStorage interface
- **PostgreSQL (Production-Ready)**: Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- **Schema-First Design**: Shared schema definitions between client and server using Drizzle and Zod

### Database Schema

**Tables**
- **users**: Admin authentication (id, username, password, createdAt)
- **projects**: Portfolio items (id, title, description, category, image, technologies[], liveUrl, featured, createdAt)
- **services**: Agency offerings (id, title, description, features[], icon, order, createdAt)
- **teamMembers**: Team profiles (id, name, role, bio, image, socialLinks, createdAt)
- **testimonials**: Client reviews (id, clientName, clientRole, clientCompany, content, rating, image, createdAt)
- **contacts**: Contact form submissions (id, name, email, subject, message, createdAt)

**Design Decisions**
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Array fields for technologies and features using PostgreSQL array types
- Timestamp tracking with automatic `defaultNow()` for audit trails
- Boolean featured flag for highlighting projects

### Authentication & Authorization

**Mechanism**: JWT (JSON Web Tokens)
- Tokens signed with `JWT_SECRET` environment variable
- 24-hour expiration for security
- Bearer token authentication in request headers
- Middleware-based route protection for admin endpoints

**Password Security**
- bcryptjs for hashing with salt rounds
- Passwords never stored in plain text
- Secure comparison during login validation

### External Dependencies

**UI Component Libraries**
- Radix UI primitives: Complete set of accessible, unstyled components (accordion, dialog, dropdown-menu, popover, select, tabs, toast, tooltip, etc.)
- class-variance-authority: Type-safe variant management for components
- clsx & tailwind-merge: Utility for conditional class name composition

**Form & Validation**
- react-hook-form: Performant form state management
- @hookform/resolvers: Integration layer for validation schemas
- Zod: Runtime type validation and schema generation
- drizzle-zod: Automatic Zod schema generation from Drizzle tables

**Data Visualization**
- recharts: Composable charting library (if analytics are added)

**Development Tools**
- @replit/vite-plugin-runtime-error-modal: Enhanced error display in development
- @replit/vite-plugin-cartographer: Development tooling for Replit environment
- @replit/vite-plugin-dev-banner: Development mode indicators

**Build & Deployment**
- esbuild: Fast bundler for server-side code
- tsx: TypeScript execution for development server
- PostCSS & Autoprefixer: CSS processing pipeline

**Database & ORM**
- Drizzle ORM: Type-safe SQL query builder
- Drizzle Kit: Migration management and schema pushing
- @neondatabase/serverless: Serverless PostgreSQL driver for Neon

**Utilities**
- nanoid: Unique ID generation
- embla-carousel-react: Carousel/slider functionality for testimonials
- vaul: Drawer component primitive
- react-day-picker: Calendar/date picker component
- input-otp: OTP input handling
- cmdk: Command palette component

**Type Definitions**
- @types/bcryptjs, @types/jsonwebtoken, @types/three: TypeScript type definitions for libraries

### Configuration Files

**Path Aliases**: Configured in tsconfig.json and vite.config.ts
- `@/*`: Points to client/src
- `@shared/*`: Points to shared schemas and types
- `@assets/*`: Points to attached_assets directory

**CSS Variables**: Custom properties defined in index.css for theming with light/dark mode support

**Responsive Design**: Mobile-first approach with Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px)
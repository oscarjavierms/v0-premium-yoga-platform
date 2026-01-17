# Wellness Academy Platform 🧘‍♀️

A full-stack online wellness platform designed for high-performance professionals, featuring yoga, meditation, breathwork, and mobility classes. Built with Next.js 16, Supabase, and React 19.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Business Logic](#business-logic)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Admin Dashboard](#admin-dashboard)
- [User Features](#user-features)
- [API Routes](#api-routes)
- [Security](#security)

## 🎯 Overview

The Wellness Academy Platform is a subscription-based online learning platform specifically designed for busy professionals who need functional wellness practices. The platform offers a curated library of classes across multiple wellness pillars, personalized recommendations, and progress tracking.

### Target Audience
- High-performance professionals
- Leaders and executives
- People with demanding schedules
- Individuals seeking functional wellness solutions

### Core Value Proposition
"Bienestar que sostiene vidas exigentes" (Wellness that supports demanding lives)

## ✨ Features

### Public Features (Unauthenticated)
- **Landing Page** with sections:
  - Hero with compelling value proposition
  - Problem statement addressing professional burnout
  - Four wellness pillars explanation
  - Class preview gallery
  - Instructor profiles
  - Pricing plans (Monthly/Annual)
  - Manifesto and brand story
  - Call-to-action sections
- **Class Library Browse** - View all published classes
- **Program Catalog** - Browse available wellness programs
- **Authentication** - Email/password registration and login

### User Features (Authenticated)
- **Personalized Dashboard**
  - Welcome message with time-based greeting
  - Activity statistics (completed classes, favorites, current streak, weekly goal)
  - Continue watching section with progress indicators
  - Personalized recommendations based on preferences
  - Quick access to favorite classes
  
- **Class Library**
  - Filter by pillar (yoga, meditation, breathwork, movement, nutrition, rest)
  - Filter by level (beginner, intermediate, advanced, all levels)
  - Filter by duration (10, 20, 30, 45, 60+ minutes)
  - Search functionality
  - Sort by date, popularity, or duration
  - Add classes to favorites
  
- **Class Viewing**
  - Vimeo video player integration
  - Progress tracking (watch position saved automatically)
  - Related classes suggestions
  - Instructor information
  - Equipment and focus areas listed
  - Mark as complete
  
- **Programs**
  - Multi-day structured programs
  - Sequential class progression
  - Program completion tracking
  - Day-by-day navigation
  
- **User Profile Management**
  - Edit personal information (name, email, phone, country, timezone)
  - Upload avatar image
  - View account statistics
  - Change password
  
- **Favorites System**
  - Save favorite classes for quick access
  - View all favorites in dedicated page
  - Remove from favorites
  
- **Progress Tracking**
  - Automatic watch position saving
  - Completion percentage tracking
  - Total watch time recording
  - Class completion history

### Admin Features (Admin Role Required)

#### Admin Dashboard (`/admin`)
- **Overview Statistics**
  - Total users count
  - Total classes count
  - Total programs count
  - Completed classes count
  - Recent user registrations
  - Recent user activity
  
#### User Management (`/admin/usuarios`)
- View all registered users
- See user details (name, email, registration date, role)
- Search users
- View user activity metrics
- Role management (user, admin, instructor)

#### Class Management (`/admin/clases`)
- Create new classes
- Edit existing classes
- Delete classes
- Manage class metadata:
  - Title, slug, description
  - Thumbnail and cover images
  - Vimeo video ID
  - Duration, level, intensity
  - Pillar category
  - Instructor assignment
  - Program assignment
  - Equipment required
  - Focus areas
  - Tags
  - Publication status (draft/published)
  - Free/premium flag
  
#### Program Management (`/admin/programas`)
- Create multi-day programs
- Edit program details
- Delete programs
- Manage program metadata:
  - Title, slug, descriptions
  - Thumbnail and cover images
  - Duration in days
  - Level and pillar
  - Instructor assignment
  - Featured status
  - Publication status
  - Tags
- Assign classes to programs in sequence

#### Instructor Management (`/admin/instructores`)
- Create instructor profiles
- Edit instructor information
- Manage instructor data:
  - Name, slug, bio
  - Specialty and credentials
  - Avatar image
  - Social media links (Instagram, website)
  - Active status
  
#### Settings (`/admin/ajustes`)
- Platform configuration
- General settings management

## 🛠 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19.2** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Vercel Analytics** for metrics

### Backend
- **Supabase** (PostgreSQL database + Auth)
- **Next.js API Routes** for server actions
- **Supabase Row Level Security (RLS)** for data protection

### Media
- **Vimeo** for video hosting
- **Next.js Image Optimization** for thumbnails

### Fonts
- **Inter** - Body text and UI elements
- **Cormorant Garamond** - Headings and serif typography

## 🗄 Database Schema

### Tables

#### `profiles`
User profile information linked to Supabase Auth.

```sql
- id (UUID, Primary Key) → references auth.users
- email (TEXT)
- first_name (TEXT)
- last_name (TEXT)
- avatar_url (TEXT)
- phone (TEXT)
- country (TEXT)
- timezone (TEXT)
- role (TEXT) → 'user' | 'admin' | 'instructor'
- onboarding_completed (BOOLEAN)
- onboarding_completed_at (TIMESTAMPTZ)
- wellness_goals (TEXT[])
- experience_level (TEXT) → 'beginner' | 'some_experience' | 'intermediate' | 'advanced'
- preferred_duration (INTEGER)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### `instructors`
Instructor profiles and credentials.

```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- slug (VARCHAR, Unique)
- bio (TEXT)
- specialty (VARCHAR)
- avatar_url (TEXT)
- credentials (TEXT[])
- social_instagram (VARCHAR)
- social_website (VARCHAR)
- is_active (BOOLEAN)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### `programs`
Multi-day wellness programs and series.

```sql
- id (UUID, Primary Key)
- title (VARCHAR)
- slug (VARCHAR, Unique)
- description (TEXT)
- short_description (VARCHAR)
- thumbnail_url (TEXT)
- cover_url (TEXT)
- duration_days (INT)
- total_classes (INT)
- level (VARCHAR) → CHECK constraint
- pillar (VARCHAR) → CHECK constraint
- instructor_id (UUID) → FK to instructors
- is_featured (BOOLEAN)
- is_published (BOOLEAN)
- tags (TEXT[])
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### `classes`
Individual class content.

```sql
- id (UUID, Primary Key)
- program_id (UUID) → FK to programs (nullable)
- instructor_id (UUID) → FK to instructors
- title (VARCHAR)
- slug (VARCHAR, Unique)
- description (TEXT)
- thumbnail_url (TEXT)
- vimeo_video_id (VARCHAR)
- duration_minutes (INT)
- level (VARCHAR) → CHECK constraint
- intensity (VARCHAR) → CHECK constraint
- pillar (VARCHAR) → CHECK constraint
- day_number (INT) → For sequential programs
- sequence (INT) → Order within program
- equipment (TEXT[]) → e.g., ['mat', 'blocks', 'strap']
- focus_areas (TEXT[]) → e.g., ['back', 'shoulders', 'hips']
- is_free (BOOLEAN)
- is_published (BOOLEAN)
- view_count (INT)
- tags (TEXT[])
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### `user_progress`
Tracks user viewing progress for each class.

```sql
- id (UUID, Primary Key)
- user_id (UUID) → FK to profiles
- class_id (UUID) → FK to classes
- program_id (UUID) → FK to programs (nullable)
- watch_position_seconds (INT) → Last stopped position
- watch_percentage (DECIMAL) → Percentage watched
- is_completed (BOOLEAN)
- completed_at (TIMESTAMPTZ)
- last_watched_at (TIMESTAMPTZ)
- total_watch_time_seconds (INT) → Cumulative watch time
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
- UNIQUE(user_id, class_id)
```

#### `user_favorites`
User's saved favorite classes.

```sql
- id (UUID, Primary Key)
- user_id (UUID) → FK to profiles
- class_id (UUID) → FK to classes
- created_at (TIMESTAMPTZ)
- UNIQUE(user_id, class_id)
```

### Indexes
Performance optimization indexes created on:
- `classes.program_id`
- `classes.instructor_id`
- `classes.pillar`
- `classes.level`
- `classes.is_published`
- `programs.pillar`
- `programs.instructor_id`
- `user_progress.user_id`
- `user_progress.class_id`
- `user_favorites.user_id`

## 👥 User Roles & Permissions

### User (Default Role)
- View published content (classes, programs, instructors)
- Track personal progress
- Manage favorites
- Update own profile
- View own statistics
- Access personalized dashboard

### Admin
- All user permissions
- Full CRUD operations on:
  - Classes
  - Programs
  - Instructors
  - User management
- View all user profiles
- Access admin dashboard
- View platform analytics
- Manage content publication status

### Instructor
- View published content
- View classes they teach
- Update own instructor profile
- (Can be extended with additional permissions)

### How to Make a User Admin

Run the SQL script with the user's email:

```sql
-- Update user role to admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

Or use the provided script `/scripts/007_make_user_admin.sql` and modify the email.

## 🧠 Business Logic

### Content Visibility Rules

1. **Published Content Only**
   - Only classes with `is_published = true` are visible to non-admin users
   - Only programs with `is_published = true` are visible to non-admin users
   - Only instructors with `is_active = true` are visible publicly

2. **Admin Override**
   - Admins can see all content regardless of publication status
   - Allows for content preview and management before publication

### Progress Tracking Logic

1. **Watch Position Auto-Save**
   - Every few seconds during video playback, the current position is saved
   - Uses `watch_position_seconds` to resume exactly where user left off
   - Updates `last_watched_at` timestamp on each save

2. **Completion Criteria**
   - Class marked as complete when user watches 90%+ of the video
   - Or when user manually marks as complete
   - Sets `is_completed = true` and `completed_at` timestamp

3. **Watch Percentage Calculation**
   ```typescript
   watch_percentage = (watch_position_seconds / (duration_minutes * 60)) * 100
   ```

4. **Statistics Calculation**
   - Completed Classes: Count of `user_progress` where `is_completed = true`
   - Current Streak: Consecutive days with at least one completed class
   - Total Watch Time: Sum of `total_watch_time_seconds` across all progress records

### Recommendation Algorithm

The platform recommends classes based on:

1. **User Preferences**
   - Wellness goals selected during onboarding
   - Experience level
   - Preferred class duration

2. **User Behavior**
   - Most watched pillar categories
   - Completed class patterns
   - Favorite instructors

3. **Fallback Logic**
   - If no preferences set: Show most popular classes
   - If no watch history: Show beginner-friendly featured content
   - Always exclude already completed classes (unless showing favorites)

### Program Progression

1. **Sequential Access**
   - Programs have classes ordered by `sequence` number
   - `day_number` indicates which day of the program
   - Users can access any class in the program (non-linear allowed)

2. **Program Completion**
   - Program marked complete when all classes in program are completed
   - Progress tracked separately in `user_progress.program_id`

### Favorites System

1. **Toggle Functionality**
   - Add to favorites: INSERT new record
   - Remove from favorites: DELETE record
   - Check favorite status: Query existence of record

2. **Duplicate Prevention**
   - UNIQUE constraint on `(user_id, class_id)` prevents duplicates
   - UI handles duplicate attempts gracefully

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (or existing PostgreSQL database)
- Vimeo account for video hosting

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Set Up Supabase**
   - Create a new Supabase project
   - Copy the environment variables from Supabase dashboard
   - Add them to your v0 project in the Vars section (sidebar)

3. **Run Database Migrations**
   Execute the SQL scripts in order from the `/scripts` folder:
   ```
   001_create_profiles.sql
   002_profile_trigger.sql
   003_create_content_tables.sql
   004_seed_content.sql (optional - sample data)
   006_admin_role.sql
   007_fix_profiles_rls.sql
   007_make_user_admin.sql (update with your email)
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Create Admin User**
   - Register an account through the app
   - Run the admin script with your email
   - Refresh the page and access `/admin`

## 🔐 Environment Variables

All environment variables are automatically configured in v0. If deploying elsewhere, you'll need:

### Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database (Supabase Postgres)
```env
POSTGRES_URL=your-postgres-connection-string
POSTGRES_PRISMA_URL=your-prisma-connection-string
```

### Development
```env
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## 📁 Project Structure

```
├── app/
│   ├── admin/               # Admin dashboard and management
│   │   ├── clases/         # Class management
│   │   ├── programas/      # Program management
│   │   ├── instructores/   # Instructor management
│   │   ├── usuarios/       # User management
│   │   ├── ajustes/        # Settings
│   │   └── components/     # Admin-specific components
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   ├── registro/
│   │   └── error/
│   ├── dashboard/          # User dashboard
│   ├── clases/             # Public class library
│   ├── clase/[slug]/       # Individual class view
│   ├── programas/          # Program catalog
│   ├── programa/[slug]/    # Individual program view
│   ├── favoritos/          # User favorites
│   ├── mi-cuenta/          # User profile
│   └── page.tsx            # Landing page
├── components/
│   ├── layout/             # Header, footer, navigation
│   ├── landing/            # Landing page sections
│   ├── content/            # Class cards, program cards
│   ├── auth/               # Auth forms
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── supabase/           # Supabase client configuration
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── proxy.ts        # Middleware client
│   └── utils.ts            # Utility functions
├── types/
│   └── content.ts          # TypeScript type definitions
├── scripts/                # SQL database scripts
└── public/                 # Static assets
```

## 🎛 Admin Dashboard

### Accessing Admin Panel
1. Navigate to `/admin`
2. Must be logged in with `role = 'admin'`
3. Redirects to login if not authenticated
4. Shows 403 error if not admin

### Admin Navigation
Located in left sidebar:
- Dashboard - Overview and statistics
- Usuarios - User management
- Clases - Class management
- Programas - Program management
- Instructores - Instructor management
- Ajustes - Platform settings

### Class Management Workflow
1. **Create Instructor** (if new)
   - Go to Instructores → Nueva instructor
   - Fill in name, bio, specialty, credentials
   - Upload avatar
   - Add social links

2. **Create Program** (optional)
   - Go to Programas → Nuevo programa
   - Set title, description, duration
   - Assign instructor
   - Set level and pillar
   - Upload thumbnail

3. **Create Class**
   - Go to Clases → Nueva clase
   - Fill in class details
   - Upload to Vimeo and copy video ID
   - Assign instructor
   - Optionally assign to program
   - Set sequence and day number if part of program
   - Add equipment and focus areas
   - Set tags for discoverability
   - Toggle `is_published` to make live

4. **Publish Content**
   - Toggle publication status in admin tables
   - Published content immediately visible to users
   - Draft content only visible to admins

### User Management
- View all registered users
- See user statistics (completed classes, last active)
- Search and filter users
- Change user roles
- Monitor user engagement

## 👤 User Features

### Registration Flow
1. User visits `/auth/registro`
2. Fills email and password
3. Receives verification email from Supabase
4. Clicks verification link
5. Profile automatically created via database trigger
6. Redirected to dashboard

### Login Flow
1. User visits `/auth/login`
2. Enters credentials
3. Supabase validates and creates session
4. Sets HTTP-only cookie
5. Redirected to `/dashboard`

### Profile Management
- Edit personal information
- Upload custom avatar
- Set wellness goals
- Set experience level
- Set preferred class duration
- Update timezone and country
- Change password through Supabase Auth

### Class Discovery
1. **Browse All Classes** (`/clases`)
   - Grid view of all published classes
   - Filter by pillar, level, duration
   - Search by title or instructor
   - Sort by various criteria

2. **Browse Programs** (`/programas`)
   - Curated multi-day programs
   - Filter by level and pillar
   - See total classes and duration

3. **Dashboard Recommendations**
   - Personalized based on preferences
   - Continue watching section
   - Recently added classes

### Watching Classes
1. Click on class card → navigates to `/clase/[slug]`
2. Video player loads with Vimeo iframe
3. Progress auto-saves every 5 seconds
4. Resume functionality remembers last position
5. Can add to favorites with heart icon
6. Mark complete button available
7. Related classes shown below

### Progress Dashboard
- Statistics cards show:
  - Total completed classes
  - Favorite count
  - Current streak (consecutive days)
  - Weekly goal progress
- Visual progress bars
- Activity timeline
- Achievement tracking

## 🔌 API Routes

### Auth Routes
- `POST /auth/login` - User login
- `POST /auth/registro` - User registration
- `POST /auth/logout` - User logout

### Progress Routes (Server Actions)
- `updateProgress(classId, position, percentage)` - Save watch position
- `markComplete(classId)` - Mark class as complete
- `addFavorite(classId)` - Add class to favorites
- `removeFavorite(classId)` - Remove from favorites

### Admin Routes (Server Actions)
- Class CRUD operations
- Program CRUD operations
- Instructor CRUD operations
- User management operations

All routes protected by Supabase RLS policies.

## 🔒 Security

### Row Level Security (RLS)

All tables have RLS enabled with specific policies:

#### Profiles
- Users can SELECT/UPDATE/DELETE own profile
- Admins can SELECT all profiles

#### Classes, Programs, Instructors
- Public can SELECT published content only
- Admins have full access

#### User Progress
- Users can SELECT/INSERT/UPDATE own progress only
- Fully isolated between users

#### User Favorites
- Users can SELECT/INSERT/DELETE own favorites only
- Fully isolated between users

### Authentication
- Supabase Auth handles user authentication
- Passwords hashed with bcrypt
- Session managed with HTTP-only cookies
- JWT tokens for API requests
- Email verification required on registration

### Authorization
- Middleware checks user role for admin routes
- Server-side role validation on all admin actions
- Client-side role checks for UI rendering only
- Never trust client-side role information for security decisions

### Best Practices Implemented
- Environment variables never exposed to client
- All database queries through Supabase client
- Parameterized queries prevent SQL injection
- RLS policies enforce data isolation
- Admin actions double-checked server-side
- File uploads sanitized and validated
- CORS properly configured
- Rate limiting on auth endpoints

## 📊 Analytics & Monitoring

### Built-in Analytics
- Vercel Analytics tracks page views
- User progress automatically recorded
- Class view counts incremented
- Engagement metrics in admin dashboard

### Metrics Tracked
- Total users
- Active users (last 7/30 days)
- Completed classes count
- Average completion rate
- Popular classes (by views)
- Popular instructors
- User retention
- Daily active users

## 🎨 Design System

### Colors
- **Black** (#000000) - Primary brand color
- **White** (#FFFFFF) - Background and contrast
- **Grays** - Various shades for borders and muted text

### Typography
- **Headings**: Cormorant Garamond (Serif)
- **Body**: Inter (Sans-serif)
- **Code**: Geist Mono (Monospace)

### Design Principles
- Minimal and sophisticated
- High contrast for accessibility
- Generous whitespace
- Clean, modern aesthetic
- Mobile-first responsive design

## 🚢 Deployment

### Deploying to Vercel
1. Click "Publish" button in v0
2. Connect Vercel account
3. Deploy automatically
4. Environment variables transferred automatically

### Manual Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Post-Deployment
1. Run database migrations on production Supabase
2. Create first admin user
3. Upload initial content
4. Test authentication flow
5. Verify RLS policies working correctly

## 🤝 Contributing

This is a v0-generated project. To modify:
1. Make changes in v0 chat interface
2. Test in preview
3. Deploy updates via Publish button

## 📝 License

Proprietary - All rights reserved

## 🆘 Support

For issues or questions:
- Check Supabase dashboard for database errors
- Verify environment variables are set correctly
- Check browser console for client-side errors
- Review Vercel logs for server-side errors
- Ensure SQL scripts ran successfully

## 🎯 Roadmap

Future enhancements to consider:
- Payment integration (Stripe)
- Live class scheduling
- Community features (comments, ratings)
- Mobile app (React Native)
- Push notifications
- Email marketing integration
- Webhooks for third-party integrations
- Advanced analytics dashboard
- Instructor portal
- Challenge and achievements system
- Social sharing features
- Offline video downloads

---

**Built with ❤️ using v0 by Vercel**

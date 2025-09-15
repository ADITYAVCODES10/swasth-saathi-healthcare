# Swasth Saathi - Government Health Portal

## Overview

Swasth Saathi is a comprehensive government health portal designed to connect migrant workers, healthcare providers, and administrators for seamless medical care and health management across India. Built with React + Tailwind CSS frontend, ready for backend integration with Supabase.

## Features

### ✅ Completed Features

#### 🎨 **Frontend UI (React + Tailwind)**
- **Modern, Responsive Design** - Mobile-first approach with beautiful gradients and animations
- **Dark Mode Support** - System-wide dark/light theme toggle with localStorage persistence
- **Multilingual Support** - Complete translations for English, Hindi (हिंदी), and Malayalam (മലയാളം)
- **Professional Branding** - Government-style design with proper color schemes and accessibility

#### 🏠 **Landing Page**
- **Interactive Hero Section** with image slider showcasing healthcare themes
- **Auto-rotating Image Carousel** with 4 professional healthcare images
- **Service Cards** for Migrant Workers, Doctors, Admin, and Emergency Services
- **Feature Highlights** (24/7 support, multilingual, secure, comprehensive)
- **User Testimonials** with authentic names and stories
- **Call-to-Action Sections** with clear navigation paths

#### 👥 **User Portals**

**Migrant Worker Portal** (`/migrant`)
- Complete registration form with file upload for medical documents
- Dashboard with health cards, QR codes, medical history
- Digital health card generation with download/print functionality
- Recent activity tracking and appointment management

**Doctor Dashboard** (`/doctor`)
- Professional registration with certification upload
- Patient search and management system
- Today's statistics and analytics
- Quick actions for prescriptions and reports
- Patient history viewer

**Admin Panel** (`/admin`)
- Secure login system
- System overview with key metrics
- **Interactive Analytics Dashboard** with Chart.js:
  - Line chart: Daily user registrations (30 days)
  - Bar chart: Appointments by medical specialty
  - Pie chart: Disease distribution analysis
- User management table with approval/rejection actions
- Application review system
- Export functionality for reports

#### 🔐 **Authentication System**
- **Login Page** with demo credentials for all user types
- **Registration System** with role-based forms
- Form validation and error handling
- Password visibility toggles and security features

#### 💬 **AI Chatbot Widget**
- **Floating Chat Interface** with typing animations
- **Multilingual Support** - Responds in user's selected language
- **Quick FAQ Buttons** for common questions
- **Session Management** with localStorage
- **Smart Response System** with predefined answers
- Ready for backend API integration

#### 📱 **Additional Pages**
- **About Page** - Mission, vision, team, and technology stack
- **Contact Page** - Contact forms, emergency numbers, office locations
- **FAQ Section** with common questions and answers

#### 🎨 **UI Components & Design**
- **Professional Color Scheme** - Blue primary, green secondary, avoiding prohibited combinations
- **Shadcn/ui Components** - Button, Card, Input, Select, Toast, etc.
- **Lucide React Icons** - No emoji usage, professional iconography
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Loading Animations** - Beautiful brand-consistent loading screens

#### 🌐 **Internationalization (i18n)**
- **Complete Translation Files** for all UI text
- **Language Switcher** in navigation with native language names
- **localStorage Persistence** for language preferences
- **RTL Support Ready** (for future Arabic/Urdu languages)

#### 📊 **Analytics & Charts**
- **Chart.js Integration** with responsive charts
- **Mock Data Generators** for development and demonstration
- **Export Functionality** for admin reports
- **Interactive Dashboards** with real-time-like updates

### 🔧 **Technical Implementation**

#### **Frontend Architecture**
```
/src
  /components     - Reusable UI components (Navbar, Footer, Cards, etc.)
  /pages         - Route-based pages (Home, Migrant, Doctor, Admin, etc.)
  /routes        - React Router configuration
  /i18n          - Translation files (en.json, hi.json, ml.json)
  /utils         - Utility functions (API, helpers, chatbot)
  /hooks         - Custom React hooks (useToast)
  /assets        - Images and static assets
```

#### **Key Dependencies**
- **React 19** with modern hooks and features
- **Tailwind CSS** for responsive styling
- **React Router DOM** for navigation
- **Chart.js + React-ChartJS-2** for analytics
- **Lucide React** for icons
- **Shadcn/ui** components for consistent design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone and Setup**
   ```bash
   cd /app/frontend
   yarn install
   ```

2. **Environment Variables**
   ```bash
   # Frontend (.env)
   REACT_APP_BACKEND_URL=your_backend_url
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. **Run Development Server**
   ```bash
   yarn start
   ```

4. **Build for Production**
   ```bash
   yarn build
   ```

## Demo Credentials
- **Migrant Worker**: `migrant@demo.com` / `demo123`
- **Doctor**: `doctor@demo.com` / `demo123`  
- **Admin**: `admin@demo.com` / `demo123`

## Technology Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Chart.js** - Data visualization
- **Shadcn/ui** - Component library

**Built with ❤️ for migrant workers across India**

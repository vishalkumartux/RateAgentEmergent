# AgentRate Platform - Feature Overview

## Platform Overview
AgentRate is a real estate marketplace connecting buyers with verified buyer agents and showcasing successful property deals. Built with React (Vite), FastAPI, and MongoDB, supporting multi-tenancy (Public, Agent, Admin) with an amber/yellow theme and dark/light mode.

---

## User Roles

### 1. Public Users (Buyers)
- Browse buyer agents with filters and comparisons
- Explore verified property deals
- Read and submit reviews
- Save favorite agents and deals
- Create account for personalized experience

### 2. Agency Staff (Agents)
- Manage public agent profile
- Add and manage deal portfolio
- View performance metrics
- Access agent dashboard
- Preview public-facing content

### 3. Agency Admin
- All agent capabilities
- Organization settings management
- Staff management (invite/manage team)
- Agency-level metrics and reporting
- Onboarding wizard access

---

## Public Features (Buyer-Facing)

### 1. Homepage
- **Route:** `/`
- Smart search with autocomplete
- Quick access cards (Find Deals, Find Agents, Compare)
- Popular searches (Houses Sydney, Investment Melbourne, etc.)
- Buy Box concept (budget, location, goals)

### 2. Agent Listing & Discovery
- **Route:** `/agents`
- Advanced filters (location, rating, specialization, fee range)
- Sorting options (rating, experience, deals closed)
- Comparison tray (compare up to 4 agents)
- Agent cards with key metrics (rating, deals, areas)

### 3. Agent Profile (Public View)
- **Route:** `/agent/:id`
- **Sections:**
  - Header: Photo, name, rating, coverage areas, quick stats
  - About: Bio, experience, specializations, company
  - Services & Pricing: Service types, fee structure
  - Coverage & Focus: Areas, property types, price bands
  - Performance Metrics: Deals closed, median days, satisfaction
  - Portfolio: Recent deals with verified badges
  - Reviews: Top tags, review cards with ratings
  - Compliance: License, insurance, memberships
  - Contact CTA: Prominent action buttons
- **Features:**
  - Empty states for 0 deals/reviews
  - Pagination for deals (6+6) and reviews (3+5)
  - Expandable coverage areas (8+ areas)
  - Mobile responsive layout

### 4. Deals Listing
- **Route:** `/deals`
- Comprehensive filters (location, type, price, strategy, verification)
- Sorting options (recent, price, discount, days)
- Pagination
- Deal cards showing: address, price, discount, specs, agent
- Advanced search with autocomplete

### 5. Deal Detail (Public View)
- **Route:** `/deal/:id`
- **Sections:**
  - Hero: Photos, key specs, price achievement
  - Value Story: Agent's description of how they secured it
  - Process & Outcomes: Method, timeline, strategy
  - Financials: Price breakdown, savings, yield
  - Property Details: Specs, features, location
  - Agent Attribution: Link to agent profile
  - Similar Deals: By same agent or in same area
- **Features:**
  - Verification badges (L0/L1)
  - Save deal functionality
  - Share functionality
  - Masked addresses for privacy (XX instead of number)

### 6. Reviews System
- **Route:** `/reviews`
- Enhanced filters (rating, verified, service type, transaction type, suburb)
- Sorting (most helpful, recent, highest rated)
- Review cards with: title, rating, tags, service details, budget band
- Submit review page with comprehensive form
- Helpful voting system
- Rating distribution statistics

### 7. Compare Agents
- **Route:** `/compare`
- Side-by-side comparison of up to 4 agents
- Compare: experience, rating, deals, fees, coverage, services
- Add/remove agents dynamically
- Share comparison link

---

## Agent Features (Staff Area)

### 1. Agent Dashboard
- **Route:** `/staff/dashboard`
- **Metrics Tiles:**
  - My Published Deals (count)
  - Median Days-to-Secure
  - Average Rating
  - Profile Views (last 30 days)
- **Recent Deals Section:** 4 most recent with view links
- **Latest Reviews Section:** 3 most recent reviews
- **Quick Actions Sidebar:**
  - Add New Deal
  - View My Profile
  - Manage Deals
- **CTA:** Prominent "Add New Deal" button

### 2. My Profile (Edit Mode)
- **Route:** `/staff/my-profile`
- **Editable Fields:**
  - Profile photo upload
  - Full name, professional title
  - Bio (500 char limit)
  - Years of experience
  - Languages (add/remove chips)
  - Coverage areas (add/remove chips)
  - Services offered (toggle switches)
  - Indicative fee (optional)
  - Public visibility toggle
- **Read-Only Metrics Sidebar:**
  - Verified Deals
  - Median Days-to-Secure
  - Average Rating (with review count)
  - Period (12 months)
- **Actions:**
  - Save Changes
  - Preview Public Profile (stays in staff area)
- **Preview Mode:** `/staff/my-profile?preview=true`
  - Renders public AgentProfilePage
  - Blue preview banner
  - Exit preview returns to edit mode

### 3. My Deals (Portfolio Management)
- **Route:** `/staff/deals`
- **Header:** "Add New Deal" CTA button
- **Stats Cards:**
  - Published Deals
  - Verified Deals
  - Total Portfolio Value
  - Avg Days-to-Secure
- **Search & Filters:**
  - Search by suburb/address
  - Popular search chips
  - Filter by: Status (Published/Draft), Type, Verification
- **Tabs:** All, Published, Draft, Verified
- **Deal Cards:**
  - Property photo
  - Status and verification badges
  - Address, suburb, specs
  - Price, discount percentage
  - Days-to-secure, purchase date
  - Method, strategy tags
  - Actions: View, Edit, Publish (if draft)
- **Empty States:** Helpful messages with "Add First Deal" CTA

### 4. Deal Details (Staff View)
- **Route:** `/staff/deals/:id`
- **Header Actions:**
  - Back to Deals
  - Edit Deal
  - Preview Public
- **3 Tabs:**
  1. **Details:** Property specs, description, features
  2. **Strategy:** Method, strategy tags, price achievement, rental info
  3. **Metrics:** Days-to-secure, purchase date, verification status
- **Sidebar:**
  - Key metrics (price, savings)
  - Quick Actions: Edit, Preview, Publish/Unpublish, Request Verification
- **Preview Mode:** `/staff/deals/:id?preview=true`
  - Renders public DealDetailPage
  - Blue preview banner with "Exit Preview"
  - Exit returns to deal details (not list)

### 5. Add/Edit Deal Workflow
- **Routes:** `/staff/deals/add`, `/staff/deals/:id/edit`
- **6-Step Wizard:**
  
  **Step 1: Basics**
  - Purchase date (month/year)
  - Location (suburb, state, postcode)
  - Property type (House, Townhouse, Unit, Apartment, Land)
  - Specs (bedrooms, bathrooms, parking)
  - Street address with privacy mask option
  
  **Step 2: Process & Outcomes**
  - Purchase method (Auction, Private Treaty, Off-Market)
  - Days-to-secure
  - Value story (1-2 sentence description, min 20 chars)
  - Strategy tags (Off-market, Pre-auction, First-home buyer, etc.)
  
  **Step 3: Financials**
  - Asking price (optional)
  - Purchase price (or mark as undisclosed)
  - Rental info (appraisal/achieved per week)
  - Client budget band (optional)
  - Auto-calculated: Discount %, Gross Yield %
  
  **Step 4: Media**
  - Photo upload (1-8 images, EXIF stripped)
  - Floorplan upload (optional)
  - Media publishing rights consent (required if photos added)
  
  **Step 5: Verification**
  - **L0 (Self-Declared):** No docs required
  - **L1 (Evidence Submitted):** Upload redacted contract/settlement
  - Verification criteria explained
  
  **Step 6: Review & Publish**
  - Deal summary display
  - Preview public view link
  - Choose: Save as Draft or Publish Now
  - Validation warnings (missing value story, no photos)
  
- **Features:**
  - Progress indicator with clickable steps
  - Save Draft anytime (bottom right)
  - Back/Next navigation
  - Form validation per step
  - Pre-filled data for edit mode

---

## Admin Features (Agency Management)

### 1. Admin Dashboard
- **Route:** `/admin/dashboard`
- **Tabs:**
  - **Overview:** Agency metrics tiles
  - **Staff Management:** View all team members with roles and stats
  - **Invite Staff:** Send email invitations with role selection
- **Metrics Tiles:**
  - Published Deals (agency-wide)
  - Verified Deals
  - Average Rating
  - Median Days-to-Secure
  - Profile Views
  - Leads (this month)
- **Staff Management:**
  - Staff list with: photo, name, role, deals, rating
  - Pending invites with resend/cancel actions
  - Role selection (Admin, Senior Agent, Agent, Support)
- **Nudges (Conditional):**
  - "Add your first 3 deals" (if < 3 deals)
  - "Complete team profiles" (if incomplete profiles)
  - "Get 3+ deals verified" (if verified < 3)
  - Each nudge has a CTA button

### 2. Organization Settings
- **Route:** `/admin/settings`
- **Sidebar Navigation:** 5 sections
  
  **1. Business Information**
  - Agency logo upload
  - Name, contact email, phone, website
  - Business address
  - Description (500 char limit)
  
  **2. Service Coverage**
  - Service regions (add/remove badges)
  - Property types (toggles)
  - Price range focus (min/max)
  
  **3. Privacy & Compliance**
  - Show full address toggle
  - Show contact info toggle
  - Allow direct contact toggle
  - Require email verification toggle
  - GDPR compliant toggle (highlighted)
  - Data retention period (days)
  - Compliance notice
  
  **4. Lead Routing**
  - Auto-assign leads toggle
  - Round-robin distribution toggle
  - Email notifications toggle
  - SMS notifications toggle
  - Response time target (hours)
  - Performance tips info box
  
  **5. Subscription & Billing**
  - Current plan display (read-only)
  - Status badge (Active/Inactive)
  - Billing cycle and next date
  - Plan features list
  - Action buttons: View Invoices, Change Plan, Cancel
  - Support contact link

- **Features:**
  - Sticky Save button (except subscription section)
  - Success message with auto-dismiss
  - Form validation
  - Dark mode support

### 3. Onboarding Wizard
- **Route:** `/admin/onboarding`
- **Steps:**
  1. Welcome & agency name
  2. Coverage areas setup
  3. Team invitation (optional)
  4. Ready to go
- **Features:**
  - Progress indicator
  - Skip option
  - Only shown once for new admins

---

## Navigation Structure

### Public Navigation (Header)
- Find Agents
- Deals
- Compare
- Reviews
- About
- Sign In / Sign Up / List Your Agency

### Agent Navigation (Dropdown Menu)
- Agent Dashboard
- My Profile
- My Deals
- Sign Out

### Admin Navigation (Dropdown Menu)
- Admin Dashboard
- Organization Settings
- My Profile
- My Deals
- Sign Out

### Mobile Navigation
- Hamburger menu
- All navigation in drawer
- Responsive design for all pages

---

## Design System

### Color Scheme
- **Primary:** Amber/Yellow (#F59E0B, #EAB308)
- **Success:** Green (#10B981)
- **Info:** Blue (#3B82F6)
- **Danger:** Red (#EF4444)
- **Neutral:** Gray scales

### Theme Support
- Light mode (default)
- Dark mode
- Persistent user preference
- Smooth transitions

### Component Library
- shadcn/ui components
- Tailwind CSS utilities
- Lucide icons
- Responsive layouts
- Consistent spacing and typography

---

## Data Models (Mock Data)

### Agent Data Structure
```javascript
{
  id, name, company, bio, rating, reviewCount, 
  dealsCompleted, experienceYears, specializations,
  coverageAreas, propertyTypes, priceRange,
  services, fees, verified, license,
  profilePhoto, contactInfo, socialLinks
}
```

### Deal Data Structure
```javascript
{
  id, agentId, address, suburb, state, postcode,
  propertyType, dealType, status, verified,
  bedrooms, bathrooms, carSpaces, landSize,
  purchasePrice, askingPrice, discountPercent,
  purchaseDate, daysToSecure, method,
  strategyTags, photos, description, features,
  rentalAppraisal, rentalAchieved, grossYield
}
```

### Review Data Structure
```javascript
{
  id, agentId, title, rating, comment,
  reviewerInitials, date, verified,
  serviceType, transactionType, budgetBand,
  suburb, tags, helpfulCount, wouldRecommend
}
```

---

## Key Features & Differentiators

### 1. Verification System
- **L0 (Self-Declared):** Standard trust level
- **L1 (Evidence Submitted):** Enhanced with "Verified" badge
- Transparent verification criteria
- Redacted documents for privacy

### 2. Privacy-First Approach
- Masked addresses (XX instead of street number)
- EXIF data stripped from photos
- Reviewer privacy (initials only)
- Consent checkboxes for media
- GDPR compliance toggles

### 3. Conversion Optimization
- Clear CTAs throughout
- Preview before publish
- Save functionality (deals, agents)
- Comparison tools
- Social proof (reviews, ratings)
- Success metrics display

### 4. Agent Empowerment
- Easy deal addition workflow
- Profile customization
- Performance tracking
- Public visibility controls
- Preview capabilities

### 5. Admin Controls
- Team management
- Organization branding
- Lead routing
- Compliance settings
- Multi-role support

---

## Technical Architecture

### Frontend
- React 18 with Vite
- React Router for navigation
- Context API for state (Auth, Theme)
- Tailwind CSS for styling
- shadcn/ui component library
- Axios for API calls
- Mock data for decoupled development

### Backend (Planned)
- .NET Core API
- MongoDB database
- JWT authentication
- Multi-tenant support
- Role-based access control
- File upload handling

### Deployment
- Frontend: Port 3000
- Backend: Port 8001
- Environment variables for configuration
- Supervisor for process management

---

## Current Status

### ✅ Completed Features
- All public-facing pages (agents, deals, reviews, compare)
- Agent dashboard and profile management
- Deal portfolio management (add/edit/view workflow)
- Admin dashboard with staff management
- Organization settings
- Onboarding wizard
- Preview modes for deals and profiles
- Navigation structure for all user types
- Dark mode support
- Responsive design

### 🔄 In Progress
- Backend integration (replacing mock data)
- Enhanced Submit Review Page
- Advanced filtering algorithms
- Search optimization

### 📋 Planned Features
- Real-time notifications
- Advanced analytics
- Export capabilities
- Bulk operations
- API integrations (CRM, property portals)
- Mobile apps

---

## Navigation Fixes (Latest)

### October 24, 2024 Updates
1. **Deal Preview Exit:** Changed to return to deal details page (`/staff/deals/:id`) instead of deals list
2. **Profile Preview:** Implemented preview mode within staff area (`/staff/my-profile?preview=true`) instead of redirecting to public page

Both changes ensure users remain in the agent/admin context during preview workflows.

---

Last Updated: October 24, 2024
Version: 2.0

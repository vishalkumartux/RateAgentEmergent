# Agent/Admin Navigation Guide - Complete Flow

## 🎯 Navigation Structure Overview

### For Agency Admin Users
```
Login → Admin Dashboard
    ├─→ My Deals (manage portfolio)
    ├─→ My Profile (public agent profile)
    ├─→ Organization Settings (agency settings)
    └─→ Staff Management (invite/manage agents)
```

### For Agency Staff (Agents)
```
Login → Agent Dashboard
    ├─→ My Deals (manage portfolio)
    └─→ My Profile (public agent profile)
```

---

## 📱 Header Navigation (Always Accessible)

### Admin Users Dropdown Menu
```
[John Smith ▼]
├─ 📊 Admin Dashboard        → /admin/dashboard
├─ ⚙️  Organization Settings  → /admin/settings
├─ ─────────────────────
├─ 👤 My Profile             → /staff/my-profile
├─ 📈 My Deals               → /staff/deals
├─ ─────────────────────
└─ 🚪 Sign Out
```

### Agent Users Dropdown Menu
```
[Sarah Johnson ▼]
├─ 📊 Agent Dashboard        → /staff/dashboard
├─ ─────────────────────
├─ 👤 My Profile             → /staff/my-profile
├─ 📈 My Deals               → /staff/deals
├─ ─────────────────────
└─ 🚪 Sign Out
```

---

## 🏠 Admin Dashboard Flow

**Route:** `/admin/dashboard`

### From Admin Dashboard:
1. **Org Settings Button (Header)** → `/admin/settings`
2. **Staff Management Tab** → View/manage team
3. **Invite Staff Tab** → Send invitations
4. **Nudges** → Quick actions (Add Deal, Complete Profile, etc.)

**Quick Stats Displayed:**
- Published Deals
- Verified Deals
- Total Portfolio Value
- Avg Days-to-Secure

---

## 🏢 Organization Settings Flow

**Route:** `/admin/settings`

### 5 Sections (Sidebar Navigation):
1. **Business Info** - Logo, name, contact, description
2. **Service Coverage** - Regions, property types, price range
3. **Privacy & Compliance** - Visibility, GDPR, retention
4. **Lead Routing** - Auto-assign, notifications
5. **Subscription** - Plan details, billing (read-only)

**Navigation:**
- **Save Changes** button (bottom right)
- **Back to Admin Dashboard** (browser back or dropdown menu)

---

## 📊 Agent Dashboard Flow

**Route:** `/staff/dashboard`

### From Agent Dashboard:
1. **Add New Deal Button (Header)** → `/staff/deals/add`
2. **My Published Deals Section:**
   - Shows 4 recent deals
   - **View All** link → `/staff/deals`
   - Each deal card has **View** button → `/staff/deals/:id`
3. **Latest Reviews Section:** Shows 3 recent reviews
4. **Quick Actions Sidebar:**
   - **Add New Deal** → `/staff/deals/add`
   - **View My Profile** → `/staff/my-profile`
   - **Manage Deals** → `/staff/deals`

**Stats Displayed:**
- My Published Deals (8)
- Median Days-to-Secure (38)
- Average Rating (4.7)
- Profile Views (342)

---

## 👤 My Profile Flow

**Route:** `/staff/my-profile` (same for `/admin/profile`)

### From My Profile:
1. **Save Changes Button (Header)** → Saves profile updates
2. **Preview Public Profile Button (Header)** → `/staff/my-profile?preview=true` (stays in staff area)
3. **Back to Deals** (via dropdown menu)

### Preview Mode:
- **Route:** `/staff/my-profile?preview=true`
- **Blue banner at top:** "Preview Mode - Public View"
- **Renders exact public AgentProfilePage** within staff context
- **Exit Preview button** → Returns to `/staff/my-profile` (edit mode)
- Shows exactly how buyers will see the agent's profile

### Editable Sections:
- Basic Information (photo, name, title, bio, experience)
- Languages (add/remove chips)
- Coverage Areas (add/remove chips)
- Services Offered (toggle switches)
- Indicative Fee (optional)
- Public Visibility Toggle

### Read-Only Metrics (Sidebar):
- Verified Deals: 24
- Median Days-to-Secure: 38
- Average Rating: 4.7/5.0 (28 reviews)

---

## 📈 My Deals Flow

**Route:** `/staff/deals`

### Page Features:
- **Search bar** - Search by suburb/address
- **Popular searches** - Quick filter chips
- **3 Filter dropdowns** - Status, Type, Verification
- **4 Tabs** - All, Published, Draft, Verified
- **Add New Deal Button (Header)** → `/staff/deals/add`

### Each Deal Card Actions:
```
┌─────────────────────────────┐
│  [Property Image]           │
│  42 Harbour View Drive      │
│  Bondi Beach, NSW           │
│  $3.25M • 42 days           │
│                             │
│  [View] [Edit] [Publish]    │
└─────────────────────────────┘
```

**Button Actions:**
- **View** → `/staff/deals/:id` (Deal Details page)
- **Edit** → `/staff/deals/:id/edit` (Edit workflow)
- **Publish** → Publishes draft deal (inline action)

---

## 📄 Deal Details Flow

**Route:** `/staff/deals/:id`

### Page Layout:
**Header Actions:**
- **Edit Deal** button → `/staff/deals/:id/edit`
- **Preview Public** button → `/staff/deals/:id?preview=true`
- **Back to Deals** link → `/staff/deals`

**3 Tabs:**
1. **Details** - Property specs, description, features
2. **Strategy** - Method, tags, price achievement, rental
3. **Metrics** - Days-to-secure, date, verification status

**Sidebar - Quick Actions:**
- **Edit Deal** → `/staff/deals/:id/edit`
- **Preview Public View** → Preview mode
- **Publish Deal** (if draft)
- **Unpublish** (if published)
- **Request Verification** (if not verified)

### From Deal Details:
1. **Edit Deal** → Opens 6-step workflow with pre-filled data
2. **Preview Public** → Shows exact buyer view with blue banner
3. **Back to Deals** → Returns to deal list

---

## 👁️ Preview Mode Flow

### Deal Preview Mode
**Route:** `/staff/deals/:id?preview=true`

#### Preview Mode Features:
- **Blue banner at top:** "Preview Mode - Public View"
- **Renders exact public DealDetailPage** component
- **Exit Preview button** → Returns to `/staff/deals/:id` (Deal Details page)
- **No edit capabilities** (shows how buyers see it)

**What Agents See:**
- Exact public layout
- Agent attribution card
- Masked address (XX instead of number)
- All public features (Save Deal, Share, etc.)
- Similar deals by same agent
- All buyer-facing elements

### Profile Preview Mode
**Route:** `/staff/my-profile?preview=true`

#### Preview Mode Features:
- **Blue banner at top:** "Preview Mode - Public View"
- **Renders exact public AgentProfilePage** component
- **Exit Preview button** → Returns to `/staff/my-profile` (Edit Profile page)
- **No edit capabilities** (shows how buyers see the profile)

**What Agents See:**
- Exact public agent profile layout
- All sections (About, Services, Portfolio, Reviews, etc.)
- Public visibility settings applied
- All buyer-facing elements as they appear on `/agent/:id`

---

## ➕ Add New Deal Flow

**Route:** `/staff/deals/add`

### 6-Step Workflow:

**Step 1: Basics**
- Purchase date, location, property type, specs, address
- **Next Step** → Step 2

**Step 2: Process & Outcomes**
- Method, days-to-secure, value story, strategy tags
- **Back** → Step 1 | **Next Step** → Step 3

**Step 3: Financials**
- Asking price, purchase price, rental, budget band
- Auto-calc discount % and yield
- **Back** → Step 2 | **Next Step** → Step 4

**Step 4: Media**
- Photo upload (1-8), floorplan, consent checkbox
- **Back** → Step 3 | **Next Step** → Step 5

**Step 5: Verification**
- Choose L0 (Self-declared) or L1 (Evidence)
- Upload docs for L1
- **Back** → Step 4 | **Next Step** → Step 6

**Step 6: Review & Publish**
- Deal summary, preview link, publish/draft toggle
- **Back** → Step 5
- **Save Draft** → Saves and returns to `/staff/deals`
- **Publish Deal** → Publishes and returns to `/staff/deals`

**Available Anytime:**
- **Save Draft** button (bottom right)
- **Back to Deals** link (top left)
- **Click any completed step** in progress bar

---

## ✏️ Edit Deal Flow

**Route:** `/staff/deals/:id/edit`

### Same 6-Step Workflow as Add:
- All fields pre-populated with existing data
- Title shows "Edit Deal" instead of "Add New Deal"
- Same validation and auto-calculations
- **Save Draft** updates existing deal
- **Publish** updates and publishes

### Access Edit From:
1. **My Deals** → Click "Edit" on deal card
2. **Deal Details** → Click "Edit Deal" button (header or sidebar)
3. **Agent Dashboard** → Click deal → Edit

---

## 🔄 Complete User Journey Examples

### Example 1: Admin Adding First Deal
```
Login → Admin Dashboard
  → See "Add your first 3 deals" nudge
  → Click "Add Deal"
  → Fill 6-step workflow
  → Publish
  → Return to My Deals
  → See new deal in list
```

### Example 2: Agent Editing Deal
```
Login → Agent Dashboard
  → Click "Manage Deals" (Quick Actions)
  → See deal list
  → Click "Edit" on specific deal
  → Opens 6-step workflow (pre-filled)
  → Make changes (e.g., add photos)
  → Save Draft
  → Return to My Deals
```

### Example 3: Admin Previewing Before Publish
```
Login → Admin Dashboard
  → My Deals
  → Click "View" on draft deal
  → See Deal Details
  → Click "Preview Public"
  → See exact buyer view with blue banner
  → Looks good!
  → Click "Exit Preview" (returns to Deal Details)
  → Click "Edit Deal"
  → Go to Step 6
  → Click "Publish Deal"
```

### Example 4: Agent Updating Profile
```
Login → Agent Dashboard
  → Click name in header
  → Select "My Profile"
  → Update bio and add language
  → Add new coverage area
  → Click "Save Changes"
  → Click "Preview Public Profile"
  → See how buyers see profile (stays in /staff/my-profile?preview=true)
  → Click "Exit Preview"
  → Returns to Edit Profile page
```

---

## 🎨 Navigation Patterns

### Primary Navigation:
- **Header dropdown** - Always accessible
- **Dashboard tiles/cards** - Quick access to sections
- **"Back" links** - Breadcrumb-style at top of pages
- **CTA buttons** - Prominent actions (Add Deal, Save, etc.)

### Secondary Navigation:
- **Tabs** (Admin Dashboard, Deal Details)
- **Sidebar menus** (Organization Settings)
- **Quick Actions cards** (Agent Dashboard)
- **Progress steps** (Add/Edit Deal workflow)

### Consistent Patterns:
- **Amber buttons** - Primary actions (Save, Add)
- **Green buttons** - Publish/Success actions
- **Outline buttons** - Secondary actions (View, Preview)
- **Ghost buttons** - Back/Cancel actions

---

## ✅ Navigation Best Practices Implemented

1. **Clear Hierarchy:** Admin > Agent > Public
2. **Consistent Placement:** CTA buttons always top-right
3. **Breadcrumb Navigation:** "Back to X" links always top-left
4. **Multiple Access Paths:** Can reach pages via multiple routes
5. **Context Awareness:** Different menus for Admin vs Agent
6. **Visual Feedback:** Active states, hover effects, badges
7. **Preview Before Action:** Can preview deals before publishing
8. **Save Anywhere:** Draft saving available throughout workflows
9. **Quick Actions:** Dashboard shortcuts to common tasks
10. **Mobile Responsive:** All navigation works on mobile

---

## 📍 Key Routes Reference

### Admin Routes:
- `/admin/dashboard` - Main admin hub
- `/admin/settings` - Organization settings
- `/admin/profile` - Admin's public agent profile
- `/admin/onboarding` - First-time setup wizard

### Agent Routes:
- `/staff/dashboard` - Agent performance hub
- `/staff/my-profile` - Agent's public profile (edit mode)
- `/staff/my-profile?preview=true` - Profile preview mode (public view)
- `/staff/deals` - Deal portfolio management
- `/staff/deals/add` - Add new deal workflow
- `/staff/deals/:id` - Deal details (view mode)
- `/staff/deals/:id/edit` - Deal edit workflow
- `/staff/deals/:id?preview=true` - Public preview mode

### Public Routes (for reference):
- `/agent/:id` - Public agent profile
- `/deal/:id` - Public deal detail
- `/deals` - Public deals listing
- `/agents` - Public agents listing

---

## 🚀 Next Steps for Users

### New Admin:
1. Complete onboarding wizard
2. Set up organization settings
3. Complete agent profile
4. Add first 3 deals
5. Invite team members

### New Agent:
1. Complete agent profile
2. Add coverage areas and services
3. Add first deal to portfolio
4. Preview public profile
5. Start showcasing expertise

---

Last Updated: October 2024
Version: 1.0

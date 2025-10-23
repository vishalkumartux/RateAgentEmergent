# Admin Navigation Guide - AgentRate Platform

## 🔐 How to Access Admin Pages

### Quick Access (Direct URLs)
You can directly navigate to any admin page using these URLs:

1. **Organization Settings**: `http://localhost:3000/admin/settings`
2. **Admin Dashboard**: `http://localhost:3000/admin/dashboard`
3. **Onboarding Wizard**: `http://localhost:3000/admin/onboarding`

---

## 👤 Mock Login Credentials

To see the full admin navigation menu in the header, login with these credentials:

### Admin User
- **Email**: `admin@premiumrealty.com`
- **Password**: `password123`
- **Role**: Agency Admin
- **Organization**: Premium Realty Group

### Staff User
- **Email**: `sarah@premiumrealty.com`
- **Password**: `password123`
- **Role**: Agency Staff

### Public User
- **Email**: `public@user.com`
- **Password**: `password123`
- **Role**: Public User

---

## 🎯 Admin Navigation Menu (When Logged In)

After logging in as an admin, click your name in the top-right header to see:

```
┌─────────────────────────────────┐
│ 📊 Admin Dashboard             │  → /admin/dashboard
│ ⚙️  Organization Settings       │  → /admin/settings ✨ NEW!
├─────────────────────────────────┤
│ 👤 My Profile                  │  → /admin/profile
│ 📈 My Deals                    │  → /staff/deals
├─────────────────────────────────┤
│ 🚪 Sign Out                    │
└─────────────────────────────────┘
```

---

## 📋 Admin Pages Overview

### 1. Admin Dashboard (`/admin/dashboard`)
**Purpose**: Main control center for agency admins

**Features**:
- Overview stats (Total Staff, Pending Invites, Active Listings, Avg Rating)
- Organization information display
- Staff management tab
- Invite staff members tab
- Pending invitations management
- Organization settings tab

**Access**: 
- Header dropdown menu → "Admin Dashboard"
- Direct URL: `/admin/dashboard`

---

### 2. Organization Settings (`/admin/settings`) ✨ NEW
**Purpose**: Comprehensive settings management for agency

**Features**:
- **Business Information**
  - Agency logo upload
  - Name, email, phone, website
  - Business address
  - Agency description (500 char limit)

- **Service Coverage**
  - Service regions (add/remove)
  - Property types (toggles for Residential, Commercial, etc.)
  - Price range focus (min/max)

- **Privacy & Compliance**
  - Address visibility control
  - Contact information visibility
  - Direct contact permissions
  - Email verification requirements
  - GDPR compliance toggle
  - Data retention settings

- **Lead Routing**
  - Auto-assign leads
  - Round-robin distribution
  - Email/SMS notifications
  - Response time targets

- **Subscription & Billing**
  - Current plan display
  - Billing information
  - Feature list
  - Subscription management actions

**Access**: 
- Header dropdown menu → "Organization Settings"
- Direct URL: `/admin/settings`
- Link from Admin Dashboard header

---

### 3. Onboarding Wizard (`/admin/onboarding`)
**Purpose**: First-time setup for new admins

**Features**:
- Multi-step guided setup
- Basic organization info collection
- Service areas selection
- Initial preferences configuration

**Access**: 
- Automatically shown to first-time admins
- Direct URL: `/admin/onboarding`

---

## 🧪 Testing the Navigation

### Step 1: Login
1. Go to `http://localhost:3000/login`
2. Enter admin credentials:
   - Email: `admin@premiumrealty.com`
   - Password: `password123`
3. Click "Sign In"

### Step 2: Access Admin Menu
1. Look at the top-right corner of the header
2. Click on "John Smith" (the admin name)
3. You'll see the dropdown menu with admin options

### Step 3: Navigate to Settings
1. In the dropdown menu, click "Organization Settings"
2. You'll be taken to `/admin/settings`
3. Use the left sidebar to navigate between 5 sections:
   - Business Info
   - Service Coverage
   - Privacy & Compliance
   - Lead Routing
   - Subscription

---

## 🎨 Visual Changes in Header

### Before Login (Public View)
```
[Logo] [Find Agents] [Deals] [Compare] [Reviews] [About] [🌙] [Sign In] [Sign Up] [List Agency]
```

### After Login (Admin View)
```
[Logo] [Find Agents] [Deals] [Compare] [Reviews] [About] [🌙] [John Smith ▼]
                                                               │
                                                               ├── 📊 Admin Dashboard
                                                               ├── ⚙️  Organization Settings ✨
                                                               ├── ─────────────────────
                                                               ├── 👤 My Profile
                                                               ├── 📈 My Deals
                                                               ├── ─────────────────────
                                                               └── 🚪 Sign Out
```

---

## 📱 Mobile Navigation

The same menu structure is available on mobile devices with full-width buttons instead of a dropdown.

---

## ⚠️ Important Notes

1. **Mock Authentication**: Currently using localStorage-based mock authentication
2. **Organization Required**: Admin pages require an organization to be set up
3. **Role-Based Access**: Only users with `agency_admin` role see admin options
4. **Mock Data**: All data is currently mocked (not persisted to backend)

---

## 🚀 Next Steps

To make these pages fully functional with real data:

1. **Backend Integration**
   - Connect to .NET Core API endpoints
   - Replace mock data with real database queries
   - Implement actual authentication

2. **My Profile Page**
   - Build the personal profile management page
   - Allow admins/agents to update their public profiles

3. **Enhanced Features**
   - File upload for logo
   - Image upload for profile photos
   - Real-time notifications
   - Analytics dashboard

---

## 📞 Need Help?

If you can't access the admin pages:
1. Clear browser cache and localStorage
2. Restart the frontend: `sudo supervisorctl restart frontend`
3. Try direct URL access: `http://localhost:3000/admin/settings`
4. Verify you're logged in with admin credentials

---

Last Updated: October 2024

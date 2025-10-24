# My Reviews Page - Feature Documentation

## Overview
The My Reviews page provides reputation management tools for Agency Admins and Agents to manage their public reviews, respond to client feedback, and share review collection links.

**Route:** `/staff/reviews`

---

## Key Features

### 1. Stats Dashboard
Three key metrics displayed at the top:
- **Average Rating:** Overall rating calculated from all reviews
- **Total Reviews:** Count of all reviews received
- **Pending Replies:** Number of reviews awaiting agent response

### 2. Shareable Review Link
- **Purpose:** Allow clients to easily submit reviews
- **Features:**
  - Auto-generated link to public review submission page
  - One-click copy to clipboard
  - Social media share buttons (Facebook, Twitter, LinkedIn, Email)
  - No invite campaigns needed (MVP approach)
- **Link Format:** `https://domain.com/submit-review?agent=agent-slug`

### 3. Review Management Tabs

#### Published Tab
- Shows all publicly visible reviews
- Includes reviews with and without agent replies
- Default active tab

#### New Tab  
- Shows reviews waiting for agent response
- Badge displays count of pending replies
- Alert message encourages prompt responses
- Helps prioritize engagement

#### Flagged Tab
- Shows reviews marked as inappropriate or inaccurate
- Red badge indicates number of flagged reviews
- Alert explains that flagged reviews remain public unless removed by admin
- Allows unflagging if issue resolved

### 4. Review Cards

Each review card displays:

**Header:**
- Reviewer initials (privacy-safe)
- Verified badge (if verified purchase)
- Review date
- Star rating (1-5 stars)

**Content:**
- Review title
- Review text/comment
- Service type badge
- Transaction type (PPOR/Investment)
- Budget band
- Suburb location
- Review tags (e.g., "Great communication", "Strong negotiation")

**Agent Reply Section:**
- Displayed if agent has replied
- Shows reply text and date
- Blue background to distinguish from original review

**Actions:**
- **Reply Button:** Opens reply form (for reviews without replies)
- **Flag Button:** Opens flagging form
- **Unflag Button:** Removes flag (for flagged reviews)

### 5. Reply Functionality

**Features:**
- Inline reply form (expands when "Reply" clicked)
- Character limit: 500 characters
- Character counter
- Cancel and Post Reply buttons
- Public reply (visible on agent's public profile)

**Best Practices:**
- Respond promptly to show professionalism
- Thank reviewers for feedback
- Address concerns professionally
- Keep replies concise and helpful

### 6. Flag Functionality

**Purpose:** Report reviews that are:
- Inappropriate (offensive, spam)
- Inaccurate (factual errors, misrepresentation)

**Features:**
- Flagging form with optional reason (200 chars)
- Flag remains visible on profile until admin review
- Unflag option if issue resolved
- Visual indicator (red border) on flagged reviews

---

## Review Data Structure

```javascript
{
  id: 1,
  reviewerInitials: 'M.C.',
  rating: 5,
  date: '2024-10-15',
  title: 'Exceptional service',
  comment: 'Full review text...',
  serviceType: 'Buyer Agent Service',
  transactionType: 'PPOR' | 'Investment',
  budgetBand: '$2M-$3M',
  suburb: 'Bondi',
  verified: true,
  tags: ['Great communication', 'Strong negotiation'],
  status: 'published' | 'new' | 'flagged',
  hasReply: false,
  reply: {
    text: 'Reply text...',
    date: '2024-10-16'
  },
  flagged: false,
  flagReason: 'Optional reason...'
}
```

---

## Navigation

### Access Points:
1. **Header Dropdown Menu:**
   - Admin/Agent users see "My Reviews" option
   - Direct link to `/staff/reviews`

2. **Agent Dashboard:** (Future enhancement)
   - Quick link in "Latest Reviews" section
   - "View All Reviews" button

3. **My Profile:** (Future enhancement)
   - Link from read-only metrics sidebar

### Mobile Navigation:
- Accessible via hamburger menu
- Listed under user profile section
- Same functionality as desktop

---

## User Workflows

### Workflow 1: Responding to New Review
```
1. Navigate to My Reviews
2. See "3 Pending Replies" in stats
3. Click "New" tab
4. See alert: "Action Required - 3 reviews waiting"
5. Click "Reply" on first review
6. Reply form expands
7. Type response (max 500 chars)
8. Click "Post Reply"
9. Reply appears in blue box below review
10. Review moves to "Published" tab
11. Pending count decreases
```

### Workflow 2: Flagging Inappropriate Review
```
1. Navigate to My Reviews → Published tab
2. Find concerning review
3. Click "Flag" button
4. Flag form expands
5. Enter reason (optional, max 200 chars)
6. Click "Flag Review"
7. Review marked with red border
8. Review moves to "Flagged" tab
9. Admin notified for review
```

### Workflow 3: Sharing Review Link
```
1. Navigate to My Reviews
2. See "Shareable Review Link" section at top
3. Click "Copy Link" button
4. Button changes to "Copied!" with checkmark
5. Paste link in email/message to client
OR
6. Click social media icon (Facebook, Twitter, etc.)
7. Share dialog opens with pre-filled link
```

---

## Integration with Public Pages

### Agent Profile Page
The My Reviews page drives content on the public agent profile:

1. **Average Rating:**
   - Calculated from all published reviews
   - Displayed in header (e.g., "4.8 ⭐ (127 reviews)")

2. **Review Count:**
   - Total number of published reviews
   - Shown in profile stats

3. **Review List:**
   - Published reviews appear in "Reviews" section
   - Sorted by most recent
   - Includes agent replies if present

4. **Top Tags:**
   - Most common tags displayed prominently
   - e.g., "Great communication (15), Strong negotiation (12)"

5. **Verification:**
   - Verified badge shows on verified reviews
   - Builds trust with potential clients

### Submit Review Page
Public users access via shareable link:
- Pre-filled with agent information
- Form includes all review fields
- Submits to agent's review queue
- Appears in "New" tab after submission

---

## Empty States

### No Published Reviews
- Icon: MessageCircle
- Title: "No published reviews yet"
- Message: "Share your review link with clients to start collecting feedback"

### All Caught Up (No New Reviews)
- Icon: Check (green)
- Title: "All caught up!"
- Message: "You've replied to all your reviews"

### No Flagged Reviews
- Icon: Check (green)
- Title: "No flagged reviews"
- Message: "All your reviews are in good standing"

---

## Design Patterns

### Color Coding:
- **Amber:** Stats cards, shareable link section, tags
- **Blue:** Reply sections, verified badges
- **Red:** Flagged reviews, flag actions
- **Green:** Success states (replied, no flags)

### Badges:
- **Verified:** Blue with checkmark
- **New Tab Count:** Amber
- **Flagged Tab Count:** Red
- **Service Type:** Outline style
- **Tags:** Amber background

### Cards:
- **Standard:** White/dark with subtle border
- **Flagged:** Red border for visual warning
- **Reply Section:** Blue background for distinction

---

## Future Enhancements (Post-MVP)

1. **Review Analytics:**
   - Rating trends over time
   - Tag frequency analysis
   - Response time metrics

2. **Review Filters:**
   - Filter by rating (1-5 stars)
   - Filter by service type
   - Filter by date range
   - Search reviews

3. **Bulk Actions:**
   - Mark multiple as read
   - Export reviews (PDF/CSV)

4. **Email Notifications:**
   - Alert when new review received
   - Reminder for pending replies

5. **Review Templates:**
   - Save common responses
   - Quick reply options

6. **Review Request Automation:**
   - Auto-send review request after deal completion
   - Schedule follow-up reminders

---

## Best Practices for Agents

### Responding to Reviews:
1. **Be Prompt:** Reply within 24-48 hours
2. **Be Professional:** Maintain courteous tone
3. **Be Grateful:** Thank all reviewers
4. **Address Concerns:** Acknowledge and explain issues
5. **Keep it Brief:** 100-300 characters ideal

### Managing Reputation:
1. **Share Link Proactively:** Send after successful deals
2. **Monitor Regularly:** Check reviews weekly
3. **Respond to All:** Even brief "thank you" matters
4. **Flag Appropriately:** Only for genuine issues
5. **Learn from Feedback:** Use reviews to improve

### Building Reviews:
1. **Ask at Right Time:** After deal completion, settlement
2. **Make it Easy:** Provide direct link
3. **Personal Touch:** Personalize request message
4. **Follow Up:** Gentle reminder if no response
5. **Showcase Best:** Feature reviews on marketing materials

---

## Technical Implementation

### Mock Data Location:
- Currently inline in `MyReviews.jsx`
- Future: Fetch from `/api/reviews/agent/:id`

### State Management:
- Local state for UI (tabs, forms, flags)
- Context for user authentication
- Future: Global state for real-time updates

### API Endpoints (Future):
- `GET /api/reviews/agent/:id` - Fetch all reviews
- `POST /api/reviews/:id/reply` - Submit reply
- `POST /api/reviews/:id/flag` - Flag review
- `DELETE /api/reviews/:id/flag` - Unflag review
- `GET /api/reviews/link` - Generate shareable link

---

Last Updated: October 24, 2024
Version: 1.0

/**
 * Mock API Service for AgentRate Frontend
 * 
 * This file simulates backend API calls using mock data.
 * Replace these functions with actual .NET Core API calls when backend is ready.
 * 
 * Base URL: Will be configured via environment variable
 * API Format: RESTful
 * Auth: JWT Bearer Token (to be implemented)
 */

import { mockAgents } from '../mock/agentData';
import { mockDeals, getDealsByAgentId } from '../mock/dealData';

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// AUTHENTICATION APIs
// ============================================

/**
 * POST /api/auth/login
 * Login user with email and password
 */
export const loginUser = async (email, password) => {
  await delay();
  
  // Mock users database
  const users = [
    {
      id: 1,
      email: 'admin@premiumrealty.com',
      name: 'John Smith',
      role: 'agency_admin',
      organizationId: 1,
      organizationName: 'Premium Realty Group',
      isVerified: true
    },
    {
      id: 2,
      email: 'sarah@premiumrealty.com',
      name: 'Sarah Johnson',
      role: 'agency_staff',
      organizationId: 1,
      organizationName: 'Premium Realty Group',
      isVerified: true
    },
    {
      id: 3,
      email: 'public@user.com',
      name: 'Mike Wilson',
      role: 'public_user',
      isVerified: true
    }
  ];

  const user = users.find(u => u.email === email && password === 'password123');
  
  if (user) {
    return {
      success: true,
      user,
      token: 'mock-jwt-token-' + user.id
    };
  }
  
  throw new Error('Invalid credentials');
};

/**
 * POST /api/auth/register
 * Register new agency admin
 */
export const registerUser = async (userData) => {
  await delay();
  return {
    success: true,
    message: 'Registration successful. Please check your email for verification.',
    userId: Math.floor(Math.random() * 1000)
  };
};

/**
 * POST /api/auth/signup
 * Public user signup
 */
export const signupPublicUser = async (userData) => {
  await delay();
  return {
    success: true,
    message: 'Signup successful!',
    userId: Math.floor(Math.random() * 1000)
  };
};

/**
 * POST /api/auth/logout
 * Logout current user
 */
export const logoutUser = async () => {
  await delay();
  return { success: true };
};

// ============================================
// AGENT APIs
// ============================================

/**
 * GET /api/agents
 * Get all agents with optional filters
 */
export const getAgents = async (filters = {}) => {
  await delay();
  
  let filteredAgents = [...mockAgents];
  
  // Apply filters
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredAgents = filteredAgents.filter(agent =>
      agent.name.toLowerCase().includes(searchLower) ||
      agent.company.toLowerCase().includes(searchLower) ||
      agent.location.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.location) {
    filteredAgents = filteredAgents.filter(agent =>
      agent.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.specialty) {
    filteredAgents = filteredAgents.filter(agent =>
      agent.specialties.includes(filters.specialty)
    );
  }
  
  if (filters.minRating) {
    filteredAgents = filteredAgents.filter(agent => agent.rating >= filters.minRating);
  }
  
  return {
    success: true,
    data: filteredAgents,
    total: filteredAgents.length
  };
};

/**
 * GET /api/agents/:id
 * Get single agent by ID
 */
export const getAgentById = async (id) => {
  await delay();
  
  const agent = mockAgents.find(a => a.id === parseInt(id));
  
  if (!agent) {
    throw new Error('Agent not found');
  }
  
  return {
    success: true,
    data: agent
  };
};

// ============================================
// DEAL APIs
// ============================================

/**
 * GET /api/deals
 * Get all deals with optional filters
 */
export const getDeals = async (filters = {}) => {
  await delay();
  
  let filteredDeals = [...mockDeals];
  
  // Apply filters
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredDeals = filteredDeals.filter(deal =>
      deal.address.toLowerCase().includes(searchLower) ||
      deal.suburb.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.dealType) {
    filteredDeals = filteredDeals.filter(deal => deal.dealType === filters.dealType);
  }
  
  if (filters.propertyType) {
    filteredDeals = filteredDeals.filter(deal => deal.propertyType === filters.propertyType);
  }
  
  if (filters.minBedrooms) {
    filteredDeals = filteredDeals.filter(deal => deal.bedrooms >= parseInt(filters.minBedrooms));
  }
  
  if (filters.minPrice && filters.maxPrice) {
    filteredDeals = filteredDeals.filter(deal => 
      deal.price >= parseInt(filters.minPrice) && deal.price <= parseInt(filters.maxPrice)
    );
  }
  
  return {
    success: true,
    data: filteredDeals,
    total: filteredDeals.length
  };
};

/**
 * GET /api/deals/:id
 * Get single deal by ID
 */
export const getDealById = async (id) => {
  await delay();
  
  const deal = mockDeals.find(d => d.id === parseInt(id));
  
  if (!deal) {
    throw new Error('Deal not found');
  }
  
  return {
    success: true,
    data: deal
  };
};

/**
 * GET /api/deals/agent/:agentId
 * Get all deals by agent ID
 */
export const getDealsByAgent = async (agentId) => {
  await delay();
  
  const deals = getDealsByAgentId(parseInt(agentId));
  
  return {
    success: true,
    data: deals,
    total: deals.length
  };
};

/**
 * POST /api/deals
 * Create new deal (Staff/Admin only)
 */
export const createDeal = async (dealData) => {
  await delay(500);
  
  return {
    success: true,
    message: 'Deal created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      ...dealData,
      createdAt: new Date().toISOString()
    }
  };
};

/**
 * PUT /api/deals/:id
 * Update deal (Staff/Admin only)
 */
export const updateDeal = async (id, dealData) => {
  await delay(500);
  
  return {
    success: true,
    message: 'Deal updated successfully',
    data: { id, ...dealData }
  };
};

/**
 * DELETE /api/deals/:id
 * Delete deal (Admin only)
 */
export const deleteDeal = async (id) => {
  await delay();
  
  return {
    success: true,
    message: 'Deal deleted successfully'
  };
};

// ============================================
// REVIEW APIs
// ============================================

/**
 * GET /api/reviews
 * Get all reviews with optional filters
 */
export const getReviews = async (filters = {}) => {
  await delay();
  
  // Collect all reviews from all agents
  const allReviews = mockAgents.flatMap(agent =>
    agent.reviews.map(review => ({
      ...review,
      agentId: agent.id,
      agentName: agent.name,
      agentCompany: agent.company,
      agentPhoto: agent.photo,
      agentLocation: agent.location
    }))
  );
  
  let filteredReviews = allReviews;
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredReviews = filteredReviews.filter(review =>
      review.comment.toLowerCase().includes(searchLower) ||
      review.author.toLowerCase().includes(searchLower) ||
      review.agentName.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.minRating) {
    filteredReviews = filteredReviews.filter(review => review.rating >= filters.minRating);
  }
  
  if (filters.agentId) {
    filteredReviews = filteredReviews.filter(review => review.agentId === parseInt(filters.agentId));
  }
  
  return {
    success: true,
    data: filteredReviews,
    total: filteredReviews.length
  };
};

/**
 * POST /api/reviews
 * Submit new review
 */
export const submitReview = async (reviewData) => {
  await delay(500);
  
  return {
    success: true,
    message: 'Review submitted successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      ...reviewData,
      createdAt: new Date().toISOString()
    }
  };
};

// ============================================
// USER PROFILE APIs
// ============================================

/**
 * GET /api/user/profile
 * Get current user profile
 */
export const getUserProfile = async () => {
  await delay();
  
  // Mock current user (would come from JWT token)
  return {
    success: true,
    data: {
      id: 3,
      email: 'public@user.com',
      name: 'Mike Wilson',
      role: 'public_user',
      savedAgents: [1, 2],
      preferences: {
        location: 'Sydney',
        propertyType: 'House',
        budget: 2000000
      }
    }
  };
};

/**
 * PUT /api/user/profile
 * Update user profile
 */
export const updateUserProfile = async (profileData) => {
  await delay();
  
  return {
    success: true,
    message: 'Profile updated successfully',
    data: profileData
  };
};

/**
 * POST /api/user/saved-agents
 * Save/favorite an agent
 */
export const saveAgent = async (agentId) => {
  await delay();
  
  return {
    success: true,
    message: 'Agent saved to favorites'
  };
};

/**
 * DELETE /api/user/saved-agents/:agentId
 * Remove saved agent
 */
export const unsaveAgent = async (agentId) => {
  await delay();
  
  return {
    success: true,
    message: 'Agent removed from favorites'
  };
};

// ============================================
// ORGANIZATION APIs (Admin only)
// ============================================

/**
 * POST /api/organizations
 * Create organization
 */
export const createOrganization = async (orgData) => {
  await delay(500);
  
  return {
    success: true,
    message: 'Organization created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      ...orgData
    }
  };
};

/**
 * PUT /api/organizations/:id
 * Update organization
 */
export const updateOrganization = async (id, orgData) => {
  await delay();
  
  return {
    success: true,
    message: 'Organization updated successfully'
  };
};

/**
 * POST /api/organizations/invite-staff
 * Invite staff member
 */
export const inviteStaff = async (inviteData) => {
  await delay(500);
  
  return {
    success: true,
    message: 'Invitation sent successfully',
    inviteId: Math.floor(Math.random() * 1000)
  };
};

// ============================================
// SEARCH APIs
// ============================================

/**
 * GET /api/search
 * Global search across agents, deals, reviews
 */
export const globalSearch = async (query) => {
  await delay();
  
  const agents = mockAgents.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.company.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
  
  const deals = mockDeals.filter(d =>
    d.address.toLowerCase().includes(query.toLowerCase()) ||
    d.suburb.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
  
  return {
    success: true,
    data: {
      agents,
      deals,
      query
    }
  };
};

export default {
  // Auth
  loginUser,
  registerUser,
  signupPublicUser,
  logoutUser,
  
  // Agents
  getAgents,
  getAgentById,
  
  // Deals
  getDeals,
  getDealById,
  getDealsByAgent,
  createDeal,
  updateDeal,
  deleteDeal,
  
  // Reviews
  getReviews,
  submitReview,
  
  // User
  getUserProfile,
  updateUserProfile,
  saveAgent,
  unsaveAgent,
  
  // Organization
  createOrganization,
  updateOrganization,
  inviteStaff,
  
  // Search
  globalSearch
};

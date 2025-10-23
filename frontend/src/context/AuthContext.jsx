import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data
const mockUsers = {
  'admin@premiumrealty.com': {
    id: 1,
    email: 'admin@premiumrealty.com',
    name: 'John Smith',
    role: 'agency_admin',
    organizationId: 1,
    organizationName: 'Premium Realty Group',
    isVerified: true
  },
  'sarah@premiumrealty.com': {
    id: 2,
    email: 'sarah@premiumrealty.com',
    name: 'Sarah Johnson',
    role: 'agency_staff',
    organizationId: 1,
    organizationName: 'Premium Realty Group',
    isVerified: true,
    agentProfile: {
      photo: 'https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face',
      specialties: ['Luxury Homes', 'Investment Properties'],
      yearsExperience: 8,
      phone: '+61 2 9555 0123',
      bio: 'Specializing in luxury properties with a proven track record.'
    }
  },
  'public@user.com': {
    id: 3,
    email: 'public@user.com',
    name: 'Mike Wilson',
    role: 'public_user',
    isVerified: true,
    preferences: {
      savedAgents: [1, 2],
      searchHistory: [
        { query: 'luxury homes Sydney', date: '2024-08-03', results: 12 },
        { query: 'apartments Bondi', date: '2024-08-01', results: 8 }
      ],
      favoriteAreas: ['Bondi Beach', 'Double Bay', 'Paddington'],
      priceRange: { min: 800000, max: 2000000 },
      propertyTypes: ['House', 'Apartment']
    }
  }
};

// Mock organizations
const mockOrganizations = {
  1: {
    id: 1,
    name: 'Premium Realty Group',
    adminId: 1,
    email: 'info@premiumrealty.com',
    phone: '+61 2 9555 0100',
    address: '123 Business St, Sydney NSW 2000',
    website: 'www.premiumrealty.com',
    licenseNumber: 'NSW-12345',
    description: 'Leading real estate agency in Sydney specializing in premium properties.',
    staff: [
      { 
        id: 2, 
        name: 'Sarah Johnson', 
        email: 'sarah@premiumrealty.com', 
        role: 'Agent', 
        status: 'active',
        lastActive: '2 hours ago',
        invitedDate: 'Mar 2024',
        invitedBy: 'John Smith'
      },
      { 
        id: 3, 
        name: 'Mike Chen', 
        email: 'mike@premiumrealty.com', 
        role: 'Agent', 
        status: 'active',
        lastActive: 'Today',
        invitedDate: 'Apr 2024',
        invitedBy: 'John Smith'
      },
      { 
        id: 4, 
        name: 'Emma Davis', 
        email: 'emma@premiumrealty.com', 
        role: 'Admin', 
        status: 'inactive',
        lastActive: '14 days ago',
        invitedDate: 'Feb 2024',
        invitedBy: 'John Smith'
      }
    ],
    pendingInvites: [
      {
        id: 'inv-1',
        email: 'james@example.com',
        role: 'Agent',
        invitedBy: 'John Smith',
        sentAt: '2024-10-15T10:30:00Z'
      },
      {
        id: 'inv-2',
        email: 'lisa@example.com',
        role: 'Admin',
        invitedBy: 'John Smith',
        sentAt: '2024-10-18T14:20:00Z'
      }
    ],
    stats: {
      publishedDeals: 12,
      verifiedDeals: 8
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock check)
    const savedUser = localStorage.getItem('agentrate-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      if (userData.organizationId) {
        setOrganization(mockOrganizations[userData.organizationId]);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login validation
    if (mockUsers[email] && password === 'password123') {
      const userData = mockUsers[email];
      setUser(userData);
      localStorage.setItem('agentrate-user', JSON.stringify(userData));
      
      if (userData.organizationId) {
        setOrganization(mockOrganizations[userData.organizationId]);
      }
      
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (formData) => {
    // Mock registration
    const newUser = {
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      role: 'agency_admin',
      organizationName: formData.organizationName,
      isVerified: false
    };
    
    // In real app, this would send verification email
    return { 
      success: true, 
      user: newUser,
      message: 'Registration successful! Please check your email for verification code.' 
    };
  };

  const verifyEmail = async (email, code) => {
    // Mock verification (accept any 6-digit code)
    if (code && code.length === 6) {
      const userData = {
        id: Date.now(),
        email: email,
        name: 'John Smith', // This would come from registration
        role: 'agency_admin',
        organizationName: 'New Agency',
        isVerified: true
      };
      
      setUser(userData);
      localStorage.setItem('agentrate-user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid verification code' };
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('agentrate-user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('agentrate-user', JSON.stringify(updatedUser));
  };

  const updateOrganization = (updates) => {
    const updatedOrg = { ...organization, ...updates };
    setOrganization(updatedOrg);
  };

  const inviteStaff = (emailList) => {
    // Mock staff invitation
    const invites = emailList.map(email => ({
      id: Date.now() + Math.random(),
      email,
      invitedBy: user.name,
      inviteCode: Math.random().toString(36).substring(7),
      status: 'pending',
      sentAt: new Date().toISOString()
    }));
    
    updateOrganization({
      pendingInvites: [...(organization?.pendingInvites || []), ...invites]
    });
    
    return { success: true, invites };
  };

  return (
    <AuthContext.Provider value={{
      user,
      organization,
      loading,
      login,
      register,
      verifyEmail,
      logout,
      updateUser,
      updateOrganization,
      inviteStaff,
      isAdmin: user?.role === 'agency_admin',
      isStaff: user?.role === 'agency_staff',
      isAuthenticated: !!user?.isVerified
    }}>
      {children}
    </AuthContext.Provider>
  );
};
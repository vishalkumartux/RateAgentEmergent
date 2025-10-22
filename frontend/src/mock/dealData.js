// Mock deal data for buyer agents platform
export const mockDeals = [
  {
    id: 1,
    agentId: 1, // Sarah Johnson
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    // Property details
    address: "42 Harbour View Drive, Bondi Beach NSW 2026",
    suburb: "Bondi Beach",
    city: "Sydney",
    state: "NSW",
    postcode: "2026",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    // Property specs
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    landSize: "450 sqm",
    buildingArea: "280 sqm",
    
    // Buyer Agent Specific Metrics
    purchasePrice: 3250000,
    askingPrice: 3450000,
    achievedVsAsking: -5.8, // % below asking
    purchaseDate: "2024-08-15",
    daysToSecure: 42,
    discountPercent: 5.8,
    
    // Rental & Yield (if applicable)
    rentalAppraisal: 1200, // per week
    rentalAchieved: 1250,
    grossYield: 2.0,
    
    // Strategy & Tags
    strategyTags: ["Off-market", "Pre-auction", "High-yield"],
    verified: true,
    
    // Images
    photos: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    ],
    
    description: "Secured this stunning oceanfront property for buyer 5.8% below asking through off-market negotiations. Premium beachside lifestyle with strong rental yield.",
    
    features: ["Ocean Views", "Renovated Kitchen", "Pool", "Garden", "Close to Beach"]
  },
  {
    id: 2,
    agentId: 2, // David Mitchell
    agentName: "David Mitchell",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.6,
    
    address: "15/88 George Street, Sydney NSW 2000",
    suburb: "Sydney CBD",
    city: "Sydney",
    state: "NSW",
    postcode: "2000",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    landSize: "N/A",
    buildingArea: "95 sqm",
    
    purchasePrice: 1450000,
    askingPrice: 1500000,
    achievedVsAsking: -3.3,
    purchaseDate: "2024-08-20",
    daysToSecure: 28,
    discountPercent: 3.3,
    
    rentalAppraisal: 750,
    rentalAchieved: 780,
    grossYield: 2.8,
    
    strategyTags: ["Auction", "First-home buyer"],
    verified: true,
    
    photos: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    
    description: "Helped first-home buyer secure this modern CBD apartment through competitive auction bidding. Great investment potential.",
    
    features: ["City Views", "Modern Kitchen", "Gym Access", "Concierge", "Central Location"]
  },
  {
    id: 3,
    agentId: 3, // Emma Wilson
    agentName: "Emma Wilson",
    agentCompany: "Coastal Properties Co.",
    agentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    
    address: "128 Ocean Drive, Manly NSW 2095",
    suburb: "Manly",
    city: "Sydney",
    state: "NSW",
    propertyType: "Townhouse",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "180 sqm",
    buildingArea: "165 sqm",
    
    price: 2100000,
    soldDate: "2024-07-28",
    daysOnMarket: 21,
    
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    ],
    
    description: "Beautiful three-level townhouse minutes from Manly Beach. Contemporary design with high-end finishes. Ideal for beach lovers.",
    
    features: ["Beach Proximity", "Modern Design", "Rooftop Terrace", "Open Plan Living"]
  },
  {
    id: 4,
    agentId: 1, // Sarah Johnson
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    
    address: "256 Victoria Road, Double Bay NSW 2028",
    suburb: "Double Bay",
    city: "Sydney",
    state: "NSW",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 5,
    bathrooms: 4,
    carSpaces: 3,
    landSize: "620 sqm",
    buildingArea: "380 sqm",
    
    price: 5800000,
    soldDate: "2024-06-10",
    daysOnMarket: 15,
    
    photos: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
    ],
    
    description: "Magnificent luxury residence in prestigious Double Bay. Impeccable design, premium finishes, and expansive living spaces. The epitome of luxury living.",
    
    features: ["Luxury Finishes", "Pool & Spa", "Wine Cellar", "Home Theater", "Designer Kitchen"]
  },
  {
    id: 5,
    agentId: 4, // David Brown
    agentName: "David Brown",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    
    address: "12A Glebe Point Road, Glebe NSW 2037",
    suburb: "Glebe",
    city: "Sydney",
    state: "NSW",
    propertyType: "Apartment",
    dealType: "rent",
    status: "leased",
    
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 0,
    landSize: "N/A",
    buildingArea: "55 sqm",
    
    price: 650, // weekly rent
    soldDate: "2024-08-25",
    daysOnMarket: 5,
    
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    
    description: "Cozy one-bedroom apartment in vibrant Glebe. Perfect for young professionals or students. Close to cafes, restaurants, and public transport.",
    
    features: ["Inner City", "Close to Transport", "Cafes Nearby", "Secure Building"]
  },
  {
    id: 6,
    agentId: 2, // Michael Chen
    agentName: "Michael Chen",
    agentCompany: "Sydney Elite Properties",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    
    address: "88 Darling Point Road, Darling Point NSW 2027",
    suburb: "Darling Point",
    city: "Sydney",
    state: "NSW",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "N/A",
    buildingArea: "145 sqm",
    
    price: 2900000,
    soldDate: "2024-07-15",
    daysOnMarket: 14,
    
    photos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
    ],
    
    description: "Prestigious apartment with harbour views in exclusive Darling Point. Spacious layout with premium finishes and resort-style facilities.",
    
    features: ["Harbour Views", "Pool", "Gym", "Concierge", "Security Parking"]
  },
  {
    id: 7,
    agentId: 5, // Jessica Martinez
    agentName: "Jessica Martinez",
    agentCompany: "Harbourside Realty",
    agentPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    
    address: "34 Beach Road, Coogee NSW 2034",
    suburb: "Coogee",
    city: "Sydney",
    state: "NSW",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    landSize: "320 sqm",
    buildingArea: "190 sqm",
    
    price: 2750000,
    soldDate: "2024-08-05",
    daysOnMarket: 19,
    
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ],
    
    description: "Charming beach house steps from Coogee Beach. Perfect blend of indoor-outdoor living with sunny courtyard and renovated interiors.",
    
    features: ["Beach Location", "Renovated", "Outdoor Living", "Natural Light"]
  },
  {
    id: 8,
    agentId: 1, // Sarah Johnson
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    
    address: "102/15 Bayswater Road, Potts Point NSW 2011",
    suburb: "Potts Point",
    city: "Sydney",
    state: "NSW",
    propertyType: "Apartment",
    dealType: "rent",
    status: "leased",
    
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    landSize: "N/A",
    buildingArea: "78 sqm",
    
    price: 850, // weekly rent
    soldDate: "2024-08-28",
    daysOnMarket: 7,
    
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    
    description: "Stylish two-bedroom apartment in the heart of Potts Point. Recently updated with modern kitchen and bathroom. Walk to cafes and transport.",
    
    features: ["Inner City Living", "Updated", "Close to Transport", "Vibrant Area"]
  }
];

// Helper function to get deals by agent ID
export const getDealsByAgentId = (agentId) => {
  return mockDeals.filter(deal => deal.agentId === agentId);
};

// Helper function to format price
export const formatDealPrice = (deal) => {
  if (deal.dealType === 'rent') {
    return `$${deal.price}/week`;
  }
  return `$${(deal.price / 1000000).toFixed(2)}M`;
};

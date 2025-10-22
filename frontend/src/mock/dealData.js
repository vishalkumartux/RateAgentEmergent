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
    agentId: 3, // Maria Rodriguez
    agentName: "Maria Rodriguez",
    agentCompany: "Coastal Realty Experts",
    agentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.9,
    
    address: "128 Ocean Drive, Manly NSW 2095",
    suburb: "Manly",
    city: "Sydney",
    state: "NSW",
    postcode: "2095",
    propertyType: "Townhouse",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "180 sqm",
    buildingArea: "165 sqm",
    
    purchasePrice: 2100000,
    askingPrice: null, // Price undisclosed
    achievedVsAsking: null,
    purchaseDate: "2024-07-28",
    daysToSecure: 35,
    discountPercent: 7.2, // vs AVM
    
    rentalAppraisal: 950,
    rentalAchieved: null, // Not rented yet
    grossYield: null,
    
    strategyTags: ["Off-market", "Private sale"],
    verified: true,
    
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    
    description: "Secured through exclusive off-market channel. Excellent beachside location with renovation potential.",
    
    features: ["Beach Access", "Quiet Location", "Garden", "Storage"]
  },
  {
    id: 4,
    agentId: 1,
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    address: "56 Park Street, Randwick NSW 2031",
    suburb: "Randwick",
    city: "Sydney",
    state: "NSW",
    postcode: "2031",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    landSize: "420 sqm",
    buildingArea: "180 sqm",
    
    purchasePrice: 1850000,
    askingPrice: 1950000,
    achievedVsAsking: -5.1,
    purchaseDate: "2024-09-10",
    daysToSecure: 21,
    discountPercent: 5.1,
    
    rentalAppraisal: 850,
    rentalAchieved: 900,
    grossYield: 2.5,
    
    strategyTags: ["Reno opportunity", "Auction"],
    verified: true,
    
    photos: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
    ],
    
    description: "Perfect renovation project in sought-after location. Secured at auction with strong buyer competition.",
    
    features: ["Large Block", "North Facing", "School Zone", "Quiet Street"]
  },
  {
    id: 5,
    agentId: 2,
    agentName: "David Mitchell",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.6,
    
    address: "Undisclosed Address, Paddington NSW",
    suburb: "Paddington",
    city: "Sydney",
    state: "NSW",
    postcode: "2021",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 0,
    landSize: "N/A",
    buildingArea: "55 sqm",
    
    purchasePrice: null, // Undisclosed
    askingPrice: null,
    achievedVsAsking: null,
    purchaseDate: "2024-09-01",
    daysToSecure: 14,
    discountPercent: null,
    
    rentalAppraisal: 550,
    rentalAchieved: 580,
    grossYield: 3.2, // Estimated based on average price
    
    strategyTags: ["Off-market", "High-yield", "Investment"],
    verified: false,
    
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    
    description: "Exclusive off-market studio with excellent rental returns. Price undisclosed per buyer's request.",
    
    features: ["Central Location", "Low Maintenance", "Investment Grade"]
  },
  {
    id: 6,
    agentId: 3,
    agentName: "Maria Rodriguez",
    agentCompany: "Coastal Realty Experts",
    agentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.9,
    
    address: "305 Harbour View, Surfers Paradise QLD 4217",
    suburb: "Surfers Paradise",
    city: "Gold Coast",
    state: "QLD",
    postcode: "4217",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "N/A",
    buildingArea: "145 sqm",
    
    purchasePrice: 1650000,
    askingPrice: 1750000,
    achievedVsAsking: -5.7,
    purchaseDate: "2024-08-25",
    daysToSecure: 25,
    discountPercent: 5.7,
    
    rentalAppraisal: 850,
    rentalAchieved: 900,
    grossYield: 2.8,
    
    strategyTags: ["Auction", "High-yield"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"],
    description: "Beachfront apartment secured at auction with strong yield.",
    features: ["Ocean Views", "Pool", "Gym", "Security"]
  },
  {
    id: 7,
    agentId: 1,
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    address: "78 Beach Road, Coogee NSW 2034",
    suburb: "Coogee",
    city: "Sydney",
    state: "NSW",
    postcode: "2034",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    landSize: "520 sqm",
    buildingArea: "310 sqm",
    
    purchasePrice: 3800000,
    askingPrice: 4000000,
    achievedVsAsking: -5.0,
    purchaseDate: "2024-07-15",
    daysToSecure: 38,
    discountPercent: 5.0,
    
    rentalAppraisal: 1400,
    rentalAchieved: 1450,
    grossYield: 2.0,
    
    strategyTags: ["Off-market", "Pre-auction"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"],
    description: "Premium beachside home secured off-market.",
    features: ["Beach Access", "Pool", "Garden", "Study"]
  },
  {
    id: 8,
    agentId: 2,
    agentName: "David Mitchell",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.6,
    
    address: "Unit 8/120 Collins St, Melbourne VIC 3000",
    suburb: "Melbourne CBD",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    landSize: "N/A",
    buildingArea: "88 sqm",
    
    purchasePrice: 1320000,
    askingPrice: 1400000,
    achievedVsAsking: -5.7,
    purchaseDate: "2024-09-12",
    daysToSecure: 19,
    discountPercent: 5.7,
    
    rentalAppraisal: 700,
    rentalAchieved: 750,
    grossYield: 2.9,
    
    strategyTags: ["Auction", "Investment"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"],
    description: "CBD apartment with strong rental demand.",
    features: ["City Views", "Building Gym", "Concierge"]
  },
  {
    id: 9,
    agentId: 1,
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    address: "45 Park Avenue, Mosman NSW 2088",
    suburb: "Mosman",
    city: "Sydney",
    state: "NSW",
    postcode: "2088",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 5,
    bathrooms: 4,
    carSpaces: 3,
    landSize: "680 sqm",
    buildingArea: "420 sqm",
    
    purchasePrice: 5200000,
    askingPrice: 5500000,
    achievedVsAsking: -5.5,
    purchaseDate: "2024-06-20",
    daysToSecure: 52,
    discountPercent: 5.5,
    
    rentalAppraisal: 2000,
    rentalAchieved: null,
    grossYield: null,
    
    strategyTags: ["Off-market", "Luxury"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"],
    description: "Exclusive luxury home in prime location.",
    features: ["Harbour Views", "Pool", "Wine Cellar", "Home Theatre"]
  },
  {
    id: 10,
    agentId: 3,
    agentName: "Maria Rodriguez",
    agentCompany: "Coastal Realty Experts",
    agentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.9,
    
    address: "22 Seaview Crescent, Broadbeach QLD 4218",
    suburb: "Broadbeach",
    city: "Gold Coast",
    state: "QLD",
    postcode: "4218",
    propertyType: "Townhouse",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "210 sqm",
    buildingArea: "195 sqm",
    
    purchasePrice: 1890000,
    askingPrice: 2000000,
    achievedVsAsking: -5.5,
    purchaseDate: "2024-08-08",
    daysToSecure: 31,
    discountPercent: 5.5,
    
    rentalAppraisal: 900,
    rentalAchieved: 950,
    grossYield: 2.6,
    
    strategyTags: ["Private sale", "High-yield"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    description: "Beachside townhouse with rental potential.",
    features: ["Beach Access", "Pool", "Modern Kitchen"]
  },
  {
    id: 11,
    agentId: 2,
    agentName: "David Mitchell",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.6,
    
    address: "Unit 102/45 Lonsdale St, Melbourne VIC 3000",
    suburb: "Melbourne CBD",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    landSize: "N/A",
    buildingArea: "52 sqm",
    
    purchasePrice: 620000,
    askingPrice: 650000,
    achievedVsAsking: -4.6,
    purchaseDate: "2024-09-18",
    daysToSecure: 16,
    discountPercent: 4.6,
    
    rentalAppraisal: 450,
    rentalAchieved: 480,
    grossYield: 4.0,
    
    strategyTags: ["First-home buyer", "High-yield"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"],
    description: "Perfect first home with excellent yield.",
    features: ["Central", "Modern", "Security"]
  },
  {
    id: 12,
    agentId: 1,
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    address: "88 Harbour Street, Rose Bay NSW 2029",
    suburb: "Rose Bay",
    city: "Sydney",
    state: "NSW",
    postcode: "2029",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    landSize: "550 sqm",
    buildingArea: "320 sqm",
    
    purchasePrice: 4500000,
    askingPrice: null,
    achievedVsAsking: null,
    purchaseDate: "2024-07-08",
    daysToSecure: 48,
    discountPercent: 6.5,
    
    rentalAppraisal: 1800,
    rentalAchieved: null,
    grossYield: null,
    
    strategyTags: ["Off-market", "Waterfront"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"],
    description: "Exclusive waterfront property secured off-market.",
    features: ["Water Views", "Pool", "Garden", "Boat Mooring"]
  },
  {
    id: 13,
    agentId: 3,
    agentName: "Maria Rodriguez",
    agentCompany: "Coastal Realty Experts",
    agentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.9,
    
    address: "12 Marina Way, Sanctuary Cove QLD 4212",
    suburb: "Sanctuary Cove",
    city: "Gold Coast",
    state: "QLD",
    postcode: "4212",
    propertyType: "Villa",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landSize: "320 sqm",
    buildingArea: "240 sqm",
    
    purchasePrice: 2450000,
    askingPrice: 2600000,
    achievedVsAsking: -5.8,
    purchaseDate: "2024-08-30",
    daysToSecure: 29,
    discountPercent: 5.8,
    
    rentalAppraisal: 1100,
    rentalAchieved: 1150,
    grossYield: 2.4,
    
    strategyTags: ["Private sale", "Luxury"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"],
    description: "Gated community villa with marina access.",
    features: ["Marina", "Golf Course", "Security", "Pool"]
  },
  {
    id: 14,
    agentId: 2,
    agentName: "David Mitchell",
    agentCompany: "Metro Property Solutions",
    agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.6,
    
    address: "Unit 505/200 Spencer St, Melbourne VIC 3000",
    suburb: "Melbourne CBD",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    propertyType: "Apartment",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    landSize: "N/A",
    buildingArea: "98 sqm",
    
    purchasePrice: 1480000,
    askingPrice: 1550000,
    achievedVsAsking: -4.5,
    purchaseDate: "2024-09-22",
    daysToSecure: 22,
    discountPercent: 4.5,
    
    rentalAppraisal: 780,
    rentalAchieved: 820,
    grossYield: 2.9,
    
    strategyTags: ["Auction", "Investment"],
    verified: true,
    
    photos: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"],
    description: "Modern apartment with city skyline views.",
    features: ["City Views", "Pool", "Gym", "Rooftop"]
  },
  {
    id: 15,
    agentId: 1,
    agentName: "Sarah Johnson",
    agentCompany: "Premium Realty Group",
    agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    agentRating: 4.8,
    
    address: "155 Military Road, Vaucluse NSW 2030",
    suburb: "Vaucluse",
    city: "Sydney",
    state: "NSW",
    postcode: "2030",
    propertyType: "House",
    dealType: "sale",
    status: "sold",
    
    bedrooms: 6,
    bathrooms: 5,
    carSpaces: 4,
    landSize: "850 sqm",
    buildingArea: "580 sqm",
    
    purchasePrice: null,
    askingPrice: null,
    achievedVsAsking: null,
    purchaseDate: "2024-06-15",
    daysToSecure: 65,
    discountPercent: null,
    
    rentalAppraisal: 3000,
    rentalAchieved: null,
    grossYield: null,
    
    strategyTags: ["Off-market", "Luxury", "Development"],
    verified: false,
    
    photos: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"],
    description: "Ultra-luxury estate with development potential. Price confidential.",
    features: ["Harbour Views", "Tennis Court", "Pool", "Guest House"]
  }
];

// Helper function to get deals by agent ID
export const getDealsByAgentId = (agentId) => {
  return mockDeals.filter(deal => deal.agentId === agentId);
};

// Helper function to format price for buyer agents
export const formatDealPrice = (deal) => {
  if (!deal.purchasePrice || deal.purchasePrice === null) {
    return "Undisclosed";
  }
  
  if (deal.purchasePrice >= 1000000) {
    return `$${(deal.purchasePrice / 1000000).toFixed(2)}M`;
  }
  return `$${(deal.purchasePrice / 1000).toFixed(0)}K`;
};

// Helper to format discount/achievement
export const formatAchievement = (deal) => {
  if (deal.achievedVsAsking === null) {
    return deal.discountPercent ? `${deal.discountPercent}% vs AVM` : null;
  }
  return `${Math.abs(deal.achievedVsAsking).toFixed(1)}% ${deal.achievedVsAsking < 0 ? 'below' : 'above'} asking`;
};

// Helper to calculate days ago
export const getDaysAgo = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Strategy tag options for filters
export const strategyTagOptions = [
  "Off-market",
  "Auction",
  "Private sale",
  "Reno opportunity",
  "Development",
  "High-yield",
  "First-home buyer",
  "Investment",
  "Pre-auction"
];

// Property type options
export const propertyTypeOptions = [
  "House",
  "Apartment",
  "Townhouse",
  "Villa",
  "Land",
  "Studio"
];

// State options
export const stateOptions = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT"
];

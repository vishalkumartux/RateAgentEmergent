// Mock data for real estate agents
export const mockAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@premiumrealty.com",
    phone: "+61 2 9876 5432",
    photo: "https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face",
    company: "Premium Realty Group",
    location: "Sydney, NSW",
    rating: 4.8,
    reviewCount: 127,
    yearsExperience: 12,
    specialties: ["Luxury Homes", "Waterfront Properties", "Investment"],
    bio: "Specializing in luxury waterfront properties with over 12 years of experience in Sydney's premium market. Known for exceptional negotiation skills and personalized service.",
    salesVolume: "$50M+",
    avgDaysOnMarket: 18,
    priceAccuracy: "98%",
    
    // Enhanced comparison data
    coverageAreas: ["Bondi", "Double Bay", "Vaucluse", "Rose Bay"],
    services: ["Buyer Agent", "Property Search", "Negotiation", "Settlement"],
    feeModel: "$15,000 - $25,000 fixed + 1.5% success fee",
    
    // Performance metrics
    medianDaysToSecure: 42,
    verifiedDealsCount: 89,
    avgDiscountPercent: 5.2,
    auctionSuccessRatio: 78,
    offMarketRatio: 35,
    
    // Deal mix
    propertyTypesMix: {
      "House": 45,
      "Apartment": 30,
      "Townhouse": 15,
      "Land": 10
    },
    priceBandDistribution: {
      "Under $1M": 15,
      "$1M-$2M": 25,
      "$2M-$5M": 40,
      "Over $5M": 20
    },
    
    // Customer voice
    topTags: ["Great negotiator", "Market expert", "Responsive", "Honest advice"],
    
    // Compliance
    licenceNumber: "NSW-20123456",
    industryMemberships: ["REIA", "REBAA", "AREC"],
    professionalIndemnity: true,
    description: "Specializing in luxury waterfront properties with over 12 years of experience in Sydney's premium market. Known for exceptional negotiation skills and personalized service.",
    recentSales: [
      { address: "123 Ocean View Dr, Bondi", price: "$2.8M", date: "2024-07-15", daysOnMarket: 18 },
      { address: "45 Harbour St, Double Bay", price: "$3.2M", date: "2024-07-08", daysOnMarket: 25 },
      { address: "78 Beach Rd, Coogee", price: "$1.9M", date: "2024-06-22", daysOnMarket: 31 }
    ],
    reviews: [
      { id: 1, author: "Michael Chen", rating: 5, comment: "Sarah made our home buying process seamless. Excellent communication and market knowledge.", date: "2024-07-20" },
      { id: 2, author: "Lisa Williams", rating: 5, comment: "Professional, responsive, and got us the best price for our property. Highly recommend!", date: "2024-07-10" }
    ]
  },
  {
    id: 2,
    name: "David Mitchell",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    company: "Metro Property Solutions",
    location: "Melbourne, VIC",
    specialties: ["First Home Buyers", "Apartments"],
    rating: 4.6,
    reviewCount: 89,
    salesVolume: "$12.3M",
    avgDaysOnMarket: 31,
    priceAccuracy: "96.8%",
    yearsExperience: 6,
    phone: "+61 3 9555 0456",
    email: "david@metroproperty.com.au",
    description: "Helping first-time buyers navigate the Melbourne market with patience and expertise in apartment sales.",
    
    // Enhanced comparison data
    coverageAreas: ["Melbourne CBD", "Carlton", "Fitzroy", "South Yarra", "Docklands"],
    services: ["Buyer Agent", "First Home Buyer Support", "Property Search", "Finance Advisory"],
    feeModel: "$8,000 - $12,000 fixed",
    
    // Performance metrics
    medianDaysToSecure: 38,
    verifiedDealsCount: 67,
    avgDiscountPercent: 4.8,
    auctionSuccessRatio: 65,
    offMarketRatio: 25,
    
    // Deal mix
    propertyTypesMix: {
      "Apartment": 60,
      "Townhouse": 25,
      "House": 10,
      "Studio": 5
    },
    priceBandDistribution: {
      "Under $500K": 25,
      "$500K-$800K": 40,
      "$800K-$1.2M": 30,
      "Over $1.2M": 5
    },
    
    // Customer voice
    topTags: ["First home buyer expert", "Patient advisor", "Budget conscious", "Great support"],
    
    // Compliance
    licenceNumber: "VIC-20987654",
    industryMemberships: ["REIA", "FBAA"],
    professionalIndemnity: true,
    
    recentSales: [
      { address: "Unit 12/456 Collins St, Melbourne", price: "$850K", date: "2024-07-18", daysOnMarket: 22 },
      { address: "205/789 Swanston St, Carlton", price: "$720K", date: "2024-07-05", daysOnMarket: 35 },
      { address: "302/15 Docklands Dr, Docklands", price: "$680K", date: "2024-06-28", daysOnMarket: 28 }
    ],
    reviews: [
      { id: 3, author: "Emma Thompson", rating: 5, comment: "David was patient and helped us find our perfect first home. Great experience!", date: "2024-07-22" },
      { id: 4, author: "James Roberts", rating: 4, comment: "Knowledgeable agent with good market insights. Smooth transaction process.", date: "2024-07-12" }
    ]
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    company: "Coastal Realty Experts",
    location: "Gold Coast, QLD",
    specialties: ["Waterfront Properties", "Holiday Rentals"],
    rating: 4.9,
    reviewCount: 156,
    salesVolume: "$22.1M",
    avgDaysOnMarket: 19,
    priceAccuracy: "99.1%",
    yearsExperience: 12,
    phone: "+61 7 5555 0789",
    email: "maria@coastalrealty.com.au",
    description: "Gold Coast's premier waterfront property specialist with over a decade of experience in luxury coastal real estate.",
    
    // Enhanced comparison data
    coverageAreas: ["Surfers Paradise", "Sanctuary Cove", "Broadbeach", "Main Beach", "Southport"],
    services: ["Buyer Agent", "Waterfront Specialist", "Investment Advisory", "Holiday Home Search"],
    feeModel: "$18,000 - $30,000 fixed + 2% success fee",
    
    // Performance metrics
    medianDaysToSecure: 35,
    verifiedDealsCount: 124,
    avgDiscountPercent: 6.5,
    auctionSuccessRatio: 85,
    offMarketRatio: 45,
    
    // Deal mix
    propertyTypesMix: {
      "House": 50,
      "Apartment": 35,
      "Villa": 10,
      "Land": 5
    },
    priceBandDistribution: {
      "$1M-$2M": 20,
      "$2M-$5M": 45,
      "$5M-$10M": 25,
      "Over $10M": 10
    },
    
    // Customer voice
    topTags: ["Waterfront expert", "Exceptional service", "Market insider", "Luxury specialist"],
    
    // Compliance
    licenceNumber: "QLD-20456789",
    industryMemberships: ["REIA", "REIQ", "LPMA"],
    professionalIndemnity: true,
    
    recentSales: [
      { address: "88 Beachfront Ave, Surfers Paradise", price: "$4.2M", date: "2024-07-25", daysOnMarket: 15 },
      { address: "22 Marina Way, Sanctuary Cove", price: "$3.8M", date: "2024-07-12", daysOnMarket: 21 },
      { address: "15 Ocean Blvd, Broadbeach", price: "$2.9M", date: "2024-06-30", daysOnMarket: 18 }
    ],
    reviews: [
      { id: 5, author: "Robert Kim", rating: 5, comment: "Maria's expertise in waterfront properties is unmatched. Exceptional service throughout.", date: "2024-07-28" }
    ]
  },
  {
    id: 4,
    name: "Tom Anderson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    company: "Urban Property Group",
    location: "Brisbane, QLD",
    specialties: ["Commercial", "Investment Properties"],
    rating: 4.4,
    reviewCount: 73,
    salesVolume: "$15.7M",
    avgDaysOnMarket: 28,
    priceAccuracy: "95.3%",
    yearsExperience: 9,
    phone: "+61 7 3555 0321",
    email: "tom@urbanproperty.com.au",
    description: "Brisbane commercial and investment property specialist with strong connections in the business community.",
    
    // Enhanced comparison data
    coverageAreas: ["Brisbane CBD", "Fortitude Valley", "South Brisbane", "New Farm", "West End"],
    services: ["Buyer Agent", "Investment Analysis", "Commercial Advisory", "Portfolio Building"],
    feeModel: "$10,000 - $20,000 fixed + 1% success fee",
    
    // Performance metrics
    medianDaysToSecure: 52,
    verifiedDealsCount: 58,
    avgDiscountPercent: 3.5,
    auctionSuccessRatio: 55,
    offMarketRatio: 40,
    
    // Deal mix
    propertyTypesMix: {
      "Commercial": 45,
      "Apartment": 30,
      "Office": 15,
      "Retail": 10
    },
    priceBandDistribution: {
      "$500K-$1M": 20,
      "$1M-$2M": 35,
      "$2M-$5M": 30,
      "Over $5M": 15
    },
    
    // Customer voice
    topTags: ["Investment savvy", "Commercial expert", "Deal maker", "Strategic thinker"],
    
    // Compliance
    licenceNumber: "QLD-20654321",
    industryMemberships: ["REIA", "REIQ", "PCA"],
    professionalIndemnity: true,
    
    recentSales: [
      { address: "Level 3/123 Queen St, Brisbane CBD", price: "$2.1M", date: "2024-07-20", daysOnMarket: 33 },
      { address: "Suite 5/45 James St, Fortitude Valley", price: "$1.8M", date: "2024-07-08", daysOnMarket: 45 },
      { address: "Shop 8/99 Adelaide St, Brisbane CBD", price: "$1.2M", date: "2024-06-25", daysOnMarket: 38 }
    ],
    reviews: [
      { id: 6, author: "Jennifer Lee", rating: 4, comment: "Good commercial property knowledge. Professional throughout the process.", date: "2024-07-25" }
    ]
  },
  {
    id: 5,
    name: "Rachel Green",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    company: "Hills Estate Agency",
    location: "Adelaide, SA",
    specialties: ["Family Homes", "Suburbs"],
    rating: 4.7,
    reviewCount: 94,
    salesVolume: "$11.2M",
    avgDaysOnMarket: 26,
    priceAccuracy: "97.5%",
    yearsExperience: 5,
    phone: "+61 8 8555 0654",
    email: "rachel@hillsestate.com.au",
    description: "Dedicated to helping families find their perfect home in Adelaide's most desirable suburbs.",
    
    // Enhanced comparison data
    coverageAreas: ["Burnside", "Norwood", "Unley", "Prospect", "Glenelg"],
    services: ["Buyer Agent", "Family Home Search", "School Zone Advisory", "Suburb Specialist"],
    feeModel: "$7,000 - $10,000 fixed",
    
    // Performance metrics
    medianDaysToSecure: 45,
    verifiedDealsCount: 72,
    avgDiscountPercent: 4.2,
    auctionSuccessRatio: 70,
    offMarketRatio: 20,
    
    // Deal mix
    propertyTypesMix: {
      "House": 70,
      "Townhouse": 20,
      "Villa": 8,
      "Land": 2
    },
    priceBandDistribution: {
      "$500K-$800K": 30,
      "$800K-$1.2M": 40,
      "$1.2M-$2M": 25,
      "Over $2M": 5
    },
    
    // Customer voice
    topTags: ["Family focused", "School expert", "Suburb knowledge", "Caring approach"],
    
    // Compliance
    licenceNumber: "SA-20321987",
    industryMemberships: ["REIA", "REISA"],
    professionalIndemnity: true,
    
    recentSales: [
      { address: "56 Tree-lined Ave, Burnside", price: "$1.4M", date: "2024-07-19", daysOnMarket: 24 },
      { address: "88 Park View Dr, Norwood", price: "$950K", date: "2024-07-05", daysOnMarket: 31 },
      { address: "22 Family St, Unley", price: "$820K", date: "2024-06-22", daysOnMarket: 28 }
    ],
    reviews: [
      { id: 7, author: "Peter Wilson", rating: 5, comment: "Rachel understood exactly what we were looking for. Great communication and follow-up.", date: "2024-07-21" }
    ]
  }
];

export const mockComparisonData = {
  agents: [],
  metrics: [
    { label: "Average Rating", key: "rating" },
    { label: "Sales Volume (12 months)", key: "salesVolume" },
    { label: "Avg Days on Market", key: "avgDaysOnMarket" },
    { label: "Price Accuracy", key: "priceAccuracy" },
    { label: "Years Experience", key: "yearsExperience" },
    { label: "Total Reviews", key: "reviewCount" }
  ]
};

export const mockSearchFilters = {
  locations: ["Sydney, NSW", "Melbourne, VIC", "Brisbane, QLD", "Perth, WA", "Adelaide, SA", "Gold Coast, QLD"],
  specialties: ["Luxury Homes", "First Home Buyers", "Investment Properties", "Commercial", "Apartments", "Waterfront Properties", "Holiday Rentals", "Family Homes", "Suburbs"],
  companies: ["Premium Realty Group", "Metro Property Solutions", "Coastal Realty Experts", "Urban Property Group", "Hills Estate Agency"]
};
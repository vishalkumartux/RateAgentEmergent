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
    recentSales: [
      { address: "Unit 12/456 Collins St, Melbourne", price: "$850K", date: "2024-07-18", daysOnMarket: 22 },
      { address: "205/789 Swanston St, Carlton", price: "$720K", date: "2024-07-05", daysOnMarket: 35 }
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
    recentSales: [
      { address: "88 Beachfront Ave, Surfers Paradise", price: "$4.2M", date: "2024-07-25", daysOnMarket: 15 },
      { address: "22 Marina Way, Sanctuary Cove", price: "$3.8M", date: "2024-07-12", daysOnMarket: 21 }
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
    recentSales: [
      { address: "Level 3/123 Queen St, Brisbane CBD", price: "$2.1M", date: "2024-07-20", daysOnMarket: 33 }
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
    recentSales: [
      { address: "56 Tree-lined Ave, Burnside", price: "$1.4M", date: "2024-07-19", daysOnMarket: 24 }
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
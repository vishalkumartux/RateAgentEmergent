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
  },
  {
    id: 6,
    name: "James Anderson",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    company: "Perth Property Partners",
    location: "Perth, WA",
    specialties: ["Luxury Homes", "Waterfront"],
    rating: 4.7,
    reviewCount: 112,
    salesVolume: "$18.5M",
    avgDaysOnMarket: 24,
    priceAccuracy: "97.8%",
    yearsExperience: 8,
    phone: "+61 8 9555 0123",
    email: "james@perthproperty.com.au",
    description: "Luxury property specialist focusing on Perth's premium waterfront and riverside locations.",
    coverageAreas: ["Perth CBD", "Cottesloe", "Peppermint Grove", "Dalkeith", "Mosman Park"],
    services: ["Buyer Agent", "Luxury Specialist", "Investment Advisory", "Portfolio Management"],
    feeModel: "$20,000 - $35,000 fixed + 2% success fee",
    medianDaysToSecure: 45,
    verifiedDealsCount: 92,
    avgDiscountPercent: 5.5,
    auctionSuccessRatio: 72,
    offMarketRatio: 38,
    propertyTypesMix: { "House": 80, "Apartment": 15, "Villa": 5 },
    priceBandDistribution: { "$2M-$5M": 40, "$5M-$10M": 35, "Over $10M": 25 },
    topTags: ["Luxury expert", "Waterfront specialist", "High-end negotiator"],
    licenceNumber: "WA-20789456",
    industryMemberships: ["REIA", "REIWA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "45 Oceanview Dr, Cottesloe", price: "$6.2M", date: "2024-08-10", daysOnMarket: 28 },
      { address: "12 River Rd, Peppermint Grove", price: "$5.8M", date: "2024-07-28", daysOnMarket: 32 }
    ],
    reviews: []
  },
  {
    id: 7,
    name: "Sophie Chen",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    company: "Smart Property Solutions",
    location: "Canberra, ACT",
    specialties: ["First Home Buyers", "Investment"],
    rating: 4.9,
    reviewCount: 145,
    salesVolume: "$14.2M",
    avgDaysOnMarket: 19,
    priceAccuracy: "98.5%",
    yearsExperience: 7,
    phone: "+61 2 6555 0789",
    email: "sophie@smartproperty.com.au",
    description: "Specializing in helping first-home buyers and investors navigate Canberra's competitive market.",
    coverageAreas: ["Canberra City", "Braddon", "Kingston", "Belconnen", "Gungahlin"],
    services: ["Buyer Agent", "First Home Buyer Support", "Investment Analysis", "Finance Advisory"],
    feeModel: "$8,000 - $12,000 fixed",
    medianDaysToSecure: 32,
    verifiedDealsCount: 118,
    avgDiscountPercent: 6.8,
    auctionSuccessRatio: 88,
    offMarketRatio: 30,
    propertyTypesMix: { "House": 55, "Apartment": 35, "Townhouse": 10 },
    priceBandDistribution: { "$500K-$800K": 45, "$800K-$1.2M": 40, "$1.2M-$2M": 15 },
    topTags: ["First-home champion", "Budget wizard", "Market insider", "Fast results"],
    licenceNumber: "ACT-20123654",
    industryMemberships: ["REIA", "FBAA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "25 Modern St, Braddon", price: "$890K", date: "2024-09-05", daysOnMarket: 18 },
      { address: "78 Urban Ave, Kingston", price: "$950K", date: "2024-08-22", daysOnMarket: 21 }
    ],
    reviews: []
  },
  {
    id: 8,
    name: "Michael Brown",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    company: "Brisbane Buyers Agency",
    location: "Brisbane, QLD",
    specialties: ["Apartments", "Inner City"],
    rating: 4.5,
    reviewCount: 87,
    salesVolume: "$13.8M",
    avgDaysOnMarket: 27,
    priceAccuracy: "96.2%",
    yearsExperience: 6,
    phone: "+61 7 3555 0456",
    email: "michael@brisbanebuyersagency.com.au",
    description: "Inner-city apartment specialist with deep knowledge of Brisbane's urban property market.",
    coverageAreas: ["Brisbane CBD", "South Brisbane", "Fortitude Valley", "Kangaroo Point", "West End"],
    services: ["Buyer Agent", "Apartment Specialist", "Investment Advisory", "Property Search"],
    feeModel: "$9,000 - $14,000 fixed",
    medianDaysToSecure: 38,
    verifiedDealsCount: 74,
    avgDiscountPercent: 4.1,
    auctionSuccessRatio: 68,
    offMarketRatio: 28,
    propertyTypesMix: { "Apartment": 85, "Townhouse": 10, "Studio": 5 },
    priceBandDistribution: { "$400K-$600K": 35, "$600K-$900K": 45, "$900K-$1.5M": 20 },
    topTags: ["Apartment pro", "CBD expert", "Investment focused"],
    licenceNumber: "QLD-20987321",
    industryMemberships: ["REIA", "REIQ"],
    professionalIndemnity: true,
    recentSales: [
      { address: "Unit 405/55 Mary St, Brisbane CBD", price: "$750K", date: "2024-08-28", daysOnMarket: 25 }
    ],
    reviews: []
  },
  {
    id: 9,
    name: "Emma Wilson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    company: "Melbourne Homes Agency",
    location: "Melbourne, VIC",
    specialties: ["Family Homes", "Schools"],
    rating: 4.8,
    reviewCount: 134,
    salesVolume: "$16.7M",
    avgDaysOnMarket: 22,
    priceAccuracy: "97.9%",
    yearsExperience: 9,
    phone: "+61 3 9555 0321",
    email: "emma@melbournehomes.com.au",
    description: "Family home expert with extensive knowledge of Melbourne's best school zones and suburbs.",
    coverageAreas: ["Kew", "Camberwell", "Glen Iris", "Hawthorn", "Balwyn"],
    services: ["Buyer Agent", "School Zone Expert", "Family Home Specialist", "Suburb Advisory"],
    feeModel: "$12,000 - $18,000 fixed",
    medianDaysToSecure: 40,
    verifiedDealsCount: 105,
    avgDiscountPercent: 5.3,
    auctionSuccessRatio: 82,
    offMarketRatio: 25,
    propertyTypesMix: { "House": 75, "Townhouse": 20, "Villa": 5 },
    priceBandDistribution: { "$1M-$1.5M": 30, "$1.5M-$2.5M": 45, "$2.5M-$5M": 25 },
    topTags: ["Family champion", "School expert", "Suburb knowledge", "Patient advisor"],
    licenceNumber: "VIC-20456123",
    industryMemberships: ["REIA", "REIV"],
    professionalIndemnity: true,
    recentSales: [
      { address: "88 Family Rd, Kew", price: "$2.2M", date: "2024-08-15", daysOnMarket: 29 }
    ],
    reviews: []
  },
  {
    id: 10,
    name: "Daniel Lee",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    company: "Sydney Investment Buyers",
    location: "Sydney, NSW",
    specialties: ["Investment Properties", "Development"],
    rating: 4.6,
    reviewCount: 98,
    salesVolume: "$19.3M",
    avgDaysOnMarket: 26,
    priceAccuracy: "96.8%",
    yearsExperience: 11,
    phone: "+61 2 9555 0987",
    email: "daniel@sydneyinvestment.com.au",
    description: "Investment and development specialist helping clients build profitable property portfolios.",
    coverageAreas: ["Parramatta", "Ryde", "Strathfield", "Bankstown", "Liverpool"],
    services: ["Buyer Agent", "Investment Analysis", "Development Advisory", "Portfolio Strategy"],
    feeModel: "$15,000 - $25,000 fixed + 1.5% success fee",
    medianDaysToSecure: 48,
    verifiedDealsCount: 86,
    avgDiscountPercent: 4.8,
    auctionSuccessRatio: 65,
    offMarketRatio: 42,
    propertyTypesMix: { "House": 45, "Apartment": 30, "Land": 15, "Commercial": 10 },
    priceBandDistribution: { "$800K-$1.2M": 30, "$1.2M-$2M": 40, "$2M-$5M": 30 },
    topTags: ["Investment guru", "Development expert", "ROI focused"],
    licenceNumber: "NSW-20789654",
    industryMemberships: ["REIA", "PICA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "120 High St, Parramatta", price: "$1.8M", date: "2024-08-20", daysOnMarket: 35 }
    ],
    reviews: []
  },
  {
    id: 11,
    name: "Lisa Taylor",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face",
    company: "Gold Coast Luxury Buyers",
    location: "Gold Coast, QLD",
    specialties: ["Luxury", "Prestige"],
    rating: 4.9,
    reviewCount: 167,
    salesVolume: "$28.4M",
    avgDaysOnMarket: 18,
    priceAccuracy: "99.2%",
    yearsExperience: 13,
    phone: "+61 7 5555 0654",
    email: "lisa@goldcoastluxury.com.au",
    description: "Prestige property specialist with unmatched expertise in Gold Coast's luxury market.",
    coverageAreas: ["Surfers Paradise", "Broadbeach", "Main Beach", "Sanctuary Cove", "Hope Island"],
    services: ["Buyer Agent", "Luxury Specialist", "Prestige Advisory", "Exclusive Access"],
    feeModel: "$25,000 - $50,000 fixed + 2.5% success fee",
    medianDaysToSecure: 35,
    verifiedDealsCount: 142,
    avgDiscountPercent: 7.2,
    auctionSuccessRatio: 90,
    offMarketRatio: 55,
    propertyTypesMix: { "House": 60, "Apartment": 30, "Villa": 10 },
    priceBandDistribution: { "$2M-$5M": 30, "$5M-$10M": 40, "Over $10M": 30 },
    topTags: ["Luxury legend", "Prestige pro", "Exclusive access", "Top negotiator"],
    licenceNumber: "QLD-20321456",
    industryMemberships: ["REIA", "REIQ", "LPMA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "1 Oceanfront Blvd, Main Beach", price: "$8.5M", date: "2024-08-25", daysOnMarket: 22 }
    ],
    reviews: []
  },
  {
    id: 12,
    name: "Ryan Murphy",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    company: "Adelaide Smart Buyers",
    location: "Adelaide, SA",
    specialties: ["First Home Buyers", "Affordable"],
    rating: 4.7,
    reviewCount: 103,
    salesVolume: "$10.8M",
    avgDaysOnMarket: 23,
    priceAccuracy: "97.3%",
    yearsExperience: 5,
    phone: "+61 8 8555 0321",
    email: "ryan@adelaidesmartbuyers.com.au",
    description: "Helping first-home buyers achieve their property dreams with expert guidance and support.",
    coverageAreas: ["Adelaide CBD", "Glenelg", "Brighton", "Morphett Vale", "Salisbury"],
    services: ["Buyer Agent", "First Home Buyer Support", "Budget Advisory", "Finance Assistance"],
    feeModel: "$6,000 - $9,000 fixed",
    medianDaysToSecure: 35,
    verifiedDealsCount: 88,
    avgDiscountPercent: 5.9,
    auctionSuccessRatio: 75,
    offMarketRatio: 22,
    propertyTypesMix: { "House": 60, "Apartment": 25, "Townhouse": 15 },
    priceBandDistribution: { "$400K-$600K": 40, "$600K-$800K": 40, "$800K-$1M": 20 },
    topTags: ["First-home hero", "Budget friendly", "Patient guide"],
    licenceNumber: "SA-20654789",
    industryMemberships: ["REIA", "REISA", "FBAA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "45 Starter St, Glenelg", price: "$680K", date: "2024-09-01", daysOnMarket: 26 }
    ],
    reviews: []
  },
  {
    id: 13,
    name: "Amy Roberts",
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
    company: "Newcastle Property Pros",
    location: "Newcastle, NSW",
    specialties: ["Coastal", "Lifestyle"],
    rating: 4.8,
    reviewCount: 121,
    salesVolume: "$15.6M",
    avgDaysOnMarket: 21,
    priceAccuracy: "98.1%",
    yearsExperience: 8,
    phone: "+61 2 4955 0123",
    email: "amy@newcastlepros.com.au",
    description: "Coastal lifestyle specialist helping buyers find their perfect beachside property in Newcastle.",
    coverageAreas: ["Newcastle CBD", "Merewether", "Bar Beach", "The Junction", "Charlestown"],
    services: ["Buyer Agent", "Coastal Specialist", "Lifestyle Advisory", "Property Search"],
    feeModel: "$10,000 - $16,000 fixed",
    medianDaysToSecure: 37,
    verifiedDealsCount: 97,
    avgDiscountPercent: 5.7,
    auctionSuccessRatio: 78,
    offMarketRatio: 32,
    propertyTypesMix: { "House": 70, "Apartment": 20, "Townhouse": 10 },
    priceBandDistribution: { "$800K-$1.2M": 35, "$1.2M-$2M": 45, "$2M-$5M": 20 },
    topTags: ["Coastal expert", "Lifestyle guru", "Beach specialist"],
    licenceNumber: "NSW-20456987",
    industryMemberships: ["REIA"],
    professionalIndemnity: true,
    recentSales: [
      { address: "88 Beach Rd, Merewether", price: "$1.9M", date: "2024-08-18", daysOnMarket: 27 }
    ],
    reviews: []
  },
  {
    id: 14,
    name: "Chris Davis",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    company: "Hobart Home Hunters",
    location: "Hobart, TAS",
    specialties: ["Character Homes", "Heritage"],
    rating: 4.6,
    reviewCount: 76,
    salesVolume: "$9.2M",
    avgDaysOnMarket: 29,
    priceAccuracy: "96.5%",
    yearsExperience: 7,
    phone: "+61 3 6255 0789",
    email: "chris@hobarthomehunters.com.au",
    description: "Character and heritage home specialist with deep knowledge of Hobart's historic properties.",
    coverageAreas: ["Hobart CBD", "Battery Point", "Sandy Bay", "West Hobart", "North Hobart"],
    services: ["Buyer Agent", "Heritage Specialist", "Character Homes", "Renovation Advisory"],
    feeModel: "$8,000 - $13,000 fixed",
    medianDaysToSecure: 42,
    verifiedDealsCount: 64,
    avgDiscountPercent: 4.5,
    auctionSuccessRatio: 70,
    offMarketRatio: 27,
    propertyTypesMix: { "House": 80, "Townhouse": 15, "Apartment": 5 },
    priceBandDistribution: { "$600K-$900K": 40, "$900K-$1.5M": 45, "$1.5M-$3M": 15 },
    topTags: ["Heritage expert", "Character specialist", "History lover"],
    licenceNumber: "TAS-20789123",
    industryMemberships: ["REIA", "REIT"],
    professionalIndemnity: true,
    recentSales: [
      { address: "22 Historic Ln, Battery Point", price: "$1.3M", date: "2024-08-12", daysOnMarket: 33 }
    ],
    reviews: []
  },
  {
    id: 15,
    name: "Jessica Martin",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    company: "Darwin Property Partners",
    location: "Darwin, NT",
    specialties: ["Tropical Living", "Investment"],
    rating: 4.5,
    reviewCount: 68,
    salesVolume: "$8.7M",
    avgDaysOnMarket: 31,
    priceAccuracy: "95.8%",
    yearsExperience: 6,
    phone: "+61 8 8955 0456",
    email: "jessica@darwinproperty.com.au",
    description: "Tropical lifestyle and investment specialist helping buyers navigate Darwin's unique market.",
    coverageAreas: ["Darwin CBD", "Parap", "Fannie Bay", "Nightcliff", "Casuarina"],
    services: ["Buyer Agent", "Tropical Specialist", "Investment Advisory", "Property Search"],
    feeModel: "$7,000 - $11,000 fixed",
    medianDaysToSecure: 44,
    verifiedDealsCount: 58,
    avgDiscountPercent: 4.2,
    auctionSuccessRatio: 62,
    offMarketRatio: 24,
    propertyTypesMix: { "House": 65, "Apartment": 25, "Villa": 10 },
    priceBandDistribution: { "$400K-$600K": 35, "$600K-$900K": 45, "$900K-$1.5M": 20 },
    topTags: ["Tropical expert", "Investment savvy", "Local knowledge"],
    licenceNumber: "NT-20123987",
    industryMemberships: ["REIA", "REINT"],
    professionalIndemnity: true,
    recentSales: [
      { address: "15 Tropical Dr, Fannie Bay", price: "$850K", date: "2024-08-05", daysOnMarket: 38 }
    ],
    reviews: []
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
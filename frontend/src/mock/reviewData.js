// Enhanced mock review data for buyer agent reviews
// Includes: title, service type, transaction type, budget band, suburb, verified status, helpful count, tags

export const BUDGET_BANDS = [
  "Under $500K",
  "$500K-$800K",
  "$800K-$1M",
  "$1M-$2M",
  "$2M-$5M",
  "Over $5M"
];

export const SERVICE_TYPES = [
  "Buyer Agent Service",
  "Property Search",
  "Negotiation Support",
  "Settlement Assistance",
  "Investment Advisory",
  "First Home Buyer Support"
];

export const TRANSACTION_TYPES = [
  "PPOR (Primary Residence)",
  "Investment Property",
  "Renovation Project",
  "Development Site"
];

export const REVIEW_TAGS = [
  "Great communication",
  "Strong negotiation",
  "Local knowledge",
  "Fast response",
  "Patient advisor",
  "Market expert",
  "Budget conscious",
  "Professional",
  "Trustworthy",
  "Goes above and beyond"
];

export const mockReviews = [
  {
    id: 1,
    agentId: 1,
    agentName: "Sarah Johnson",
    title: "Outstanding service, saved us $150K!",
    rating: 5,
    reviewerInitials: "M.C.",
    reviewerName: "Michael Chen",
    comment: "Sarah made our home buying process seamless. Her deep knowledge of the Sydney waterfront market and exceptional negotiation skills saved us over $150K on our dream property. She was always responsive, patient with our questions, and genuinely cared about finding the right fit for our family. Highly recommend!",
    date: "2024-07-20",
    serviceType: "Buyer Agent Service",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "$2M-$5M",
    suburb: "Bondi, NSW",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 24,
    tags: ["Great communication", "Strong negotiation", "Local knowledge", "Professional"]
  },
  {
    id: 2,
    agentId: 1,
    title: "Professional and got us the best price",
    rating: 5,
    reviewerInitials: "L.W.",
    reviewerName: "Lisa Williams",
    comment: "Professional, responsive, and got us the best price for our property. Sarah's market analysis was spot on, and her strategy for the negotiation was brilliant. We felt supported throughout the entire process. Highly recommend!",
    date: "2024-07-10",
    serviceType: "Negotiation Support",
    transactionType: "Investment Property",
    budgetBand: "$1M-$2M",
    suburb: "Double Bay, NSW",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 18,
    tags: ["Professional", "Market expert", "Fast response"]
  },
  {
    id: 3,
    agentId: 2,
    title: "Perfect for first home buyers",
    rating: 5,
    reviewerInitials: "E.T.",
    reviewerName: "Emma Thompson",
    comment: "David was patient and helped us find our perfect first home. He understood our budget constraints and never pressured us. His guidance through the entire first home buyer process was invaluable. We're now proud homeowners thanks to David!",
    date: "2024-07-22",
    serviceType: "First Home Buyer Support",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "$500K-$800K",
    suburb: "Carlton, VIC",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 31,
    tags: ["Patient advisor", "Great communication", "Budget conscious", "First home buyer expert"]
  },
  {
    id: 4,
    agentId: 2,
    title: "Smooth transaction process",
    rating: 4,
    reviewerInitials: "J.R.",
    reviewerName: "James Roberts",
    comment: "Knowledgeable agent with good market insights. The transaction process was smooth and David kept us informed at every stage. Would have given 5 stars if the process was a bit faster, but overall very satisfied.",
    date: "2024-07-12",
    serviceType: "Buyer Agent Service",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "$800K-$1M",
    suburb: "Fitzroy, VIC",
    verified: false,
    wouldRecommend: true,
    helpfulCount: 12,
    tags: ["Professional", "Local knowledge", "Market expert"]
  },
  {
    id: 5,
    agentId: 3,
    title: "Waterfront property expertise unmatched",
    rating: 5,
    reviewerInitials: "R.K.",
    reviewerName: "Robert Kim",
    comment: "Maria's expertise in waterfront properties is unmatched. She found us an off-market gem that ticked all our boxes. Her negotiation skills are exceptional, and she secured the property below market value. The entire experience was exceptional from start to finish.",
    date: "2024-07-28",
    serviceType: "Buyer Agent Service",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "Over $5M",
    suburb: "Surfers Paradise, QLD",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 42,
    tags: ["Strong negotiation", "Market expert", "Local knowledge", "Goes above and beyond"]
  },
  {
    id: 6,
    agentId: 4,
    title: "Good commercial property knowledge",
    rating: 4,
    reviewerInitials: "J.L.",
    reviewerName: "Jennifer Lee",
    comment: "Good commercial property knowledge. Professional throughout the process. Tom helped us navigate the complex commercial property market and secured a great investment property for our portfolio. Minor communication delays at times, but overall satisfied.",
    date: "2024-07-25",
    serviceType: "Investment Advisory",
    transactionType: "Investment Property",
    budgetBand: "$1M-$2M",
    suburb: "Brisbane CBD, QLD",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 9,
    tags: ["Professional", "Market expert", "Investment focused"]
  },
  {
    id: 7,
    agentId: 5,
    title: "Rachel understood exactly what we needed",
    rating: 5,
    reviewerInitials: "P.W.",
    reviewerName: "Peter Wilson",
    comment: "Rachel understood exactly what we were looking for in a family home. Her knowledge of school zones and family-friendly suburbs in Adelaide is incredible. She made the process stress-free and we love our new home. Great communication and follow-up throughout.",
    date: "2024-07-21",
    serviceType: "Buyer Agent Service",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "$800K-$1M",
    suburb: "Burnside, SA",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 20,
    tags: ["Great communication", "Local knowledge", "Family focused", "Patient advisor"]
  },
  {
    id: 8,
    agentId: 1,
    title: "Highly skilled negotiator",
    rating: 5,
    reviewerInitials: "D.M.",
    reviewerName: "David Martinez",
    comment: "Sarah is a highly skilled negotiator who truly understands the luxury property market. She guided us through multiple offers and helped us secure our dream waterfront home. Her attention to detail and market knowledge is exceptional.",
    date: "2024-06-15",
    serviceType: "Buyer Agent Service",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "Over $5M",
    suburb: "Vaucluse, NSW",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 15,
    tags: ["Strong negotiation", "Luxury expert", "Professional", "Market expert"]
  },
  {
    id: 9,
    agentId: 3,
    title: "Found us an off-market opportunity",
    rating: 5,
    reviewerInitials: "S.P.",
    reviewerName: "Sophie Peterson",
    comment: "Maria found us an amazing off-market opportunity that we would never have found ourselves. Her network and local connections are incredible. The entire buying process was smooth and professional.",
    date: "2024-06-28",
    serviceType: "Property Search",
    transactionType: "Investment Property",
    budgetBand: "$2M-$5M",
    suburb: "Sanctuary Cove, QLD",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 28,
    tags: ["Local knowledge", "Market expert", "Goes above and beyond", "Professional"]
  },
  {
    id: 10,
    agentId: 2,
    title: "Made first home buying easy",
    rating: 5,
    reviewerInitials: "A.N.",
    reviewerName: "Alex Nguyen",
    comment: "David made our first home buying experience incredibly easy. He patiently explained every step, helped us understand the paperwork, and negotiated a great price. We couldn't have asked for a better agent for our first purchase.",
    date: "2024-05-18",
    serviceType: "First Home Buyer Support",
    transactionType: "PPOR (Primary Residence)",
    budgetBand: "$500K-$800K",
    suburb: "Docklands, VIC",
    verified: true,
    wouldRecommend: true,
    helpfulCount: 35,
    tags: ["Patient advisor", "First home buyer expert", "Great communication", "Trustworthy"]
  }
];

// Helper function to get reviews by agent ID
export const getReviewsByAgentId = (agentId) => {
  return mockReviews.filter(review => review.agentId === agentId);
};

// Helper function to get all unique suburbs from reviews
export const getAllSuburbs = () => {
  return [...new Set(mockReviews.map(review => review.suburb))].sort();
};

// Helper function to filter reviews
export const filterReviews = (filters) => {
  let filtered = [...mockReviews];
  
  if (filters.rating) {
    filtered = filtered.filter(review => review.rating >= filters.rating);
  }
  
  if (filters.verifiedOnly) {
    filtered = filtered.filter(review => review.verified);
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(review => 
      filters.tags.some(tag => review.tags.includes(tag))
    );
  }
  
  if (filters.serviceType && filters.serviceType !== 'all') {
    filtered = filtered.filter(review => review.serviceType === filters.serviceType);
  }
  
  if (filters.transactionType && filters.transactionType !== 'all') {
    filtered = filtered.filter(review => review.transactionType === filters.transactionType);
  }
  
  if (filters.suburb && filters.suburb !== 'all') {
    filtered = filtered.filter(review => review.suburb === filters.suburb);
  }
  
  if (filters.dateFrom) {
    filtered = filtered.filter(review => new Date(review.date) >= new Date(filters.dateFrom));
  }
  
  if (filters.dateTo) {
    filtered = filtered.filter(review => new Date(review.date) <= new Date(filters.dateTo));
  }
  
  return filtered;
};

// Helper function to sort reviews
export const sortReviews = (reviews, sortBy) => {
  const sorted = [...reviews];
  
  switch (sortBy) {
    case 'helpful':
      return sorted.sort((a, b) => b.helpfulCount - a.helpfulCount);
    case 'recent':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'rating-high':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'rating-low':
      return sorted.sort((a, b) => a.rating - b.rating);
    default:
      return sorted;
  }
};

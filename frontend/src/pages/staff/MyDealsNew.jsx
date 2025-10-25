import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Plus,
  Search, 
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Home,
  CheckCircle,
  Clock,
  TrendingDown,
  Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyDealsNew = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock deals data matching the public deal model
  const myDeals = [
    {
      id: 1,
      agentId: 2, // Current user
      address: "42 Harbour View Drive, Bondi Beach NSW 2026",
      suburb: "Bondi Beach",
      state: "NSW",
      postcode: "2026",
      propertyType: "House",
      dealType: "sale",
      status: "Published", // Published/Draft for internal, "sold" for public
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: "450 sqm",
      purchasePrice: 3250000,
      askingPrice: 3450000,
      achievedVsAsking: -5.8,
      purchaseDate: "2024-08-15",
      daysToSecure: 42,
      discountPercent: 5.8,
      strategyTags: ["Off-market", "Pre-auction"],
      verified: true, // L1 verification
      method: "Private Treaty",
      photos: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
      ],
      description: "Secured this stunning oceanfront property 5.8% below asking."
    },
    {
      id: 2,
      agentId: 2,
      address: "15/88 George Street, Sydney NSW 2000",
      suburb: "Sydney CBD",
      state: "NSW",
      postcode: "2000",
      propertyType: "Apartment",
      dealType: "sale",
      status: "Published",
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      purchasePrice: 1450000,
      askingPrice: 1500000,
      achievedVsAsking: -3.3,
      purchaseDate: "2024-08-20",
      daysToSecure: 28,
      discountPercent: 3.3,
      strategyTags: ["Auction", "First-home buyer"],
      verified: true,
      method: "Auction",
      photos: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      agentId: 2,
      address: "78 Park Avenue, Paddington NSW 2021",
      suburb: "Paddington",
      state: "NSW",
      postcode: "2021",
      propertyType: "Townhouse",
      dealType: "sale",
      status: "Draft",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      purchasePrice: 1650000,
      askingPrice: 1700000,
      achievedVsAsking: -2.9,
      purchaseDate: "2024-10-05",
      daysToSecure: 35,
      discountPercent: 2.9,
      strategyTags: ["Private Treaty"],
      verified: false, // L0 - Pending verification
      method: "Private Treaty",
      photos: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 4,
      agentId: 2,
      address: "23 Beach Road, Manly NSW 2095",
      suburb: "Manly",
      state: "NSW",
      postcode: "2095",
      propertyType: "House",
      dealType: "sale",
      status: "Published",
      bedrooms: 5,
      bathrooms: 3,
      carSpaces: 2,
      purchasePrice: 0, // Undisclosed
      askingPrice: 0,
      achievedVsAsking: 0,
      purchaseDate: "2024-08-10",
      daysToSecure: 21,
      discountPercent: 0,
      strategyTags: ["Off-market", "Undisclosed"],
      verified: true,
      method: "Off-Market",
      photos: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 5,
      agentId: 2,
      address: "156 Crown Street, Surry Hills NSW 2010",
      suburb: "Surry Hills",
      state: "NSW",
      postcode: "2010",
      propertyType: "Apartment",
      dealType: "sale",
      status: "Published",
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      purchasePrice: 950000,
      askingPrice: 975000,
      achievedVsAsking: -2.6,
      purchaseDate: "2024-07-25",
      daysToSecure: 45,
      discountPercent: 2.6,
      strategyTags: ["Auction"],
      verified: true,
      method: "Auction",
      photos: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 6,
      agentId: 2,
      address: "89 Bay Street, Double Bay NSW 2028",
      suburb: "Double Bay",
      state: "NSW",
      postcode: "2028",
      propertyType: "House",
      dealType: "sale",
      status: "Draft",
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      purchasePrice: 3200000,
      askingPrice: 3300000,
      achievedVsAsking: -3.0,
      purchaseDate: "2024-10-12",
      daysToSecure: 38,
      discountPercent: 3.0,
      strategyTags: ["Auction"],
      verified: false,
      method: "Auction",
      photos: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"
      ]
    }
  ];

  // Popular searches
  const popularSearches = [
    { label: "Bondi Beach", value: "bondi" },
    { label: "Sydney CBD", value: "sydney" },
    { label: "Verified Only", filter: "verified" },
    { label: "Last 30 Days", filter: "recent" },
    { label: "Under $2M", filter: "budget" }
  ];

  // Stats
  const publishedCount = myDeals.filter(d => d.status === 'Published').length;
  const verifiedCount = myDeals.filter(d => d.verified).length;
  const totalValue = myDeals.reduce((sum, d) => sum + (d.purchasePrice || 0), 0);
  const avgDaysToSecure = Math.round(
    myDeals.reduce((sum, d) => sum + d.daysToSecure, 0) / myDeals.length
  );

  const stats = [
    {
      label: 'Published Deals',
      value: publishedCount,
      icon: BarChart3,
      color: 'text-black'
    },
    {
      label: 'Verified Deals',
      value: verifiedCount,
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      label: 'Total Portfolio Value',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-black'
    },
    {
      label: 'Avg Days-to-Secure',
      value: avgDaysToSecure,
      icon: Clock,
      color: 'text-gray-700'
    }
  ];

  // Filter deals
  const filteredDeals = myDeals.filter(deal => {
    const matchesSearch = !searchTerm || 
      deal.suburb?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    const matchesType = typeFilter === 'all' || deal.propertyType === typeFilter;
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && deal.verified) ||
      (verificationFilter === 'pending' && !deal.verified);
    
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'published' && deal.status === 'Published') ||
      (activeTab === 'draft' && deal.status === 'Draft') ||
      (activeTab === 'verified' && deal.verified);
    
    return matchesSearch && matchesStatus && matchesType && matchesVerification && matchesTab;
  });

  // Handle popular search click
  const handlePopularSearch = (search) => {
    if (search.value) {
      setSearchTerm(search.value);
    } else if (search.filter === 'verified') {
      setVerificationFilter('verified');
    } else if (search.filter === 'recent') {
      setSortBy('recent');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Deals
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your buyer agent portfolio
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/staff/deals/add">
                <Button className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Deal
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-card border-2 border-gray-100 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10" />
                <Input
                  placeholder="Search by suburb or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-primary rounded-2xl bg-background text-foreground font-medium"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-44 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">✅ Published</SelectItem>
                    <SelectItem value="Draft">📝 Draft</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="House">🏠 House</SelectItem>
                    <SelectItem value="Apartment">🏢 Apartment</SelectItem>
                    <SelectItem value="Townhouse">🏘️ Townhouse</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                  <SelectTrigger className="w-44 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold">
                    <SelectValue placeholder="Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="verified">✓ Verified (L1)</SelectItem>
                    <SelectItem value="pending">⏳ Pending (L0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Popular:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(search)}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white hover:text-black dark:hover:text-gray-700 transition-colors"
                >
                  {search.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="all" className="text-base">
              All ({myDeals.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="text-base">
              Published ({publishedCount})
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-base">
              Draft ({myDeals.length - publishedCount})
            </TabsTrigger>
            <TabsTrigger value="verified" className="text-base">
              Verified ({verifiedCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={deal.photos[0]} 
                        alt={deal.address}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge 
                          className={deal.status === 'Published' ? 'bg-success text-white' : 'bg-gray-600 text-white'}
                        >
                          {deal.status}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        {deal.verified ? (
                          <Badge className="bg-success text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-5">
                      {/* Address */}
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {deal.address.split(',')[0]}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {deal.suburb}, {deal.state}
                      </div>

                      {/* Property Type & Specs */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{deal.propertyType}</Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {deal.bedrooms}🛏️ {deal.bathrooms}🛁 {deal.carSpaces}🚗
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <p className="text-2xl font-bold text-black">
                          {deal.purchasePrice > 0 
                            ? `$${(deal.purchasePrice / 1000000).toFixed(2)}M`
                            : 'Undisclosed'}
                        </p>
                        {deal.purchasePrice > 0 && deal.discountPercent > 0 && (
                          <div className="flex items-center text-sm text-success dark:text-success">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            {deal.discountPercent}% below asking
                          </div>
                        )}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {deal.daysToSecure} days
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(deal.purchaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      {/* Method */}
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {deal.method}
                        </Badge>
                      </div>

                      {/* Strategy Tags */}
                      {deal.strategyTags && deal.strategyTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {deal.strategyTags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to={`/staff/deals/${deal.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/staff/deals/${deal.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        {deal.status === 'Draft' && (
                          <Button size="sm" className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm" title="Publish Deal">
                            <Upload className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No deals found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'Try adjusting your filters'
                      : 'Start building your portfolio by adding your first deal'}
                  </p>
                  <Link to="/staff/deals/add">
                    <Button className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Deal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyDealsNew;

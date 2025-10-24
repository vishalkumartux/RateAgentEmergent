import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Plus,
  Search, 
  Filter,
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
  Upload,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyDeals = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock deals data matching functional requirements
  const mockDeals = [
    {
      id: 1,
      status: 'Published',
      purchaseDate: '2024-09-15',
      suburb: 'Bondi',
      state: 'NSW',
      propertyType: 'House',
      price: 1850000,
      method: 'Auction',
      daysToSecure: 42,
      verification: 'L1',
      hasMedia: true,
      address: '45 Ocean View Drive',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      status: 'Published',
      purchaseDate: '2024-09-28',
      suburb: 'Mosman',
      state: 'NSW',
      propertyType: 'Apartment',
      price: 2100000,
      method: 'Private Treaty',
      daysToSecure: 28,
      verification: 'L0',
      hasMedia: true,
      address: '12 Harbour Street',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      status: 'Draft',
      purchaseDate: '2024-10-05',
      suburb: 'Paddington',
      state: 'NSW',
      propertyType: 'Townhouse',
      price: 1650000,
      method: 'Private Treaty',
      daysToSecure: 35,
      verification: 'L1',
      hasMedia: false,
      address: '78 Park Avenue',
      thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      status: 'Published',
      purchaseDate: '2024-08-20',
      suburb: 'Manly',
      state: 'NSW',
      propertyType: 'House',
      price: 0, // Undisclosed
      method: 'Off-Market',
      daysToSecure: 21,
      verification: 'L1',
      hasMedia: true,
      address: '23 Beach Road',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      status: 'Published',
      purchaseDate: '2024-08-05',
      suburb: 'Surry Hills',
      state: 'NSW',
      propertyType: 'Apartment',
      price: 950000,
      method: 'Auction',
      daysToSecure: 45,
      verification: 'L1',
      hasMedia: false,
      address: '156 Crown Street',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      status: 'Draft',
      purchaseDate: '2024-10-12',
      suburb: 'Double Bay',
      state: 'NSW',
      propertyType: 'House',
      price: 3200000,
      method: 'Auction',
      daysToSecure: 38,
      verification: 'L0',
      hasMedia: true,
      address: '89 Bay Street',
      thumbnail: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop'
    }
  ];
  
  // Popular searches for quick filters
  const popularSearches = [
    'Bondi', 'Mosman', 'Verified Deals', 'Last 30 Days', 'Over $2M'
  ];

  // Filter deals based on search and filters
  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || deal.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Filter deals by tab
  const getFilteredDealsByTab = (tab) => {
    switch (tab) {
      case 'active':
        return filteredDeals.filter(deal => deal.status === 'Active');
      case 'sold':
        return filteredDeals.filter(deal => deal.status === 'Sold' || deal.status === 'Leased');
      case 'contract':
        return filteredDeals.filter(deal => deal.status === 'Under Contract');
      default:
        return filteredDeals;
    }
  };

  const currentDeals = getFilteredDealsByTab(activeTab);

  // Summary stats
  const stats = [
    {
      label: 'Total Active',
      value: mockDeals.filter(d => d.status === 'Active').length,
      icon: Home,
      color: 'text-blue-600'
    },
    {
      label: 'Under Contract',
      value: mockDeals.filter(d => d.status === 'Under Contract').length,
      icon: Clock,
      color: 'text-blue-800'
    },
    {
      label: 'Sold This Month',
      value: mockDeals.filter(d => d.status === 'Sold' || d.status === 'Leased').length,
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      label: 'Total Commission',
      value: '$239,400',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-blue-600 text-white',
      'Under Contract': 'bg-blue-800 text-white',
      'Sold': 'bg-emerald-600 text-white',
      'Leased': 'bg-emerald-600 text-white'
    };
    return statusColors[status] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Deals
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your property listings, sales, and rental deals
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/staff/deals/add">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white">
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

        {/* Modern Search and Filters */}
        <Card className="mb-6 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Modern Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-800 z-10" />
                <Input
                  placeholder="Search by address or property details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  list="deal-search"
                  className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                />
                <datalist id="deal-search">
                  <option value="Bondi Beach" />
                  <option value="Double Bay" />
                  <option value="Coogee" />
                </datalist>
              </div>
              
              {/* Modern Filters */}
              <div className="flex space-x-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-44 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">📋 All Status</SelectItem>
                    <SelectItem value="active">🟢 Active</SelectItem>
                    <SelectItem value="under contract">🟡 Under Contract</SelectItem>
                    <SelectItem value="sold">✅ Sold</SelectItem>
                    <SelectItem value="leased">✅ Leased</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">💰 Sale</SelectItem>
                    <SelectItem value="rental">🏠 Rental</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Deals ({filteredDeals.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({getFilteredDealsByTab('active').length})</TabsTrigger>
            <TabsTrigger value="contract">Under Contract ({getFilteredDealsByTab('contract').length})</TabsTrigger>
            <TabsTrigger value="sold">Sold/Leased ({getFilteredDealsByTab('sold').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {/* Deals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={deal.thumbnail} 
                      alt={deal.address}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusBadge(deal.status)}>
                        {deal.status}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {deal.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {deal.address}
                      </h3>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{deal.propertyType}</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-800 mb-3">
                        {deal.price}
                      </div>
                    </div>
                    
                    {/* Property Details */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {deal.bedrooms > 0 && (
                        <div className="flex items-center">
                          <span className="font-medium">{deal.bedrooms}</span>
                          <span className="ml-1">bed</span>
                        </div>
                      )}
                      {deal.bathrooms > 0 && (
                        <div className="flex items-center">
                          <span className="font-medium">{deal.bathrooms}</span>
                          <span className="ml-1">bath</span>
                        </div>
                      )}
                      {deal.carSpaces > 0 && (
                        <div className="flex items-center">
                          <span className="font-medium">{deal.carSpaces}</span>
                          <span className="ml-1">car</span>
                        </div>
                      )}
                      {deal.landSize !== '0m²' && (
                        <div className="flex items-center">
                          <span className="font-medium">{deal.landSize}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400 mb-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{deal.daysOnMarket}</div>
                        <div>Days Listed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{deal.inspections}</div>
                        <div>Inspections</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{deal.enquiries}</div>
                        <div>Enquiries</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Commission: <span className="font-semibold text-emerald-600">{deal.commission}</span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link to={`/staff/deals/${deal.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/staff/deals/${deal.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Empty State */}
            {currentDeals.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No deals found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'Start by adding your first property deal'
                    }
                  </p>
                  <Link to="/staff/deals/add">
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Deal
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

export default MyDeals;
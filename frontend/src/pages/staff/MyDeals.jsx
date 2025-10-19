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
  Building2,
  Users,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyDeals = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock deals data - TODO: Replace with API call
  const mockDeals = [
    {
      id: 1,
      address: '123 Ocean View Drive, Bondi Beach NSW 2026',
      type: 'Sale',
      status: 'Active',
      price: '$2,800,000',
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: '650m²',
      propertyType: 'House',
      listedDate: '2024-07-15',
      daysOnMarket: 25,
      inspections: 12,
      enquiries: 8,
      photos: 15,
      commission: '$84,000',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      address: '45 Harbour Street, Double Bay NSW 2028',
      type: 'Sale',
      status: 'Under Contract',
      price: '$3,200,000',
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: '480m²',
      propertyType: 'Apartment',
      listedDate: '2024-06-20',
      daysOnMarket: 45,
      inspections: 18,
      enquiries: 15,
      photos: 12,
      commission: '$96,000',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      address: '78 Beach Road, Coogee NSW 2034',
      type: 'Sale', 
      status: 'Sold',
      price: '$1,900,000',
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      landSize: '420m²',
      propertyType: 'Townhouse',
      listedDate: '2024-05-10',
      daysOnMarket: 32,
      inspections: 22,
      enquiries: 18,
      photos: 18,
      commission: '$57,000',
      thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      address: '92 Park Avenue, Randwick NSW 2031',
      type: 'Rental',
      status: 'Leased',
      price: '$1,200/week',
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      landSize: '0m²',
      propertyType: 'Apartment',
      listedDate: '2024-07-01',
      daysOnMarket: 14,
      inspections: 8,
      enquiries: 12,
      photos: 10,
      commission: '$2,400',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      address: '156 Collins Street, Melbourne VIC 3000',
      type: 'Commercial',
      status: 'Active',
      price: '$8,500,000',
      bedrooms: 0,
      bathrooms: 0,
      carSpaces: 20,
      landSize: '1200m²',
      propertyType: 'Office Building',
      listedDate: '2024-06-15',
      daysOnMarket: 40,
      inspections: 6,
      enquiries: 4,
      photos: 25,
      commission: '$255,000',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
    }
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
      color: 'text-amber-600'
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
      'Under Contract': 'bg-amber-600 text-white',
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
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
                <Input
                  placeholder="Search by address or property details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  list="deal-search"
                  className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
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
                      <div className="text-2xl font-bold text-amber-600 mb-3">
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
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white">
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
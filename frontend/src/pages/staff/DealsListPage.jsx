import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Plus,
  Search,
  Filter,
  X,
  Edit,
  Eye,
  MoreVertical,
  CheckCircle,
  Clock,
  Home,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Upload,
  Download
} from 'lucide-react';

const DealsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [hasMedia, setHasMedia] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock deals data
  const dealsData = [
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
      address: '45 Ocean View Drive'
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
      address: '12 Harbour Street'
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
      address: '78 Park Avenue'
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
      address: '23 Beach Road'
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
      address: '156 Crown Street'
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
      address: '89 Bay Street'
    }
  ];

  // Filter deals based on search and filters
  const filteredDeals = dealsData.filter(deal => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        deal.suburb.toLowerCase().includes(query) ||
        deal.address.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && deal.status !== selectedStatus) return false;

    // Property type filter
    if (selectedPropertyType !== 'all' && deal.propertyType !== selectedPropertyType) return false;

    // Method filter
    if (selectedMethod !== 'all' && deal.method !== selectedMethod) return false;

    // Has media filter
    if (hasMedia && !deal.hasMedia) return false;

    // Date range filter
    if (dateRange.from && new Date(deal.purchaseDate) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(deal.purchaseDate) > new Date(dateRange.to)) return false;

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedPropertyType('all');
    setSelectedMethod('all');
    setHasMedia(false);
    setDateRange({ from: '', to: '' });
  };

  const activeFiltersCount = [
    selectedStatus !== 'all',
    selectedPropertyType !== 'all',
    selectedMethod !== 'all',
    hasMedia,
    dateRange.from || dateRange.to
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Deals
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Manage your property portfolio
              </p>
            </div>
            <Link to="/staff/deals/add">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Deal
              </Button>
            </Link>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by suburb or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-amber-600 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Bulk Actions Dropdown */}
            <Button variant="outline">
              <MoreVertical className="h-4 w-4 mr-2" />
              Actions
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  {/* Property Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Type
                    </label>
                    <select
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Types</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>

                  {/* Method Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purchase Method
                    </label>
                    <select
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Methods</option>
                      <option value="Auction">Auction</option>
                      <option value="Private Treaty">Private Treaty</option>
                      <option value="Off-Market">Off-Market</option>
                    </select>
                  </div>

                  {/* Date From */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date From
                    </label>
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    />
                  </div>

                  {/* Date To */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date To
                    </label>
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    />
                  </div>

                  {/* Has Media */}
                  <div className="flex items-center pt-7">
                    <input
                      type="checkbox"
                      id="hasMedia"
                      checked={hasMedia}
                      onChange={(e) => setHasMedia(e.target.checked)}
                      className="h-4 w-4 text-amber-600 rounded"
                    />
                    <label htmlFor="hasMedia" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Has Media (Photos/Docs)
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {selectedStatus !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {selectedStatus}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setSelectedStatus('all')}
                  />
                </Badge>
              )}
              {selectedPropertyType !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Type: {selectedPropertyType}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setSelectedPropertyType('all')}
                  />
                </Badge>
              )}
              {selectedMethod !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Method: {selectedMethod}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setSelectedMethod('all')}
                  />
                </Badge>
              )}
              {hasMedia && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Has Media
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setHasMedia(false)}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredDeals.length} of {dealsData.length} deals
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Deals List */}
        {filteredDeals.length > 0 ? (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header Row */}
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge 
                          variant={deal.status === 'Published' ? 'default' : 'secondary'}
                          className={deal.status === 'Published' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}
                        >
                          {deal.status === 'Published' ? (
                            <CheckCircle className="h-3 w-3 mr-1 inline" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1 inline" />
                          )}
                          {deal.status}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={deal.verification === 'L1' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        >
                          {deal.verification === 'L1' ? '✓ Verified' : 'Pending Verification'}
                        </Badge>
                        {deal.hasMedia && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Media
                          </Badge>
                        )}
                      </div>

                      {/* Address */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {deal.address}, {deal.suburb}
                      </h3>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Property Type</p>
                          <div className="flex items-center text-gray-900 dark:text-white font-medium">
                            <Home className="h-4 w-4 mr-1" />
                            {deal.propertyType}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Location</p>
                          <div className="flex items-center text-gray-900 dark:text-white font-medium">
                            <MapPin className="h-4 w-4 mr-1" />
                            {deal.suburb}, {deal.state}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Purchase Date</p>
                          <div className="flex items-center text-gray-900 dark:text-white font-medium">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(deal.purchaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Price</p>
                          <div className="flex items-center text-gray-900 dark:text-white font-medium">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {deal.price > 0 ? `$${(deal.price / 1000000).toFixed(2)}M` : 'Undisclosed'}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Method</p>
                          <div className="text-gray-900 dark:text-white font-medium">
                            {deal.method}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Days-to-Secure</p>
                          <div className="text-gray-900 dark:text-white font-medium">
                            {deal.daysToSecure} days
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link to={`/staff/deals/${deal.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/deal/${deal.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                      {deal.status === 'Draft' && (
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No deals found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeFiltersCount > 0 
                  ? 'Try adjusting your filters to see more results'
                  : 'Start building your portfolio by adding your first deal'}
              </p>
              <Link to="/staff/deals/add">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Deal
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DealsListPage;

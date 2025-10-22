import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import SEO from '../components/SEO';
import { 
  Search, 
  MapPin, 
  Bed,
  Bath,
  Car,
  Home,
  DollarSign,
  Calendar,
  SlidersHorizontal,
  X,
  Star,
  Clock,
  TrendingDown,
  CheckCircle,
  Heart,
  Share2,
  UserPlus,
  Map,
  List,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { 
  mockDeals, 
  formatDealPrice, 
  formatAchievement, 
  getDaysAgo,
  strategyTagOptions,
  propertyTypeOptions,
  stateOptions
} from '../mock/dealData';

const DealsPage = () => {
  // View mode
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    // Location
    state: '',
    suburb: '',
    postcode: '',
    
    // Property
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    carSpaces: '',
    
    // Budget
    minPrice: '',
    maxPrice: '',
    
    // Strategy
    strategyTags: [],
    verifiedOnly: false,
    
    // Date range
    dateFrom: '',
    dateTo: '',
    
    // Metrics
    maxDaysToSecure: '',
    minDiscountPercent: '',
    minYield: ''
  });

  // Sorting
  const [sortBy, setSortBy] = useState('recent'); // recent, highestDiscount, shortestDays, highestYield, priceLow, priceHigh
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter deals
  const filteredDeals = mockDeals.filter(deal => {
    // Search term
    const matchesSearch = !searchTerm || 
      deal.suburb?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.postcode?.includes(searchTerm);

    // State filter
    const matchesState = !filters.state || deal.state === filters.state;

    // Suburb filter
    const matchesSuburb = !filters.suburb || 
      deal.suburb?.toLowerCase().includes(filters.suburb.toLowerCase());

    // Postcode filter
    const matchesPostcode = !filters.postcode || deal.postcode?.includes(filters.postcode);

    // Property type
    const matchesPropertyType = !filters.propertyType || deal.propertyType === filters.propertyType;

    // Bedrooms
    const matchesBedrooms = !filters.bedrooms || deal.bedrooms >= parseInt(filters.bedrooms);

    // Bathrooms
    const matchesBathrooms = !filters.bathrooms || deal.bathrooms >= parseInt(filters.bathrooms);

    // Car spaces
    const matchesCarSpaces = !filters.carSpaces || deal.carSpaces >= parseInt(filters.carSpaces);

    // Price range
    const matchesPriceMin = !filters.minPrice || !deal.purchasePrice || deal.purchasePrice >= parseInt(filters.minPrice);
    const matchesPriceMax = !filters.maxPrice || !deal.purchasePrice || deal.purchasePrice <= parseInt(filters.maxPrice);

    // Strategy tags
    const matchesStrategyTags = filters.strategyTags.length === 0 || 
      (deal.strategyTags && filters.strategyTags.some(tag => deal.strategyTags.includes(tag)));

    // Verified only
    const matchesVerified = !filters.verifiedOnly || deal.verified === true;

    // Date range
    const matchesDateFrom = !filters.dateFrom || new Date(deal.purchaseDate) >= new Date(filters.dateFrom);
    const matchesDateTo = !filters.dateTo || new Date(deal.purchaseDate) <= new Date(filters.dateTo);

    // Metrics
    const matchesDaysToSecure = !filters.maxDaysToSecure || !deal.daysToSecure || deal.daysToSecure <= parseInt(filters.maxDaysToSecure);
    const matchesDiscountPercent = !filters.minDiscountPercent || !deal.discountPercent || deal.discountPercent >= parseFloat(filters.minDiscountPercent);
    const matchesYield = !filters.minYield || !deal.grossYield || deal.grossYield >= parseFloat(filters.minYield);

    return matchesSearch && matchesState && matchesSuburb && matchesPostcode &&
           matchesPropertyType && matchesBedrooms && matchesBathrooms && matchesCarSpaces &&
           matchesPriceMin && matchesPriceMax && matchesStrategyTags && matchesVerified &&
           matchesDateFrom && matchesDateTo && matchesDaysToSecure && matchesDiscountPercent && matchesYield;
  });

  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      case 'highestDiscount':
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      case 'shortestDays':
        return (a.daysToSecure || 999) - (b.daysToSecure || 999);
      case 'highestYield':
        return (b.grossYield || 0) - (a.grossYield || 0);
      case 'priceLow':
        return (a.purchasePrice || 999999999) - (b.purchasePrice || 999999999);
      case 'priceHigh':
        return (b.purchasePrice || 0) - (a.purchasePrice || 0);
      default:
        return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDeals = sortedDeals.slice(startIndex, startIndex + itemsPerPage);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      state: '',
      suburb: '',
      postcode: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      carSpaces: '',
      minPrice: '',
      maxPrice: '',
      strategyTags: [],
      verifiedOnly: false,
      dateFrom: '',
      dateTo: '',
      maxDaysToSecure: '',
      minDiscountPercent: '',
      minYield: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Count active filters
  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'strategyTags') return count + value.length;
    if (value !== '' && value !== false) return count + 1;
    return count;
  }, 0) + (searchTerm ? 1 : 0);

  // Toggle strategy tag
  const toggleStrategyTag = (tag) => {
    setFilters(prev => ({
      ...prev,
      strategyTags: prev.strategyTags.includes(tag)
        ? prev.strategyTags.filter(t => t !== tag)
        : [...prev.strategyTags, tag]
    }));
  };

  return (
    <>
      <SEO 
        title="Browse Buyer Agent Deals - Historical Property Purchases | AgentRate"
        description="Explore verified property deals secured by top buyer agents. See discounts achieved, days to secure, and rental yields across Australia."
        keywords="buyer agent deals, property purchases, real estate discounts, off-market deals, investment properties Australia"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Browse Buyer Agent Deals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover verified property purchases demonstrating buyer agent capability and results
            </p>
          </div>

          {/* Search & View Toggle */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Search Bar with suggestions */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
              <Input
                placeholder="Search by suburb, postcode, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                list="deals-suggestions"
                className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-800 dark:text-white font-medium transition-all"
              />
              <datalist id="deals-suggestions">
                <option value="Bondi Beach" />
                <option value="Sydney CBD" />
                <option value="Manly" />
                <option value="Randwick" />
                <option value="Paddington" />
                <option value="Off-market deals" />
                <option value="High-yield properties" />
                <option value="First-home buyer" />
              </datalist>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
                className={viewMode === 'map' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-amber-600 text-white">{activeFiltersCount}</Badge>
              )}
            </Button>
          </div>

          {/* Filters Modal */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setShowFilters(false)}
              ></div>
              
              {/* Modal */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-2xl my-8">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <Filter className="h-5 w-5 mr-2 text-amber-600" />
                        Advanced Filters
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={resetFilters}>
                          <X className="h-4 w-4 mr-1" />
                          Clear All
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    {activeFiltersCount > 0 && (
                      <p className="text-sm text-amber-600 dark:text-amber-500 mt-2">
                        {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                    <div className="space-y-6">
                      {/* Location Filters */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">📍 Location</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">State</label>
                            <select
                              value={filters.state}
                              onChange={(e) => setFilters({...filters, state: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">All States</option>
                              {stateOptions.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Suburb</label>
                            <Input
                              placeholder="Enter suburb"
                              value={filters.suburb}
                              onChange={(e) => setFilters({...filters, suburb: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Postcode</label>
                            <Input
                              placeholder="Enter postcode"
                              value={filters.postcode}
                              onChange={(e) => setFilters({...filters, postcode: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Property Filters */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">🏠 Property Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Type</label>
                            <select
                              value={filters.propertyType}
                              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">All Types</option>
                              {propertyTypeOptions.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Beds</label>
                            <Input
                              type="number"
                              placeholder="Any"
                              value={filters.bedrooms}
                              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Baths</label>
                            <Input
                              type="number"
                              placeholder="Any"
                              value={filters.bathrooms}
                              onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Parking</label>
                            <Input
                              type="number"
                              placeholder="Any"
                              value={filters.carSpaces}
                              onChange={(e) => setFilters({...filters, carSpaces: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">💰 Budget Range</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Price</label>
                            <Input
                              type="number"
                              placeholder="$ Min"
                              value={filters.minPrice}
                              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Max Price</label>
                            <Input
                              type="number"
                              placeholder="$ Max"
                              value={filters.maxPrice}
                              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Strategy Tags */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">🎯 Strategy Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {strategyTagOptions.map(tag => (
                            <Badge
                              key={tag}
                              variant={filters.strategyTags.includes(tag) ? 'default' : 'outline'}
                              className={`cursor-pointer ${filters.strategyTags.includes(tag) ? 'bg-amber-600 hover:bg-amber-700' : 'hover:border-amber-500'}`}
                              onClick={() => toggleStrategyTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Verification & Date */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">✓ Verification & Timeline</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="verifiedOnly"
                              checked={filters.verifiedOnly}
                              onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})}
                              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <label htmlFor="verifiedOnly" className="text-sm text-gray-900 dark:text-white cursor-pointer">
                              Verified deals only
                            </label>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">From Date</label>
                            <Input
                              type="date"
                              value={filters.dateFrom}
                              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">To Date</label>
                            <Input
                              type="date"
                              value={filters.dateTo}
                              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">📊 Performance Metrics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Max Days to Secure</label>
                            <Input
                              type="number"
                              placeholder="Any"
                              value={filters.maxDaysToSecure}
                              onChange={(e) => setFilters({...filters, maxDaysToSecure: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Discount %</label>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="Any"
                              value={filters.minDiscountPercent}
                              onChange={(e) => setFilters({...filters, minDiscountPercent: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Yield %</label>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="Any"
                              value={filters.minYield}
                              onChange={(e) => setFilters({...filters, minYield: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer with Apply Button */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {sortedDeals.length} deal{sortedDeals.length !== 1 ? 's' : ''} match your filters
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={resetFilters}>
                          Reset
                        </Button>
                        <Button 
                          className="bg-amber-600 hover:bg-amber-700"
                          onClick={() => setShowFilters(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Results Bar */}
          <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-gray-600 dark:text-gray-400">
              Showing {paginatedDeals.length} of {sortedDeals.length} deals
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="highestDiscount">Highest Discount %</option>
                <option value="shortestDays">Shortest Days to Secure</option>
                <option value="highestYield">Highest Yield %</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Map View Placeholder */}
          {viewMode === 'map' && (
            <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-16 text-center">
                <Map className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Map View Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Interactive map with deal clustering will be available in the next update
                </p>
                <Button variant="outline" onClick={() => setViewMode('list')}>
                  Switch to List View
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Deals Grid */}
          {viewMode === 'list' && (
            <>
              {paginatedDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-16 text-center">
                    <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No deals found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'bg-amber-600 hover:bg-amber-700' : ''}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Deal Card Component
const DealCard = ({ deal }) => {
  const achievement = formatAchievement(deal);
  
  return (
    <Card className="group hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.photos[0]}
          alt={deal.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {deal.verified && (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Headline: Suburb • Type • Date */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {deal.suburb} • {deal.propertyType}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            {getDaysAgo(deal.purchaseDate)}
          </div>
        </div>

        {/* Price Band */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600">
              {formatDealPrice(deal)}
            </span>
            {achievement && (
              <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                {achievement}
              </span>
            )}
          </div>
        </div>

        {/* Property Specs */}
        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
          {deal.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {deal.bedrooms}
            </div>
          )}
          {deal.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {deal.bathrooms}
            </div>
          )}
          {deal.carSpaces > 0 && (
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-1" />
              {deal.carSpaces}
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="flex flex-wrap gap-2 mb-3">
          {deal.daysToSecure && (
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {deal.daysToSecure} days
            </Badge>
          )}
          {deal.discountPercent && (
            <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
              <TrendingDown className="h-3 w-3 mr-1" />
              {deal.discountPercent}% off
            </Badge>
          )}
          {deal.grossYield && (
            <Badge variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {deal.grossYield}% yield
            </Badge>
          )}
        </div>

        {/* Strategy Tags */}
        {deal.strategyTags && deal.strategyTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {deal.strategyTags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Agent Chip */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Link to={`/agent/${deal.agentId}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img
              src={deal.agentPhoto}
              alt={deal.agentName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{deal.agentName}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-amber-400 fill-current mr-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{deal.agentRating}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Heart className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <UserPlus className="h-3 w-3 mr-1" />
            Shortlist
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
        </div>

        {/* View Links */}
        <div className="mt-3 flex gap-2">
          <Link to={`/deal/${deal.id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
              View Deal
            </Button>
          </Link>
          <Link to={`/agent/${deal.agentId}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950">
              View Agent
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsPage;

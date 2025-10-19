import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
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
  ArrowRight,
  User
} from 'lucide-react';
import { mockDeals, formatDealPrice } from '../mock/dealData';

const DealsPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [filters, setFilters] = useState({
    dealType: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter deals based on search and filters
  const filteredDeals = mockDeals.filter(deal => {
    // Location search
    const matchesLocation = !searchLocation || 
      deal.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      deal.suburb.toLowerCase().includes(searchLocation.toLowerCase()) ||
      deal.city.toLowerCase().includes(searchLocation.toLowerCase());

    // Deal type filter
    const matchesDealType = !filters.dealType || deal.dealType === filters.dealType;

    // Property type filter
    const matchesPropertyType = !filters.propertyType || deal.propertyType === filters.propertyType;

    // Bedrooms filter
    const matchesBedrooms = !filters.bedrooms || deal.bedrooms >= parseInt(filters.bedrooms);

    // Bathrooms filter
    const matchesBathrooms = !filters.bathrooms || deal.bathrooms >= parseInt(filters.bathrooms);

    // Price filter (for sales)
    let matchesPrice = true;
    if (deal.dealType === 'sale') {
      if (filters.minPrice && deal.price < parseInt(filters.minPrice)) matchesPrice = false;
      if (filters.maxPrice && deal.price > parseInt(filters.maxPrice)) matchesPrice = false;
    }

    return matchesLocation && matchesDealType && matchesPropertyType && 
           matchesBedrooms && matchesBathrooms && matchesPrice;
  });

  const resetFilters = () => {
    setFilters({
      dealType: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setSearchLocation('');
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <>
      <SEO 
        title="Browse Property Deals - Real Estate Transactions by Top Agents | AgentRate"
        description="Explore sold properties and rental deals handled by Australia's top-rated real estate agents. Filter by location, price, property type, and more."
        keywords="property deals Australia, real estate sales, sold properties, rental properties, property listings, agent deals"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Property Deals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover properties handled by our top-rated agents. Find your perfect property and connect with the agent who made it happen.
          </p>
        </div>

        {/* Modern Search and Filters */}
        <Card className="mb-8 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Main Search Bar */}
              <div className="flex gap-3">
                <div className="flex-1 relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
                  <Input
                    placeholder="Search by location, suburb, or address..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    list="deal-locations"
                    className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                  />
                  <datalist id="deal-locations">
                    <option value="Sydney CBD" />
                    <option value="Bondi Beach" />
                    <option value="Manly" />
                    <option value="Double Bay" />
                    <option value="Darling Point" />
                    <option value="Coogee" />
                  </datalist>
                </div>
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-14 px-6 rounded-2xl font-semibold transition-all ${
                    showFilters 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'border-2 border-gray-200 dark:border-gray-600 hover:border-amber-600 dark:text-gray-300'
                  }`}
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-white text-amber-600">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Popular Searches */}
              {!showFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Quick Search:
                  </span>
                  {['Bondi Beach', 'Sydney CBD', 'Manly', 'Apartments', 'Houses', 'Under $2M'].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setSearchLocation(quick)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 rounded-full text-sm transition-all duration-200 hover:shadow-md"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              )}

              {/* Modern Filters Panel */}
              {showFilters && (
                <div className="pt-6 border-t-2 border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block flex items-center">
                        <Home className="h-4 w-4 mr-1.5 text-amber-600" />
                        Deal Type
                      </label>
                      <select
                        value={filters.dealType}
                        onChange={(e) => setFilters({ ...filters, dealType: e.target.value })}
                        className="w-full h-11 px-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 bg-white dark:bg-gray-700 dark:text-white font-medium transition-all"
                      >
                        <option value="">All</option>
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Property Type
                      </label>
                      <select
                        value={filters.propertyType}
                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">All Types</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Min Bedrooms
                      </label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Min Bathrooms
                      </label>
                      <select
                        value={filters.bathrooms}
                        onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Min Price
                      </label>
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Max Price
                      </label>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          Found <span className="font-semibold text-gray-900 dark:text-white">{filteredDeals.length}</span> deals
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                {/* Image */}
                <Link to={`/deal/${deal.id}`}>
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src={deal.photos[0]}
                      alt={deal.address}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${deal.dealType === 'sale' ? 'bg-amber-600' : 'bg-blue-600'} text-white`}>
                        {deal.dealType === 'sale' ? 'Sold' : 'Leased'}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-amber-600">
                      {formatDealPrice(deal)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {deal.dealType === 'sale' ? `Sold ${deal.soldDate}` : `Leased ${deal.soldDate}`}
                    </div>
                  </div>

                  {/* Address */}
                  <Link to={`/deal/${deal.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {deal.address}
                    </h3>
                  </Link>

                  {/* Property Details */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{deal.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{deal.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-1" />
                      <span>{deal.carSpaces}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{deal.propertyType}</span>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link to={`/agent/${deal.agentId}`} className="flex items-center space-x-3 group/agent">
                      <img
                        src={deal.agentPhoto}
                        alt={deal.agentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover/agent:text-amber-600 transition-colors">
                          {deal.agentName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {deal.agentCompany}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover/agent:text-amber-600 transition-colors" />
                    </Link>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/deal/${deal.id}`} className="block mt-4">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-16">
            <Home className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No deals found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search criteria
            </p>
            <Button onClick={resetFilters} className="bg-amber-600 hover:bg-amber-700 text-white">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default DealsPage;

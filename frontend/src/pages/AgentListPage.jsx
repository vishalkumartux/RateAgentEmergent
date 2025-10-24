import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SEO from '../components/SEO';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  SlidersHorizontal,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  Award,
  X,
  Clock,
  CheckCircle,
  DollarSign,
  Target,
  Users,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Info,
  Percent,
  Calendar,
  Home
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const AgentListPage = () => {
  const navigate = useNavigate();
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  
  // Compare Tray
  const [compareAgents, setCompareAgents] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Shortlist
  const [shortlistedAgents, setShortlistedAgents] = useState([]);

  // Filters
  const [filters, setFilters] = useState({
    // Location
    state: '',
    coverage: '',
    
    // Property
    propertyTypeFocus: '',
    
    // Service
    serviceType: '',
    
    // Budget
    minBudget: '',
    maxBudget: '',
    
    // Strategy
    strategyFocus: [],
    
    // Rating & Deals
    minRating: 0,
    verifiedOnly: false,
    
    // Fees
    feeModel: '',
    displaysPricing: false
  });

  // Filter agents
  const filteredAgents = mockAgents.filter(agent => {
    // Search
    const matchesSearch = !searchTerm || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchTerm.toLowerCase());

    // State
    const matchesState = !filters.state || agent.location.includes(filters.state);

    // Coverage
    const matchesCoverage = !filters.coverage || 
      (agent.coverageAreas && agent.coverageAreas.some(area => 
        area.toLowerCase().includes(filters.coverage.toLowerCase())
      ));

    // Property type focus
    const matchesPropertyType = !filters.propertyTypeFocus || 
      (agent.propertyTypesMix && agent.propertyTypesMix[filters.propertyTypeFocus]);

    // Service type
    const matchesServiceType = !filters.serviceType || 
      (agent.services && agent.services.some(s => 
        s.toLowerCase().includes(filters.serviceType.toLowerCase())
      ));

    // Budget
    const agentAvgPrice = agent.priceBandDistribution ? 
      Object.keys(agent.priceBandDistribution)[0] : null;
    const matchesBudget = true; // Simplified for now

    // Strategy focus
    const matchesStrategy = filters.strategyFocus.length === 0 || 
      (agent.specialties && filters.strategyFocus.some(strategy => 
        agent.specialties.some(spec => spec.toLowerCase().includes(strategy.toLowerCase()))
      ));

    // Rating
    const matchesRating = agent.rating >= filters.minRating;

    // Verified deals
    const matchesVerified = !filters.verifiedOnly || agent.verifiedDealsCount > 0;

    return matchesSearch && matchesState && matchesCoverage && 
           matchesPropertyType && matchesServiceType && matchesBudget &&
           matchesStrategy && matchesRating && matchesVerified;
  });

  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deals':
        return (b.verifiedDealsCount || 0) - (a.verifiedDealsCount || 0);
      case 'days':
        return (a.medianDaysToSecure || 999) - (b.medianDaysToSecure || 999);
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      case 'fee':
        return 0; // Would need fee parsing
      default:
        return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = sortedAgents.slice(startIndex, startIndex + itemsPerPage);

  // Active filters count
  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'strategyFocus') return count + value.length;
    if (key === 'minRating' && value > 0) return count + 1;
    if (value !== '' && value !== false && value !== 0) return count + 1;
    return count;
  }, 0);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      state: '',
      coverage: '',
      propertyTypeFocus: '',
      serviceType: '',
      minBudget: '',
      maxBudget: '',
      strategyFocus: [],
      minRating: 0,
      verifiedOnly: false,
      feeModel: '',
      displaysPricing: false
    });
  };

  // Toggle strategy focus
  const toggleStrategyFocus = (strategy) => {
    setFilters(prev => ({
      ...prev,
      strategyFocus: prev.strategyFocus.includes(strategy)
        ? prev.strategyFocus.filter(s => s !== strategy)
        : [...prev.strategyFocus, strategy]
    }));
  };

  // Compare tray functions
  const toggleCompare = (agent) => {
    if (compareAgents.find(a => a.id === agent.id)) {
      setCompareAgents(compareAgents.filter(a => a.id !== agent.id));
    } else if (compareAgents.length < 4) {
      setCompareAgents([...compareAgents, agent]);
    }
  };

  const goToCompare = () => {
    navigate('/compare', { state: { selectedAgents: compareAgents } });
  };

  // Shortlist functions
  const toggleShortlist = (agentId) => {
    if (shortlistedAgents.includes(agentId)) {
      setShortlistedAgents(shortlistedAgents.filter(id => id !== agentId));
    } else {
      setShortlistedAgents([...shortlistedAgents, agentId]);
    }
  };

  return (
    <>
      <SEO 
        title="Find Top Buyer Agents - Compare Performance & Reviews | AgentRate"
        description="Discover verified buyer agents across Australia. Compare performance metrics, fees, and reviews to find your perfect property advocate."
        keywords="buyer agent, buyer's agent, property advocate, real estate buyer agent Australia"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Buyer Agent
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Compare {sortedAgents.length} verified buyer agents by performance, fees, and reviews
            </p>
          </div>

          {/* Modern Search and Filter Bar - Sticky */}
          <div className="sticky top-16 z-30 bg-gray-50 dark:bg-gray-900 pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Modern Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-800 z-10" />
                <Input
                  placeholder="Search by name, location, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  list="agent-suggestions"
                  className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                />
                <datalist id="agent-suggestions">
                  <option value="Sydney" />
                  <option value="Melbourne" />
                  <option value="Brisbane" />
                  <option value="Bondi" />
                </datalist>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-gray-700 dark:text-white font-semibold transition-all hover:border-blue-700"
                >
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="deals">✓ Most Deals</option>
                  <option value="days">⚡ Fastest Secure</option>
                  <option value="experience">🎯 Most Experience</option>
                  <option value="fee">💰 Lowest Fee</option>
                </select>
                
                {/* Filter Button */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 px-6 rounded-2xl font-semibold transition-all ${
                    showFilters 
                      ? 'bg-blue-800 hover:bg-blue-900 text-white' 
                      : 'border-2 border-gray-200 dark:border-gray-600 hover:border-blue-800'
                  }`}
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-white text-blue-800">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Popular:
              </span>
              {['Sydney buyer agents', 'First-home buyer', 'Investor specialist', 'Top rated', 'Off-market expert'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => setSearchTerm(quick)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-amber-400 rounded-full text-sm transition-all duration-200 hover:shadow-md"
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>
          </div>

          {/* Spacing after sticky bar */}
          <div className="mb-8"></div>

          {/* Filter Modal */}
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
                        <Filter className="h-5 w-5 mr-2 text-blue-800" />
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
                  </CardHeader>
                  
                  <CardContent className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                    <div className="space-y-6">
                      {/* Location Coverage */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">📍 Location Coverage</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">State</label>
                            <select
                              value={filters.state}
                              onChange={(e) => setFilters({...filters, state: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">All States</option>
                              <option value="NSW">NSW</option>
                              <option value="VIC">VIC</option>
                              <option value="QLD">QLD</option>
                              <option value="WA">WA</option>
                              <option value="SA">SA</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Suburb/Region</label>
                            <Input
                              placeholder="Enter suburb or region"
                              value={filters.coverage}
                              onChange={(e) => setFilters({...filters, coverage: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Property Type Focus */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">🏠 Property Type Focus</h4>
                        <select
                          value={filters.propertyTypeFocus}
                          onChange={(e) => setFilters({...filters, propertyTypeFocus: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">All Types</option>
                          <option value="House">House</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Land">Land</option>
                        </select>
                      </div>

                      {/* Service Type */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">💼 Service Type</h4>
                        <select
                          value={filters.serviceType}
                          onChange={(e) => setFilters({...filters, serviceType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">All Services</option>
                          <option value="full">Full Service</option>
                          <option value="negotiate">Negotiate Only</option>
                          <option value="auction">Auction Bidding</option>
                        </select>
                      </div>

                      {/* Budget Bands */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">💰 Budget Range</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Min Budget</label>
                            <Input
                              type="number"
                              placeholder="$ Min"
                              value={filters.minBudget}
                              onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Max Budget</label>
                            <Input
                              type="number"
                              placeholder="$ Max"
                              value={filters.maxBudget}
                              onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                              className="dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Strategy Focus */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">🎯 Strategy Focus</h4>
                        <div className="flex flex-wrap gap-2">
                          {['PPOR', 'Investor', 'Developer', 'First Home Buyer'].map(strategy => (
                            <Badge
                              key={strategy}
                              variant={filters.strategyFocus.includes(strategy) ? 'default' : 'outline'}
                              className={`cursor-pointer ${filters.strategyFocus.includes(strategy) ? 'bg-blue-800 hover:bg-blue-900' : 'hover:border-blue-700'}`}
                              onClick={() => toggleStrategyFocus(strategy)}
                            >
                              {strategy}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Rating & Verification */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">⭐ Rating & Verification</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                              Min Rating: {filters.minRating > 0 ? filters.minRating : 'Any'}
                            </label>
                            <Input
                              type="range"
                              min="0"
                              max="5"
                              step="0.5"
                              value={filters.minRating}
                              onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="verifiedOnly"
                              checked={filters.verifiedOnly}
                              onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})}
                              className="w-4 h-4 text-blue-800 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <label htmlFor="verifiedOnly" className="text-sm text-gray-900 dark:text-white cursor-pointer">
                              Verified deals only
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Fee Model */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">💵 Fee Preferences</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Fee Model</label>
                            <select
                              value={filters.feeModel}
                              onChange={(e) => setFilters({...filters, feeModel: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">Any Model</option>
                              <option value="fixed">Fixed Fee</option>
                              <option value="percentage">Percentage</option>
                              <option value="tiered">Tiered</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="displaysPricing"
                              checked={filters.displaysPricing}
                              onChange={(e) => setFilters({...filters, displaysPricing: e.target.checked})}
                              className="w-4 h-4 text-blue-800 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <label htmlFor="displaysPricing" className="text-sm text-gray-900 dark:text-white cursor-pointer">
                              Displays pricing publicly
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {sortedAgents.length} agent{sortedAgents.length !== 1 ? 's' : ''} match your filters
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={resetFilters}>
                          Reset
                        </Button>
                        <Button 
                          className="bg-blue-800 hover:bg-blue-900"
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

          {/* Results Count */}
          <div className="mb-6 text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedAgents.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{sortedAgents.length}</span> buyer agent{sortedAgents.length !== 1 ? 's' : ''}
          </div>

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {paginatedAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isInCompare={compareAgents.some(a => a.id === agent.id)}
                isShortlisted={shortlistedAgents.includes(agent.id)}
                onToggleCompare={() => toggleCompare(agent)}
                onToggleShortlist={() => toggleShortlist(agent.id)}
                compareCount={compareAgents.length}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && paginatedAgents.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? 'bg-blue-800 hover:bg-blue-900' : ''}
                      >
                        {pageNum}
                      </Button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}

          {/* Empty State */}
          {sortedAgents.length === 0 && (
            <Card className="text-center py-16 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent>
                <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No agents found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Compare Tray - Fixed Bottom */}
        {compareAgents.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-blue-700 shadow-2xl z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Compare Agents ({compareAgents.length}/4)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select up to 4 agents to compare side-by-side
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {compareAgents.map((agent) => (
                      <div key={agent.id} className="relative">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-700"
                        />
                        <button
                          onClick={() => toggleCompare(agent)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCompareAgents([])}>
                    Clear All
                  </Button>
                  <Button 
                    className="bg-blue-800 hover:bg-blue-900"
                    onClick={goToCompare}
                    disabled={compareAgents.length < 2}
                  >
                    Compare Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Agent Card Component
const AgentCard = ({ agent, isInCompare, isShortlisted, onToggleCompare, onToggleShortlist, compareCount }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-700 dark:hover:border-blue-800 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        {/* Header with Photo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{agent.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{agent.company}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="text-sm font-semibold ml-1 text-gray-900 dark:text-white">{agent.rating}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({agent.reviewCount})</span>
              </div>
            </div>
          </div>
          <button
            onClick={onToggleShortlist}
            className={`p-2 rounded-full transition-colors ${
              isShortlisted 
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isShortlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location Coverage */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            Coverage:
          </div>
          <div className="flex flex-wrap gap-1">
            {agent.coverageAreas && agent.coverageAreas.slice(0, 3).map((area, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                {area}
              </Badge>
            ))}
            {agent.coverageAreas && agent.coverageAreas.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                +{agent.coverageAreas.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {/* Days to Secure */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              Days to Secure
              <button
                onMouseEnter={() => setShowTooltip('days')}
                onMouseLeave={() => setShowTooltip(null)}
                className="ml-1 relative"
              >
                <Info className="h-3 w-3 text-gray-400" />
                {showTooltip === 'days' && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                    Median time to secure property in last 12 months
                  </div>
                )}
              </button>
            </div>
            <span className="font-semibold text-blue-800">{agent.medianDaysToSecure || 'N/A'} days</span>
          </div>

          {/* Avg Discount */}
          {agent.avgDiscountPercent && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <TrendingDown className="h-4 w-4 mr-1" />
                Avg Discount
              </div>
              <span className="font-semibold text-green-600">{agent.avgDiscountPercent}%</span>
            </div>
          )}

          {/* Verified Deals */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Deals
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">{agent.verifiedDealsCount || 0}</span>
          </div>

          {/* Auction Ratio */}
          {agent.auctionSuccessRatio && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Target className="h-4 w-4 mr-1" />
                Auction Success
              </div>
              <span className="font-semibold text-blue-800">{agent.auctionSuccessRatio}%</span>
            </div>
          )}
        </div>

        {/* Services & Fees */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services & Fees</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {agent.feeModel || 'Contact for pricing'}
          </p>
          <div className="flex flex-wrap gap-1">
            {agent.services && agent.services.slice(0, 2).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs border-blue-300 dark:border-blue-800">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Strategy Tags */}
        {agent.specialties && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {agent.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-2">
          <Link to={`/agent/${agent.id}`} className="block">
            <Button className="w-full bg-blue-800 hover:bg-blue-900">
              View Profile
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleCompare}
              disabled={!isInCompare && compareCount >= 4}
              className={isInCompare ? 'border-blue-800 text-blue-800' : ''}
            >
              {isInCompare ? <Minus className="h-3 w-3 mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
              Compare
            </Button>
            <Button variant="outline" size="sm" onClick={onToggleShortlist}>
              <Heart className={`h-3 w-3 mr-1 ${isShortlisted ? 'fill-current' : ''}`} />
              {isShortlisted ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentListPage;

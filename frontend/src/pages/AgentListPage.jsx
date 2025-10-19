import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  SlidersHorizontal,
  ArrowRight,
  Phone,
  Mail,
  TrendingUp,
  Award,
  X
} from 'lucide-react';
import { mockAgents, mockSearchFilters } from '../mock/agentData';

const AgentListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [agents, setAgents] = useState(mockAgents);
  const [filteredAgents, setFilteredAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('location') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || 'all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [experienceFilter, setExperienceFilter] = useState([0]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort agents
  useEffect(() => {
    let filtered = agents.filter(agent => {
      const matchesSearch = !searchTerm || 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === 'all' || agent.location === selectedLocation;
      const matchesSpecialty = selectedSpecialty === 'all' || agent.specialties.includes(selectedSpecialty);
      const matchesCompany = selectedCompany === 'all' || agent.company === selectedCompany;
      const matchesRating = agent.rating >= ratingFilter[0];
      const matchesExperience = agent.yearsExperience >= experienceFilter[0];
      
      return matchesSearch && matchesLocation && matchesSpecialty && matchesCompany && matchesRating && matchesExperience;
    });

    // Sort agents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'sales':
          return parseFloat(b.salesVolume.replace(/[$M,]/g, '')) - parseFloat(a.salesVolume.replace(/[$M,]/g, ''));
        case 'speed':
          return a.avgDaysOnMarket - b.avgDaysOnMarket;
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
  }, [agents, searchTerm, selectedLocation, selectedSpecialty, selectedCompany, ratingFilter, experienceFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedSpecialty('all');
    setSelectedCompany('all');
    setRatingFilter([0]);
    setExperienceFilter([0]);
    setSortBy('rating');
  };

  const activeFiltersCount = [
    selectedLocation !== 'all',
    selectedSpecialty !== 'all', 
    selectedCompany !== 'all',
    ratingFilter[0] > 0,
    experienceFilter[0] > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Real Estate Agents
          </h1>
          <p className="text-xl text-gray-600">
            Compare {filteredAgents.length} verified agents in your area
          </p>
        </div>

        {/* Modern Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Modern Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
              <Input
                placeholder="Search by name, location, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                list="agent-suggestions"
                className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
              />
              <datalist id="agent-suggestions">
                <option value="Sydney" />
                <option value="Melbourne" />
                <option value="Brisbane" />
                <option value="Perth" />
              </datalist>
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                  <SelectItem value="reviews">💬 Most Reviews</SelectItem>
                  <SelectItem value="experience">🎯 Most Experience</SelectItem>
                  <SelectItem value="sales">💰 Highest Sales</SelectItem>
                  <SelectItem value="speed">⚡ Fastest Sales</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className={`h-14 px-6 rounded-2xl font-semibold transition-all ${
                  showFilters 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'border-2 border-gray-200 dark:border-gray-600 hover:border-amber-600'
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
          </div>

          {/* Popular Searches */}
          {!showFilters && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Popular:
              </span>
              {['Sydney', 'Luxury Homes', 'First Home Buyers', 'Top Rated'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => setSearchTerm(quick)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 rounded-full text-sm transition-all duration-200 hover:shadow-md"
                >
                  {quick}
                </button>
              ))}
            </div>
          )}

          {/* Modern Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-amber-600" />
                    Location
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-11 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {mockSearchFilters.locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Specialty</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {mockSearchFilters.specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Minimum Rating: {ratingFilter[0].toFixed(1)}+
                  </label>
                  <Slider
                    value={ratingFilter}
                    onValueChange={setRatingFilter}
                    max={5}
                    min={0}
                    step={0.1}
                    className="mt-3"
                  />
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Min Experience: {experienceFilter[0]}+ years
                  </label>
                  <Slider
                    value={experienceFilter}
                    onValueChange={setExperienceFilter}
                    max={20}
                    min={0}
                    step={1}
                    className="mt-3"
                  />
                </div>
              </div>
              
              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="ghost" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-amber-200 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                {/* Agent Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors truncate">
                      {agent.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium truncate">{agent.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      {agent.location}
                    </p>
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white">{agent.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400">({agent.reviewCount})</span>
                    </div>
                    <Badge className="bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                      {agent.yearsExperience}y exp
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Sales Volume</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{agent.salesVolume}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Avg Days</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{agent.avgDaysOnMarket}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{agent.priceAccuracy}</div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  <Link to={`/agent/${agent.id}`} className="block">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 group-hover:shadow-lg">
                      View Full Profile
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or clearing some filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentListPage;
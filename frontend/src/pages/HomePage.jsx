import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import SEO from '../components/SEO';
import { buttons, text, backgrounds, borders } from '../theme';
import { 
  Search, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Home,
  Building2,
  Briefcase,
  DollarSign,
  Bed,
  Bath,
  Car,
  Target,
  Sparkles
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';
import { mockReviews } from '../mock/reviewData';
import { mockDeals, formatDealPrice } from '../mock/dealData';

const HomePageImproved = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [buyBoxTab, setBuyBoxTab] = useState('deals'); // 'deals' or 'agents'
  
  // Buy Box state
  const [buyBox, setBuyBox] = useState({
    propertyType: 'all',
    budgetMin: 0,
    budgetMax: 5000000,
    bedrooms: 'any',
    bathrooms: 'any',
    parking: 'any',
    strategies: [],
    suburb: '',
    radius: 10
  });

  const featuredDeals = mockDeals.filter(d => d.verified).slice(0, 3);
  const topAgents = mockAgents.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const allReviews = mockReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  const propertyTypes = ['House', 'Townhouse', 'Unit', 'Apartment', 'Land'];
  const strategies = [
    'PPOR', 
    'Investment', 
    'Renovation', 
    'Development', 
    'Subdivision', 
    'High-yield', 
    'Off-market'
  ];

  const cities = [
    { name: 'Sydney', state: 'NSW', deals: 1250, agents: 340 },
    { name: 'Melbourne', state: 'VIC', deals: 980, agents: 290 },
    { name: 'Brisbane', state: 'QLD', deals: 720, agents: 210 },
    { name: 'Perth', state: 'WA', deals: 450, agents: 140 },
    { name: 'Adelaide', state: 'SA', deals: 380, agents: 95 }
  ];

  const stats = [
    { label: 'Verified Deals', value: '3,800+', icon: Home, color: 'text-black dark:text-white' },
    { label: 'Buyer Agents', value: '1,200+', icon: Users, color: 'text-black dark:text-white' },
    { label: 'Client Reviews', value: '8,500+', icon: Star, color: 'text-yellow-600 dark:text-yellow-500' },
    { label: 'Avg. Savings', value: '$42K', icon: TrendingUp, color: 'text-green-700 dark:text-green-500' }
  ];

  // Basic natural language parsing
  const parseSearchQuery = (query) => {
    const parsed = {
      suburb: '',
      bedrooms: null,
      budget: null,
      propertyType: null
    };

    const lowerQuery = query.toLowerCase();
    
    // Extract bedrooms (e.g., "3BR", "3 bedroom", "3 bed")
    const bedroomMatch = lowerQuery.match(/(\d+)\s*(br|bed|bedroom)/);
    if (bedroomMatch) parsed.bedrooms = parseInt(bedroomMatch[1]);

    // Extract budget (e.g., "1.2m", "$800k", "under 1m")
    const budgetMatch = lowerQuery.match(/(\d+\.?\d*)\s*(m|million|k)/i);
    if (budgetMatch) {
      const value = parseFloat(budgetMatch[1]);
      const unit = budgetMatch[2].toLowerCase();
      parsed.budget = unit.startsWith('m') ? value * 1000000 : value * 1000;
    }

    // Extract property type
    propertyTypes.forEach(type => {
      if (lowerQuery.includes(type.toLowerCase())) {
        parsed.propertyType = type;
      }
    });

    // Everything else is likely the suburb
    let suburbQuery = query;
    if (bedroomMatch) suburbQuery = suburbQuery.replace(bedroomMatch[0], '');
    if (budgetMatch) suburbQuery = suburbQuery.replace(budgetMatch[0], '');
    if (parsed.propertyType) suburbQuery = suburbQuery.replace(new RegExp(parsed.propertyType, 'gi'), '');
    
    parsed.suburb = suburbQuery.replace(/under|over|in|near|around/gi, '').trim();

    return parsed;
  };

  const handleNaturalSearch = (e) => {
    e.preventDefault();
    const parsed = parseSearchQuery(searchQuery);
    
    // Build query params
    const params = new URLSearchParams();
    if (parsed.suburb) params.append('location', parsed.suburb);
    if (parsed.bedrooms) params.append('bedrooms', parsed.bedrooms);
    if (parsed.budget) params.append('maxPrice', parsed.budget);
    if (parsed.propertyType) params.append('propertyType', parsed.propertyType);
    
    // Navigate to deals page with parsed filters
    navigate(`/deals?${params.toString()}`);
  };

  const handleBuyBoxSearch = () => {
    const params = new URLSearchParams();
    
    if (buyBox.propertyType !== 'all') params.append('propertyType', buyBox.propertyType);
    if (buyBox.budgetMin > 0) params.append('minPrice', buyBox.budgetMin);
    if (buyBox.budgetMax < 5000000) params.append('maxPrice', buyBox.budgetMax);
    if (buyBox.bedrooms !== 'any') params.append('bedrooms', buyBox.bedrooms);
    if (buyBox.bathrooms !== 'any') params.append('bathrooms', buyBox.bathrooms);
    if (buyBox.parking !== 'any') params.append('parking', buyBox.parking);
    if (buyBox.strategies.length > 0) params.append('strategies', buyBox.strategies.join(','));
    if (buyBox.suburb) params.append('location', buyBox.suburb);
    
    const targetPage = buyBoxTab === 'deals' ? '/deals' : '/agents';
    navigate(`${targetPage}?${params.toString()}`);
  };

  const handleStrategyToggle = (strategy) => {
    setBuyBox(prev => ({
      ...prev,
      strategies: prev.strategies.includes(strategy)
        ? prev.strategies.filter(s => s !== strategy)
        : [...prev.strategies, strategy]
    }));
  };

  const formatBudget = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <>
      <SEO 
        title="AgentRate - Find Buyer Agents & Property Deals | Verified Performance & Reviews"
        description="Australia's leading platform for buyer agents and property deals. Compare agents, browse verified deals, set your buy box criteria. Make informed property decisions."
        keywords="buyer agents Australia, property deals, real estate comparison, agent reviews, buy box, property search"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                Find Your Next Property
                <span className="text-black dark:text-white block mt-2">
                  The Smart Way
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                Search deals, compare buyer agents, and build your perfect buy box—all in one place.
              </p>
            </div>

            {/* Natural Language Search */}
            <div className="max-w-4xl mx-auto mb-8">
              <form onSubmit={handleNaturalSearch} className="relative">
                <div className="relative">
                  <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 dark:text-white dark:text-gray-400 z-10" />
                  <Input
                    placeholder='Try: "3BR house in Preston under 1.2m" or "Investment property Melbourne high yield"'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-32 h-16 text-lg border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white rounded-2xl bg-white dark:bg-gray-900 shadow-xl"
                  />
                  <Button 
                    type="submit"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${buttons.primary} h-12 px-6 rounded-xl`}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </form>

              {/* Quick Search Links */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm text-gray-700 dark:text-gray-400 dark:text-white dark:text-gray-400">Popular:</span>
                {[
                  { text: 'Houses Sydney', query: 'house in sydney' },
                  { text: 'Investment Melbourne', query: 'investment property melbourne' },
                  { text: 'First Home <$800K', query: 'house under 800k ppor' },
                  { text: 'High-Yield Brisbane', query: 'high yield investment brisbane' }
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(link.query)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-black dark:text-white rounded-full transition-all"
                  >
                    {link.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary CTA Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link to="/deals">
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-white dark:bg-gray-900">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="h-7 w-7 text-black dark:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">Find Deals</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Browse verified property deals
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/agents">
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-white dark:bg-gray-900">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-black dark:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">Find Buyer Agents</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compare top-rated agents
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/compare">
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-white dark:bg-gray-900">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-7 w-7 text-black dark:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">Compare Agents</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Side-by-side comparison
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Buy Box Quick-Builder - Redesigned */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Build Your Perfect Search
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tell us what you're looking for, and we'll do the rest
              </p>
            </div>

            {/* Tabs - Simplified */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setBuyBoxTab('deals')}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all text-lg ${
                  buyBoxTab === 'deals'
                    ? 'bg-green-700 text-white shadow-2xl scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:scale-105 shadow-lg'
                }`}
              >
                <Home className="h-5 w-5 inline mr-2" />
                Search Deals
              </button>
              <button
                onClick={() => setBuyBoxTab('agents')}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all text-lg ${
                  buyBoxTab === 'agents'
                    ? 'bg-green-700 text-white shadow-2xl scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:scale-105 shadow-lg'
                }`}
              >
                <Users className="h-5 w-5 inline mr-2" />
                Find Agents
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Property Type & Location */}
              <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-black" />
                    Property Type
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['All', ...propertyTypes].map(type => {
                      const isSelected = type === 'All' ? buyBox.propertyType === 'all' : buyBox.propertyType === type;
                      const icons = { House: '🏠', Townhouse: '🏘️', Unit: '🏢', Apartment: '🏙️', Land: '🌾', All: '✨' };
                      return (
                        <button
                          key={type}
                          onClick={() => setBuyBox(prev => ({ ...prev, propertyType: type === 'All' ? 'all' : type }))}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? 'border-black bg-gray-50 dark:bg-gray-900 shadow-md'
                              : 'border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white'
                          }`}
                        >
                          <div className="text-2xl mb-1">{icons[type]}</div>
                          <div className={`text-sm font-medium ${isSelected ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}>
                            {type}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-black" />
                    Location
                  </h3>
                  <Input
                    placeholder="e.g., Carlton, Melbourne"
                    value={buyBox.suburb}
                    onChange={(e) => setBuyBox(prev => ({ ...prev, suburb: e.target.value }))}
                    className="mb-3 h-12 border-2 dark:bg-gray-700 dark:text-white"
                  />
                  <Select value={buyBox.radius.toString()} onValueChange={(value) => setBuyBox(prev => ({ ...prev, radius: parseInt(value) }))}>
                    <SelectTrigger className="h-12 border-2 dark:bg-gray-700 dark:text-white">
                      <SelectValue placeholder="Search radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="15">Within 15 km</SelectItem>
                      <SelectItem value="20">Within 20 km</SelectItem>
                      <SelectItem value="30">Within 30 km</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Column 2: Budget & Features */}
              <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-black transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Budget Range
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatBudget(buyBox.budgetMin)}</span>
                      <span className="text-gray-700 dark:text-gray-400 dark:text-gray-400">to</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatBudget(buyBox.budgetMax)}</span>
                    </div>
                    <Slider
                      value={[buyBox.budgetMin, buyBox.budgetMax]}
                      onValueChange={([min, max]) => setBuyBox(prev => ({ ...prev, budgetMin: min, budgetMax: max }))}
                      min={0}
                      max={5000000}
                      step={50000}
                      className="mt-3"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Home className="h-5 w-5 mr-2 text-gray-700" />
                    Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-gray-700 dark:text-gray-400" />
                      <Select value={buyBox.bedrooms} onValueChange={(value) => setBuyBox(prev => ({ ...prev, bedrooms: value }))}>
                        <SelectTrigger className="flex-1 h-11 border-2 dark:bg-gray-700 dark:text-white">
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Bedrooms</SelectItem>
                          <SelectItem value="1">1+ Bedrooms</SelectItem>
                          <SelectItem value="2">2+ Bedrooms</SelectItem>
                          <SelectItem value="3">3+ Bedrooms</SelectItem>
                          <SelectItem value="4">4+ Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-3">
                      <Bath className="h-5 w-5 text-gray-700 dark:text-gray-400" />
                      <Select value={buyBox.bathrooms} onValueChange={(value) => setBuyBox(prev => ({ ...prev, bathrooms: value }))}>
                        <SelectTrigger className="flex-1 h-11 border-2 dark:bg-gray-700 dark:text-white">
                          <SelectValue placeholder="Bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Bathrooms</SelectItem>
                          <SelectItem value="1">1+ Bathrooms</SelectItem>
                          <SelectItem value="2">2+ Bathrooms</SelectItem>
                          <SelectItem value="3">3+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-gray-700 dark:text-gray-400" />
                      <Select value={buyBox.parking} onValueChange={(value) => setBuyBox(prev => ({ ...prev, parking: value }))}>
                        <SelectTrigger className="flex-1 h-11 border-2 dark:bg-gray-700 dark:text-white">
                          <SelectValue placeholder="Parking" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Parking</SelectItem>
                          <SelectItem value="1">1+ Parking</SelectItem>
                          <SelectItem value="2">2+ Parking</SelectItem>
                          <SelectItem value="3">3+ Parking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Column 3: Strategy & CTA */}
              <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-gray-700" />
                    Strategy
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {strategies.map(strategy => {
                      const isSelected = buyBox.strategies.includes(strategy);
                      return (
                        <button
                          key={strategy}
                          onClick={() => handleStrategyToggle(strategy)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                            isSelected
                              ? 'border-black bg-gray-50 dark:bg-gray-100 text-gray-700 dark:text-white shadow-md'
                              : 'border-gray-200 dark:border-gray-700 text-black dark:text-white hover:border-black dark:hover:border-black'
                          }`}
                        >
                          {strategy}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Presets */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <h4 className="text-sm font-semibold text-black dark:text-white mb-3">Quick Presets</h4>
                    <div className="space-y-2">
                      {[
                        { label: '🏠 First Home', preset: { propertyType: 'House', budgetMax: 800000, strategies: ['PPOR'] } },
                        { label: '💰 Investment', preset: { propertyType: 'Unit', strategies: ['Investment', 'High-yield'] } },
                        { label: '🔨 Renovation', preset: { propertyType: 'House', strategies: ['Renovation'] } }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setBuyBox(prev => ({ ...prev, ...item.preset }))}
                          className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-black rounded-lg text-sm transition-all"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Big Search Button */}
                  <Button 
                    onClick={handleBuyBoxSearch}
                    className={`w-full h-14 text-lg font-bold shadow-xl transition-all hover:scale-105 ${buttons.primary}`}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    {buyBoxTab === 'deals' ? 'Search Deals' : 'Find Agents'}
                  </Button>

                  <p className="text-xs text-center text-gray-700 dark:text-gray-400 dark:text-gray-400 mt-3">
                    {buyBoxTab === 'deals' 
                      ? '3,800+ verified property deals'
                      : '1,200+ verified buyer agents'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Featured Deals
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Recently verified property transactions
                </p>
              </div>
              <Link to="/deals">
                <Button variant="outline" className="border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDeals.map(deal => (
                <Link key={deal.id} to={`/deal/${deal.id}`}>
                  <Card className="hover:shadow-xl transition-all border-2 border-gray-200 hover:border-black dark:border-gray-700 dark:hover:border-white bg-white dark:bg-gray-800">
                    <img 
                      src={deal.photos[0]} 
                      alt={deal.address}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      {deal.verified && (
                        <Badge className="bg-green-700 text-white mb-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <h3 className="font-semibold text-black dark:text-white mb-2 truncate">
                        {deal.suburb}, {deal.state}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {deal.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {deal.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          {deal.carSpaces}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-black dark:text-white">
                        {formatDealPrice(deal)}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top-Rated Agents */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Top-Rated Buyer Agents
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Trusted professionals with proven track records
                </p>
              </div>
              <Link to="/agents">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topAgents.map(agent => (
                <Link key={agent.id} to={`/agent/${agent.id}`}>
                  <Card className="hover:shadow-xl transition-all border-2 border-gray-200 hover:border-black dark:border-gray-700 dark:hover:border-white bg-white dark:bg-gray-800">
                    <CardContent className="p-6 text-center">
                      <img 
                        src={agent.photo} 
                        alt={agent.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                      <h3 className="font-semibold text-lg text-black dark:text-white mb-1">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{agent.company}</p>
                      
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-yellow-600 fill-yellow-600 dark:text-yellow-500 dark:fill-yellow-500" />
                        <span className="font-bold text-black dark:text-white">{agent.rating}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({agent.reviewCount})</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700">
                          {agent.verifiedDealsCount} deals
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Blocks - Cities */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Find Buyer Agents & Deals by City
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map(city => (
                <Card key={city.name} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {city.name}, {city.state}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      Discover top-rated buyer agents and verified property deals in {city.name}. 
                      Compare agents, browse recent transactions, and make informed decisions.
                    </p>
                    <div className="space-y-2 text-sm">
                      <Link 
                        to={`/agents?location=${city.name}`}
                        className="flex items-center text-black hover:text-black font-medium"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {city.agents} Buyer Agents in {city.name}
                        <ArrowRight className="h-3 w-3 ml-auto" />
                      </Link>
                      <Link 
                        to={`/deals?location=${city.name}`}
                        className="flex items-center text-black hover:text-black font-medium"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        {city.deals} Verified Deals in {city.name}
                        <ArrowRight className="h-3 w-3 ml-auto" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Looking for buyer agents or deals in other areas?
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/agents">
                  <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50 dark:hover:bg-gray-800">
                    Browse All Agents
                  </Button>
                </Link>
                <Link to="/deals">
                  <Button variant="outline" className="border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800">
                    Browse All Deals
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Award className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of smart buyers who use AgentRate to make informed decisions
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/deals">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  <Home className="h-5 w-5 mr-2" />
                  Browse Deals
                </Button>
              </Link>
              <Link to="/agents">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black">
                  <Users className="h-5 w-5 mr-2" />
                  Find Agents
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePageImproved;

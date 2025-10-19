import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SEO from '../components/SEO';
import { Search, MapPin, Star, TrendingUp, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');

  const featuredAgents = mockAgents.slice(0, 3);

  const stats = [
    { label: 'Verified Agents', value: '10,000+', icon: Users, color: 'text-emerald-600' },
    { label: 'Properties Sold', value: '$2.5B+', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Customer Reviews', value: '50,000+', icon: Star, color: 'text-amber-600' },
    { label: 'Cities Covered', value: '150+', icon: MapPin, color: 'text-purple-600' }
  ];

  const features = [
    {
      title: 'Verified Performance Data',
      description: 'Real sales data and performance metrics from trusted sources',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Authentic Reviews',
      description: 'Genuine reviews from real clients who have worked with agents',
      icon: Star,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Smart Matching',
      description: 'Find agents that match your specific property type and budget',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to agents page with search params
    window.location.href = `/agents?location=${encodeURIComponent(searchLocation)}&specialty=${encodeURIComponent(searchSpecialty)}`;
  };

  return (
    <>
      <SEO 
        title="AgentRate - Find Your Perfect Real Estate Agent | Verified Performance & Reviews"
        description="Compare top-rated real estate agents in Australia. View verified performance data, authentic client reviews, and property deals. Find the perfect buyer's agent for your needs."
        keywords="real estate agents Australia, buyer agents Sydney, property agents, agent reviews, real estate comparison, property deals"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AgentRate",
          "url": "https://agentrate.com.au",
          "description": "Australia's leading platform for comparing real estate agents",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://agentrate.com.au/agents?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Your
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent block mt-2">
                Perfect Agent
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Compare real estate agents based on verified performance data, authentic reviews, 
              and proven track records. Make informed decisions for your biggest investment.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto mb-16 border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Enter suburb or city"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-12 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</label>
                <select
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Property Types</option>
                  <option value="Luxury Homes">Luxury Homes</option>
                  <option value="First Home Buyers">First Home Buyers</option>
                  <option value="Investment Properties">Investment Properties</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="h-12 bg-amber-600 hover:bg-amber-700 text-white px-8 font-semibold transition-all duration-200 hover:shadow-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Agents
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-200">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Top Rated Agents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover highly-rated real estate professionals in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAgents.map((agent) => (
              <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300 border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-600 bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">{agent.company}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {agent.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white">{agent.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Sales Volume</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{agent.salesVolume}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Avg. Days</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{agent.avgDaysOnMarket}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/agent/${agent.id}`}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white group-hover:shadow-lg transition-all duration-200">
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/agents">
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950">
                View All Agents
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AgentRate?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide the most comprehensive and transparent platform for finding the right real estate agent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} dark:bg-opacity-20 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-700 dark:to-yellow-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Agent?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of satisfied customers who found their ideal real estate professional through AgentRate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agents">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold">
                Browse Agents
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 text-lg font-semibold">
                List Your Agency
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
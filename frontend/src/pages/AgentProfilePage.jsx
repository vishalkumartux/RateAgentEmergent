import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SEO from '../components/SEO';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Target,
  MessageCircle,
  Share2,
  Heart,
  Bed,
  Bath,
  Car,
  Home,
  Building2,
  CheckCircle,
  ShieldCheck,
  Calendar,
  Percent,
  TrendingDown,
  FileText,
  Users,
  Briefcase,
  PieChart,
  BarChart3
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';
import { getDealsByAgentId, formatDealPrice, getDaysAgo } from '../mock/dealData';

const AgentProfilePage = ({ agentIdOverride }) => {
  const { id: paramId } = useParams();
  const id = agentIdOverride || paramId;
  const agent = mockAgents.find(a => a.id === parseInt(id));
  const [dealsToShow, setDealsToShow] = useState(6);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  // Get deals by this agent
  const agentDeals = getDealsByAgentId(parseInt(id));
  const displayedDeals = agentDeals.slice(0, dealsToShow);
  const displayedReviews = agent.reviews.slice(0, reviewsToShow);
  
  const hasMoreDeals = agentDeals.length > dealsToShow;
  const hasMoreReviews = agent.reviews.length > reviewsToShow;

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 dark:text-white">Agent Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The agent profile you're looking for doesn't exist.
            </p>
            <Link to="/agents">
              <Button className="bg-green-700 hover:bg-green-800 hover:text-white">
                Browse All Agents
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${agent.name} - Buyer's Agent Profile | AgentRate`}
        description={`${agent.name} is a buyer's agent specializing in ${agent.specialties.join(', ')}. ${agent.verifiedDealsCount} verified deals with ${agent.rating} rating.`}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/agents" className="hover:text-black">Buyer Agents</Link>
            <span>/</span>
            <span>{agent.name}</span>
          </div>

          {/* Header Section */}
          <Card className="mb-8 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="relative h-32 bg-gradient-to-r from-blue-800 to-blue-600"></div>
              <div className="relative px-6 pb-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Profile Photo */}
                  <div className="-mt-16 flex-shrink-0">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                    />
                  </div>
                  
                  {/* Agent Info */}
                  <div className="flex-1 pt-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {agent.name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{agent.company}</p>
                        
                        {/* Coverage Areas */}
                        {agent.coverageAreas && agent.coverageAreas.length > 0 && (
                          <div className="flex items-start gap-2 mb-3">
                            <MapPin className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                            <div className="flex flex-wrap gap-2">
                              {agent.coverageAreas.slice(0, 4).map((area, idx) => (
                                <Badge key={idx} variant="outline" className="bg-gray-50 dark:bg-gray-900 border-amber-200 dark:border-amber-800 text-black dark:text-amber-400">
                                  {area}
                                </Badge>
                              ))}
                              {agent.coverageAreas.length > 4 && (
                                <Badge 
                                  variant="outline" 
                                  className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-help"
                                  title={agent.coverageAreas.slice(4).join(', ')}
                                >
                                  +{agent.coverageAreas.length - 4} more areas
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Rating */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-amber-400 fill-current" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{agent.rating}</span>
                            <span className="text-gray-600 dark:text-gray-400">({agent.reviewCount} reviews)</span>
                          </div>
                          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">{agent.verifiedDealsCount}</span> verified deals
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 lg:min-w-[180px]">
                        <Button className="bg-green-700 hover:bg-green-800 hover:text-white text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Agent
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setIsFavorited(!isFavorited)}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{agent.verifiedDealsCount}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Deals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{agent.medianDaysToSecure}d</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg. to Secure</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{agent.avgDiscountPercent}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Users className="h-5 w-5 mr-2 text-black" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {agent.bio || agent.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{agent.yearsExperience} Years</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Specializations</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{agent.specialties.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Company</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{agent.company}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <DollarSign className="h-5 w-5 mr-2 text-black" />
                Services & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Services */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {agent.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-amber-200 dark:border-amber-800">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fee Structure */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Fee Structure</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">{agent.feeModel}</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Transparent pricing with no hidden costs. Contact for detailed quote.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage & Focus */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <MapPin className="h-5 w-5 mr-2 text-black" />
                Coverage & Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Coverage Areas */}
              {agent.coverageAreas && agent.coverageAreas.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Coverage Areas ({agent.coverageAreas.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {(showAllAreas ? agent.coverageAreas : agent.coverageAreas.slice(0, 8)).map((area, idx) => (
                      <Badge key={idx} className="bg-amber-100 dark:bg-gray-900 text-black dark:text-amber-400 border-blue-300 dark:border-amber-700">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  {agent.coverageAreas.length > 8 && (
                    <button 
                      onClick={() => setShowAllAreas(!showAllAreas)}
                      className="mt-3 text-sm text-black hover:text-black font-medium"
                    >
                      {showAllAreas ? 'Show less' : `Show ${agent.coverageAreas.length - 8} more areas`}
                    </button>
                  )}
                </div>
              )}
              
              {/* Property Types */}
              {agent.propertyTypesMix && Object.keys(agent.propertyTypesMix).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Property Type Mix</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(agent.propertyTypesMix).map(([type, percent]) => (
                      <div key={type} className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-black">{percent}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Price Band Distribution */}
              {agent.priceBandDistribution && Object.keys(agent.priceBandDistribution).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Band Experience</h3>
                  <div className="space-y-2">
                    {Object.entries(agent.priceBandDistribution).map(([band, percent]) => (
                      <div key={band} className="flex items-center gap-3">
                        <div className="w-32 text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">{band}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-green-700 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                            style={{ width: `${Math.max(percent, 5)}%` }}
                          >
                            {percent >= 10 && (
                              <span className="text-xs font-semibold text-white">{percent}%</span>
                            )}
                          </div>
                          {percent < 10 && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-600 dark:text-gray-400">{percent}%</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <BarChart3 className="h-5 w-5 mr-2 text-black" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <Clock className="h-8 w-8 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{agent.medianDaysToSecure}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Median Days to Secure</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <Percent className="h-8 w-8 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{agent.avgDiscountPercent}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Discount</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <Target className="h-8 w-8 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{agent.auctionSuccessRatio}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Auction Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <TrendingDown className="h-8 w-8 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{agent.offMarketRatio}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Off-Market Deals</div>
                </div>
              </div>
              
              {/* Additional Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-black" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Verified Deals</div>
                    <div className="font-bold text-gray-900 dark:text-white">{agent.verifiedDealsCount}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Star className="h-5 w-5 text-black" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Rating</div>
                    <div className="font-bold text-gray-900 dark:text-white">{agent.rating}/5.0</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Users className="h-5 w-5 text-black" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Client Reviews</div>
                    <div className="font-bold text-gray-900 dark:text-white">{agent.reviewCount}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio of Recent Deals */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-black" />
                Recent Deals Portfolio
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {agentDeals.length} verified deals completed
              </p>
            </CardHeader>
            <CardContent>
              {agentDeals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Deals Yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    This agent hasn't completed any verified deals yet. Check back soon or contact them to learn more about their services.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedDeals.map((deal) => (
                      <Link 
                        key={deal.id} 
                        to={`/deal/${deal.id}`}
                        className="group border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-black hover:shadow-lg transition-all"
                      >
                        <img 
                          src={deal.photos[0]} 
                          alt={deal.address} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-black transition-colors truncate">
                                {deal.suburb} {deal.propertyType}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {deal.suburb}, {deal.state}
                              </p>
                            </div>
                            {deal.verified && (
                              <Badge variant="outline" className="ml-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1" />
                              {deal.bedrooms}
                            </div>
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1" />
                              {deal.bathrooms}
                            </div>
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-1" />
                              {deal.carSpaces}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-lg font-bold text-black">
                              {formatDealPrice(deal)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {getDaysAgo(deal.purchaseDate)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMoreDeals && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        onClick={() => setDealsToShow(prev => Math.min(prev + 6, agentDeals.length))}
                        className="border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Load More Deals ({agentDeals.length - dealsToShow} remaining)
                      </Button>
                    </div>
                  )}
                  {dealsToShow > 6 && !hasMoreDeals && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setDealsToShow(6)}
                        className="text-gray-600 dark:text-gray-400 hover:text-black"
                      >
                        Show Less
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Star className="h-5 w-5 mr-2 text-black" />
                Customer Reviews
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {agent.rating} average rating from {agent.reviewCount} verified clients
              </p>
            </CardHeader>
            <CardContent>
              {agent.reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Reviews Yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    This agent hasn't received any verified reviews yet. Be the first to work with them and share your experience!
                  </p>
                </div>
              ) : (
                <>
                  {/* Top Tags */}
                  {agent.topTags && agent.topTags.length > 0 && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Most Mentioned Qualities</h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.topTags.map((tag, idx) => (
                          <Badge key={idx} className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {displayedReviews.map((review) => (
                      <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.author}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{review.comment}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMoreReviews && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        onClick={() => setReviewsToShow(prev => Math.min(prev + 5, agent.reviews.length))}
                        className="border-black text-black hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Load More Reviews ({agent.reviews.length - reviewsToShow} remaining)
                      </Button>
                    </div>
                  )}
                  {reviewsToShow > 3 && !hasMoreReviews && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setReviewsToShow(3)}
                        className="text-gray-600 dark:text-gray-400 hover:text-black"
                      >
                        Show Less
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Compliance & Credibility */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <ShieldCheck className="h-5 w-5 mr-2 text-black" />
                Compliance & Credibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* License */}
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Licensed Buyer's Agent</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    License: {agent.licenceNumber}
                  </div>
                </div>
              </div>
              
              {/* Professional Indemnity */}
              {agent.professionalIndemnity && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-black">
                  <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">Professional Indemnity Insurance</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Full coverage for client protection
                    </div>
                  </div>
                </div>
              )}
              
              {/* Industry Memberships */}
              {agent.industryMemberships && agent.industryMemberships.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Industry Memberships</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.industryMemberships.map((membership, idx) => (
                      <Badge key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <Award className="h-3 w-3 mr-1" />
                        {membership}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact CTA Section */}
          <Card className="bg-gradient-to-r from-blue-800 to-blue-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-3">Ready to Work with {agent.name.split(' ')[0]}?</h2>
              <p className="text-amber-50 mb-6 max-w-2xl mx-auto">
                Get in touch to discuss your property goals and see how {agent.name.split(' ')[0]} can help you secure your ideal property.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black">
                  <Phone className="h-5 w-5 mr-2" />
                  {agent.phone}
                </Button>
                <Link to="/compare">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black">
                    <PieChart className="h-5 w-5 mr-2" />
                    Compare Agents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AgentProfilePage;
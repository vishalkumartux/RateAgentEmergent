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

const AgentProfilePage = () => {
  const { id } = useParams();
  const agent = mockAgents.find(a => a.id === parseInt(id));
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Get deals by this agent
  const agentDeals = getDealsByAgentId(parseInt(id));
  const displayedDeals = showAllDeals ? agentDeals : agentDeals.slice(0, 6);
  const displayedReviews = showAllReviews ? agent.reviews : agent.reviews.slice(0, 3);

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
              <Button className="bg-amber-600 hover:bg-amber-700">
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
            <Link to="/agents" className="hover:text-amber-600">Buyer Agents</Link>
            <span>/</span>
            <span>{agent.name}</span>
          </div>

          {/* Header Section */}
          <Card className="mb-8 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="relative h-32 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
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
                        <div className="flex items-start gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="flex flex-wrap gap-2">
                            {agent.coverageAreas.slice(0, 3).map((area, idx) => (
                              <Badge key={idx} variant="outline" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400">
                                {area}
                              </Badge>
                            ))}
                            {agent.coverageAreas.length > 3 && (
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                +{agent.coverageAreas.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
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
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Agent
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950">
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
                        <div className="text-2xl font-bold text-amber-600">{agent.verifiedDealsCount}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Deals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">{agent.medianDaysToSecure}d</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg. to Secure</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">{agent.avgDiscountPercent}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mb-4">
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-gray-600 text-sm">{metric.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Recent Sales</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-emerald-600" />
                  About {agent.name.split(' ')[0]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {agent.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-400" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-gray-400" />
                        <span>{agent.email}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab - Now showing actual deals */}
          <TabsContent value="sales" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
                  Recent Deals ({agentDeals.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agentDeals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No deals found for this agent yet.
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {displayedDeals.map((deal) => (
                        <Link key={deal.id} to={`/deal/${deal.id}`} className="block">
                          <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 transition-all group">
                            <img 
                              src={deal.photos[0]} 
                              alt={deal.address} 
                              className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-1">
                                    {deal.address}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {deal.suburb}, {deal.state}
                                  </p>
                                </div>
                                <Badge className={`ml-2 ${deal.dealType === 'sale' ? 'bg-amber-600' : 'bg-blue-600'} text-white`}>
                                  {deal.dealType === 'sale' ? 'Sold' : 'Leased'}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
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
                                <div className="flex items-center">
                                  <Home className="h-4 w-4 mr-1" />
                                  {deal.propertyType}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-amber-600">
                                  {formatDealPrice(deal)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {deal.daysOnMarket} days on market
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Show More/Less Button */}
                    {agentDeals.length > 5 && (
                      <div className="mt-6 text-center">
                        <Button
                          variant="outline"
                          onClick={() => setShowAllDeals(!showAllDeals)}
                          className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                        >
                          {showAllDeals ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Show All {agentDeals.length} Deals
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Star className="h-5 w-5 mr-2 text-amber-600" />
                  Client Reviews ({agent.reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {displayedReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.author}</h4>
                          <div className="flex items-center space-x-1 mt-1">
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
                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                {/* Show More/Less Button */}
                {agent.reviews.length > 5 && (
                  <div className="mt-6 text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                    >
                      {showAllReviews ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show All {agent.reviews.length} Reviews
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentProfilePage;
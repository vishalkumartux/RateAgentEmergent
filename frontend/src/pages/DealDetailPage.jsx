import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SEO from '../components/SEO';
import {
  MapPin,
  Calendar,
  Clock,
  TrendingDown,
  DollarSign,
  Home,
  Bed,
  Bath,
  Car,
  Star,
  CheckCircle,
  Heart,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Phone,
  Target,
  Percent,
  ShieldCheck,
  Info
} from 'lucide-react';
import { mockDeals, formatDealPrice, formatAchievement, getDaysAgo } from '../mock/dealData';
import { mockAgents } from '../mock/agentData';

const DealDetailPage = () => {
  const { id } = useParams();
  const deal = mockDeals.find(d => d.id === parseInt(id));
  const agent = mockAgents.find(a => a.id === deal?.agentId);
  
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [agentShortlisted, setAgentShortlisted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Deal Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The deal you're looking for doesn't exist.
            </p>
            <Link to="/deals">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Browse All Deals
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Similar deals by same agent
  const similarDeals = mockDeals.filter(d => 
    d.agentId === deal.agentId && d.id !== deal.id
  ).slice(0, 3);

  // Mask street number for privacy
  const maskedAddress = deal.address.replace(/^\d+/, 'XX');

  return (
    <>
      <SEO 
        title={`${deal.suburb} ${deal.propertyType} - Buyer Agent Deal | AgentRate`}
        description={`See how a buyer agent secured this ${deal.propertyType} in ${deal.suburb}. Verified deal details with negotiation insights.`}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <Link to="/deals" className="hover:text-amber-600">Deals</Link>
              <span>/</span>
              <span>{deal.suburb}</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {deal.suburb} • {deal.propertyType}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(deal.purchaseDate).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {maskedAddress}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isShortlisted ? "default" : "outline"}
                  onClick={() => setIsShortlisted(!isShortlisted)}
                  className={isShortlisted ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isShortlisted ? 'fill-current' : ''}`} />
                  {isShortlisted ? 'Saved' : 'Save Deal'}
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>

            {deal.verified && (
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Deal
              </Badge>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <Card className="overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img 
                  src={deal.photos[0]} 
                  alt={deal.address}
                  className="w-full h-96 object-cover"
                />
              </Card>

              {/* Price & Timing */}
              <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
                    Price & Timing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Purchase Price</div>
                      <div className="text-2xl font-bold text-amber-600">
                        {formatDealPrice(deal)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days to Secure</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-amber-600" />
                        {deal.daysToSecure}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Method</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {deal.strategyTags && deal.strategyTags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Value Story */}
              <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2 text-amber-600" />
                    Value Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formatAchievement(deal) && (
                    <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Discount Achieved</span>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {formatAchievement(deal)}
                        </span>
                      </div>
                      {deal.askingPrice && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Asking: ${deal.askingPrice.toLocaleString()} → Secured: {formatDealPrice(deal)}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Negotiation Notes</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {deal.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Buyer Brief Summary</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Target className="h-4 w-4 mr-2 text-amber-600 mt-1" />
                        <div>
                          <span className="font-medium">Budget:</span> {formatDealPrice(deal)}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-amber-600 mt-1" />
                        <div>
                          <span className="font-medium">Must-haves:</span>{' '}
                          {deal.features && deal.features.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rental & Yield */}
              {(deal.rentalAppraisal || deal.grossYield) && (
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Percent className="h-5 w-5 mr-2 text-amber-600" />
                      Rental & Yield
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {deal.rentalAppraisal && (
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rental Appraisal</div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${deal.rentalAppraisal}/week
                          </div>
                        </div>
                      )}
                      {deal.rentalAchieved && (
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rental Achieved</div>
                          <div className="text-xl font-bold text-green-600">
                            ${deal.rentalAchieved}/week
                          </div>
                        </div>
                      )}
                      {deal.grossYield && (
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gross Yield</div>
                          <div className="text-xl font-bold text-amber-600">
                            {deal.grossYield}%
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property Details */}
              <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-amber-600" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {deal.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 mr-2 text-amber-600" />
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                          <div className="font-semibold">{deal.bedrooms}</div>
                        </div>
                      </div>
                    )}
                    {deal.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-amber-600" />
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                          <div className="font-semibold">{deal.bathrooms}</div>
                        </div>
                      </div>
                    )}
                    {deal.carSpaces > 0 && (
                      <div className="flex items-center">
                        <Car className="h-5 w-5 mr-2 text-amber-600" />
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Parking</div>
                          <div className="font-semibold">{deal.carSpaces}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-amber-600" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Land Size</div>
                        <div className="font-semibold">{deal.landSize}</div>
                      </div>
                    </div>
                  </div>

                  {deal.features && deal.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {deal.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="border-amber-300 dark:border-amber-600">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Verification */}
              <Card className="border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-300 mb-3">
                    This deal has been verified by AgentRate through:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      Settlement documentation sighted and verified
                    </li>
                    <li className="flex items-start text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      Agent credentials and license confirmed
                    </li>
                    <li className="flex items-start text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      Property details cross-referenced with public records
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Similar Deals */}
              {similarDeals.length > 0 && (
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>More Deals by {agent?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {similarDeals.map(d => (
                        <Link key={d.id} to={`/deal/${d.id}`}>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-amber-500 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {d.suburb} • {d.propertyType}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {formatDealPrice(d)} • {getDaysAgo(d.purchaseDate)}
                                </p>
                              </div>
                              {d.discountPercent && (
                                <Badge variant="secondary" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
                                  {d.discountPercent}% off
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link to={`/agent/${agent?.id}`}>
                      <Button variant="outline" className="w-full mt-4">
                        View All Deals by {agent?.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Feedback Widget */}
              <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Was this information useful?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      variant={feedback === 'yes' ? 'default' : 'outline'}
                      onClick={() => setFeedback('yes')}
                      className={feedback === 'yes' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Yes
                    </Button>
                    <Button
                      variant={feedback === 'no' ? 'default' : 'outline'}
                      onClick={() => setFeedback('no')}
                      className={feedback === 'no' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      No
                    </Button>
                  </div>
                  {feedback && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                      Thank you for your feedback!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Agent Card (Sticky) */}
            <div className="lg:col-span-1">
              {agent && (
                <div className="sticky top-32">
                  <Card className="border-2 border-amber-500 dark:border-amber-600">
                    <CardHeader className="bg-amber-50 dark:bg-amber-900">
                      <CardTitle className="text-amber-900 dark:text-amber-100">
                        Deal Secured By
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-400 mb-3"
                        />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {agent.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {agent.company}
                        </p>
                        <div className="flex items-center justify-center mt-2">
                          <Star className="h-5 w-5 text-amber-400 fill-current" />
                          <span className="ml-1 font-semibold">{agent.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400 ml-1">
                            ({agent.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Verified Deals</span>
                          <span className="font-semibold">{agent.verifiedDealsCount || 0}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Days to Secure</span>
                          <span className="font-semibold">{agent.medianDaysToSecure} days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Avg Discount</span>
                          <span className="font-semibold text-green-600">{agent.avgDiscountPercent}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link to={`/agent/${agent.id}`}>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">
                            View Full Profile
                          </Button>
                        </Link>
                        <Button
                          variant={agentShortlisted ? "default" : "outline"}
                          className={`w-full ${agentShortlisted ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                          onClick={() => setAgentShortlisted(!agentShortlisted)}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${agentShortlisted ? 'fill-current' : ''}`} />
                          {agentShortlisted ? 'Agent Saved' : 'Save Agent'}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Agent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Privacy Notice */}
                  <Card className="mt-4 bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Privacy Protected:</strong> Street numbers are masked and no personally identifying buyer details are displayed.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealDetailPage;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Target,
  Users,
  ArrowLeft,
  MessageCircle,
  Share2,
  Heart,
  Bed,
  Bath,
  Car,
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';
import { getDealsByAgentId, formatDealPrice } from '../mock/dealData';

const AgentProfilePage = () => {
  const { id } = useParams();
  const agent = mockAgents.find(a => a.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h2>
          <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist.</p>
          <Link to="/agents">
            <Button>Back to Agents</Button>
          </Link>
        </div>
      </div>
    );
  }

  const performanceMetrics = [
    { label: 'Sales Volume', value: agent.salesVolume, icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Avg Days on Market', value: `${agent.avgDaysOnMarket} days`, icon: Clock, color: 'text-blue-600' },
    { label: 'Price Accuracy', value: agent.priceAccuracy, icon: Target, color: 'text-purple-600' },
    { label: 'Years Experience', value: `${agent.yearsExperience} years`, icon: Award, color: 'text-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/agents" className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Link>
        </div>

        {/* Agent Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-2xl"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Profile Image */}
              <div className="-mt-16 mb-6 lg:mb-0">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full border-8 border-white shadow-xl object-cover"
                />
              </div>
              
              {/* Agent Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                    <p className="text-xl font-semibold text-gray-700 mb-2">{agent.company}</p>
                    <p className="text-gray-600 flex items-center mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      {agent.location}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-6 w-6 text-amber-400 fill-current" />
                        <span className="text-2xl font-bold text-gray-900">{agent.rating}</span>
                        <span className="text-gray-600">({agent.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 lg:min-w-[200px]">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Agent
                    </Button>
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
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-emerald-50 text-emerald-700 px-3 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                  Recent Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.recentSales.map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-gray-900">{sale.address}</h4>
                        <p className="text-gray-600 text-sm">Sold {sale.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-emerald-600">{sale.price}</div>
                        <div className="text-sm text-gray-600">{sale.daysOnMarket} days on market</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-emerald-600" />
                  Client Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agent.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentProfilePage;
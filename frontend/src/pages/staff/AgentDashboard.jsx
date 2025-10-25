import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  BarChart3,
  Calendar,
  Star,
  Plus,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Home,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AgentDashboard = () => {
  const { user } = useAuth();

  // Mock agent-specific data
  const agentStats = {
    publishedDeals: 8,
    medianDaysToSecure: 38,
    totalReviews: 12,
    averageRating: 4.7,
    profileViews: 342,
    dealsThisMonth: 3
  };

  // Mock published deals
  const myDeals = [
    {
      id: 1,
      propertyAddress: '45 Ocean View Drive, Bondi',
      propertyType: 'House',
      price: '$1,850,000',
      status: 'Verified',
      daysToSecure: 42,
      date: '2024-09-15',
      suburb: 'Bondi'
    },
    {
      id: 2,
      propertyAddress: '12 Harbour Street, Mosman',
      propertyType: 'Apartment',
      price: '$2,100,000',
      status: 'Pending Verification',
      daysToSecure: 28,
      date: '2024-09-28',
      suburb: 'Mosman'
    },
    {
      id: 3,
      propertyAddress: '78 Park Avenue, Paddington',
      propertyType: 'Townhouse',
      price: '$1,650,000',
      status: 'Verified',
      daysToSecure: 45,
      date: '2024-08-20',
      suburb: 'Paddington'
    },
    {
      id: 4,
      propertyAddress: '23 Beach Road, Manly',
      propertyType: 'House',
      price: '$2,450,000',
      status: 'Verified',
      daysToSecure: 35,
      date: '2024-08-05',
      suburb: 'Manly'
    }
  ];

  // Mock latest reviews
  const latestReviews = [
    {
      id: 1,
      reviewer: 'M.C.',
      rating: 5,
      comment: 'Excellent service throughout the buying process. Sarah was professional and always available.',
      property: 'Bondi Beach property',
      date: '2024-10-10',
      verified: true
    },
    {
      id: 2,
      reviewer: 'J.L.',
      rating: 5,
      comment: 'Made the process so smooth. Great communication and found us the perfect home.',
      property: 'Mosman apartment',
      date: '2024-10-05',
      verified: true
    },
    {
      id: 3,
      reviewer: 'R.P.',
      rating: 4,
      comment: 'Very knowledgeable about the local market. Helped negotiate a great deal.',
      property: 'Paddington townhouse',
      date: '2024-09-18',
      verified: false
    }
  ];

  // Main stats cards
  const stats = [
    {
      title: 'My Published Deals',
      value: agentStats.publishedDeals,
      icon: BarChart3,
      color: 'text-black',
      bgColor: 'bg-gray-50 dark:bg-gray-800/20',
      change: `+${agentStats.dealsThisMonth} this month`
    },
    {
      title: 'Median Days-to-Secure',
      value: agentStats.medianDaysToSecure,
      icon: Calendar,
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 dark:bg-gray-100/20',
      change: '5 days faster than avg'
    },
    {
      title: 'Average Rating',
      value: agentStats.averageRating.toFixed(1),
      icon: Star,
      color: 'text-black',
      bgColor: 'bg-gray-50 dark:bg-gray-100',
      change: `${agentStats.totalReviews} total reviews`
    },
    {
      title: 'Profile Views',
      value: agentStats.profileViews,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: 'Last 30 days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name || 'Agent'}!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Here's your performance overview
              </p>
            </div>
            <Link to="/staff/deals/add">
              <Button className="bg-green-700 hover:bg-green-800 hover:text-white text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Deal
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Published Deals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-black" />
                    My Published Deals
                  </CardTitle>
                  <Link to="/staff/deals">
                    <Button variant="ghost" size="sm" className="text-black hover:text-black">
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myDeals.map((deal) => (
                    <div 
                      key={deal.id} 
                      className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-300 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {deal.propertyAddress}
                          </h4>
                          <Badge 
                            variant={deal.status === 'Verified' ? 'default' : 'secondary'}
                            className={deal.status === 'Verified' ? 'bg-green-600 text-white' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-700'}
                          >
                            {deal.status === 'Verified' ? (
                              <CheckCircle className="h-3 w-3 mr-1 inline" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1 inline" />
                            )}
                            {deal.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Home className="h-3 w-3 mr-1" />
                            {deal.propertyType}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {deal.suburb}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {deal.daysToSecure} days
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-black dark:text-gray-700">
                          {deal.price}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(deal.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {myDeals.length === 0 && (
                    <div className="text-center py-12">
                      <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No deals yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                        Start adding your successful deals to showcase your track record
                      </p>
                      <Link to="/staff/deals/add">
                        <Button className="bg-green-700 hover:bg-green-800 hover:text-white text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Deal
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Latest Reviews */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-black" />
                  Latest Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latestReviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {review.reviewer}
                          </span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'fill-yellow-600 text-gray-700'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                        <span>{review.property}</span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  
                  {latestReviews.length === 0 && (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews yet</p>
                    </div>
                  )}
                  
                  <Link to="/reviews">
                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-black" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/staff/deals/add">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Deal
                  </Button>
                </Link>
                <Link to="/staff/my-profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    View My Profile
                  </Button>
                </Link>
                <Link to="/staff/deals">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Manage Deals
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

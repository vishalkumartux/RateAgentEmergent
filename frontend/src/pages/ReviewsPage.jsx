import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { 
  Search, 
  Star, 
  MapPin, 
  Filter,
  ThumbsUp,
  MessageCircle,
  Calendar,
  User,
  TrendingUp,
  Award
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const ReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Flatten all reviews from all agents
  const allReviews = mockAgents.flatMap(agent => 
    agent.reviews.map(review => ({
      ...review,
      agentName: agent.name,
      agentPhoto: agent.photo,
      agentCompany: agent.company,
      agentLocation: agent.location,
      agentId: agent.id,
      agentRating: agent.rating,
      agentSpecialties: agent.specialties
    }))
  );

  // Filter and sort reviews
  const filteredReviews = allReviews.filter(review => {
    const matchesSearch = !searchTerm || 
      review.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = review.rating >= ratingFilter[0];
    const matchesLocation = locationFilter === 'all' || review.agentLocation === locationFilter;
    
    return matchesSearch && matchesRating && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
  const totalReviews = allReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = allReviews.filter(review => review.rating === rating).length;
    return { rating, count, percentage: (count / totalReviews) * 100 };
  });

  const locations = [...new Set(mockAgents.map(agent => agent.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agent Reviews & Ratings
          </h1>
          <p className="text-xl text-gray-600">
            Read authentic reviews from real clients about their experiences with agents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Statistics */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-emerald-600" />
                  Overall Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(averageRating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {totalReviews} reviews</p>
                </div>
                
                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2 text-sm">
                      <span className="w-3">{rating}</span>
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-emerald-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Minimum Rating: {ratingFilter[0]}+
                  </label>
                  <Slider
                    value={ratingFilter}
                    onValueChange={setRatingFilter}
                    max={5}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Modern Search and Sort */}
            <Card className="mb-6 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
                    <Input
                      placeholder="Search reviews, agents, or clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      list="review-search"
                      className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                    />
                    <datalist id="review-search">
                      <option value="5 star reviews" />
                      <option value="Sarah Johnson" />
                      <option value="Michael Chen" />
                      <option value="Sydney" />
                    </datalist>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-52 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold dark:bg-gray-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">🕐 Most Recent</SelectItem>
                      <SelectItem value="rating-high">⭐ Highest Rating</SelectItem>
                      <SelectItem value="rating-low">📉 Lowest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Popular Searches */}
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Quick Filter:
                  </span>
                  {['5 Stars', '4+ Stars', 'Recent', 'Sydney'].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => {
                        if (quick === '5 Stars') setRatingFilter([5]);
                        else if (quick === '4+ Stars') setRatingFilter([4]);
                        else if (quick === 'Recent') setSortBy('recent');
                        else setSearchTerm(quick);
                      }}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 rounded-full text-sm transition-all duration-200 hover:shadow-md"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={`${review.agentId}-${review.id}`} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.agentPhoto}
                          alt={review.agentName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <Link 
                            to={`/agent/${review.agentId}`}
                            className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                          >
                            {review.agentName}
                          </Link>
                          <p className="text-gray-600">{review.agentCompany}</p>
                          <p className="text-gray-500 text-sm flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {review.agentLocation}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {review.agentSpecialties.slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 font-semibold text-gray-900">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Review Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">{review.author}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredReviews.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to see more reviews.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setRatingFilter([0]);
                      setLocationFilter('all');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            {filteredReviews.length > 0 && (
              <Card className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Have you worked with an agent?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Help other buyers and sellers by sharing your experience with an agent.
                  </p>
                  <Link to="/submit-review">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Write a Review
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
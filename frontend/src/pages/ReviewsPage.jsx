import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import SEO from '../components/SEO';
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
  Award,
  CheckCircle,
  ShieldCheck,
  Flag,
  Home,
  Briefcase,
  DollarSign,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';
import { 
  mockReviews, 
  BUDGET_BANDS, 
  SERVICE_TYPES, 
  TRANSACTION_TYPES,
  REVIEW_TAGS,
  getAllSuburbs
} from '../mock/reviewData';

const ReviewsPageEnhanced = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: 0,
    verifiedOnly: false,
    tags: [],
    serviceType: 'all',
    transactionType: 'all',
    suburb: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [sortBy, setSortBy] = useState('recent');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState({});
  const [reportedReviews, setReportedReviews] = useState({});
  const [reviewsToShow, setReviewsToShow] = useState(12);

  // Enhance mock reviews with agent data
  const allReviews = mockReviews.map(review => {
    const agent = mockAgents.find(a => a.id === review.agentId);
    return {
      ...review,
      agentPhoto: agent?.photo,
      agentCompany: agent?.company,
      agentLocation: agent?.location,
      agentSpecialties: agent?.specialties || []
    };
  });

  // Apply filters
  let filteredReviews = allReviews;

  // Search filter
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredReviews = filteredReviews.filter(review =>
      review.agentName.toLowerCase().includes(searchLower) ||
      review.title.toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower) ||
      review.suburb.toLowerCase().includes(searchLower)
    );
  }

  // Rating filter
  if (filters.rating > 0) {
    filteredReviews = filteredReviews.filter(review => review.rating >= filters.rating);
  }

  // Verified only filter
  if (filters.verifiedOnly) {
    filteredReviews = filteredReviews.filter(review => review.verified);
  }

  // Tags filter
  if (filters.tags.length > 0) {
    filteredReviews = filteredReviews.filter(review =>
      filters.tags.some(tag => review.tags.includes(tag))
    );
  }

  // Service type filter
  if (filters.serviceType !== 'all') {
    filteredReviews = filteredReviews.filter(review => review.serviceType === filters.serviceType);
  }

  // Transaction type filter
  if (filters.transactionType !== 'all') {
    filteredReviews = filteredReviews.filter(review => review.transactionType === filters.transactionType);
  }

  // Suburb filter
  if (filters.suburb !== 'all') {
    filteredReviews = filteredReviews.filter(review => review.suburb === filters.suburb);
  }

  // Date range filter
  if (filters.dateFrom) {
    filteredReviews = filteredReviews.filter(review => new Date(review.date) >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    filteredReviews = filteredReviews.filter(review => new Date(review.date) <= new Date(filters.dateTo));
  }

  // Sort
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return (b.helpfulCount + (helpfulReviews[b.id] ? 1 : 0)) - 
               (a.helpfulCount + (helpfulReviews[a.id] ? 1 : 0));
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'rating-high':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Statistics
  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
  const totalReviews = allReviews.length;
  const verifiedCount = allReviews.filter(r => r.verified).length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = allReviews.filter(review => review.rating === rating).length;
    return { rating, count, percentage: (count / totalReviews) * 100 };
  });

  const suburbs = getAllSuburbs();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleHelpfulClick = (reviewId) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const handleReportClick = (reviewId) => {
    setReportedReviews(prev => ({
      ...prev,
      [reviewId]: true
    }));
    // In real app, would open modal for report reason
    alert('Thank you for reporting. Our team will review this shortly.');
  };

  const clearAllFilters = () => {
    setFilters({
      rating: 0,
      verifiedOnly: false,
      tags: [],
      serviceType: 'all',
      transactionType: 'all',
      suburb: 'all',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };

  const activeFiltersCount =
    (filters.rating > 0 ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    filters.tags.length +
    (filters.serviceType !== 'all' ? 1 : 0) +
    (filters.transactionType !== 'all' ? 1 : 0) +
    (filters.suburb !== 'all' ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  return (
    <>
      <SEO
        title="Buyer Agent Reviews & Ratings | AgentRate"
        description="Read verified reviews from real clients about their buyer agent experiences. Filter by rating, service type, location, and more."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Buyer Agent Reviews & Ratings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Read authentic, verified reviews from real clients about their buyer agent experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Statistics & Filters */}
            <div className="lg:col-span-1">
              {/* Statistics Card */}
              <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <Star className="h-5 w-5 mr-2 text-amber-600" />
                    Overall Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(averageRating)
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Based on <span className="font-semibold">{totalReviews}</span> reviews
                    </p>
                    <p className="text-amber-600 text-sm font-medium mt-1">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      {verifiedCount} verified
                    </p>
                  </div>

                  <div className="space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center space-x-2 text-sm">
                        <span className="w-3 text-gray-700 dark:text-gray-300">{rating}</span>
                        <Star className="h-3 w-3 text-amber-400 fill-current" />
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Filters Card */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Filter className="h-5 w-5 mr-2 text-amber-600" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-amber-600 text-white">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs text-amber-600 hover:text-amber-700"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Minimum Rating: {filters.rating}+
                    </label>
                    <Slider
                      value={[filters.rating]}
                      onValueChange={([value]) => handleFilterChange('rating', value)}
                      max={5}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={filters.verifiedOnly}
                      onCheckedChange={(checked) => handleFilterChange('verifiedOnly', checked)}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex items-center"
                    >
                      <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                      Verified reviews only
                    </label>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      Service Type
                    </label>
                    <Select
                      value={filters.serviceType}
                      onValueChange={(value) => handleFilterChange('serviceType', value)}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        {SERVICE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Transaction Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      <Home className="h-4 w-4 inline mr-1" />
                      Transaction Type
                    </label>
                    <Select
                      value={filters.transactionType}
                      onValueChange={(value) => handleFilterChange('transactionType', value)}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {TRANSACTION_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Suburb */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Suburb
                    </label>
                    <Select value={filters.suburb} onValueChange={(value) => handleFilterChange('suburb', value)}>
                      <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Suburbs</SelectItem>
                        {suburbs.map((suburb) => (
                          <SelectItem key={suburb} value={suburb}>
                            {suburb}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Date Range
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        placeholder="From"
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                      <Input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        placeholder="To"
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Popular Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {REVIEW_TAGS.slice(0, 6).map((tag) => (
                        <Badge
                          key={tag}
                          variant={filters.tags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            filters.tags.includes(tag)
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-600 hover:text-amber-600'
                          }`}
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Sort */}
              <Card className="mb-6 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600 z-10" />
                      <Input
                        placeholder="Search reviews, agents, or suburbs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                      />
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-52 h-14 border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold dark:bg-gray-700 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="helpful">👍 Most Helpful</SelectItem>
                        <SelectItem value="recent">🕐 Most Recent</SelectItem>
                        <SelectItem value="rating-high">⭐ Highest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quick Filters */}
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Quick Filter:
                    </span>
                    {['5 Stars', 'Verified Only', 'Investment', 'First Home'].map((quick) => (
                      <button
                        key={quick}
                        onClick={() => {
                          if (quick === '5 Stars') handleFilterChange('rating', 5);
                          else if (quick === 'Verified Only') handleFilterChange('verifiedOnly', true);
                          else if (quick === 'Investment') handleFilterChange('transactionType', 'Investment Property');
                          else if (quick === 'First Home') handleFilterChange('serviceType', 'First Home Buyer Support');
                        }}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 rounded-full text-sm transition-all duration-200 hover:shadow-md"
                      >
                        {quick}
                      </button>
                    ))}
                  </div>

                  {/* Active Filters Display */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-4 flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                      {filters.rating > 0 && (
                        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700">
                          {filters.rating}+ stars
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => handleFilterChange('rating', 0)}
                          />
                        </Badge>
                      )}
                      {filters.verifiedOnly && (
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700">
                          Verified only
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => handleFilterChange('verifiedOnly', false)}
                          />
                        </Badge>
                      )}
                      {filters.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700">
                          {tag}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Results Count */}
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{sortedReviews.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{totalReviews}</span> reviews
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {sortedReviews.map((review) => {
                  const isHelpful = helpfulReviews[review.id];
                  const helpfulTotal = review.helpfulCount + (isHelpful ? 1 : 0);

                  return (
                    <Card
                      key={review.id}
                      className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <CardContent className="p-6">
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <Link to={`/agent/${review.agentId}`}>
                              <img
                                src={review.agentPhoto}
                                alt={review.agentName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md hover:scale-105 transition-transform"
                              />
                            </Link>
                            <div className="flex-1">
                              <Link
                                to={`/agent/${review.agentId}`}
                                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-amber-600 transition-colors"
                              >
                                {review.agentName}
                              </Link>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{review.agentCompany}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {review.verified && (
                                  <Badge className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-900">
                                  {review.serviceType}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              {new Date(review.date).toLocaleDateString('en-AU', {
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Review Title */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          {review.title}
                        </h3>

                        {/* Review Content */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{review.comment}</p>

                        {/* Review Metadata */}
                        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                            <Home className="h-3 w-3 mr-1" />
                            {review.transactionType}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {review.budgetBand}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
                            <MapPin className="h-3 w-3 mr-1" />
                            {review.suburb}
                          </Badge>
                        </div>

                        {/* Review Tags */}
                        {review.tags && review.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {review.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Review Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                              {review.reviewerInitials}
                            </span>
                            {review.wouldRecommend && (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 text-xs">
                                Would recommend
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`text-gray-600 dark:text-gray-400 ${
                                isHelpful ? 'text-amber-600 dark:text-amber-400' : 'hover:text-amber-600'
                              }`}
                              onClick={() => handleHelpfulClick(review.id)}
                            >
                              <ThumbsUp className={`h-4 w-4 mr-1 ${isHelpful ? 'fill-current' : ''}`} />
                              Helpful ({helpfulTotal})
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 dark:text-gray-400 hover:text-red-600"
                              onClick={() => handleReportClick(review.id)}
                              disabled={reportedReviews[review.id]}
                            >
                              <Flag className="h-4 w-4 mr-1" />
                              {reportedReviews[review.id] ? 'Reported' : 'Report'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* No Results */}
              {sortedReviews.length === 0 && (
                <Card className="text-center py-16 bg-white dark:bg-gray-800">
                  <CardContent>
                    <MessageCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No reviews found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your search criteria or filters to see more reviews.
                    </p>
                    <Button onClick={clearAllFilters} className="bg-amber-600 hover:bg-amber-700 text-white">
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Call to Action */}
              {sortedReviews.length > 0 && (
                <Card className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-8 text-center">
                    <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Have you worked with a buyer agent?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Help other property buyers by sharing your experience. Your review makes a difference!
                    </p>
                    <Link to="/submit-review">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
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
    </>
  );
};

export default ReviewsPageEnhanced;

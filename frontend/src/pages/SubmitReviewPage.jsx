import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Star, 
  Search, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const SubmitReviewPage = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAgentSearch, setShowAgentSearch] = useState(true);
  const [formData, setFormData] = useState({
    reviewerName: '',
    reviewerEmail: '',
    transactionType: '',
    propertyType: '',
    transactionDate: '',
    reviewTitle: '',
    reviewText: '',
    wouldRecommend: false,
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setShowAgentSearch(false);
    setSearchTerm('');
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/reviews');
      }, 2000);
    }, 1500);
  };

  const isFormValid = selectedAgent && rating > 0 && formData.reviewerName && 
                    formData.reviewerEmail && formData.transactionType && 
                    formData.reviewText && formData.reviewText.length >= 50;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Review Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for sharing your experience. Your review will help other clients make informed decisions.
            </p>
            <Button onClick={() => navigate('/reviews')} className="bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white">
              View All Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help other buyers and sellers by sharing your experience with a real estate agent.
            Your honest feedback makes a difference.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Agent Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-emerald-600" />
                Select Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedAgent ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10" />
                    <Input
                      placeholder="Search by agent name, company, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      list="review-agents"
                      className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                    />
                    <datalist id="review-agents">
                      <option value="Sarah Johnson" />
                      <option value="Michael Chen" />
                      <option value="Emma Wilson" />
                    </datalist>
                  </div>
                  
                  {searchTerm && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                      {filteredAgents.map((agent) => (
                        <div
                          key={agent.id}
                          onClick={() => handleAgentSelect(agent)}
                          className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-all"
                        >
                          <div className="flex items-center space-x-3">
                            <img src={agent.photo} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                              <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                              <p className="text-gray-600 text-sm">{agent.company}</p>
                              <p className="text-gray-500 text-xs flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {agent.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredAgents.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No agents found. Try a different search term.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={selectedAgent.photo} alt={selectedAgent.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedAgent.name}</h4>
                      <p className="text-gray-600 text-sm">{selectedAgent.company}</p>
                      <p className="text-gray-500 text-xs flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedAgent.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedAgent(null);
                      setShowAgentSearch(true);
                    }}
                  >
                    Change Agent
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedAgent && (
            <>
              {/* Rating */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-emerald-600" />
                    Overall Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">How would you rate your overall experience?</p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRatingClick(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-10 w-10 ${
                              value <= (hoverRating || rating)
                                ? 'text-gray-700 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-lg font-semibold text-gray-900">
                        {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : 
                         rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Needs Improvement'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Review Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-emerald-600" />
                    Review Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="reviewerName">Your Name *</Label>
                      <Input
                        id="reviewerName"
                        value={formData.reviewerName}
                        onChange={(e) => handleInputChange('reviewerName', e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reviewerEmail">Email Address *</Label>
                      <Input
                        id="reviewerEmail"
                        type="email"
                        value={formData.reviewerEmail}
                        onChange={(e) => handleInputChange('reviewerEmail', e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="transactionType">Transaction Type *</Label>
                      <Select value={formData.transactionType} onValueChange={(value) => handleInputChange('transactionType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying</SelectItem>
                          <SelectItem value="selling">Selling</SelectItem>
                          <SelectItem value="renting">Renting</SelectItem>
                          <SelectItem value="leasing">Leasing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="transactionDate">Transaction Date</Label>
                      <Input
                        id="transactionDate"
                        type="date"
                        value={formData.transactionDate}
                        onChange={(e) => handleInputChange('transactionDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reviewTitle">Review Title</Label>
                    <Input
                      id="reviewTitle"
                      value={formData.reviewTitle}
                      onChange={(e) => handleInputChange('reviewTitle', e.target.value)}
                      placeholder="Brief summary of your experience"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reviewText">Your Review *</Label>
                    <Textarea
                      id="reviewText"
                      value={formData.reviewText}
                      onChange={(e) => handleInputChange('reviewText', e.target.value)}
                      placeholder="Share your detailed experience working with this agent. What did they do well? What could be improved? (Minimum 50 characters)"
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.reviewText.length}/50 characters minimum
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wouldRecommend"
                        checked={formData.wouldRecommend}
                        onCheckedChange={(checked) => handleInputChange('wouldRecommend', checked)}
                      />
                      <Label htmlFor="wouldRecommend">I would recommend this agent to others</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isAnonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => handleInputChange('isAnonymous', checked)}
                      />
                      <Label htmlFor="isAnonymous">Post this review anonymously</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Review Guidelines</h3>
                      <ul className="text-black text-sm space-y-1">
                        <li>• Be honest and constructive in your feedback</li>
                        <li>• Focus on your personal experience with the agent</li>
                        <li>• Avoid sharing personal information about transactions</li>
                        <li>• Keep language professional and respectful</li>
                        <li>• Reviews are moderated and may take 24-48 hours to appear</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white px-8 py-3 text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
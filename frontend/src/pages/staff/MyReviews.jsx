import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Star,
  Reply,
  Flag,
  Copy,
  Check,
  Share2,
  AlertCircle,
  MessageCircle,
  Send,
  X,
  Link2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  TrendingUp,
  Calendar,
  User,
  Home,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyReviews = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('published');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [flaggingReview, setFlaggingReview] = useState(null);
  const [flagReason, setFlagReason] = useState('');

  // Mock reviews data - in real app, fetch from API
  const allReviews = [
    {
      id: 1,
      reviewerInitials: 'M.C.',
      rating: 5,
      date: '2024-10-15',
      title: 'Exceptional service and great results',
      comment: 'Sarah helped us find our dream home in just 3 weeks. Her knowledge of the Eastern Suburbs market is outstanding, and she negotiated a great deal for us.',
      serviceType: 'Buyer Agent Service',
      transactionType: 'PPOR',
      budgetBand: '$2M-$3M',
      suburb: 'Bondi',
      verified: true,
      tags: ['Great communication', 'Strong negotiation'],
      status: 'published',
      hasReply: false,
      reply: null,
      flagged: false
    },
    {
      id: 2,
      reviewerInitials: 'J.T.',
      rating: 5,
      date: '2024-10-10',
      title: 'Highly professional and knowledgeable',
      comment: 'We were first-time buyers and Sarah made the whole process smooth and stress-free. She explained everything clearly and was always available.',
      serviceType: 'Buyer Agent Service',
      transactionType: 'PPOR',
      budgetBand: '$1M-$1.5M',
      suburb: 'Paddington',
      verified: true,
      tags: ['Patient', 'Educational'],
      status: 'new',
      hasReply: false,
      reply: null,
      flagged: false
    },
    {
      id: 3,
      reviewerInitials: 'R.K.',
      rating: 4,
      date: '2024-10-05',
      title: 'Great investment property advisor',
      comment: 'Sarah found us an excellent investment property with strong rental yield. Her market analysis was thorough.',
      serviceType: 'Property Search',
      transactionType: 'Investment',
      budgetBand: '$800K-$1M',
      suburb: 'Surry Hills',
      verified: true,
      tags: ['Investment expertise', 'Data-driven'],
      status: 'published',
      hasReply: true,
      reply: {
        text: 'Thank you for your kind words! It was a pleasure helping you find the right investment property. Wishing you continued success with your property portfolio.',
        date: '2024-10-06'
      },
      flagged: false
    },
    {
      id: 4,
      reviewerInitials: 'A.B.',
      rating: 2,
      date: '2024-09-28',
      title: 'Disappointed with the service',
      comment: 'Expected more communication and updates throughout the process.',
      serviceType: 'Buyer Agent Service',
      transactionType: 'PPOR',
      budgetBand: '$1.5M-$2M',
      suburb: 'Mosman',
      verified: false,
      tags: [],
      status: 'flagged',
      hasReply: false,
      reply: null,
      flagged: true,
      flagReason: 'Inaccurate - maintained daily communication via email and phone'
    },
    {
      id: 5,
      reviewerInitials: 'L.W.',
      rating: 5,
      date: '2024-09-20',
      title: 'Outstanding buyer agent!',
      comment: 'Sarah went above and beyond. Secured our property 8% below asking price through smart negotiation.',
      serviceType: 'Buyer Agent Service',
      transactionType: 'PPOR',
      budgetBand: '$3M+',
      suburb: 'Double Bay',
      verified: true,
      tags: ['Strong negotiation', 'Strategic'],
      status: 'published',
      hasReply: true,
      reply: {
        text: 'Thank you! It was fantastic working with you. Congratulations on your beautiful new home!',
        date: '2024-09-21'
      },
      flagged: false
    },
    {
      id: 6,
      reviewerInitials: 'K.M.',
      rating: 5,
      date: '2024-09-15',
      title: 'Excellent experience',
      comment: 'Professional, responsive, and results-driven. Would highly recommend to anyone.',
      serviceType: 'Buyer Agent Service',
      transactionType: 'PPOR',
      budgetBand: '$1.5M-$2M',
      suburb: 'Rose Bay',
      verified: true,
      tags: ['Professional', 'Responsive'],
      status: 'new',
      hasReply: false,
      reply: null,
      flagged: false
    }
  ];

  // Filter reviews by status
  const newReviews = allReviews.filter(r => r.status === 'new');
  const publishedReviews = allReviews.filter(r => r.status === 'published');
  const flaggedReviews = allReviews.filter(r => r.flagged);

  // Stats
  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  const pendingReplies = allReviews.filter(r => !r.hasReply && r.status !== 'flagged').length;

  // Generate shareable review link
  const reviewLink = `${window.location.origin}/submit-review?agent=sarah-johnson`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleReply = (reviewId) => {
    if (!replyText.trim()) return;
    
    // In real app, API call to save reply
    console.log('Submitting reply for review', reviewId, replyText);
    setReplyingTo(null);
    setReplyText('');
  };

  const handleFlag = (reviewId) => {
    // In real app, API call to flag/unflag review
    console.log('Flagging review', reviewId, flagReason);
    setFlaggingReview(null);
    setFlagReason('');
  };

  const handleUnflag = (reviewId) => {
    // In real app, API call to unflag review
    console.log('Unflagging review', reviewId);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-600 text-gray-700'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderReviewCard = (review) => (
    <Card key={review.id} className={`${review.flagged ? 'border-red-300 dark:border-red-800' : ''}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {review.reviewerInitials}
                </span>
                {review.verified && (
                  <Badge className="bg-success text-white text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {renderStars(review.rating)}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {review.title}
        </h3>

        {/* Review Text */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {review.comment}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Home className="h-3 w-3 mr-1" />
            {review.serviceType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {review.transactionType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            {review.budgetBand}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {review.suburb}
          </Badge>
        </div>

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {review.tags.map((tag, index) => (
              <Badge key={index} className="bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-700 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Flag Badge */}
        {review.flagged && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start">
              <Flag className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">Flagged Review</p>
                {review.flagReason && (
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">{review.flagReason}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Agent Reply */}
        {review.hasReply && review.reply && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/20 border-l-4 border-gray-300 rounded">
            <div className="flex items-start space-x-3">
              <Reply className="h-4 w-4 text-black dark:text-white mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-black dark:text-gray-200">
                    Your Reply
                  </span>
                  <span className="text-xs text-black dark:text-gray-300">
                    {new Date(review.reply.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-black dark:text-gray-200 leading-relaxed">
                  {review.reply.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reply Form */}
        {replyingTo === review.id && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Write your reply (public)
            </Label>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Thank you for your review..."
              className="mt-2 h-24"
              maxLength={500}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {replyText.length}/500 characters
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReply(review.id)}
                  disabled={!replyText.trim()}
                  className="bg-success hover:bg-success/90 text-white shadow-sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Flag Form */}
        {flaggingReview === review.id && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Flag this review
            </Label>
            <Textarea
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              placeholder="Explain why this review should be flagged (optional)..."
              className="mt-2 h-20"
              maxLength={200}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {flagReason.length}/200 characters
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFlaggingReview(null);
                    setFlagReason('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleFlag(review.id)}
                  className="bg-red-600 hover:bg-red-700 hover:text-white text-white"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Flag Review
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {!review.hasReply && replyingTo !== review.id && !review.flagged && (
          <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReplyingTo(review.id)}
            >
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFlaggingReview(review.id)}
            >
              <Flag className="h-4 w-4 mr-2" />
              Flag
            </Button>
          </div>
        )}

        {review.flagged && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnflag(review.id)}
            >
              <X className="h-4 w-4 mr-2" />
              Unflag
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your reputation and respond to client feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgRating}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800/30 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{allReviews.length}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-100/30 rounded-lg flex items-center justify-center">
                  <Reply className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingReplies}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Replies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shareable Review Link */}
        <Card className="mb-8 border-2 border-gray-300 dark:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link2 className="h-5 w-5 mr-2 text-black" />
              Shareable Review Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Share this link with clients to collect reviews for your public profile
            </p>
            
            <div className="flex items-center space-x-2 mb-4">
              <Input
                value={reviewLink}
                readOnly
                className="flex-1 bg-gray-50 dark:bg-gray-800"
              />
              <Button
                onClick={handleCopyLink}
                className={linkCopied ? 'bg-success hover:bg-success/90' : 'bg-success hover:bg-success/90'}
              >
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Share on:</span>
              <Button variant="outline" size="sm" title="Share on Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" title="Share on Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" title="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" title="Share via Email">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-14">
            <TabsTrigger value="published" className="text-base">
              Published ({publishedReviews.length})
            </TabsTrigger>
            <TabsTrigger value="new" className="text-base">
              New ({newReviews.length})
              {newReviews.length > 0 && (
                <Badge className="ml-2 bg-success">
                  {newReviews.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="flagged" className="text-base">
              Flagged ({flaggedReviews.length})
              {flaggedReviews.length > 0 && (
                <Badge className="ml-2 bg-red-600">
                  {flaggedReviews.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Published Tab */}
          <TabsContent value="published" className="mt-6">
            {publishedReviews.length > 0 ? (
              <div className="space-y-4">
                {publishedReviews.map(renderReviewCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No published reviews yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your review link with clients to start collecting feedback
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* New Tab */}
          <TabsContent value="new" className="mt-6">
            {newReviews.length > 0 ? (
              <>
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-300 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-black dark:text-gray-700 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-700">
                        Action Required
                      </p>
                      <p className="text-sm text-black dark:text-gray-700 mt-1">
                        {newReviews.length} {newReviews.length === 1 ? 'review' : 'reviews'} waiting for your reply. Responding promptly shows professionalism.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {newReviews.map(renderReviewCard)}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    All caught up!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You've replied to all your reviews
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Flagged Tab */}
          <TabsContent value="flagged" className="mt-6">
            {flaggedReviews.length > 0 ? (
              <>
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start">
                    <Flag className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-200">
                        Flagged Reviews
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        These reviews are marked as potentially inappropriate or inaccurate. They remain visible on your public profile unless removed by platform admin.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {flaggedReviews.map(renderReviewCard)}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No flagged reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All your reviews are in good standing
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyReviews;

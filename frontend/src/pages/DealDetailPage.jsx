import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft,
  MapPin, 
  Bed,
  Bath,
  Car,
  Home,
  DollarSign,
  Calendar,
  Clock,
  User,
  Star,
  TrendingUp,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockDeals, formatDealPrice, getDealsByAgentId } from '../mock/dealData';

const DealDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deal = mockDeals.find(d => d.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deal not found</h2>
          <Link to="/deals">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Browse All Deals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get other deals by the same agent
  const otherAgentDeals = getDealsByAgentId(deal.agentId).filter(d => d.id !== deal.id).slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % deal.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + deal.photos.length) % deal.photos.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 dark:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative h-96">
                <img
                  src={deal.photos[currentImageIndex]}
                  alt={`${deal.address} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {deal.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {deal.photos.length}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${deal.dealType === 'sale' ? 'bg-amber-600' : 'bg-blue-600'} text-white text-lg px-4 py-2`}>
                    {deal.dealType === 'sale' ? 'Sold' : 'Leased'}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {deal.photos.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {deal.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index 
                          ? 'border-amber-600' 
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Property Details */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {formatDealPrice(deal)}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {deal.address}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {deal.suburb}, {deal.state}
                  </div>
                </div>

                {/* Property Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Bed className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{deal.bedrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Bath className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{deal.bathrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Car className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{deal.carSpaces}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Parking</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Home className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{deal.propertyType}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {deal.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Property Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Property Information</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Land Size:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{deal.landSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Building Area:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{deal.buildingArea}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">{deal.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Days on Market:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{deal.daysOnMarket} days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Deals by This Agent */}
            {otherAgentDeals.length > 0 && (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    More deals by {deal.agentName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {otherAgentDeals.map((otherDeal) => (
                      <Link key={otherDeal.id} to={`/deal/${otherDeal.id}`} className="group">
                        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-colors">
                          <img src={otherDeal.photos[0]} alt={otherDeal.address} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="p-3">
                            <div className="text-lg font-bold text-amber-600">{formatDealPrice(otherDeal)}</div>
                            <div className="text-sm text-gray-900 dark:text-white line-clamp-1">{otherDeal.suburb}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Handled by
                </h2>
                
                <Link to={`/agent/${deal.agentId}`} className="block group">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={deal.agentPhoto}
                      alt={deal.agentName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                        {deal.agentName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{deal.agentCompany}</p>
                    </div>
                  </div>
                </Link>

                <Link to={`/agent/${deal.agentId}`}>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white mb-3">
                    <User className="h-4 w-4 mr-2" />
                    View Agent Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Deal Stats */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Deal Statistics
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Date {deal.dealType === 'sale' ? 'Sold' : 'Leased'}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{deal.soldDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-amber-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Days on Market</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{deal.daysOnMarket} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage;

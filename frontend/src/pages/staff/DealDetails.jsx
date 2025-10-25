import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  ArrowLeft,
  Edit,
  Share2,
  Eye,
  MapPin,
  Home,
  Car,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Camera,
  Phone,
  Mail,
  MessageCircle,
  BarChart3
} from 'lucide-react';

const DealDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock deal data - TODO: Replace with API call
  const dealData = {
    id: 1,
    address: '123 Ocean View Drive, Bondi Beach NSW 2026',
    type: 'Sale',
    status: 'Active',
    price: '$2,800,000',
    priceType: 'Fixed Price',
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    landSize: '650m²',
    buildingArea: '280m²',
    yearBuilt: 2018,
    propertyType: 'House',
    listedDate: '2024-07-15',
    daysOnMarket: 25,
    inspections: 12,
    enquiries: 8,
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop'
    ],
    description: 'Stunning contemporary family home situated in one of Bondi Beach\'s most prestigious streets. This architecturally designed residence features open-plan living, premium finishes, and breathtaking ocean views from multiple levels.',
    features: [
      'Ocean Views', 'Modern Kitchen', 'Outdoor Entertainment', 'Swimming Pool',
      'Garage Parking', 'Close to Beach', 'Renovated Bathrooms', 'Air Conditioning'
    ],
    nearbyAmenities: ['Beach', 'Schools', 'Shopping Centers', 'Public Transport', 'Restaurants'],
    targetMarket: ['Families', 'Upgraders', 'Investors'],
    marketingStrategy: 'Premium marketing campaign targeting affluent families and investors seeking prestige beachside living. Multi-channel approach including high-end photography, virtual tours, and targeted digital advertising.',
    competitiveAdvantages: 'Unique ocean views, premium finishes, and prime beachside location set this property apart from comparable listings in the area.',
    commission: '$84,000',
    inspectionTimes: [
      { date: '2024-08-10', time: '11:00', duration: '30 min' },
      { date: '2024-08-11', time: '14:00', duration: '30 min' }
    ],
    enquiries: [
      {
        id: 1,
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+61 400 123 456',
        message: 'Very interested in this property. Can we arrange a private inspection?',
        date: '2024-08-08',
        status: 'New'
      },
      {
        id: 2,
        name: 'Sarah Williams',
        email: 'sarah.williams@email.com', 
        phone: '+61 400 789 123',
        message: 'Looking for a family home in Bondi. What\'s the expected settlement timeline?',
        date: '2024-08-07',
        status: 'Responded'
      }
    ],
    analytics: {
      views: 847,
      favorites: 23,
      shares: 8,
      inquiryRate: '2.1%',
      averageViewTime: '3:24'
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-700 text-white',
      'Under Contract': 'bg-green-700 text-white',
      'Sold': 'bg-emerald-600 text-white',
      'Leased': 'bg-emerald-600 text-white'
    };
    return statusColors[status] || 'bg-gray-600 text-white';
  };

  const getEnquiryStatusBadge = (status) => {
    const colors = {
      'New': 'bg-red-600 text-white',
      'Responded': 'bg-success text-white',
      'Follow Up': 'bg-green-700 text-white'
    };
    return colors[status] || 'bg-gray-600 text-white';
  };

  if (!dealData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deal Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The deal you're looking for doesn't exist.</p>
          <Link to="/staff/deals">
            <Button>Back to My Deals</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/staff/deals" className="inline-flex items-center text-black hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Deals
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Deal Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive view of your property listing and performance
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Public Listing
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link to={`/staff/deals/${id}/edit`}>
                <Button className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Deal
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Property Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              <div className="flex-shrink-0 mb-4 lg:mb-0">
                <img
                  src={dealData.photos[0]}
                  alt={dealData.address}
                  className="w-full lg:w-80 h-60 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {dealData.address}
                    </h2>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={getStatusBadge(dealData.status)}>
                        {dealData.status}
                      </Badge>
                      <Badge variant="secondary">{dealData.type}</Badge>
                      <Badge variant="outline">{dealData.propertyType}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-black mb-4">
                  {dealData.price}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                    {dealData.priceType}
                  </span>
                </div>
                
                {/* Property Details */}
                <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    <span>{dealData.bedrooms} bed, {dealData.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    <span>{dealData.carSpaces} car spaces</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{dealData.landSize} land</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Built {dealData.yearBuilt}</span>
                  </div>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.daysOnMarket}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Days on Market</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.inspections}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Inspections</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.enquiries.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Enquiries</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="h-6 w-6 text-black mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.analytics.views}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.analytics.favorites}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.analytics.shares}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Shares</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-gray-700 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.analytics.inquiryRate}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Inquiry Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-black mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{dealData.analytics.averageViewTime}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg View Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="photos">Photos ({dealData.photos.length})</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries ({dealData.enquiries.length})</TabsTrigger>
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {dealData.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {dealData.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-50 dark:bg-gray-900 text-black dark:text-gray-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Nearby Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {dealData.nearbyAmenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Listing Price</span>
                    <span className="font-semibold">{dealData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Commission Rate</span>
                    <span className="font-semibold">3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expected Commission</span>
                    <span className="font-semibold text-emerald-600">{dealData.commission}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Listed Date</span>
                      <span className="font-semibold">{dealData.listedDate}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-600 dark:text-gray-400">Days on Market</span>
                      <span className="font-semibold">{dealData.daysOnMarket} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-black" />
                  Property Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dealData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Property ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-700 text-white text-xs">Main Photo</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enquiries Tab */}
          <TabsContent value="enquiries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-black" />
                  Client Enquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.enquiries.map((enquiry) => (
                    <div key={enquiry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{enquiry.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {enquiry.phone}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {enquiry.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getEnquiryStatusBadge(enquiry.status)}>
                            {enquiry.status}
                          </Badge>
                          <div className="text-sm text-gray-500 mt-1">{enquiry.date}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{enquiry.message}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inspections Tab */}
          <TabsContent value="inspections">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-black" />
                  Inspection Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.inspectionTimes.map((inspection, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {new Date(inspection.date).toLocaleDateString('en-AU', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {inspection.time} ({inspection.duration})
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                    Add Inspection Time
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-black" />
                    Marketing Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Strategy Overview</h4>
                      <p className="text-gray-700 dark:text-gray-300">{dealData.marketingStrategy}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Target Market</h4>
                      <div className="flex flex-wrap gap-2">
                        {dealData.targetMarket.map((market, index) => (
                          <Badge key={index} className="bg-gray-50 dark:bg-gray-900 text-black dark:text-gray-300">
                            {market}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Advantages</h4>
                      <p className="text-gray-700 dark:text-gray-300">{dealData.competitiveAdvantages}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealDetails;
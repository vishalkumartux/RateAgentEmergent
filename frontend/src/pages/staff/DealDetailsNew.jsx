import React, { useState } from 'react';
import { useParams, Link, useSearchParams, Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import DealDetailPage from '../DealDetailPage';
import { 
  ArrowLeft,
  Edit,
  Eye,
  MapPin,
  Home,
  Bed,
  Bath,
  Car,
  Calendar,
  DollarSign,
  TrendingDown,
  Clock,
  CheckCircle,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  FileText,
  BarChart3,
  Star,
  Award
} from 'lucide-react';

const DealDetailsNew = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [activeTab, setActiveTab] = useState('details');
  
  // If preview mode, render the public view with a banner
  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Preview Banner */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-3 sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-3" />
                <div>
                  <p className="font-semibold">Preview Mode - Public View</p>
                  <p className="text-sm text-blue-100">This is exactly how buyers will see your deal</p>
                </div>
              </div>
              <Link to={`/staff/deals/${id}`}>
                <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                  <X className="h-4 w-4 mr-2" />
                  Exit Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Render the actual public deal page */}
        <DealDetailPage />
      </div>
    );
  }
  
  // Mock deals data - find by ID
  const allDeals = [
    {
      id: 1,
      agentId: 2,
      agentName: "Sarah Johnson",
      agentCompany: "Premium Realty Group",
      address: "42 Harbour View Drive, Bondi Beach NSW 2026",
      suburb: "Bondi Beach",
      state: "NSW",
      postcode: "2026",
      propertyType: "House",
      dealType: "sale",
      status: "Published",
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: "450 sqm",
      buildingArea: "280 sqm",
      purchasePrice: 3250000,
      askingPrice: 3450000,
      achievedVsAsking: -5.8,
      purchaseDate: "2024-08-15",
      daysToSecure: 42,
      discountPercent: 5.8,
      strategyTags: ["Off-market", "Pre-auction", "High-yield"],
      verified: true,
      method: "Private Treaty",
      photos: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
      ],
      description: "Secured this stunning oceanfront property for buyer 5.8% below asking through off-market negotiations. Premium beachside lifestyle with strong rental yield.",
      features: ["Ocean Views", "Renovated Kitchen", "Pool", "Garden", "Close to Beach"],
      rentalAppraisal: 1200,
      rentalAchieved: 1250,
      grossYield: 2.0,
    },
    {
      id: 2,
      agentId: 2,
      agentName: "Sarah Johnson",
      address: "15/88 George Street, Sydney NSW 2000",
      suburb: "Sydney CBD",
      state: "NSW",
      postcode: "2000",
      propertyType: "Apartment",
      dealType: "sale",
      status: "Published",
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingArea: "95 sqm",
      purchasePrice: 1450000,
      askingPrice: 1500000,
      achievedVsAsking: -3.3,
      purchaseDate: "2024-08-20",
      daysToSecure: 28,
      discountPercent: 3.3,
      strategyTags: ["Auction", "First-home buyer"],
      verified: true,
      method: "Auction",
      photos: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ],
      description: "Helped first-home buyer secure this modern CBD apartment through competitive auction bidding. Great investment potential.",
      features: ["City Views", "Modern Kitchen", "Gym Access", "Concierge", "Central Location"],
      rentalAppraisal: 750,
      rentalAchieved: 780,
      grossYield: 2.8,
    },
    {
      id: 3,
      agentId: 2,
      address: "78 Park Avenue, Paddington NSW 2021",
      suburb: "Paddington",
      state: "NSW",
      postcode: "2021",
      propertyType: "Townhouse",
      dealType: "sale",
      status: "Draft",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      purchasePrice: 1650000,
      askingPrice: 1700000,
      achievedVsAsking: -2.9,
      purchaseDate: "2024-10-05",
      daysToSecure: 35,
      discountPercent: 2.9,
      strategyTags: ["Private Treaty"],
      verified: false,
      method: "Private Treaty",
      photos: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
      ],
      description: "Charming Victorian-era townhouse in the heart of Paddington.",
      features: ["Period Features", "Courtyard", "Updated Kitchen"]
    }
  ];

  const deal = allDeals.find(d => d.id === parseInt(id)) || allDeals[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Preview Banner */}
        {isPreview && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Preview Mode
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This is how your deal will appear to buyers on the public site
                  </p>
                </div>
              </div>
              <Link to="/staff/deals">
                <Button variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Exit Preview
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/staff/deals">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Deals
                </Button>
              </Link>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {deal.address.split(',')[0]}
                  </h1>
                  <Badge className={deal.status === 'Published' ? 'bg-green-600' : 'bg-gray-600'}>
                    {deal.status}
                  </Badge>
                  <Badge className={deal.verified ? 'bg-blue-600' : 'bg-gray-400'}>
                    {deal.verified ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {deal.suburb}, {deal.state} {deal.postcode}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isPreview && (
                <>
                  <Link to={`/staff/deals/${id}/edit`}>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Deal
                    </Button>
                  </Link>
                  <Link to={`/staff/deals/${id}?preview=true`}>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Public
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photos */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {deal.photos.map((photo, index) => (
                    <div 
                      key={index}
                      className={`relative ${index === 0 ? 'col-span-2 h-96' : 'h-48'} bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden`}
                    >
                      <img 
                        src={photo} 
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {deal.photos.length === 0 && (
                    <div className="col-span-2 h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">No photos uploaded</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Property Specs */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Property Specifications
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Bed className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{deal.bedrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bath className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{deal.bathrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Car className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Car Spaces</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{deal.carSpaces}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Home className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{deal.propertyType}</p>
                          </div>
                        </div>
                        {deal.landSize && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Land Size</p>
                              <p className="font-semibold text-gray-900 dark:text-white">{deal.landSize}</p>
                            </div>
                          </div>
                        )}
                        {deal.buildingArea && (
                          <div className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Building Area</p>
                              <p className="font-semibold text-gray-900 dark:text-white">{deal.buildingArea}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {deal.description && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Description
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {deal.description}
                        </p>
                      </div>
                    )}

                    {/* Features */}
                    {deal.features && deal.features.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Features
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {deal.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Strategy Tab */}
              <TabsContent value="strategy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Buyer Agent Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Method */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Purchase Method
                      </h3>
                      <Badge variant="outline" className="text-base px-4 py-2">
                        {deal.method}
                      </Badge>
                    </div>

                    {/* Strategy Tags */}
                    {deal.strategyTags && deal.strategyTags.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Strategy Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {deal.strategyTags.map((tag, index) => (
                            <Badge key={index} className="bg-amber-600 text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price Achievement */}
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Price Achievement
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Asking Price</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {deal.askingPrice > 0 ? `$${(deal.askingPrice / 1000000).toFixed(2)}M` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Purchase Price</p>
                          <p className="text-lg font-bold text-amber-600">
                            {deal.purchasePrice > 0 ? `$${(deal.purchasePrice / 1000000).toFixed(2)}M` : 'Undisclosed'}
                          </p>
                        </div>
                      </div>
                      {deal.discountPercent > 0 && (
                        <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                          <TrendingDown className="h-5 w-5 mr-2" />
                          <span className="font-semibold">
                            {deal.discountPercent}% below asking price
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Rental Info */}
                    {deal.rentalAppraisal && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Rental & Yield
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Appraisal</p>
                            <p className="font-bold text-gray-900 dark:text-white">
                              ${deal.rentalAppraisal}/wk
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Achieved</p>
                            <p className="font-bold text-gray-900 dark:text-white">
                              ${deal.rentalAchieved}/wk
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Gross Yield</p>
                            <p className="font-bold text-gray-900 dark:text-white">
                              {deal.grossYield}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Metrics Tab */}
              <TabsContent value="metrics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Days-to-Secure</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {deal.daysToSecure}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Date</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {new Date(deal.purchaseDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Verification Status
                        </h4>
                        <Badge className={deal.verified ? 'bg-green-600' : 'bg-gray-400'}>
                          {deal.verified ? 'L1 - Verified' : 'L0 - Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {deal.verified 
                          ? 'This deal has been verified and will appear in public listings.'
                          : 'This deal is pending verification. Submit additional documents to get verified.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Purchase Price</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {deal.purchasePrice > 0 
                      ? `$${(deal.purchasePrice / 1000000).toFixed(2)}M`
                      : 'Undisclosed'}
                  </p>
                </div>
                
                {deal.discountPercent > 0 && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Saved Buyer</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${((deal.askingPrice - deal.purchasePrice)).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {deal.discountPercent}% below asking
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Days-to-Secure</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{deal.daysToSecure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Date</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(deal.purchaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {!isPreview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to={`/staff/deals/${id}/edit`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Deal
                    </Button>
                  </Link>
                  <Link to={`/staff/deals/${id}?preview=true`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Public View
                    </Button>
                  </Link>
                  {deal.status === 'Draft' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Publish Deal
                    </Button>
                  )}
                  {deal.status === 'Published' && (
                    <Button variant="outline" className="w-full justify-start">
                      <X className="h-4 w-4 mr-2" />
                      Unpublish
                    </Button>
                  )}
                  {!deal.verified && (
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Request Verification
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Agent Info (Preview Mode) */}
            {isPreview && (
              <Card className="border-2 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="text-lg">Buyer Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {deal.agentName ? deal.agentName.charAt(0) : 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {deal.agentName || 'Agent Name'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {deal.agentCompany || 'Company Name'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    This is how buyer will see your agent attribution
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsNew;

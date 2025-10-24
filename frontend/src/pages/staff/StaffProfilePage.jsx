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
  User, 
  Edit, 
  Save, 
  X, 
  Star,
  Phone,
  Mail,
  Building2,
  Award,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StaffProfilePage = () => {
  const { user, organization, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Johnson',
    email: user?.email || 'sarah@premiumrealty.com',
    phone: '+61 2 9555 0123',
    title: 'Senior Sales Agent',
    bio: 'Specializing in luxury properties across Sydney\'s Eastern Suburbs with a proven track record of exceeding client expectations. I pride myself on providing personalized service and expert market knowledge.',
    yearsExperience: 8,
    licenseNumber: 'NSW-67890',
    specialties: ['Luxury Homes', 'Investment Properties', 'Waterfront Properties'],
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    website: 'https://sarahjohnson.com.au',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face'
  });
  
  // Mock agent performance stats
  const performanceStats = [
    { label: 'Active Listings', value: '12', icon: BarChart3, color: 'text-emerald-600' },
    { label: 'Properties Sold (YTD)', value: '24', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-blue-800' },
    { label: 'Avg Days on Market', value: '23', icon: Clock, color: 'text-purple-600' }
  ];
  
  const recentDeals = [
    { 
      id: 1,
      address: '123 Ocean View Dr, Bondi',
      price: '$2.8M',
      type: 'Sale',
      status: 'Sold',
      date: '2024-07-15',
      commission: '$84,000'
    },
    { 
      id: 2,
      address: '45 Harbour St, Double Bay',
      price: '$3.2M',
      type: 'Sale', 
      status: 'Under Contract',
      date: '2024-07-08',
      commission: '$96,000'
    },
    { 
      id: 3,
      address: '78 Beach Rd, Coogee',
      price: '$1.9M',
      type: 'Sale',
      status: 'Active',
      date: '2024-06-22',
      commission: 'Est. $57,000'
    }
  ];
  
  const clientTestimonials = [
    {
      client: 'Michael Chen',
      rating: 5,
      comment: 'Sarah made our home buying process seamless. Excellent communication and market knowledge.',
      date: '2024-07-20'
    },
    {
      client: 'Lisa Williams', 
      rating: 5,
      comment: 'Professional, responsive, and got us the best price for our property. Highly recommend!',
      date: '2024-07-10'
    }
  ];

  const specialtyOptions = [
    'Residential Sales', 'Commercial Sales', 'Luxury Properties', 
    'Investment Properties', 'First Home Buyers', 'Rentals & Leasing',
    'Property Management', 'Auction Services', 'Waterfront Properties',
    'Rural & Acreage', 'New Developments', 'Off-the-Plan Sales'
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSave = () => {
    // TODO: API call to update staff profile
    // const response = await updateStaffProfile(profileData);
    
    // Mock save
    updateUser(profileData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 dark:text-green-200">
                Profile updated successfully!
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Agent Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your agent profile, performance metrics, and client relationships
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link to="/staff/deals">
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  My Deals
                </Button>
              </Link>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-800 hover:bg-blue-900 hover:text-white text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="bg-blue-800 hover:bg-blue-900 hover:text-white text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={profileData.photo}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h2>
                  <Badge className="bg-blue-600 text-white">Agent</Badge>
                </div>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                  {profileData.title}
                </p>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{organization?.name || 'Premium Realty Group'}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{profileData.yearsExperience} years experience</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-amber-300">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Link to={`/agent/${user?.id || 2}`}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Public Profile
                    </Button>
                  </Link>
                  {profileData.linkedIn && (
                    <a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="deals">Recent Deals</TabsTrigger>
            <TabsTrigger value="testimonials">Client Reviews</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-800" />
                  Agent Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      value={profileData.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 h-32"
                  />
                </div>
                
                {isEditing && (
                  <div>
                    <Label>Specialties</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className={`p-3 text-sm rounded-lg border transition-all text-center ${
                            profileData.specialties.includes(specialty)
                              ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-amber-700 text-blue-900 dark:text-amber-300'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-800" />
                    Goals & Targets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Annual Sales Target</span>
                      <span className="font-semibold">$15M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">YTD Progress</span>
                      <span className="font-semibold text-emerald-600">$12.8M (85%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-800" />
                    Monthly Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">New Listings</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Properties Sold</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Commission Earned</span>
                      <span className="font-semibold text-emerald-600">$180,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-800" />
                    Recent Deals
                  </div>
                  <Link to="/staff/deals">
                    <Button size="sm" className="bg-blue-800 hover:bg-blue-900 hover:text-white text-white">
                      View All Deals
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{deal.address}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{deal.type} • Listed {deal.date}</p>
                      </div>
                      <div className="text-right mr-4">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{deal.price}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{deal.commission}</div>
                      </div>
                      <Badge 
                        className={`${
                          deal.status === 'Sold' ? 'bg-green-600 text-white' :
                          deal.status === 'Under Contract' ? 'bg-blue-600 text-white' :
                          'bg-blue-800 text-white'
                        }`}
                      >
                        {deal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-800" />
                  Client Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientTestimonials.map((testimonial, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.client}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{testimonial.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{testimonial.comment}</p>
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

export default StaffProfilePage;
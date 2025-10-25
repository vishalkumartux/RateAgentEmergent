import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MapPin,
  Award,
  Building2,
  ExternalLink,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StaffProfile = () => {
  const location = useLocation();
  const { user, organization } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock profile data - in real app this would come from user.agentProfile
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Johnson',
    email: user?.email || 'sarah@premiumrealty.com',
    phone: '+61 2 9555 0123',
    title: 'Senior Sales Agent',
    bio: 'Specializing in luxury properties across Sydney\'s Eastern Suburbs with a proven track record of exceeding client expectations. I pride myself on providing personalized service and expert market knowledge to help clients achieve their real estate goals.',
    yearsExperience: 8,
    licenseNumber: 'NSW-67890',
    specialties: ['Luxury Homes', 'Investment Properties', 'Waterfront Properties'],
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    website: 'https://sarahjohnson.com.au',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c88e8d4e?w=400&h=400&fit=crop&crop=face'
  });
  
  // Mock performance data
  const performanceStats = [
    { label: 'Properties Sold (12m)', value: '24', icon: BarChart3, color: 'text-emerald-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-black' },
    { label: 'Avg Days on Market', value: '23', icon: Clock, color: 'text-black' },
    { label: 'Client Satisfaction', value: '98%', icon: TrendingUp, color: 'text-gray-700' }
  ];
  
  const recentSales = [
    { address: '123 Ocean View Dr, Bondi', price: '$2.8M', date: '2024-07-15', status: 'Sold' },
    { address: '45 Harbour St, Double Bay', price: '$3.2M', date: '2024-07-08', status: 'Sold' },
    { address: '78 Beach Rd, Coogee', price: '$1.9M', date: '2024-06-22', status: 'Sold' }
  ];

  React.useEffect(() => {
    if (location.state?.profileCreated) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location.state]);

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
    // Mock save - in real app would update backend
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const specialtyOptions = [
    'Residential Sales', 'Commercial Sales', 'Luxury Properties', 
    'Investment Properties', 'First Home Buyers', 'Rentals & Leasing',
    'Property Management', 'Auction Services', 'Waterfront Properties',
    'Rural & Acreage', 'New Developments', 'Off-the-Plan Sales'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-success/10 dark:bg-success/20 border border-success/30 dark:border-success rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              <span className="text-green-800 dark:text-green-200">
                {location.state?.profileCreated ? 'Profile created successfully!' : 'Profile updated successfully!'}
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Agent Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your public agent profile and performance data
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
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
                  <Badge className="bg-success text-white">Agent</Badge>
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
                    <Badge key={index} variant="secondary" className="bg-gray-50 dark:bg-gray-900 text-black dark:text-gray-700">
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-black" />
                  Profile Information
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
                    <Label htmlFor="title">Job Title</Label>
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
                              ? 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-300 text-black dark:text-gray-700'
                              : 'bg-card border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-black" />
                  Recent Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{sale.address}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sold {sale.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-emerald-600">{sale.price}</div>
                        <Badge className="bg-success text-white">{sale.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-black" />
                  Social & Web Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={profileData.linkedIn}
                    onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffProfile;
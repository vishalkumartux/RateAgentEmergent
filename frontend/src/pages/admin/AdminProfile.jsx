import React, { useState } from 'react';
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
  Building2,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  BarChart3,
  CheckCircle,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user, organization, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Smith',
    email: user?.email || 'admin@premiumrealty.com',
    phone: '+61 2 9555 0100',
    title: 'Agency Director',
    bio: 'Experienced real estate professional with over 15 years in the industry. Leading Premium Realty Group with a focus on delivering exceptional service and building lasting client relationships.',
    licenseNumber: 'NSW-12345',
    yearsExperience: 15,
    linkedIn: 'https://linkedin.com/in/johnsmith-realestate',
    website: 'https://johnsmith-realestate.com.au',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  });
  
  // Mock admin stats
  const adminStats = [
    { label: 'Organization Revenue', value: '$2.4M', icon: BarChart3, color: 'text-emerald-600' },
    { label: 'Team Members', value: '12', icon: Users, color: 'text-black' },
    { label: 'Active Listings', value: '48', icon: Building2, color: 'text-gray-700' },
    { label: 'Years Leading', value: '8', icon: Award, color: 'text-black' }
  ];
  
  const recentActivities = [
    { action: 'Approved new listing', details: '123 Ocean View Dr, Bondi', time: '2 hours ago' },
    { action: 'Added team member', details: 'Sarah Johnson joined as Senior Agent', time: '1 day ago' },
    { action: 'Updated organization profile', details: 'Contact information updated', time: '3 days ago' },
    { action: 'Completed staff review', details: 'Q3 performance reviews', time: '1 week ago' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: API call to update admin profile
    // const response = await updateAdminProfile(profileData);
    
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
          <div className="mb-6 p-4 bg-success/10 dark:bg-success/20 border border-success/30 dark:border-success rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
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
                Admin Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your administrative profile and organization overview
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
                  <Badge className="bg-success text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
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
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="settings">Admin Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-black" />
                  Administrative Profile
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
                    <Label htmlFor="title">Administrative Title</Label>
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
                    <Label htmlFor="phone">Direct Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="yearsExperience">Years in Leadership</Label>
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
                  <Label htmlFor="bio">Leadership Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 h-32"
                    placeholder="Share your leadership experience and vision for the organization..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-black" />
                  Recent Administrative Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{activity.action}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.details}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{activity.time}</p>
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
                  <Shield className="h-5 w-5 mr-2 text-black" />
                  Administrative Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="licenseNumber">Administrative License</Label>
                  <Input
                    id="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-300 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-700 mb-2">Administrative Privileges</h4>
                  <ul className="text-black dark:text-gray-700 text-sm space-y-1">
                    <li>• Full organization management access</li>
                    <li>• Staff member invitation and management</li>
                    <li>• Organization settings and profile editing</li>
                    <li>• Deal and listing oversight</li>
                    <li>• Performance analytics and reporting</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfile;
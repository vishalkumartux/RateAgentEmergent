import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import SEO from '../components/SEO';
// import { AuthContext } from '../context/AuthContext';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Eye,
  Save,
  Camera,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  CreditCard,
  Globe,
  Smartphone
} from 'lucide-react';

const UserProfile = () => {
  // Mock user data - in real app would come from AuthContext
  const user = { name: 'John Anderson', email: 'john.anderson@email.com' };
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Anderson',
    email: user?.email || 'john.anderson@email.com',
    phone: '+61 412 345 678',
    location: 'Sydney, NSW',
    bio: 'Looking for investment properties in Sydney metro area. Interested in high-yield opportunities.',
    avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    
    // Preferences
    searchRadius: '10',
    preferredPropertyTypes: ['House', 'Apartment'],
    budgetRange: { min: 500000, max: 1500000 },
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    
    // Privacy
    profileVisibility: 'private',
    showActivity: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // In real app, would make API call
    console.log('Saving profile:', profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // In real app, would make API call
    console.log('Changing password');
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarUpload = () => {
    // In real app, would open file picker
    alert('Avatar upload functionality would open here');
  };

  const propertyTypes = ['House', 'Townhouse', 'Unit', 'Apartment', 'Land'];

  return (
    <>
      <SEO 
        title="My Profile | AgentRate"
        description="Manage your profile settings, preferences, and account details."
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage your account details and preferences
            </p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-success/10 dark:bg-green-950 border border-success/30 dark:border-green-800 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-3" />
              <span className="text-green-800 dark:text-green-200">Profile updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 sticky top-20">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {[
                      { id: 'personal', label: 'Personal Info', icon: User },
                      { id: 'preferences', label: 'Preferences', icon: Globe },
                      { id: 'notifications', label: 'Notifications', icon: Bell },
                      { id: 'security', label: 'Security', icon: Shield },
                      { id: 'privacy', label: 'Privacy', icon: Eye }
                    ].map(section => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            activeSection === section.id
                              ? 'bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-700 font-semibold'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {section.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <>
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <User className="h-5 w-5 mr-2 text-black" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative">
                          <img 
                            src={profile.avatar} 
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                          />
                          <button 
                            onClick={handleAvatarUpload}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white rounded-full flex items-center justify-center"
                          >
                            <Camera className="h-4 w-4" />
                          </button>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {profile.firstName} {profile.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email}</p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleAvatarUpload}
                            className="mt-2"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Change Photo
                          </Button>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                          <Input
                            id="firstName"
                            value={profile.firstName}
                            onChange={(e) => handleProfileChange('firstName', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profile.lastName}
                            onChange={(e) => handleProfileChange('lastName', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                            <Mail className="h-4 w-4 inline mr-1" />
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                            <Phone className="h-4 w-4 inline mr-1" />
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => handleProfileChange('location', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                            placeholder="City, State"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Bio</Label>
                          <Textarea
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => handleProfileChange('bio', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                            rows={3}
                            placeholder="Tell us about your property search goals..."
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button onClick={handleSaveProfile} className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Preferences */}
              {activeSection === 'preferences' && (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Globe className="h-5 w-5 mr-2 text-black" />
                      Search Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Preferred Property Types</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {propertyTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={profile.preferredPropertyTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                handleProfileChange('preferredPropertyTypes', 
                                  checked 
                                    ? [...profile.preferredPropertyTypes, type]
                                    : profile.preferredPropertyTypes.filter(t => t !== type)
                                );
                              }}
                            />
                            <label htmlFor={type} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Default Search Radius</Label>
                      <Select value={profile.searchRadius} onValueChange={(value) => handleProfileChange('searchRadius', value)}>
                        <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 km</SelectItem>
                          <SelectItem value="10">10 km</SelectItem>
                          <SelectItem value="15">15 km</SelectItem>
                          <SelectItem value="20">20 km</SelectItem>
                          <SelectItem value="30">30 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Budget Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Minimum</Label>
                          <Input
                            type="number"
                            value={profile.budgetRange.min}
                            onChange={(e) => handleProfileChange('budgetRange', { ...profile.budgetRange, min: parseInt(e.target.value) })}
                            className="mt-1 dark:bg-gray-700 dark:text-white"
                            placeholder="Min budget"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Maximum</Label>
                          <Input
                            type="number"
                            value={profile.budgetRange.max}
                            onChange={(e) => handleProfileChange('budgetRange', { ...profile.budgetRange, max: parseInt(e.target.value) })}
                            className="mt-1 dark:bg-gray-700 dark:text-white"
                            placeholder="Max budget"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSaveProfile} className="bg-green-700 hover:bg-green-700 hover:text-white text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications */}
              {activeSection === 'notifications' && (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Bell className="h-5 w-5 mr-2 text-gray-700" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get updates via email</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={profile.emailNotifications}
                          onCheckedChange={(checked) => handleProfileChange('emailNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get text message alerts</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={profile.smsNotifications}
                          onCheckedChange={(checked) => handleProfileChange('smsNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Browser push notifications</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={profile.pushNotifications}
                          onCheckedChange={(checked) => handleProfileChange('pushNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Tips, guides, and promotions</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={profile.marketingEmails}
                          onCheckedChange={(checked) => handleProfileChange('marketingEmails', checked)}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSaveProfile} className="bg-gray-700 hover:bg-gray-100 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security */}
              {activeSection === 'security' && (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Shield className="h-5 w-5 mr-2 text-red-600" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            className="mt-2 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <Button onClick={handleChangePassword} className="bg-red-600 hover:bg-red-700 hover:text-white text-white">
                          <Lock className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Security</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-success/10 dark:bg-green-950 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-success" />
                            <span className="text-gray-900 dark:text-white">Email Verified</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-900 dark:text-white">Two-Factor Authentication</span>
                          </div>
                          <Button size="sm" variant="outline">Enable</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Privacy */}
              {activeSection === 'privacy' && (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Eye className="h-5 w-5 mr-2 text-black" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Profile Visibility</Label>
                      <Select value={profile.profileVisibility} onValueChange={(value) => handleProfileChange('profileVisibility', value)}>
                        <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see</SelectItem>
                          <SelectItem value="private">Private - Only you</SelectItem>
                          <SelectItem value="connections">Connections Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Show Activity</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Let others see your reviews and comparisons</p>
                      </div>
                      <Checkbox
                        checked={profile.showActivity}
                        onCheckedChange={(checked) => handleProfileChange('showActivity', checked)}
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-red-600">Danger Zone</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                          Export My Data
                        </Button>
                        <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                          Delete Account
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSaveProfile} className="bg-black hover:bg-gray-100 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Privacy Settings
                      </Button>
                    </div>
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

export default UserProfile;

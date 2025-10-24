import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import AgentProfilePage from '../AgentProfilePage';
import { 
  User,
  Camera,
  Save,
  Eye,
  X,
  Plus,
  MapPin,
  Globe,
  Briefcase,
  Star,
  Calendar,
  CheckCircle,
  Award,
  DollarSign,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyProfile = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  
  // Profile form state
  const [profile, setProfile] = useState({
    headshot: '',
    name: user?.name || 'Sarah Johnson',
    title: 'Senior Buyer Agent',
    bio: 'Specializing in luxury properties with over 8 years of experience in Sydney\'s premium market. Known for strong negotiation skills and personalized service.',
    yearsExperience: 8,
    languages: ['English', 'Mandarin'],
    coverageAreas: ['Bondi', 'Mosman', 'Double Bay', 'Paddington', 'Surry Hills'],
    serviceTypes: {
      fullService: true,
      propertySearch: true,
      negotiation: true,
      bidding: true,
      settlement: true
    },
    indicativeFee: 15000,
    isPublic: true
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [newArea, setNewArea] = useState('');

  // Read-only metrics (computed from deals/reviews)
  const metrics = {
    verifiedDeals: 24,
    medianDaysToSecure: 38,
    avgRating: 4.7,
    totalReviews: 28,
    period: '12 months'
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess('Profile updated successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(''), 3000);
    }, 1000);
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }));
  };

  const addArea = () => {
    if (newArea.trim() && !profile.coverageAreas.includes(newArea.trim())) {
      setProfile(prev => ({
        ...prev,
        coverageAreas: [...prev.coverageAreas, newArea.trim()]
      }));
      setNewArea('');
    }
  };

  const removeArea = (area) => {
    setProfile(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter(a => a !== area)
    }));
  };

  return (
    <>
      {/* If preview mode, render the public view with a banner */}
      {isPreview ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Preview Banner */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white py-3 sticky top-0 z-50 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-semibold">Preview Mode - Public View</p>
                    <p className="text-sm text-blue-100">This is exactly how buyers will see your profile</p>
                  </div>
                </div>
                <Link to="/staff/my-profile">
                  <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                    <X className="h-4 w-4 mr-2" />
                    Exit Preview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Render the actual public agent profile page */}
          <AgentProfilePage />
        </div>
      ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Manage your public agent profile
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/agent/1">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Public Profile
                </Button>
              </Link>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>

        {/* Save Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-800 dark:text-green-200 font-medium">{saveSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-amber-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Headshot Upload */}
                <div>
                  <Label>Profile Photo</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                      {profile.headshot ? (
                        <img src={profile.headshot} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Recommended: Square image, at least 400x400px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Senior Buyer Agent"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell buyers about your experience, specialties, and approach..."
                    className="mt-1 h-32"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {profile.bio.length}/500 characters
                  </p>
                </div>

                {/* Years Experience */}
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.yearsExperience}
                    onChange={(e) => setProfile(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-amber-600" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <Badge 
                      key={lang}
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                    >
                      {lang}
                      <button
                        onClick={() => removeLanguage(lang)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language"
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <Button onClick={addLanguage} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-amber-600" />
                  Coverage Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.coverageAreas.map((area) => (
                    <Badge 
                      key={area}
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                    >
                      {area}
                      <button
                        onClick={() => removeArea(area)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="Add a suburb or area"
                    onKeyPress={(e) => e.key === 'Enter' && addArea()}
                  />
                  <Button onClick={addArea} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-amber-600" />
                  Services Offered
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(profile.serviceTypes).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => 
                        setProfile(prev => ({
                          ...prev,
                          serviceTypes: { ...prev.serviceTypes, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Indicative Fee */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
                  Indicative Fee (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="fee">Fee Starting From (AUD)</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={profile.indicativeFee}
                    onChange={(e) => setProfile(prev => ({ ...prev, indicativeFee: parseInt(e.target.value) || 0 }))}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    This will display as "From ${profile.indicativeFee.toLocaleString()}" on your public profile
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Public Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-amber-600" />
                  Profile Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Public Profile</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.isPublic ? 'Visible to buyers' : 'Hidden from public'}
                    </p>
                  </div>
                  <Switch
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isPublic: checked }))}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  When public, your profile appears in search results and buyer agent listings
                </p>
              </CardContent>
            </Card>

            {/* Performance Metrics (Read-Only) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-600" />
                  Performance Metrics
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last {metrics.period}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Verified Deals</span>
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.verifiedDeals}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Median Days-to-Secure</span>
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.medianDaysToSecure}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average Rating</span>
                    <Star className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metrics.avgRating}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ({metrics.totalReviews} reviews)
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These metrics are automatically calculated from your verified deals and customer reviews
                </p>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Profile Tips
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Add a professional headshot</li>
                  <li>• Write a compelling bio (300-500 chars)</li>
                  <li>• List all areas you cover</li>
                  <li>• Keep your profile public for visibility</li>
                  <li>• Update regularly as you grow</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default MyProfile;

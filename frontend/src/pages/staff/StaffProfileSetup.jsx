import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { 
  User, 
  Camera, 
  Phone, 
  MapPin,
  Award,
  FileText,
  CheckCircle,
  ArrowRight,
  Upload
} from 'lucide-react';

const StaffProfileSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: location.state?.name || '',
    email: location.state?.email || '',
    phone: '',
    bio: '',
    
    // Professional Info
    title: '',
    yearsExperience: '',
    licenseNumber: '',
    specialties: [],
    
    // Contact & Social
    linkedIn: '',
    website: '',
    
    // Photo
    photo: null,
    photoPreview: null
  });

  const [errors, setErrors] = useState({});
  
  const specialtyOptions = [
    'Residential Sales', 'Commercial Sales', 'Luxury Properties', 
    'Investment Properties', 'First Home Buyers', 'Rentals & Leasing',
    'Property Management', 'Auction Services', 'Waterfront Properties',
    'Rural & Acreage', 'New Developments', 'Off-the-Plan Sales'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecialtyToggle = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photoPreview: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (formData.bio.length < 50) newErrors.bio = 'Bio should be at least 50 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock profile creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would:
      // 1. Upload profile photo
      // 2. Create staff profile
      // 3. Link to organization
      
      navigate('/staff/profile', { 
        state: { 
          profileCreated: true,
          profileData: formData
        }
      });
    } catch (error) {
      setErrors({ submit: 'Profile setup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Agent Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Set up your professional profile to showcase your expertise to potential clients
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <Camera className="h-5 w-5 mr-2" />
                Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.photoPreview ? (
                      <img 
                        src={formData.photoPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <label 
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-success rounded-full flex items-center justify-center cursor-pointer hover:bg-green-800 hover:text-white transition-colors"
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium mb-2">
                    Upload your profile photo
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    This will be displayed on your public agent profile. Choose a professional headshot for best results.
                  </p>
                  <label htmlFor="photo-upload">
                    <Button type="button" variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="mt-1 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+61 XXX XXX XXX"
                    className="mt-1"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Sales Agent, Property Consultant"
                    className="mt-1"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <Award className="h-5 w-5 mr-2" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience *</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    placeholder="5"
                    min="0"
                    max="50"
                    className="mt-1"
                  />
                  {errors.yearsExperience && <p className="text-red-600 text-sm mt-1">{errors.yearsExperience}</p>}
                </div>
                
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="NSW-12345"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label>Specialties</Label>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Select the property types and services you specialize in:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {specialtyOptions.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`p-3 text-sm rounded-lg border transition-all text-center ${
                        formData.specialties.includes(specialty)
                          ? 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-300 text-black dark:text-gray-700'
                          : 'bg-card border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-300'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio & About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <FileText className="h-5 w-5 mr-2" />
                About You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell potential clients about your experience, approach, and what makes you unique as a real estate agent..."
                  className="mt-1 h-32"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/50 characters minimum
                </p>
                {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={formData.linkedIn}
                    onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourname.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white px-8 py-3 text-lg"
            >
              {isSubmitting ? 'Creating Profile...' : (
                <>
                  Create Profile
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {errors.submit && (
            <p className="text-red-600 text-center">{errors.submit}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default StaffProfileSetup;
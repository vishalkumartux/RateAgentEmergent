import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  FileText,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OrganizationSetupPage = () => {
  const navigate = useNavigate();
  const { user, updateUser, updateOrganization } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.organizationName || '',
    email: '',
    phone: '',
    address: '',
    website: '',
    licenseNumber: '',
    description: '',
    specializations: [],
    serviceAreas: ''
  });

  const [errors, setErrors] = useState({});
  
  const specializations = [
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

  const handleSpecializationToggle = (specialization) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Organization name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create organization data
      const organizationData = {
        id: Date.now(),
        ...formData,
        adminId: user.id,
        staff: [],
        pendingInvites: [],
        createdAt: new Date().toISOString()
      };
      
      // Update user with organization ID
      updateUser({
        organizationId: organizationData.id,
        organizationName: formData.name
      });
      
      // Update organization
      updateOrganization(organizationData);
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setErrors({ submit: 'Setup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Your Organization Setup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Set up your agency profile to start managing your team and showcasing your services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <Building2 className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your Realty Group"
                    className="mt-1"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="info@yourrealty.com"
                    className="mt-1"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.yourrealty.com"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Business Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Business Street, Sydney NSW 2000"
                  className="mt-1 h-20"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
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
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select the services and property types your agency specializes in:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`p-3 text-sm rounded-lg border transition-all text-center ${
                      formData.specializations.includes(spec)
                        ? 'bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-300 dark:hover:border-amber-700'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description & Service Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <FileText className="h-5 w-5 mr-2" />
                About Your Agency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Agency Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell potential clients about your agency, experience, and what makes you unique..."
                  className="mt-1 h-32"
                />
              </div>
              
              <div>
                <Label htmlFor="serviceAreas">Service Areas</Label>
                <Input
                  id="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={(e) => handleInputChange('serviceAreas', e.target.value)}
                  placeholder="Sydney CBD, Eastern Suburbs, North Shore..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
            >
              {isSubmitting ? 'Setting up...' : (
                <>
                  Complete Setup
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

export default OrganizationSetupPage;
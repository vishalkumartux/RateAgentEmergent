import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { 
  Building2, 
  Mail, 
  User, 
  Phone, 
  MapPin,
  FileText,
  Shield,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Agency Admin Details
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Organization Details
    organizationName: '',
    organizationEmail: '',
    organizationPhone: '',
    address: '',
    website: '',
    licenseNumber: '',
    description: '',
    
    // Terms
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        // Navigate to verification page
        navigate('/verify-email', { 
          state: { 
            email: formData.email,
            name: formData.name 
          }
        });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-black hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Register Your Agency
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join AgentRate and start showcasing your real estate expertise
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Admin Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <User className="h-5 w-5 mr-2" />
                  Agency Administrator Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="admin@yourrealty.com"
                    className="mt-1"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+61 XXX XXX XXX"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="mt-1"
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Repeat your password"
                    className="mt-1"
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Organization Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <Building2 className="h-5 w-5 mr-2" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="organizationName">Agency Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    placeholder="Your Realty Group"
                    className="mt-1"
                  />
                  {errors.organizationName && <p className="text-red-600 text-sm mt-1">{errors.organizationName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="organizationEmail">Agency Email</Label>
                  <Input
                    id="organizationEmail"
                    type="email"
                    value={formData.organizationEmail}
                    onChange={(e) => handleInputChange('organizationEmail', e.target.value)}
                    placeholder="info@yourrealty.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="organizationPhone">Agency Phone</Label>
                  <Input
                    id="organizationPhone"
                    value={formData.organizationPhone}
                    onChange={(e) => handleInputChange('organizationPhone', e.target.value)}
                    placeholder="+61 XXX XXX XXX"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Business St, Sydney NSW 2000"
                    className="mt-1 h-20"
                  />
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
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="description">Agency Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your agency, specializations, and what makes you unique..."
                  className="mt-1 h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="bg-gray-50 dark:bg-gray-900 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    I agree to the <Link to="/terms" className="text-black hover:text-black underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-black hover:text-black underline">Privacy Policy</Link> *
                  </Label>
                </div>
                {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm leading-relaxed">
                    I agree to receive marketing communications and updates about AgentRate
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Link to="/login">
              <Button type="button" variant="outline">
                Already have an account? Sign In
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-700 hover:bg-green-800 hover:text-white text-white px-8"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
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

export default RegisterPage;
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { 
  UserCheck, 
  Building2, 
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const StaffInvitePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [inviteData, setInviteData] = useState(null);

  const inviteCode = searchParams.get('code');
  const email = searchParams.get('email');

  useEffect(() => {
    // In real app, validate invite code with backend
    if (inviteCode && email) {
      // Mock invite validation
      setInviteData({
        organizationName: 'Premium Realty Group',
        invitedBy: 'John Smith',
        email: email,
        isValid: true
      });
    } else {
      setInviteData({ isValid: false });
    }
  }, [inviteCode, email]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock registration process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would:
      // 1. Create staff account
      // 2. Link to organization
      // 3. Send confirmation
      
      navigate('/staff/profile-setup', { 
        state: { 
          email: inviteData.email,
          name: formData.name,
          organizationName: inviteData.organizationName
        }
      });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!inviteData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (!inviteData.isValid) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Invalid Invitation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This invitation link is invalid or has expired. Please contact your administrator for a new invitation.
            </p>
            <Link to="/">
              <Button className="bg-green-700 hover:bg-green-800 hover:text-white text-white">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-black hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="h-8 w-8 text-black" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Your Team
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your account setup to join
          </p>
          <p className="text-black font-medium">{inviteData.organizationName}</p>
        </div>

        {/* Invitation Details */}
        <Card className="mb-6 bg-gray-50 dark:bg-gray-900 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-black" />
              <div>
                <p className="text-amber-900 dark:text-amber-100 font-medium">
                  You've been invited by {inviteData.invitedBy}
                </p>
                <p className="text-black dark:text-amber-300 text-sm">
                  Email: {inviteData.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteData.email}
                  disabled
                  className="mt-1 bg-gray-50 dark:bg-gray-800"
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

              {errors.submit && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{errors.submit}</span>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-700 hover:bg-green-800 hover:text-white text-white"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account & Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help */}
        <Card className="mt-6 bg-gray-50 dark:bg-gray-900 border-blue-200 dark:border-black">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-black dark:text-blue-100 font-medium mb-1">
                  Having trouble?
                </p>
                <p className="text-black dark:text-blue-300">
                  Contact your administrator ({inviteData.invitedBy}) or our support team for assistance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffInvitePage;
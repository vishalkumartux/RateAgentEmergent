import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Upload, 
  Save,
  X,
  Plus,
  CheckCircle,
  Shield,
  Bell,
  CreditCard,
  Settings,
  Users,
  Home,
  DollarSign,
  FileText,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OrgSettings = () => {
  const { organization, updateOrganization } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('business');
  
  // Business Info State
  const [businessInfo, setBusinessInfo] = useState({
    name: organization?.name || '',
    email: organization?.email || '',
    phone: organization?.phone || '',
    website: organization?.website || '',
    address: organization?.address || '',
    description: organization?.description || '',
    logo: organization?.logo || ''
  });

  // Service Coverage State
  const [coverage, setCoverage] = useState({
    regions: organization?.coverage?.regions || ['Sydney CBD', 'North Shore', 'Eastern Suburbs'],
    propertyTypes: organization?.coverage?.propertyTypes || {
      residential: true,
      commercial: false,
      industrial: false,
      land: true,
      investment: true
    },
    priceRange: organization?.coverage?.priceRange || {
      min: 500000,
      max: 5000000
    }
  });

  const [newRegion, setNewRegion] = useState('');

  // Privacy & Compliance State
  const [privacy, setPrivacy] = useState({
    showFullAddress: organization?.privacy?.showFullAddress || false,
    showContactInfo: organization?.privacy?.showContactInfo || true,
    allowDirectContact: organization?.privacy?.allowDirectContact || true,
    requireVerification: organization?.privacy?.requireVerification || false,
    gdprCompliant: organization?.privacy?.gdprCompliant || true,
    dataRetentionDays: organization?.privacy?.dataRetentionDays || 365
  });

  // Lead Routing State
  const [leadRouting, setLeadRouting] = useState({
    autoAssign: organization?.leadRouting?.autoAssign || true,
    roundRobin: organization?.leadRouting?.roundRobin || true,
    notifyEmail: organization?.leadRouting?.notifyEmail || true,
    notifySms: organization?.leadRouting?.notifySms || false,
    responseTimeTarget: organization?.leadRouting?.responseTimeTarget || 24
  });

  // Subscription State (Read-only display)
  const subscription = {
    plan: 'Professional',
    status: 'Active',
    billingCycle: 'Monthly',
    nextBilling: '2025-10-15',
    amount: '$299/month',
    features: [
      'Unlimited agent listings',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ]
  };

  const addRegion = () => {
    if (newRegion.trim() && !coverage.regions.includes(newRegion.trim())) {
      setCoverage(prev => ({
        ...prev,
        regions: [...prev.regions, newRegion.trim()]
      }));
      setNewRegion('');
    }
  };

  const removeRegion = (region) => {
    setCoverage(prev => ({
      ...prev,
      regions: prev.regions.filter(r => r !== region)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateOrganization({
        ...businessInfo,
        coverage,
        privacy,
        leadRouting
      });
      
      setSaveSuccess('Settings saved successfully!');
      setIsSaving(false);
      
      setTimeout(() => setSaveSuccess(''), 3000);
    }, 1000);
  };

  const sections = [
    { id: 'business', label: 'Business Info', icon: Building2 },
    { id: 'coverage', label: 'Service Coverage', icon: MapPin },
    { id: 'privacy', label: 'Privacy & Compliance', icon: Shield },
    { id: 'leads', label: 'Lead Routing', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Organization Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage your agency's profile, coverage, and preferences
          </p>
        </div>

        {/* Save Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-success/10 dark:bg-success/20/20 border border-success/30 dark:border-success rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-success dark:text-success mr-3" />
            <span className="text-green-800 dark:text-green-200 font-medium">{saveSuccess}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-700'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 hover:bg-success/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Business Information Section */}
            {activeSection === 'business' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-black" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Update your agency's public profile and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div>
                    <Label>Agency Logo</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {businessInfo.logo ? (
                          <img src={businessInfo.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Building2 className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Recommended: 200x200px, PNG or JPG
                    </p>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Agency Name *</Label>
                      <Input
                        id="name"
                        value={businessInfo.name}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Agency Name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Contact Email *</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={businessInfo.email}
                          onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="contact@agency.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={businessInfo.phone}
                          onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+61 2 1234 5678"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative mt-1">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          type="url"
                          value={businessInfo.website}
                          onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                          placeholder="https://youragency.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main Street, Sydney NSW 2000"
                      className="mt-1 h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Agency Description</Label>
                    <Textarea
                      id="description"
                      value={businessInfo.description}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Tell buyers about your agency's mission, values, and what makes you unique..."
                      className="mt-1 h-32"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {businessInfo.description.length}/500 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Coverage Section */}
            {activeSection === 'coverage' && (
              <div className="space-y-6">
                {/* Regions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-black" />
                      Service Regions
                    </CardTitle>
                    <CardDescription>
                      Define the geographic areas where your agency operates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {coverage.regions.map((region) => (
                        <Badge 
                          key={region}
                          variant="secondary"
                          className="px-3 py-2 text-sm"
                        >
                          {region}
                          <button
                            onClick={() => removeRegion(region)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        value={newRegion}
                        onChange={(e) => setNewRegion(e.target.value)}
                        placeholder="Add a region (e.g., Inner West)"
                        onKeyPress={(e) => e.key === 'Enter' && addRegion()}
                      />
                      <Button onClick={addRegion} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-black" />
                      Property Types
                    </CardTitle>
                    <CardDescription>
                      Select the types of properties you work with
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(coverage.propertyTypes).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {type}
                        </span>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => 
                            setCoverage(prev => ({
                              ...prev,
                              propertyTypes: { ...prev.propertyTypes, [type]: checked }
                            }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Price Range */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-black" />
                      Price Range Focus
                    </CardTitle>
                    <CardDescription>
                      Define your typical property price range
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minPrice">Minimum Price</Label>
                        <Input
                          id="minPrice"
                          type="number"
                          value={coverage.priceRange.min}
                          onChange={(e) => setCoverage(prev => ({
                            ...prev,
                            priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                          }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxPrice">Maximum Price</Label>
                        <Input
                          id="maxPrice"
                          type="number"
                          value={coverage.priceRange.max}
                          onChange={(e) => setCoverage(prev => ({
                            ...prev,
                            priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 0 }
                          }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current range: ${coverage.priceRange.min.toLocaleString()} - ${coverage.priceRange.max.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy & Compliance Section */}
            {activeSection === 'privacy' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-black" />
                    Privacy & Compliance Settings
                  </CardTitle>
                  <CardDescription>
                    Control data visibility and compliance preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Privacy Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Show Full Address</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Display complete business address publicly</p>
                      </div>
                      <Switch
                        checked={privacy.showFullAddress}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showFullAddress: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Show Contact Information</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Make phone and email visible on public profile</p>
                      </div>
                      <Switch
                        checked={privacy.showContactInfo}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showContactInfo: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Allow Direct Contact</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Let buyers contact you directly from listings</p>
                      </div>
                      <Switch
                        checked={privacy.allowDirectContact}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowDirectContact: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Require Email Verification</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Only accept leads from verified email addresses</p>
                      </div>
                      <Switch
                        checked={privacy.requireVerification}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, requireVerification: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-success/10 dark:bg-success/20/20 rounded-lg border border-success/30 dark:border-success">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          GDPR Compliant
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Follow data protection regulations</p>
                      </div>
                      <Switch
                        checked={privacy.gdprCompliant}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, gdprCompliant: checked }))}
                      />
                    </div>
                  </div>

                  {/* Data Retention */}
                  <div>
                    <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={privacy.dataRetentionDays}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, dataRetentionDays: parseInt(e.target.value) || 365 }))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      How long to keep user data before automatic deletion
                    </p>
                  </div>

                  {/* Compliance Notice */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/20 border border-gray-200 dark:border-black rounded-lg">
                    <div className="flex">
                      <Lock className="h-5 w-5 text-black dark:text-white mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-black dark:text-gray-200 mb-1">Data Security</h4>
                        <p className="text-sm text-black dark:text-gray-300">
                          All user data is encrypted at rest and in transit. We comply with Australian Privacy Principles (APPs) and GDPR requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lead Routing Section */}
            {activeSection === 'leads' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-black" />
                    Lead Routing Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure how incoming leads are assigned and managed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Routing Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Auto-Assign Leads</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically distribute leads to agents</p>
                      </div>
                      <Switch
                        checked={leadRouting.autoAssign}
                        onCheckedChange={(checked) => setLeadRouting(prev => ({ ...prev, autoAssign: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Round-Robin Distribution</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rotate leads evenly among all agents</p>
                      </div>
                      <Switch
                        checked={leadRouting.roundRobin}
                        onCheckedChange={(checked) => setLeadRouting(prev => ({ ...prev, roundRobin: checked }))}
                        disabled={!leadRouting.autoAssign}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Send email alerts for new leads</p>
                      </div>
                      <Switch
                        checked={leadRouting.notifyEmail}
                        onCheckedChange={(checked) => setLeadRouting(prev => ({ ...prev, notifyEmail: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Send SMS alerts for urgent leads</p>
                      </div>
                      <Switch
                        checked={leadRouting.notifySms}
                        onCheckedChange={(checked) => setLeadRouting(prev => ({ ...prev, notifySms: checked }))}
                      />
                    </div>
                  </div>

                  {/* Response Time Target */}
                  <div>
                    <Label htmlFor="responseTime">Response Time Target (hours)</Label>
                    <Input
                      id="responseTime"
                      type="number"
                      value={leadRouting.responseTimeTarget}
                      onChange={(e) => setLeadRouting(prev => ({ ...prev, responseTimeTarget: parseInt(e.target.value) || 24 }))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Expected time for agents to respond to new leads
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-300 rounded-lg">
                    <div className="flex">
                      <Users className="h-5 w-5 text-black dark:text-gray-700 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-700 mb-1">Team Performance</h4>
                        <p className="text-sm text-black dark:text-gray-700">
                          Fast response times improve conversion rates. We recommend targeting 24 hours or less for initial contact.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subscription Section */}
            {activeSection === 'subscription' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-black" />
                    Subscription & Billing
                  </CardTitle>
                  <CardDescription>
                    View your current plan and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-900/20 dark:to-gray-700/20 border border-gray-300 dark:border-gray-300 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.plan}</h3>
                        <p className="text-black dark:text-gray-700 font-medium">{subscription.amount}</p>
                      </div>
                      <Badge className="bg-success text-white px-3 py-1">
                        <CheckCircle className="h-3 w-3 mr-1 inline" />
                        {subscription.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{subscription.billingCycle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Next Billing Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{subscription.nextBilling}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Plan Features</h4>
                    <div className="space-y-2">
                      {subscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Invoices
                    </Button>
                    <Button variant="outline">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      Cancel Subscription
                    </Button>
                  </div>

                  {/* Support Notice */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/20 border border-gray-200 dark:border-black rounded-lg">
                    <p className="text-sm text-black dark:text-gray-300">
                      Need help with billing? <a href="/contact" className="font-semibold underline">Contact our support team</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button (Fixed at bottom for all sections except subscription) */}
            {activeSection !== 'subscription' && (
              <div className="sticky bottom-0 bg-card border-t border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Make sure to save your changes before leaving
                  </p>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgSettings;

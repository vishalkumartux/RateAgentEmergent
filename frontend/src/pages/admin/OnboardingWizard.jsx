import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import SEO from '../../components/SEO';
import {
  Building2,
  MapPin,
  FileText,
  Users,
  Eye,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  Mail,
  Phone,
  Globe,
  Shield,
  DollarSign,
  Briefcase,
  Award
} from 'lucide-react';

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form state
  const [orgData, setOrgData] = useState(() => {
    const saved = localStorage.getItem('agentrate_org_onboarding');
    return saved ? JSON.parse(saved) : {
      // Step 1: Organisation Basics
      tradingName: '',
      abnAcn: '',
      website: '',
      primaryPhone: '',
      primaryEmail: '',
      logo: '',
      officeSuburb: '',
      officeState: '',
      
      // Step 2: Coverage & Services
      coverageAreas: [],
      coverageInput: '',
      serviceTypes: [],
      feeModel: '',
      feeAmount: '',
      showFeePublicly: false,
      
      // Step 3: Compliance
      licenseNumbers: [{ state: '', number: '' }],
      hasPIInsurance: false,
      
      // Step 4: Invite Staff
      staffInvites: [''],
      
      // Status
      isPublished: false,
      completedSteps: []
    };
  });

  const serviceTypeOptions = [
    'Full Buyer Agent Service',
    'Property Search Only',
    'Negotiation Support',
    'Auction Bidding',
    'Settlement Assistance',
    'Investment Advisory'
  ];

  const feeModelOptions = [
    'Fixed Fee',
    'Percentage of Purchase Price',
    'From $ (Range)',
    'Hybrid (Fixed + %)'
  ];

  const stateOptions = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('agentrate_org_onboarding', JSON.stringify(orgData));
  }, [orgData]);

  const handleInputChange = (field, value) => {
    setOrgData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCoverageArea = () => {
    if (orgData.coverageInput.trim()) {
      setOrgData(prev => ({
        ...prev,
        coverageAreas: [...prev.coverageAreas, prev.coverageInput.trim()],
        coverageInput: ''
      }));
    }
  };

  const handleRemoveCoverageArea = (index) => {
    setOrgData(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter((_, i) => i !== index)
    }));
  };

  const handleToggleService = (service) => {
    setOrgData(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service)
        ? prev.serviceTypes.filter(s => s !== service)
        : [...prev.serviceTypes, service]
    }));
  };

  const handleAddLicense = () => {
    setOrgData(prev => ({
      ...prev,
      licenseNumbers: [...prev.licenseNumbers, { state: '', number: '' }]
    }));
  };

  const handleLicenseChange = (index, field, value) => {
    setOrgData(prev => ({
      ...prev,
      licenseNumbers: prev.licenseNumbers.map((lic, i) =>
        i === index ? { ...lic, [field]: value } : lic
      )
    }));
  };

  const handleRemoveLicense = (index) => {
    setOrgData(prev => ({
      ...prev,
      licenseNumbers: prev.licenseNumbers.filter((_, i) => i !== index)
    }));
  };

  const handleAddStaffInvite = () => {
    setOrgData(prev => ({
      ...prev,
      staffInvites: [...prev.staffInvites, '']
    }));
  };

  const handleStaffInviteChange = (index, value) => {
    setOrgData(prev => ({
      ...prev,
      staffInvites: prev.staffInvites.map((email, i) => i === index ? value : email)
    }));
  };

  const handleRemoveStaffInvite = (index) => {
    setOrgData(prev => ({
      ...prev,
      staffInvites: prev.staffInvites.filter((_, i) => i !== index)
    }));
  };

  const calculateCompleteness = () => {
    let completed = 0;
    let total = 0;

    // Step 1 required fields
    const step1Required = ['tradingName', 'abnAcn', 'primaryPhone', 'primaryEmail', 'officeSuburb', 'officeState'];
    step1Required.forEach(field => {
      total++;
      if (orgData[field]) completed++;
    });

    // Step 2 required
    total += 2;
    if (orgData.coverageAreas.length > 0) completed++;
    if (orgData.serviceTypes.length > 0) completed++;

    // Step 3 required (at least one license if applicable)
    total++;
    if (orgData.licenseNumbers.some(lic => lic.state && lic.number)) completed++;

    return Math.round((completed / total) * 100);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return orgData.tradingName && orgData.abnAcn && orgData.primaryPhone && 
               orgData.primaryEmail && orgData.officeSuburb && orgData.officeState;
      case 2:
        return orgData.coverageAreas.length > 0 && orgData.serviceTypes.length > 0;
      case 3:
        return orgData.licenseNumbers.some(lic => lic.state && lic.number);
      case 4:
        return true; // Optional step
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePublish = () => {
    setOrgData(prev => ({ ...prev, isPublished: true }));
    // Store in a separate key for organization data
    localStorage.setItem('agentrate_organization', JSON.stringify({ ...orgData, isPublished: true }));
    alert('🎉 Congratulations! Your agency profile is now live!');
    navigate('/admin/dashboard');
  };

  const completeness = calculateCompleteness();

  const steps = [
    { number: 1, title: 'Organisation', icon: Building2 },
    { number: 2, title: 'Coverage', icon: MapPin },
    { number: 3, title: 'Compliance', icon: Shield },
    { number: 4, title: 'Staff', icon: Users },
    { number: 5, title: 'Preview', icon: Eye }
  ];

  return (
    <>
      <SEO
        title="Agency Onboarding | AgentRate"
        description="Set up your buyer's agent agency profile"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome to AgentRate
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Let's get your agency profile ready in just a few steps
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = currentStep > step.number;
                const isCurrent = currentStep === step.number;
                
                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isComplete
                            ? 'bg-green-600 text-white'
                            : isCurrent
                            ? 'bg-green-700 text-white ring-4 ring-blue-200 dark:ring-blue-900'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${isCurrent ? 'text-black' : 'text-gray-600 dark:text-gray-400'}`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        isComplete ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Completeness Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Completeness
                </span>
                <span className="text-sm font-bold text-black">{completeness}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-800 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completeness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6">
            <CardContent className="p-8">
              {/* Step 1: Organisation Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Organisation Basics
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Let's start with your agency's core information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="tradingName" className="text-gray-700 dark:text-gray-300">
                        Trading Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tradingName"
                        value={orgData.tradingName}
                        onChange={(e) => handleInputChange('tradingName', e.target.value)}
                        placeholder="Premium Realty Group"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="abnAcn" className="text-gray-700 dark:text-gray-300">
                        ABN/ACN <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="abnAcn"
                        value={orgData.abnAcn}
                        onChange={(e) => handleInputChange('abnAcn', e.target.value)}
                        placeholder="12 345 678 901"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-gray-700 dark:text-gray-300">
                        <Globe className="h-4 w-4 inline mr-1" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={orgData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://www.yourwebsite.com"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="primaryPhone" className="text-gray-700 dark:text-gray-300">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Primary Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="primaryPhone"
                        value={orgData.primaryPhone}
                        onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                        placeholder="+61 2 1234 5678"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="primaryEmail" className="text-gray-700 dark:text-gray-300">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Primary Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="primaryEmail"
                        type="email"
                        value={orgData.primaryEmail}
                        onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                        placeholder="info@yourwebsite.com"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="officeSuburb" className="text-gray-700 dark:text-gray-300">
                        Office Suburb <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="officeSuburb"
                        value={orgData.officeSuburb}
                        onChange={(e) => handleInputChange('officeSuburb', e.target.value)}
                        placeholder="Sydney"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="officeState" className="text-gray-700 dark:text-gray-300">
                        Office State <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="officeState"
                        value={orgData.officeState}
                        onChange={(e) => handleInputChange('officeState', e.target.value)}
                        className="mt-2 w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select state</option>
                        {stateOptions.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="logo" className="text-gray-700 dark:text-gray-300">
                        <Upload className="h-4 w-4 inline mr-1" />
                        Logo URL (optional)
                      </Label>
                      <Input
                        id="logo"
                        value={orgData.logo}
                        onChange={(e) => handleInputChange('logo', e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="mt-2 dark:bg-gray-700 dark:text-white"
                      />
                      {orgData.logo && (
                        <img src={orgData.logo} alt="Logo preview" className="mt-2 h-16 object-contain" />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Coverage & Services */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Coverage & Services
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Define where you operate and what services you offer
                    </p>
                  </div>

                  {/* Coverage Areas */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Coverage Areas <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={orgData.coverageInput}
                        onChange={(e) => handleInputChange('coverageInput', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCoverageArea()}
                        placeholder="Enter suburb or region"
                        className="dark:bg-gray-700 dark:text-white"
                      />
                      <Button onClick={handleAddCoverageArea} type="button" className="bg-green-700 hover:bg-green-800 hover:text-white">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {orgData.coverageAreas.map((area, index) => (
                        <Badge
                          key={index}
                          className="bg-amber-100 dark:bg-gray-900 text-black dark:text-amber-400 pr-1"
                        >
                          {area}
                          <button
                            onClick={() => handleRemoveCoverageArea(index)}
                            className="ml-2 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Service Types */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      Service Types <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceTypeOptions.map(service => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={orgData.serviceTypes.includes(service)}
                            onCheckedChange={() => handleToggleService(service)}
                          />
                          <label htmlFor={service} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Model */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      Fee Model (optional)
                    </Label>
                    <select
                      value={orgData.feeModel}
                      onChange={(e) => handleInputChange('feeModel', e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-3"
                    >
                      <option value="">Select fee model</option>
                      {feeModelOptions.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>

                    {orgData.feeModel && (
                      <>
                        <Input
                          value={orgData.feeAmount}
                          onChange={(e) => handleInputChange('feeAmount', e.target.value)}
                          placeholder="e.g., $15,000 or 2.5%"
                          className="mb-3 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="showFee"
                            checked={orgData.showFeePublicly}
                            onCheckedChange={(checked) => handleInputChange('showFeePublicly', checked)}
                          />
                          <label htmlFor="showFee" className="text-sm text-gray-700 dark:text-gray-300">
                            Show pricing publicly on profile
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Compliance */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Compliance & Credentials
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Build trust with verified credentials
                    </p>
                  </div>

                  {/* License Numbers */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                      <Shield className="h-4 w-4 inline mr-1" />
                      License Numbers <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-3">
                      {orgData.licenseNumbers.map((license, index) => (
                        <div key={index} className="flex gap-3">
                          <select
                            value={license.state}
                            onChange={(e) => handleLicenseChange(index, 'state', e.target.value)}
                            className="w-32 h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="">State</option>
                            {stateOptions.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          <Input
                            value={license.number}
                            onChange={(e) => handleLicenseChange(index, 'number', e.target.value)}
                            placeholder="License number"
                            className="flex-1 dark:bg-gray-700 dark:text-white"
                          />
                          {orgData.licenseNumbers.length > 1 && (
                            <Button
                              variant="ghost"
                              onClick={() => handleRemoveLicense(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button onClick={handleAddLicense} variant="outline" type="button">
                        + Add License
                      </Button>
                    </div>
                  </div>

                  {/* PI Insurance */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-black">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="piInsurance"
                        checked={orgData.hasPIInsurance}
                        onCheckedChange={(checked) => handleInputChange('hasPIInsurance', checked)}
                      />
                      <label htmlFor="piInsurance" className="text-sm font-medium text-gray-900 dark:text-white">
                        <Award className="h-4 w-4 inline mr-1" />
                        We have Professional Indemnity Insurance
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 ml-6">
                      This will display a trust badge on your public profile
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Invite Staff */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Invite Your Team (Optional)
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Add agents to your agency profile
                    </p>
                  </div>

                  <div className="space-y-3">
                    {orgData.staffInvites.map((email, index) => (
                      <div key={index} className="flex gap-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => handleStaffInviteChange(index, e.target.value)}
                          placeholder="agent@email.com"
                          className="flex-1 dark:bg-gray-700 dark:text-white"
                        />
                        {orgData.staffInvites.length > 1 && (
                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveStaffInvite(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button onClick={handleAddStaffInvite} variant="outline" type="button">
                      + Add Another Agent
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <Users className="h-4 w-4 inline mr-1" />
                      Invites will be stored and you can manage them later from the Staff section
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Preview */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Review & Publish
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Check your profile details before going live
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Organisation Summary */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Organisation</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Trading Name:</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">{orgData.tradingName}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">ABN/ACN:</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">{orgData.abnAcn}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Location:</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">{orgData.officeSuburb}, {orgData.officeState}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Coverage Summary */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Coverage Areas ({orgData.coverageAreas.length})</h3>
                      <div className="flex flex-wrap gap-2">
                        {orgData.coverageAreas.map((area, index) => (
                          <Badge key={index} className="bg-green-700 text-white">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Services Summary */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Services ({orgData.serviceTypes.length})</h3>
                      <div className="flex flex-wrap gap-2">
                        {orgData.serviceTypes.map((service, index) => (
                          <Badge key={index} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Compliance Summary */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Compliance</h3>
                      <div className="space-y-2">
                        {orgData.licenseNumbers.filter(l => l.state && l.number).map((license, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {license.state}: {license.number}
                            </span>
                          </div>
                        ))}
                        {orgData.hasPIInsurance && (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              Professional Indemnity Insurance
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Ready to Go Live!
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Your profile is {completeness}% complete and ready to publish
                    </p>
                    <Button
                      onClick={handlePublish}
                      className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Publish Profile
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="border-gray-300 dark:border-gray-600"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps && (
              <Button
                onClick={handleNext}
                disabled={!isStepComplete(currentStep)}
                className="bg-green-700 hover:bg-green-800 hover:text-white text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Save & Exit */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black"
            >
              Save & continue later
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingWizard;

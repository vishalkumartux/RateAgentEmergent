import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Calendar,
  MapPin,
  Home,
  DollarSign,
  Image as ImageIcon,
  ShieldCheck,
  Eye,
  Save,
  Upload,
  X,
  Info,
  AlertCircle,
  CheckCircle,
  FileText,
  Loader
} from 'lucide-react';

const AddEditDeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    // Step A - Basics
    purchaseMonth: '',
    purchaseYear: new Date().getFullYear(),
    suburb: '',
    state: 'NSW',
    postcode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    carSpaces: '',
    streetAddress: '',
    maskAddress: true,
    
    // Step B - Process & Outcomes
    method: '',
    daysToSecure: '',
    valueStory: '',
    strategyTags: [],
    
    // Step C - Financials
    askingPrice: '',
    purchasePrice: '',
    priceUndisclosed: false,
    rentalAppraisal: '',
    rentalAchieved: '',
    budgetMin: '',
    budgetMax: '',
    
    // Step D - Media
    photos: [],
    floorplan: null,
    mediaConsent: false,
    
    // Step E - Verification
    verificationLevel: 'L0',
    verificationDocs: [],
    
    // Step F - Publish
    seoTitle: '',
    seoDescription: '',
    status: 'draft'
  });

  // Computed values
  const discountPercent = formData.askingPrice && formData.purchasePrice && !formData.priceUndisclosed
    ? (((formData.askingPrice - formData.purchasePrice) / formData.askingPrice) * 100).toFixed(1)
    : null;

  const grossYield = formData.purchasePrice && formData.rentalAchieved && !formData.priceUndisclosed
    ? (((formData.rentalAchieved * 52) / formData.purchasePrice) * 100).toFixed(1)
    : null;

  // Steps configuration
  const steps = [
    { number: 1, title: 'Basics', subtitle: 'Property details', icon: Home },
    { number: 2, title: 'Process', subtitle: 'How you secured it', icon: CheckCircle },
    { number: 3, title: 'Financials', subtitle: 'Price & yield', icon: DollarSign },
    { number: 4, title: 'Media', subtitle: 'Photos & docs', icon: ImageIcon },
    { number: 5, title: 'Verification', subtitle: 'Trust level', icon: ShieldCheck },
    { number: 6, title: 'Review', subtitle: 'Preview & publish', icon: Eye }
  ];

  // Load deal data if editing
  useEffect(() => {
    if (isEdit) {
      // Mock loading existing deal data
      // In real app, fetch from API
      setFormData({
        ...formData,
        purchaseMonth: '08',
        purchaseYear: 2024,
        suburb: 'Bondi Beach',
        state: 'NSW',
        postcode: '2026',
        propertyType: 'House',
        bedrooms: '4',
        bathrooms: '3',
        carSpaces: '2',
        streetAddress: '42 Harbour View Drive',
        method: 'Private Treaty',
        daysToSecure: '42',
        valueStory: 'Secured this stunning oceanfront property 5.8% below asking through off-market negotiations.',
        askingPrice: '3450000',
        purchasePrice: '3250000',
        strategyTags: ['Off-market', 'Pre-auction']
      });
    }
  }, [id]);

  // Validation for each step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.purchaseMonth) newErrors.purchaseMonth = 'Required';
      if (!formData.purchaseYear) newErrors.purchaseYear = 'Required';
      if (!formData.suburb) newErrors.suburb = 'Required';
      if (!formData.state) newErrors.state = 'Required';
      if (!formData.propertyType) newErrors.propertyType = 'Required';
      if (!formData.streetAddress) newErrors.streetAddress = 'Required';
    }
    
    if (step === 2) {
      if (!formData.method) newErrors.method = 'Required';
      if (!formData.daysToSecure) newErrors.daysToSecure = 'Required';
      if (!formData.valueStory || formData.valueStory.length < 20) {
        newErrors.valueStory = 'Please provide at least 20 characters';
      }
    }
    
    if (step === 4) {
      if (!formData.mediaConsent && formData.photos.length > 0) {
        newErrors.mediaConsent = 'You must confirm rights to publish';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      navigate('/staff/deals');
    }, 1000);
  };

  const handlePublish = async () => {
    if (validateStep(currentStep)) {
      setIsSaving(true);
      // Mock API call
      setTimeout(() => {
        setIsSaving(false);
        navigate('/staff/deals');
      }, 1000);
    }
  };

  const addStrategyTag = (tag) => {
    if (tag && !formData.strategyTags.includes(tag)) {
      setFormData({
        ...formData,
        strategyTags: [...formData.strategyTags, tag]
      });
    }
  };

  const removeStrategyTag = (tag) => {
    setFormData({
      ...formData,
      strategyTags: formData.strategyTags.filter(t => t !== tag)
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // Mock photo upload - in real app, strip EXIF and upload
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36),
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setFormData({
      ...formData,
      photos: [...formData.photos, ...newPhotos].slice(0, 8)
    });
  };

  const removePhoto = (photoId) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter(p => p.id !== photoId)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/staff/deals">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Deals
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {isEdit ? 'Edit Deal' : 'Add New Deal'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase a completed purchase for your public portfolio
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(step.number)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </button>
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${
                        isActive ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Property Basics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell us about the property you secured for your client
                  </p>
                </div>

                {/* Purchase Date */}
                <div>
                  <Label>Purchase Date *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <select
                        value={formData.purchaseMonth}
                        onChange={(e) => setFormData({...formData, purchaseMonth: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.purchaseMonth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select Month</option>
                        {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => (
                          <option key={m} value={m}>
                            {new Date(2024, parseInt(m)-1).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                      {errors.purchaseMonth && (
                        <p className="text-red-500 text-sm mt-1">{errors.purchaseMonth}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={formData.purchaseYear}
                        onChange={(e) => setFormData({...formData, purchaseYear: e.target.value})}
                        placeholder="Year"
                        min="2020"
                        max={new Date().getFullYear()}
                        className={errors.purchaseYear ? 'border-red-500' : ''}
                      />
                      {errors.purchaseYear && (
                        <p className="text-red-500 text-sm mt-1">{errors.purchaseYear}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label>Location *</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="col-span-2">
                      <Input
                        value={formData.suburb}
                        onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                        placeholder="Suburb"
                        className={errors.suburb ? 'border-red-500' : ''}
                      />
                      {errors.suburb && (
                        <p className="text-red-500 text-sm mt-1">{errors.suburb}</p>
                      )}
                    </div>
                    <div>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="WA">WA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                  </div>
                  <Input
                    value={formData.postcode}
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                    placeholder="Postcode (Optional)"
                    className="mt-2"
                    maxLength={4}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <Label>Property Type *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                    {['House', 'Townhouse', 'Unit', 'Apartment', 'Land'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, propertyType: type})}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          formData.propertyType === type
                            ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Home className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-sm font-medium">{type}</span>
                      </button>
                    ))}
                  </div>
                  {errors.propertyType && (
                    <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
                  )}
                </div>

                {/* Property Specs */}
                <div>
                  <Label>Property Specifications (Optional)</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      placeholder="Bedrooms"
                      min="0"
                    />
                    <Input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      placeholder="Bathrooms"
                      min="0"
                    />
                    <Input
                      type="number"
                      value={formData.carSpaces}
                      onChange={(e) => setFormData({...formData, carSpaces: e.target.value})}
                      placeholder="Parking"
                      min="0"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <Label>Street Address *</Label>
                  <Input
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                    placeholder="e.g., 42 Harbour View Drive"
                    className={`mt-2 ${errors.streetAddress ? 'border-red-500' : ''}`}
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Mask street number for privacy
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                        Public will see: "XX Harbour View Drive"
                      </p>
                    </div>
                    <Switch
                      checked={formData.maskAddress}
                      onCheckedChange={(checked) => setFormData({...formData, maskAddress: checked})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Process & Outcomes */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Process & Outcomes
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    How did you secure this property for your client?
                  </p>
                </div>

                {/* Purchase Method */}
                <div>
                  <Label>Purchase Method *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    {['Auction', 'Private Treaty', 'Off-Market'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({...formData, method})}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          formData.method === method
                            ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{method}</span>
                      </button>
                    ))}
                  </div>
                  {errors.method && (
                    <p className="text-red-500 text-sm mt-1">{errors.method}</p>
                  )}
                </div>

                {/* Days to Secure */}
                <div>
                  <Label>Days-to-Secure *</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    From client engagement to signed contract
                  </p>
                  <Input
                    type="number"
                    value={formData.daysToSecure}
                    onChange={(e) => setFormData({...formData, daysToSecure: e.target.value})}
                    placeholder="e.g., 42"
                    min="1"
                    className={errors.daysToSecure ? 'border-red-500' : ''}
                  />
                  {errors.daysToSecure && (
                    <p className="text-red-500 text-sm mt-1">{errors.daysToSecure}</p>
                  )}
                </div>

                {/* Value Story */}
                <div>
                  <Label>Value Story *</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Brief description (1-2 sentences): What you achieved & why it mattered
                  </p>
                  <Textarea
                    value={formData.valueStory}
                    onChange={(e) => setFormData({...formData, valueStory: e.target.value})}
                    placeholder="e.g., Secured this stunning oceanfront property 5.8% below asking through off-market negotiations. Premium beachside lifestyle with strong rental yield."
                    rows={4}
                    className={errors.valueStory ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between mt-1">
                    <p className={`text-sm ${errors.valueStory ? 'text-red-500' : 'text-gray-500'}`}>
                      {errors.valueStory || `${formData.valueStory.length} characters`}
                    </p>
                    <p className="text-sm text-gray-500">Min 20 characters</p>
                  </div>
                </div>

                {/* Strategy Tags */}
                <div>
                  <Label>Strategy Tags (Optional)</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Highlight your approach and expertise
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.strategyTags.map(tag => (
                      <Badge key={tag} className="bg-amber-600 text-white">
                        {tag}
                        <button
                          onClick={() => removeStrategyTag(tag)}
                          className="ml-2 hover:text-red-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Off-market', 'Pre-auction', 'First-home buyer', 'Investment', 'Downsizer', 'High-yield'].map(tag => (
                      !formData.strategyTags.includes(tag) && (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addStrategyTag(tag)}
                          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full hover:border-amber-500 hover:text-amber-600 transition-colors"
                        >
                          + {tag}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financials - Will continue in next message due to length */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Financials
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Price details (flexible for public display)
                  </p>
                </div>

                {/* Asking Price */}
                <div>
                  <Label>Asking Price (Optional)</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      value={formData.askingPrice}
                      onChange={(e) => setFormData({...formData, askingPrice: e.target.value})}
                      placeholder="3,450,000"
                      className="pl-8"
                      disabled={formData.priceUndisclosed}
                    />
                  </div>
                </div>

                {/* Purchase Price */}
                <div>
                  <Label>Purchase Price *</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                      placeholder="3,250,000"
                      className="pl-8"
                      disabled={formData.priceUndisclosed}
                    />
                  </div>
                  
                  <div className="flex items-center mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Switch
                      checked={formData.priceUndisclosed}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        priceUndisclosed: checked,
                        askingPrice: checked ? '' : formData.askingPrice,
                        purchasePrice: checked ? '' : formData.purchasePrice
                      })}
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      Price Undisclosed (will show "Undisclosed" publicly)
                    </span>
                  </div>

                  {/* Auto-calculated Discount */}
                  {discountPercent && discountPercent > 0 && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="font-semibold text-green-700 dark:text-green-400">
                            {discountPercent}% below asking
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-500">
                            Saved client ${(formData.askingPrice - formData.purchasePrice).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rental Information */}
                <div>
                  <Label>Rental & Yield (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Appraisal ($/week)</label>
                      <Input
                        type="number"
                        value={formData.rentalAppraisal}
                        onChange={(e) => setFormData({...formData, rentalAppraisal: e.target.value})}
                        placeholder="1,200"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Achieved ($/week)</label>
                      <Input
                        type="number"
                        value={formData.rentalAchieved}
                        onChange={(e) => setFormData({...formData, rentalAchieved: e.target.value})}
                        placeholder="1,250"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Auto-calculated Yield */}
                  {grossYield && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        <strong>Gross Yield:</strong> {grossYield}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Budget Band */}
                <div>
                  <Label>Client Budget Band (Optional)</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Helps buyers understand your experience level
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={formData.budgetMin}
                          onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                          placeholder="Min (e.g., 800,000)"
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={formData.budgetMax}
                          onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                          placeholder="Max (e.g., 1,000,000)"
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                {currentStep < 6 ? (
                  <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700 text-white">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 text-white" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Publish Deal
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEditDeal;

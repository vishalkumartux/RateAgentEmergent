import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import { 
  ArrowLeft,
  Save,
  Home,
  Camera,
  DollarSign,
  BarChart3,
  Upload,
  X,
  Plus,
  CheckCircle
} from 'lucide-react';

const AddDeal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Property Details
    address: '',
    propertyType: '',
    dealType: '',
    bedrooms: '',
    bathrooms: '',
    carSpaces: '',
    landSize: '',
    buildingArea: '',
    yearBuilt: '',
    description: '',
    
    // Step 2: Photos
    photos: [],
    
    // Step 3: Property Attributes
    listingPrice: '',
    priceType: 'fixed', // fixed, auction, negotiation, rental
    rentPerWeek: '',
    bond: '',
    availableDate: '',
    leaseTerm: '',
    inspectionTimes: [],
    
    // Step 4: Performance Characteristics
    targetMarket: [],
    marketingStrategy: '',
    sellingPoints: [],
    nearbyAmenities: [],
    competitiveAdvantages: '',
    marketAnalysis: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const steps = [
    { number: 1, title: 'Basic Details', icon: Home },
    { number: 2, title: 'Photos', icon: Camera },
    { number: 3, title: 'Pricing & Terms', icon: DollarSign },
    { number: 4, title: 'Marketing Strategy', icon: BarChart3 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayFieldToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const addInspectionTime = () => {
    setFormData(prev => ({
      ...prev,
      inspectionTimes: [...prev.inspectionTimes, { date: '', time: '' }]
    }));
  };

  const removeInspectionTime = (index) => {
    setFormData(prev => ({
      ...prev,
      inspectionTimes: prev.inspectionTimes.filter((_, i) => i !== index)
    }));
  };

  const updateInspectionTime = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      inspectionTimes: prev.inspectionTimes.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handlePhotoUpload = (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      
      const newPhotos = files.map((file, index) => ({
        id: Date.now() + Math.random() + index,
        file: file,
        preview: URL.createObjectURL(file),
        caption: ''
      }));
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      
      // Clear the input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading photos:', error);
      setErrors(prev => ({ ...prev, photos: 'Error uploading photos. Please try again.' }));
    }
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const updatePhotoCaption = (photoId, caption) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map(photo => 
        photo.id === photoId ? { ...photo, caption } : photo
      )
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.dealType) newErrors.dealType = 'Deal type is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        break;
      case 3:
        if (formData.dealType !== 'rental') {
          if (!formData.listingPrice) newErrors.listingPrice = 'Listing price is required';
        } else {
          if (!formData.rentPerWeek) newErrors.rentPerWeek = 'Weekly rent is required';
        }
        break;
      case 4:
        if (formData.targetMarket.length === 0) newErrors.targetMarket = 'Select at least one target market';
        if (!formData.marketingStrategy.trim()) newErrors.marketingStrategy = 'Marketing strategy is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: API call to create new deal
      // const response = await createDeal(formData);
      
      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate back to deals list
      navigate('/staff/deals', { 
        state: { 
          success: 'Deal created successfully!',
          dealId: Date.now() // Mock deal ID
        }
      });
    } catch (error) {
      setErrors({ submit: 'Failed to create deal. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const targetMarkets = [
    'First Home Buyers', 'Upgraders', 'Downsizers', 'Investors', 
    'Young Professionals', 'Families', 'Retirees', 'International Buyers'
  ];
  
  const sellingPointsOptions = [
    'Ocean Views', 'City Views', 'Renovated Kitchen', 'Modern Bathrooms',
    'Outdoor Entertainment', 'Swimming Pool', 'Garage/Parking', 'Close to Transport',
    'Near Schools', 'Shopping Nearby', 'Quiet Street', 'Corner Block'
  ];
  
  const amenitiesOptions = [
    'Beach', 'Parks', 'Shopping Centers', 'Schools', 'Public Transport',
    'Restaurants', 'Gym/Fitness', 'Hospital', 'Cafes', 'Golf Course'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/staff/deals" className="inline-flex items-center text-black hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Deals
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Add New Deal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete all sections to list your new property deal
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
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                    isCompleted ? 'bg-emerald-600 border-emerald-600' :
                    isActive ? 'bg-success border-black' :
                    'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Icon className={`h-6 w-6 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-black' :
                      isCompleted ? 'text-emerald-600' :
                      'text-gray-500'
                    }`}>
                      Step {step.number}
                    </div>
                    <div className={`text-xs ${
                      isActive || isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-8 ${
                      isCompleted ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5 mr-2 text-black" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Step 1: Basic Property Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="address">Property Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Ocean View Drive, Bondi Beach NSW 2026"
                    className="mt-1"
                  />
                  {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="unit">Unit</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyType && <p className="text-red-600 text-sm mt-1">{errors.propertyType}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="dealType">Deal Type *</Label>
                    <Select value={formData.dealType} onValueChange={(value) => handleInputChange('dealType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select deal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="rental">Rental</SelectItem>
                        <SelectItem value="commercial-sale">Commercial Sale</SelectItem>
                        <SelectItem value="commercial-lease">Commercial Lease</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.dealType && <p className="text-red-600 text-sm mt-1">{errors.dealType}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      placeholder="3"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      placeholder="2"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="carSpaces">Car Spaces</Label>
                    <Input
                      id="carSpaces"
                      type="number"
                      value={formData.carSpaces}
                      onChange={(e) => handleInputChange('carSpaces', e.target.value)}
                      placeholder="2"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                      placeholder="2010"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landSize">Land Size (m²)</Label>
                    <Input
                      id="landSize"
                      value={formData.landSize}
                      onChange={(e) => handleInputChange('landSize', e.target.value)}
                      placeholder="650"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="buildingArea">Building Area (m²)</Label>
                    <Input
                      id="buildingArea"
                      value={formData.buildingArea}
                      onChange={(e) => handleInputChange('buildingArea', e.target.value)}
                      placeholder="200"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Property Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the key features and benefits of this property..."
                    className="mt-1 h-32"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Property Photos *</Label>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Upload high-quality photos of the property. The first photo will be used as the main listing image.
                  </p>
                  
                  {/* Photo Upload */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="photo-upload"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Click to upload photos or drag and drop
                      </p>
                      <p className="text-gray-500 text-sm">
                        PNG, JPG, JPEG up to 10MB each
                      </p>
                    </label>
                  </div>
                  
                  {errors.photos && <p className="text-red-600 text-sm mt-2">{errors.photos}</p>}
                </div>
                
                {/* Photo Grid */}
                {formData.photos.length > 0 && (
                  <div>
                    <Label>Uploaded Photos ({formData.photos.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {formData.photos.map((photo, index) => (
                        <div key={photo.id} className="relative group">
                          <img
                            src={photo.preview}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {index === 0 && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-success text-white text-xs">Main Photo</Badge>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 hover:text-white transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="mt-2">
                            <Input
                              placeholder="Photo caption (optional)"
                              value={photo.caption}
                              onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                              className="text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Pricing & Terms */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {formData.dealType === 'rental' ? (
                  // Rental specific fields
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rentPerWeek">Weekly Rent *</Label>
                        <Input
                          id="rentPerWeek"
                          value={formData.rentPerWeek}
                          onChange={(e) => handleInputChange('rentPerWeek', e.target.value)}
                          placeholder="1200"
                          className="mt-1"
                        />
                        {errors.rentPerWeek && <p className="text-red-600 text-sm mt-1">{errors.rentPerWeek}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="bond">Bond Amount</Label>
                        <Input
                          id="bond"
                          value={formData.bond}
                          onChange={(e) => handleInputChange('bond', e.target.value)}
                          placeholder="4800"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="availableDate">Available Date</Label>
                        <Input
                          id="availableDate"
                          type="date"
                          value={formData.availableDate}
                          onChange={(e) => handleInputChange('availableDate', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="leaseTerm">Lease Term</Label>
                        <Select value={formData.leaseTerm} onValueChange={(value) => handleInputChange('leaseTerm', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select lease term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6-months">6 Months</SelectItem>
                            <SelectItem value="12-months">12 Months</SelectItem>
                            <SelectItem value="18-months">18 Months</SelectItem>
                            <SelectItem value="24-months">24 Months</SelectItem>
                            <SelectItem value="negotiable">Negotiable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                ) : (
                  // Sale specific fields
                  <>
                    <div>
                      <Label htmlFor="listingPrice">Listing Price *</Label>
                      <Input
                        id="listingPrice"
                        value={formData.listingPrice}
                        onChange={(e) => handleInputChange('listingPrice', e.target.value)}
                        placeholder="2800000"
                        className="mt-1"
                      />
                      {errors.listingPrice && <p className="text-red-600 text-sm mt-1">{errors.listingPrice}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="priceType">Price Type</Label>
                      <Select value={formData.priceType} onValueChange={(value) => handleInputChange('priceType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="negotiation">Price by Negotiation</SelectItem>
                          <SelectItem value="auction">Auction</SelectItem>
                          <SelectItem value="expressions">Expressions of Interest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {/* Inspection Times */}
                <div>
                  <Label>Inspection Times</Label>
                  <div className="space-y-3 mt-2">
                    {formData.inspectionTimes.map((inspection, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Input
                          type="date"
                          value={inspection.date}
                          onChange={(e) => updateInspectionTime(index, 'date', e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="time"
                          value={inspection.time}
                          onChange={(e) => updateInspectionTime(index, 'time', e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeInspectionTime(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addInspectionTime}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Inspection Time
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Marketing Strategy */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label>Target Market *</Label>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Select the primary buyer/renter demographics for this property:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {targetMarkets.map((market) => (
                      <div key={market} className="flex items-center space-x-2">
                        <Checkbox
                          id={market}
                          checked={formData.targetMarket.includes(market)}
                          onCheckedChange={() => handleArrayFieldToggle('targetMarket', market)}
                        />
                        <Label htmlFor={market} className="text-sm">{market}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.targetMarket && <p className="text-red-600 text-sm mt-2">{errors.targetMarket}</p>}
                </div>
                
                <div>
                  <Label htmlFor="marketingStrategy">Marketing Strategy *</Label>
                  <Textarea
                    id="marketingStrategy"
                    value={formData.marketingStrategy}
                    onChange={(e) => handleInputChange('marketingStrategy', e.target.value)}
                    placeholder="Describe your marketing approach, channels, and timeline for this property..."
                    className="mt-1 h-24"
                  />
                  {errors.marketingStrategy && <p className="text-red-600 text-sm mt-1">{errors.marketingStrategy}</p>}
                </div>
                
                <div>
                  <Label>Key Selling Points</Label>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Select the property's standout features:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sellingPointsOptions.map((point) => (
                      <div key={point} className="flex items-center space-x-2">
                        <Checkbox
                          id={point}
                          checked={formData.sellingPoints.includes(point)}
                          onCheckedChange={() => handleArrayFieldToggle('sellingPoints', point)}
                        />
                        <Label htmlFor={point} className="text-sm">{point}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Nearby Amenities</Label>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Highlight nearby facilities and attractions:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {amenitiesOptions.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.nearbyAmenities.includes(amenity)}
                          onCheckedChange={() => handleArrayFieldToggle('nearbyAmenities', amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="competitiveAdvantages">Competitive Advantages</Label>
                    <Textarea
                      id="competitiveAdvantages"
                      value={formData.competitiveAdvantages}
                      onChange={(e) => handleInputChange('competitiveAdvantages', e.target.value)}
                      placeholder="What sets this property apart from similar listings?"
                      className="mt-1 h-20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="marketAnalysis">Market Analysis</Label>
                    <Textarea
                      id="marketAnalysis"
                      value={formData.marketAnalysis}
                      onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
                      placeholder="Local market conditions, recent sales, pricing strategy..."
                      className="mt-1 h-20"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-3">
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
              >
                Next Step
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white"
              >
                {isSubmitting ? 'Creating Deal...' : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Deal
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        {errors.submit && (
          <p className="text-red-600 text-center mt-4">{errors.submit}</p>
        )}
      </div>
    </div>
  );
};

export default AddDeal;
'use client';

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PortfolioData } from '@/types/portfolio';

interface BasicInfoStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const BasicInfoStep = forwardRef<{ validate: () => boolean }, BasicInfoStepProps>(
  ({ data, onDataChange, onValidationChange }, ref) => {
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const profileFileRef = useRef<HTMLInputElement>(null);
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof PortfolioData, value: string) => {
    onDataChange({ ...data, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Check validation after update
    if (onValidationChange) {
      const newData = { ...data, [field]: value };
      const isValid = ['fullName', 'title', 'tagline', 'aboutMe', 'address'].every(
        f => newData[f as keyof PortfolioData] && (newData[f as keyof PortfolioData] as string).trim().length > 0
      );
      onValidationChange(isValid);
    }
  };

  const handleBlur = (field: keyof PortfolioData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, data[field] as string);
  };

  const validateField = (field: keyof PortfolioData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Full name must be at least 2 characters';
        break;
      case 'title':
        if (!value.trim()) error = 'Title/role is required';
        break;
      case 'tagline':
        if (!value.trim()) error = 'Tagline is required';
        else if (value.trim().length > 100) error = 'Tagline must be 100 characters or less';
        break;
      case 'aboutMe':
        if (!value.trim()) error = 'About me is required';
        else if (value.trim().length < 20) error = 'About me must be at least 20 characters';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // Validate all required fields
  const validateAllFields = () => {
    const requiredFields: (keyof PortfolioData)[] = ['fullName', 'title', 'tagline', 'aboutMe', 'address'];
    const newErrors: {[key: string]: string} = {};
    let hasErrors = false;

    requiredFields.forEach(field => {
      const error = validateField(field, data[field] as string);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
      // Mark all fields as touched
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  // Expose validation function to parent component
  useImperativeHandle(ref, () => ({
    validate: validateAllFields
  }));



  const getFieldClassName = (field: keyof PortfolioData) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400";
    const hasError = errors[field] && touched[field];
    const hasValue = data[field] && (data[field] as string).trim().length > 0;
    
    if (hasError) {
      return `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500`;
    } else if (hasValue) {
      return `${baseClasses} border-green-500 focus:ring-green-500 focus:border-green-500`;
    } else {
      return `${baseClasses} border-gray-600 focus:ring-blue-500 focus:border-blue-500`;
    }
  };

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePreview(result);
        updateField('profilePicture', result);
      };
      // Read as data URL without compression
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('PDF file size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateField('resume', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400">Tell us about yourself and your expertise</p>
      </div>
      
      <div className="space-y-6">
        {/* Full Name - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={getFieldClassName('fullName')}
              placeholder="John Doe"
              required
            />
            {errors.fullName && touched.fullName && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="relative group">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {errors.fullName}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Title and Profile Picture - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title / Current Role <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                className={getFieldClassName('title')}
                placeholder="Frontend Developer, UX Designer, etc."
                required
              />
              {errors.title && touched.title && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="relative group">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      {errors.title}
                      <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Picture
            </label>
            
            {/* URL Input */}
            <input
              type="text"
              value={data.profilePicture.startsWith('data:') ? '' : data.profilePicture}
              onChange={(e) => updateField('profilePicture', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 mb-3"
              placeholder="https://example.com/profile.jpg"
            />
            
            {/* File Upload */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => profileFileRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Upload Image
              </button>
              <span className="text-xs text-gray-400">or enter URL above</span>
            </div>
            
            {/* Hidden file input */}
            <input
              ref={profileFileRef}
              type="file"
              accept="image/*"
              onChange={handleProfileUpload}
              className="hidden"
            />
            
            {/* Image Preview */}
            {(profilePreview || (data.profilePicture && data.profilePicture.startsWith('data:'))) && (
              <div className="mt-3">
                <img
                  src={profilePreview || data.profilePicture}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-lg object-cover border border-gray-600"
                />
                <p className="text-xs text-green-400 mt-1">✓ Image uploaded successfully</p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Upload JPG, PNG, GIF (max 5MB) or enter image URL
            </p>
          </div>
        </div>

        {/* Tagline - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Bio / Tagline <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              onBlur={() => handleBlur('tagline')}
              className={getFieldClassName('tagline')}
              placeholder="A one-line statement about yourself (e.g., 'Passionate developer creating innovative solutions')"
              required
            />
            {errors.tagline && touched.tagline && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="relative group">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {errors.tagline}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* About Me - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Professional Snapshot / About Me <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <textarea
              value={data.aboutMe}
              onChange={(e) => updateField('aboutMe', e.target.value)}
              onBlur={() => handleBlur('aboutMe')}
              rows={4}
              className={getFieldClassName('aboutMe') + ' resize-none'}
              placeholder="Add something about yourself - your background, experience, and what drives you..."
              required
            />
            {errors.aboutMe && touched.aboutMe && (
              <div className="absolute right-3 top-4">
                <div className="relative group">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {errors.aboutMe}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Address - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.address}
              onChange={(e) => updateField('address', e.target.value)}
              onBlur={() => handleBlur('address')}
              className={getFieldClassName('address')}
              placeholder="City, State, Country (e.g., San Francisco, CA, USA)"
              required
            />
            {errors.address && touched.address && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="relative group">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {errors.address}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Resume Upload - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resume Upload
          </label>
          
          {/* File Upload */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => resumeFileRef.current?.click()}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Upload PDF Resume
            </button>
            <span className="text-xs text-gray-400">Click to select PDF file</span>
          </div>
          
          {/* Hidden file input */}
          <input
            ref={resumeFileRef}
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="hidden"
          />
          
          {/* Upload Status */}
          {data.resume && data.resume.startsWith('data:') && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-400">PDF uploaded successfully</span>
              </div>
              <button
                type="button"
                onClick={() => updateField('resume', '')}
                className="text-xs text-red-400 border-2 border-red-400 rounded-md px-2 py-1 hover:text-red-300 transition-colors"
              >
                Remove Resume
              </button>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            Upload PDF file (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
});

export default BasicInfoStep;
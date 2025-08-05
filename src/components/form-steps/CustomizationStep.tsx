'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';

interface CustomizationStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

const GOOGLE_FONTS = [
  { name: 'Inter', preview: 'Inter' },
  { name: 'Poppins', preview: 'Poppins' },
  { name: 'Space Grotesk', preview: 'Space Grotesk' },
  { name: 'Roboto', preview: 'Roboto' },
  { name: 'Open Sans', preview: 'Open Sans' },
  { name: 'Lato', preview: 'Lato' },
  { name: 'Montserrat', preview: 'Montserrat' },
  { name: 'Raleway', preview: 'Raleway' }
];

export default function CustomizationStep({ data, onDataChange }: CustomizationStepProps) {
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  const updateCustomization = (field: keyof PortfolioData['customization'], value: string) => {
    onDataChange({
      ...data,
      customization: { ...data.customization, [field]: value }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Style Customization</h2>
        <p className="text-gray-400">Customize colors and fonts for your selected template</p>
      </div>
      


      {/* Font Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Font</h3>
        <div className="relative">
          <button
            onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white flex items-center justify-between"
          >
            <span style={{ fontFamily: data.customization.font }}>
              {data.customization.font}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {fontDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {GOOGLE_FONTS.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    updateCustomization('font', font.name);
                    setFontDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-600 transition-colors"
                  style={{ fontFamily: font.name }}
                >
                  <span className="text-white">{font.preview}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Color Scheme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Primary Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={data.customization.primaryColor}
                onChange={(e) => updateCustomization('primaryColor', e.target.value)}
                className="w-16 h-12 border border-gray-600 rounded-lg cursor-pointer bg-transparent"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-600"
                    style={{ backgroundColor: data.customization.primaryColor }}
                  />
                  <span className="text-white font-mono text-sm">
                    {data.customization.primaryColor}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Used for headings, buttons, and accents
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Secondary Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={data.customization.secondaryColor}
                onChange={(e) => updateCustomization('secondaryColor', e.target.value)}
                className="w-16 h-12 border border-gray-600 rounded-lg cursor-pointer bg-transparent"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-600"
                    style={{ backgroundColor: data.customization.secondaryColor }}
                  />
                  <span className="text-white font-mono text-sm">
                    {data.customization.secondaryColor}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Used for links and secondary elements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Color Preview</h3>
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <div 
              className="text-2xl font-bold"
              style={{ color: data.customization.primaryColor }}
            >
              Primary Color Sample
            </div>
            <div 
              className="text-lg"
              style={{ color: data.customization.secondaryColor }}
            >
              Secondary Color Sample
            </div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded-md font-medium transition-colors"
                style={{
                  backgroundColor: data.customization.primaryColor,
                  color: 'white'
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-md font-medium border-2 transition-colors"
                style={{
                  borderColor: data.customization.secondaryColor,
                  color: data.customization.secondaryColor
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
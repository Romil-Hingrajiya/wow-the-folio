'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { TEMPLATES } from '@/utils/templateProcessor';

interface TemplateSelectionStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function TemplateSelectionStep({ data, onDataChange }: TemplateSelectionStepProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(data.customization.template);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onDataChange({
      ...data,
      customization: {
        ...data.customization,
        template: templateId as 'template1' | 'template2'
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Template</h2>
        <p className="text-gray-400">Select a template that best represents your style and personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 bg-gray-700 hover:border-gray-500'
            }`}
          >
            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Template Preview */}
            <div className="w-full h-48 rounded-t-lg overflow-hidden relative">
              {template.id === 'template1' ? (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold">D</span>
                    </div>
                    <div className="text-lg font-bold mb-1">Dark Theme</div>
                    <div className="text-sm opacity-90">Professional & Modern</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <div className="text-gray-900 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">L</span>
                    </div>
                    <div className="text-lg font-bold mb-1">Light Theme</div>
                    <div className="text-sm opacity-90">Clean & Elegant</div>
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{template.description}</p>
              
              {/* Template Features */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Responsive Design
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Modern Layout
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Customizable Fonts and Colors
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="text-center text-gray-400 text-sm">
        <p>Don't worry! You can customize colors, fonts, and other styling options in the next step.</p>
      </div>
    </div>
  );
} 
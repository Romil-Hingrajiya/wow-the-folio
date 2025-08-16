'use client';

import { useState, useRef } from 'react';
import { PortfolioData } from '@/types/portfolio';
import BasicInfoStep from './form-steps/BasicInfoStep';
import EducationSkillsStep from './form-steps/EducationSkillsStep';
import ProjectsStep from './form-steps/ProjectsStep';
import WorkExperienceStep from './form-steps/WorkExperienceStep';
import ContactStep from './form-steps/ContactStep';
import TemplateSelectionStep from './form-steps/TemplateSelectionStep';
import CustomizationStep from './form-steps/CustomizationStep';
import LivePreview from './LivePreview';

interface MultiStepFormProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

const STEPS = [
  { id: 1, title: 'Basic Info', component: BasicInfoStep },
  { id: 2, title: 'Education & Skills', component: EducationSkillsStep },
  { id: 3, title: 'Projects', component: ProjectsStep },
  { id: 4, title: 'Work Experience', component: WorkExperienceStep },
  { id: 5, title: 'Contact', component: ContactStep },
  { id: 6, title: 'Template', component: TemplateSelectionStep },
  { id: 7, title: 'Customization', component: CustomizationStep },
];

export default function MultiStepForm({ data, onDataChange }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);


  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      // For BasicInfoStep, validate all required fields
      const requiredFields = ['fullName', 'title', 'tagline', 'aboutMe', 'address'];
      const isValid = requiredFields.every(field => 
        data[field as keyof PortfolioData] && 
        (data[field as keyof PortfolioData] as string).trim().length > 0
      );
      
      if (!isValid) {
        // Don't proceed if validation fails
        return;
      }
    }
    
    if (currentStep < STEPS.length + 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = currentStep <= STEPS.length ? STEPS[currentStep - 1].component : null;

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        {/* Unified Progress Indicator - Works on All Devices */}
        <div className="flex items-center justify-between mb-4">
          {/* Previous Step Button - Left Edge */}
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`p-2 rounded-full transition-colors ${
              currentStep === 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Current Step Display - Center */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
              {currentStep}
            </div>
            <div className="text-center">
              <div className="text-white font-semibold text-lg">
                {currentStep <= STEPS.length ? STEPS[currentStep - 1].title : 'Preview'}
              </div>
              <div className="text-gray-400 text-sm">
                Step {currentStep} of {STEPS.length + 1}
              </div>
            </div>
          </div>

          {/* Next Step Button - Right Edge */}
          <button
            onClick={handleNext}
            disabled={currentStep >= STEPS.length + 1}
            className={`p-2 rounded-full transition-colors ${
              currentStep >= STEPS.length + 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length + 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === STEPS.length + 1 ? (
          <LivePreview data={data} />
        ) : CurrentStepComponent ? (
          <CurrentStepComponent 

            data={data} 
            onDataChange={onDataChange} 
          />
        ) : null}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          Back
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {currentStep < STEPS.length + 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
              >
                Start Over
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Customization
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
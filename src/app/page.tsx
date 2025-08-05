'use client';

import { useState, useEffect } from 'react';
import MultiStepForm from '@/components/MultiStepForm';
import { PortfolioData } from '@/types/portfolio';
import { storage } from '@/utils/storage';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    // Load data from localStorage on component mount
    const saved = storage.loadPortfolioData();
    if (saved) {
      return saved;
    }
    
    // Return default data if no saved data exists
    return {
      fullName: '',
      title: '',
      tagline: '',
      profilePicture: '',
      aboutMe: '',
      resume: '',
      address: '',
      education: [
        {
          id: '1',
          institution: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          grade: ''
        }
      ],
      skills: [],
      workExperience: [],
      projects: [
        { 
          id: '1',
          title: '', 
          shortDescription: '',
          fullDescription: '',
          technologies: '',
          projectType: '',
          liveDemoLink: '',
          githubLink: '',
          projectImages: '',
          role: '',
          date: '',
          teamSize: '',
          usecases: '',
          isPriority: false
        }
      ],
      contact: {
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        dribbble: '',
        behance: '',
        blog: '',
        media: '',
        whatsapp: '',
        telegram: ''
      },
      customization: {
        template: 'template1',
        font: 'Inter',
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af',
        theme: 'dark'
      }
    };
  });

  // Save data to localStorage whenever portfolioData changes
  useEffect(() => {
    storage.savePortfolioData(portfolioData);
  }, [portfolioData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img 
            src="/logo.png" 
            alt="Portfolio Generator Logo" 
            className="h-28 w-auto"
          />
        </div>
        
        <div className="w-full max-w-7xl mx-auto">
          <MultiStepForm 
            data={portfolioData} 
            onDataChange={setPortfolioData} 
          />
        </div>
      </div>
    </div>
  );
}

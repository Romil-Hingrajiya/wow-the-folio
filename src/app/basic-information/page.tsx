'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/types/portfolio';
import BasicInfoStep from '@/components/form-steps/BasicInfoStep';
import { storage } from '@/utils/storage';
import Link from 'next/link';

export default function BasicInformationPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const saved = storage.loadPortfolioData();
    if (saved) {
      setPortfolioData(saved);
    }
  }, []);

  const handleUpdate = (updatedData: Partial<PortfolioData>) => {
    if (portfolioData) {
      const newData = { ...portfolioData, ...updatedData };
      setPortfolioData(newData);
      storage.savePortfolioData(newData);
    }
  };

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                ← Back to Builder
              </Link>
              <h1 className="text-xl font-bold text-white">Basic Information</h1>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/education-skills" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Next: Education & Skills →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <BasicInfoStep 
            data={portfolioData} 
            onUpdate={handleUpdate}
            onNext={() => window.location.href = '/education-skills'}
          />
        </div>
      </div>
    </div>
  );
} 
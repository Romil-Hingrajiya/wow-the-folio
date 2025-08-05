'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/types/portfolio';
import Template1 from '@/templates/template1';
import { storage } from '@/utils/storage';
import Link from 'next/link';

export default function Template1Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const saved = storage.loadPortfolioData();
    if (saved) {
      setPortfolioData(saved);
    }
  }, []);

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
      <nav className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                ← Back to Builder
              </Link>
              <h1 className="text-xl font-bold text-white">Template 1 - Direct Edit</h1>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/basic-information" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Basic Info
              </Link>
              <Link 
                href="/education-skills" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Education
              </Link>
              <Link 
                href="/projects" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Projects
              </Link>
              <Link 
                href="/work-experience" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Experience
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Template Content */}
      <div className="pt-20">
        <Template1 data={portfolioData} />
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { SEOKeyword } from '@/utils/seoKeywords';

interface SEOStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function SEOStep({ data }: SEOStepProps) {
  const [seoKeywords, setSeoKeywords] = useState<SEOKeyword[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newKeywordCategory, setNewKeywordCategory] = useState<SEOKeyword['category']>('primary');
  const [newKeywordRelevance, setNewKeywordRelevance] = useState<SEOKeyword['relevance']>('high');

  const addKeyword = () => {
    if (newKeyword.trim()) {
      const keyword: SEOKeyword = {
        keyword: newKeyword.trim(),
        category: newKeywordCategory,
        relevance: newKeywordRelevance,
        description: `SEO keyword for ${data.fullName || 'portfolio'}`
      };
      setSeoKeywords([...seoKeywords, keyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setSeoKeywords(seoKeywords.filter((_, i) => i !== index));
  };



  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">SEO Optimization</h2>
        <p className="text-gray-400">Optimize your portfolio for search engines</p>
      </div>

      <div className="space-y-6">
        {/* SEO Keywords Management */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Keywords</h3>
          
          {/* Add New Keyword */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Keyword
                </label>
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                  placeholder="e.g., web developer, React expert"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newKeywordCategory}
                  onChange={(e) => setNewKeywordCategory(e.target.value as SEOKeyword['category'])}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="long-tail">Long Tail</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relevance
                </label>
                <select
                  value={newKeywordRelevance}
                  onChange={(e) => setNewKeywordRelevance(e.target.value as SEOKeyword['relevance'])}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <button
              onClick={addKeyword}
              disabled={!newKeyword.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Keyword
            </button>
          </div>

          {/* Keywords List */}
          {seoKeywords.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-md font-medium text-gray-300">Added Keywords</h4>
              <div className="space-y-2">
                {seoKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-white font-medium">{keyword.keyword}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        keyword.category === 'primary' ? 'bg-blue-500 text-white' :
                        keyword.category === 'secondary' ? 'bg-green-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {keyword.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        keyword.relevance === 'high' ? 'bg-red-500 text-white' :
                        keyword.relevance === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-gray-500 text-white'
                      }`}>
                        {keyword.relevance}
                      </span>
                    </div>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEO Preview */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Preview</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Page Title
              </label>
              <div className="p-3 bg-gray-600 rounded-lg text-white text-sm">
                {data.fullName ? `${data.fullName} - ${data.title || 'Portfolio'}` : 'Portfolio Generator'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meta Description
              </label>
              <div className="p-3 bg-gray-600 rounded-lg text-white text-sm">
                {data.aboutMe ? 
                  `${data.fullName || 'Professional'} - ${data.title || 'Portfolio'}. ${data.aboutMe.substring(0, 120)}...` :
                  'Professional portfolio showcasing skills, projects, and experience.'
                }
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keywords
              </label>
              <div className="p-3 bg-gray-600 rounded-lg text-white text-sm">
                {seoKeywords.length > 0 ? 
                  seoKeywords.map(k => k.keyword).join(', ') :
                  'portfolio, professional, skills, projects'
                }
              </div>
            </div>
          </div>
        </div>

        {/* SEO Tips */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Tips</h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Use relevant keywords that describe your skills and expertise</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Include location-based keywords if you&apos;re targeting local opportunities</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Use long-tail keywords for better targeting and less competition</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Keep your meta description under 160 characters for optimal display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';


import { PortfolioData } from '@/types/portfolio';

interface ContactStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function ContactStep({ data, onDataChange }: ContactStepProps) {
  const updateContact = (field: keyof PortfolioData['contact'], value: string) => {
    onDataChange({
      ...data,
      contact: {
        ...data.contact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
        <p className="text-gray-400">These details are optional but better for profile reviews and connections</p>
      </div>
      
      <div className="space-y-8">
        {/* Essential Contact */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Essential Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
          </label>
          <input
            type="email"
            value={data.contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.contact.phone}
            onChange={(e) => updateContact('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
            placeholder="+1 (555) 123-4567"
          />
            </div>
          </div>
        </div>

        {/* Professional Networks */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Professional Networks</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub *
          </label>
          <input
            type="url"
            value={data.contact.github}
            onChange={(e) => updateContact('github', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
            placeholder="https://github.com/username"
                required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn *
          </label>
          <input
            type="url"
            value={data.contact.linkedin}
            onChange={(e) => updateContact('linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
            placeholder="https://linkedin.com/in/username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter / X
              </label>
              <input
                type="url"
                value={data.contact.twitter}
                onChange={(e) => updateContact('twitter', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Personal Website
              </label>
              <input
                type="url"
                value={data.contact.website}
                onChange={(e) => updateContact('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Design Portfolio */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Design Portfolio</h3>
            <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">For Designers</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dribbble
              </label>
              <input
                type="url"
                value={data.contact.dribbble}
                onChange={(e) => updateContact('dribbble', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://dribbble.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Behance
              </label>
              <input
                type="url"
                value={data.contact.behance}
                onChange={(e) => updateContact('behance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://behance.net/username"
              />
            </div>
          </div>
        </div>

        {/* Content & Media */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Content & Media</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Medium / Dev.to / Blog
              </label>
              <input
                type="url"
                value={data.contact.blog}
                onChange={(e) => updateContact('blog', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://medium.com/@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                YouTube / Twitch / Other Media
              </label>
              <input
                type="url"
                value={data.contact.media}
                onChange={(e) => updateContact('media', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://youtube.com/@username"
              />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Messaging</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                WhatsApp
              </label>
              <input
                type="url"
                value={data.contact.whatsapp}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://wa.me/1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telegram
              </label>
              <input
                type="url"
                value={data.contact.telegram}
                onChange={(e) => updateContact('telegram', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                placeholder="https://t.me/username"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
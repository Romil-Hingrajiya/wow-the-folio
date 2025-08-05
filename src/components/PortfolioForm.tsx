'use client';

import { PortfolioData, Project } from '@/types/portfolio';

interface PortfolioFormProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function PortfolioForm({ data, onDataChange }: PortfolioFormProps) {
  const updateField = (field: keyof PortfolioData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const updateContact = (field: keyof PortfolioData['contact'], value: string) => {
    onDataChange({
      ...data,
      contact: { ...data.contact, [field]: value }
    });
  };

  const updateCustomization = (field: keyof PortfolioData['customization'], value: string) => {
    onDataChange({
      ...data,
      customization: { ...data.customization, [field]: value }
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onDataChange({ ...data, projects: updatedProjects });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Information</h2>
      
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title / Role
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            About Me
          </label>
          <textarea
            value={data.aboutMe}
            onChange={(e) => updateField('aboutMe', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            value={data.skills}
            onChange={(e) => updateField('skills', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="React, TypeScript, Node.js"
          />
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Projects</h3>
        
        {data.projects.map((project, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Project {index + 1}</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Project Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Project description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Link
              </label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Contact Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={data.contact.github}
            onChange={(e) => updateContact('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={data.contact.linkedin}
            onChange={(e) => updateContact('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      {/* Customization */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Template
            </label>
            <select
              value={data.customization.template}
              onChange={(e) => updateCustomization('template', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="A">Template A</option>
              <option value="B">Template B</option>
              <option value="C">Template C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font
            </label>
            <select
              value={data.customization.font}
              onChange={(e) => updateCustomization('font', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Space Grotesk">Space Grotesk</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={data.customization.primaryColor}
              onChange={(e) => updateCustomization('primaryColor', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              value={data.customization.secondaryColor}
              onChange={(e) => updateCustomization('secondaryColor', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="light"
                checked={data.customization.theme === 'light'}
                onChange={(e) => updateCustomization('theme', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Light</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dark"
                checked={data.customization.theme === 'dark'}
                onChange={(e) => updateCustomization('theme', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useRef } from 'react';
import { PortfolioData, Project } from '@/types/portfolio';

interface ProjectsStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function ProjectsStep({ data, onDataChange }: ProjectsStepProps) {
  const [newTechnology, setNewTechnology] = useState('');

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const updateProject = (index: number, field: keyof Project, value: string | boolean) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onDataChange({ ...data, projects: updatedProjects });
  };

  const addProject = () => {
    const newProject: Project = { 
      id: Date.now().toString(),
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
    };
    onDataChange({ ...data, projects: [...data.projects, newProject] });
  };

  const removeProject = (index: number) => {
    if (data.projects.length > 1) {
      const updatedProjects = data.projects.filter((_, i) => i !== index);
      onDataChange({ ...data, projects: updatedProjects });
    }
  };

  const addTechnology = (index: number) => {
    if (newTechnology.trim()) {
      const currentTechs = data.projects[index].technologies;
      const updatedTechs = currentTechs ? `${currentTechs}, ${newTechnology.trim()}` : newTechnology.trim();
      updateProject(index, 'technologies', updatedTechs);
      setNewTechnology('');
    }
  };

  const removeTechnology = (index: number, techToRemove: string) => {
    const currentTechs = data.projects[index].technologies;
    const techArray = currentTechs.split(',').map(tech => tech.trim()).filter(tech => tech !== techToRemove);
    updateProject(index, 'technologies', techArray.join(', '));
  };

  const handleImageUpload = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Update the project with the uploaded image
        const projectIndex = data.projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          const currentImages = data.projects[projectIndex].projectImages;
          const newImages = currentImages ? `${currentImages}, ${result}` : result;
          updateProject(projectIndex, 'projectImages', newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (projectId: string, imageToRemove: string) => {
    const projectIndex = data.projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      const currentImages = data.projects[projectIndex].projectImages;
      const imageArray = currentImages.split(',').map(img => img.trim()).filter(img => img !== imageToRemove);
      updateProject(projectIndex, 'projectImages', imageArray.join(', '));
      

    }
  };

  const projectTypes = [
    'Web Application',
    'Mobile Application', 
    'API/Backend',
    'Desktop Application',
    'Design/UI/UX',
    'Data Science/AI',
    'Game Development',
    'DevOps/Infrastructure',
    'Blockchain/Crypto',
    'IoT/Hardware',
    'Other'
  ];

  const teamSizes = [
    'Solo Project',
    '2-3 People',
    '4-5 People', 
    '6-10 People',
    '10+ People'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
        <p className="text-gray-400">Showcase your best work and achievements</p>
      </div>
      
      <div className="space-y-6">
        {data.projects.map((project, index) => (
          <div key={project.id} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
            {/* Project Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
              </div>
              {data.projects.length > 1 && (
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Essential Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type *
                  </label>
                  <select
                    value={project.projectType}
                    onChange={(e) => updateProject(index, 'projectType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
                    required
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    value={project.shortDescription}
                    onChange={(e) => updateProject(index, 'shortDescription', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                    placeholder="Brief overview of the project (max 100 characters)"
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Description
                </label>
                <textarea
                    value={project.fullDescription}
                    onChange={(e) => updateProject(index, 'fullDescription', e.target.value)}
                    rows={4}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400 resize-none"
                    placeholder="Detailed description of features, challenges, solutions, and outcomes..."
                />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies Used
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology(index)}
                      className="flex-1 px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                      placeholder="Add technology (e.g., React, Node.js)"
                    />
                    <button
                      onClick={() => addTechnology(index)}
                      disabled={!newTechnology.trim()}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech, techIndex) => (
                        tech.trim() && (
                          <div key={techIndex} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                            <span>{tech.trim()}</span>
                            <button
                              onClick={() => removeTechnology(index, tech.trim())}
                              className="text-blue-200 hover:text-white"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Role *
                  </label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => updateProject(index, 'role', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                    placeholder="e.g., Full Stack Developer, UI Designer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date/Duration
                  </label>
                  <input
                    type="text"
                    value={project.date}
                    onChange={(e) => updateProject(index, 'date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                    placeholder="e.g., Jan 2023 - Mar 2023, 3 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Size
                  </label>
                  <select
                    value={project.teamSize}
                    onChange={(e) => updateProject(index, 'teamSize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
                  >
                    <option value="">Select Team Size</option>
                    {teamSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={project.liveDemoLink}
                    onChange={(e) => updateProject(index, 'liveDemoLink', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                    placeholder="https://project-demo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub/Repository Link
                </label>
                <input
                  type="url"
                    value={project.githubLink}
                    onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              {/* Project Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Images/Videos
                </label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      ref={(el) => { fileInputRefs.current[project.id] = el; }}
                      onChange={(e) => handleImageUpload(project.id, e)}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[project.id]?.click()}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-500 rounded-lg text-gray-300 hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Project Image
                    </button>
                    <p className="text-xs text-gray-400 mt-1">Supported: JPEG, PNG, GIF (max 5MB)</p>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Or Add Image/Video URLs
                    </label>
                    <textarea
                      value={project.projectImages}
                      onChange={(e) => updateProject(index, 'projectImages', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400 resize-none"
                      placeholder="Enter image/video URLs separated by commas (e.g., https://example.com/screenshot1.jpg, https://example.com/demo.mp4)"
                    />
                  </div>

                  {/* Image Preview */}
                  {project.projectImages && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Uploaded Images
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {project.projectImages.split(',').map((image, imgIndex) => (
                          image.trim() && (
                            <div key={imgIndex} className="relative group">
                              <img
                                src={image.trim()}
                                alt={`Project ${index + 1} image ${imgIndex + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <button
                                onClick={() => removeImage(project.id, image.trim())}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Use Cases / Problem Solved
                </label>
                <textarea
                  value={project.usecases}
                  onChange={(e) => updateProject(index, 'usecases', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400 resize-none"
                  placeholder="Describe what problems this project solves and its real-world applications..."
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addProject}
          className="w-full py-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Another Project
        </button>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';

interface WorkExperience {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

interface WorkExperienceStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function WorkExperienceStep({ data, onDataChange }: WorkExperienceStepProps) {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(
    data.workExperience || []
  );
  const [newResponsibility, setNewResponsibility] = useState<{ [key: string]: string }>({});
  const [newTechnology, setNewTechnology] = useState<{ [key: string]: string }>({});


  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false,
      location: '',
      responsibilities: [],
      technologies: []
    };
    const updatedExperiences = [...workExperiences, newExperience];
    setWorkExperiences(updatedExperiences);
    onDataChange({ ...data, workExperience: updatedExperiences });
  };

  const removeWorkExperience = (id: string) => {
    const updatedExperiences = workExperiences.filter(exp => exp.id !== id);
    setWorkExperiences(updatedExperiences);
    onDataChange({ ...data, workExperience: updatedExperiences });
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | string[] | boolean) => {
    const updatedExperiences = workExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setWorkExperiences(updatedExperiences);
    onDataChange({ ...data, workExperience: updatedExperiences });
  };

  const addResponsibility = (experienceId: string) => {
    const responsibility = newResponsibility[experienceId]?.trim();
    if (responsibility) {
      const experience = workExperiences.find(exp => exp.id === experienceId);
      if (experience) {
        const updatedResponsibilities = [...experience.responsibilities, responsibility];
        updateWorkExperience(experienceId, 'responsibilities', updatedResponsibilities);
        setNewResponsibility(prev => ({ ...prev, [experienceId]: '' }));
      }
    }
  };

  const removeResponsibility = (experienceId: string, responsibilityIndex: number) => {
    const experience = workExperiences.find(exp => exp.id === experienceId);
    if (experience) {
      const updatedResponsibilities = experience.responsibilities.filter((_, index) => index !== responsibilityIndex);
      updateWorkExperience(experienceId, 'responsibilities', updatedResponsibilities);
    }
  };

  const addTechnology = (experienceId: string) => {
    const technology = newTechnology[experienceId]?.trim();
    if (technology) {
      const experience = workExperiences.find(exp => exp.id === experienceId);
      if (experience) {
        const updatedTechnologies = [...experience.technologies, technology];
        updateWorkExperience(experienceId, 'technologies', updatedTechnologies);
        setNewTechnology(prev => ({ ...prev, [experienceId]: '' }));
      }
    }
  };

  const removeTechnology = (experienceId: string, technologyIndex: number) => {
    const experience = workExperiences.find(exp => exp.id === experienceId);
    if (experience) {
      const updatedTechnologies = experience.technologies.filter((_, index) => index !== technologyIndex);
      updateWorkExperience(experienceId, 'technologies', updatedTechnologies);
    }
  };

  const handleCurrentlyWorkingChange = (experienceId: string, isCurrentlyWorking: boolean) => {
    updateWorkExperience(experienceId, 'isCurrentlyWorking', isCurrentlyWorking);
    if (isCurrentlyWorking) {
      updateWorkExperience(experienceId, 'endDate', '');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Work Experience</h2>
        <p className="text-gray-400">Add your professional work experience (Optional)</p>
      </div>

      {workExperiences.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">No Work Experience Added</h3>
          <p className="text-gray-500 mb-6">Add your professional experience to showcase your career journey</p>
          <button
            onClick={addWorkExperience}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition-colors"
          >
            Add Work Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {workExperiences.map((experience, index) => (
            <div key={experience.id} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
              {/* Experience Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Work Experience {index + 1}</h3>
                    <p className="text-sm text-gray-400">Professional role details</p>
                  </div>
                </div>
                <button
                  onClick={() => removeWorkExperience(experience.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Company and Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={experience.companyName}
                      onChange={(e) => updateWorkExperience(experience.id, 'companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                      placeholder="e.g., Google, Microsoft, Apple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role / Title *
                    </label>
                    <input
                      type="text"
                      value={experience.role}
                      onChange={(e) => updateWorkExperience(experience.id, 'role', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                </div>

                {/* Dates and Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date {!experience.isCurrentlyWorking && '*'}
                    </label>
                    <input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        experience.isCurrentlyWorking 
                          ? 'border-gray-500 bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-600 bg-gray-600 text-white'
                      }`}
                      disabled={experience.isCurrentlyWorking}
                      required={!experience.isCurrentlyWorking}
                      placeholder={experience.isCurrentlyWorking ? "Currently working here" : ""}
                    />
                    {experience.isCurrentlyWorking && (
                      <p className="text-xs text-gray-400 mt-1">End date disabled - currently working here</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>

                {/* Currently Working */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={experience.isCurrentlyWorking}
                      onChange={(e) => handleCurrentlyWorkingChange(experience.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-300">Currently Working Here</span>
                  </label>
                </div>

                {/* Responsibilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Responsibilities / Achievements *
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newResponsibility[experience.id] || ''}
                        onChange={(e) => setNewResponsibility(prev => ({ ...prev, [experience.id]: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && addResponsibility(experience.id)}
                        className="flex-1 px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                        placeholder="Add responsibility or achievement"
                      />
                      <button
                        onClick={() => addResponsibility(experience.id)}
                        disabled={!newResponsibility[experience.id]?.trim()}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    {experience.responsibilities.length > 0 && (
                      <div className="space-y-2">
                        {experience.responsibilities.map((responsibility, respIndex) => (
                          <div key={respIndex} className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-white text-sm flex-1">{responsibility}</span>
                            <button
                              onClick={() => removeResponsibility(experience.id, respIndex)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies Used (Optional)
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTechnology[experience.id] || ''}
                        onChange={(e) => setNewTechnology(prev => ({ ...prev, [experience.id]: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && addTechnology(experience.id)}
                        className="flex-1 px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white placeholder-gray-400"
                        placeholder="Add technology (e.g., React, Node.js)"
                      />
                      <button
                        onClick={() => addTechnology(experience.id)}
                        disabled={!newTechnology[experience.id]?.trim()}
                        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((technology, techIndex) => (
                          <div key={techIndex} className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 rounded-full text-white text-sm">
                            <span>{technology}</span>
                            <button
                              onClick={() => removeTechnology(experience.id, techIndex)}
                              className="text-green-200 hover:text-white"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addWorkExperience}
            className="w-full py-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Another Work Experience
          </button>
        </div>
      )}
    </div>
  );
} 
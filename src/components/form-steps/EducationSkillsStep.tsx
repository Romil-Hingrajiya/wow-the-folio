'use client';

import { useState } from 'react';
import { PortfolioData, Education, Skill } from '@/types/portfolio';

interface EducationSkillsStepProps {
  data: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}

export default function EducationSkillsStep({ data, onDataChange }: EducationSkillsStepProps) {
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  // Custom styles for better calendar appearance
  const calendarStyles = `
    input[type="month"]::-webkit-calendar-picker-indicator {
      filter: invert(1) brightness(1.5);
      cursor: pointer;
      opacity: 0.8;
    }
    input[type="month"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }
    input[type="month"]::-moz-calendar-picker-indicator {
      filter: invert(1) brightness(1.5);
      cursor: pointer;
      opacity: 0.8;
    }
    input[type="month"]::-moz-calendar-picker-indicator:hover {
      opacity: 1;
    }
  `;

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
    };
    onDataChange({
      ...data,
      education: [...data.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onDataChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onDataChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id),
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        level: newSkillLevel,
      };
      onDataChange({
        ...data,
        skills: [...data.skills, skill],
      });
      setNewSkill('');
      setNewSkillLevel('Intermediate');
    }
  };

  const removeSkill = (id: string) => {
    onDataChange({
      ...data,
      skills: data.skills.filter(skill => skill.id !== id),
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-500';
      case 'Elementary': return 'bg-orange-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Expert': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSkillLevelWidth = (level: string) => {
    switch (level) {
      case 'Beginner': return 'w-1/5';
      case 'Elementary': return 'w-2/5';
      case 'Intermediate': return 'w-3/5';
      case 'Advanced': return 'w-4/5';
      case 'Expert': return 'w-full';
      default: return 'w-3/5';
    }
  };

  return (
    <div className="space-y-8">
      <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Education & Skills</h2>
        <p className="text-gray-400">Add your educational background and technical skills</p>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Education
          </button>
        </div>

        {data.education.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-gray-400">No education entries yet. Click "Add Education" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.education.map((education, index) => (
              <div key={education.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Education #{index + 1}</h4>
                  <button
                    onClick={() => removeEducation(education.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                        placeholder="University of Technology"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Field of Study *
                      </label>
                      <input
                        type="text"
                        value={education.fieldOfStudy}
                        onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                        placeholder="Computer Science"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={education.startDate}
                        onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-pointer"
                        required
                        style={{
                          colorScheme: 'dark'
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        End Date *
                      </label>
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-pointer"
                        required
                        style={{
                          colorScheme: 'dark'
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Grade / GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={education.grade}
                        onChange={(e) => updateEducation(education.id, 'grade', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                        placeholder="3.8 GPA, First Class, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Skills</h3>
        
        {/* Add Skill Input */}
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                placeholder="e.g., React, Python, UI/UX Design"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Level
              </label>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Elementary">Elementary</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className={`mt-4 px-6 py-2 rounded-md font-medium transition-colors ${
              newSkill.trim()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Skill
          </button>
        </div>

        {/* Skills Display - Tab Look */}
        {data.skills.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-gray-400">No skills added yet. Add your first skill above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Your Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-full border border-gray-600">
                  <span className="text-white text-sm font-medium">{skill.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
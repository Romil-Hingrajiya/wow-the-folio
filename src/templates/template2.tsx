'use client';

import { PortfolioData } from '@/types/portfolio';
import { useEffect } from 'react';

interface Template2Props {
  data: PortfolioData;
}

export default function Template2({ data }: Template2Props) {
  useEffect(() => {
    // Smooth scroll effect
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const formatDateRange = (startDate: string, endDate: string, isCurrentlyWorking: boolean) => {
    const start = formatDate(startDate);
    const end = isCurrentlyWorking ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: data.customization.font }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold" style={{ color: data.customization.primaryColor }}>
              {data.fullName || 'Portfolio'}
            </h1>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
              <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            {data.profilePicture && (
              <img
                src={data.profilePicture}
                alt={data.fullName}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 shadow-lg"
                style={{ borderColor: data.customization.primaryColor }}
              />
            )}
            <h1 className="text-5xl font-bold mb-4 text-gray-900">{data.fullName}</h1>
            <h2 className="text-2xl text-gray-600 mb-6">{data.title}</h2>
            {data.address && (
              <p className="text-gray-500 mb-6">
                📍 {data.address}
              </p>
            )}
            {data.aboutMe && (
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {data.aboutMe}
              </p>
            )}
          </div>
          
          {/* Resume Download */}
          {data.resume && (
            <a
              href={data.resume}
              download="resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          )}
        </div>
      </section>

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section id="experience" className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-8">
              {data.workExperience.map((experience, index) => (
                <div key={experience.id} className="bg-white rounded-lg p-6 border-l-4 shadow-md" style={{ borderLeftColor: data.customization.primaryColor }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{experience.role}</h3>
                      <p className="text-blue-600 font-medium">{experience.companyName}</p>
                      {experience.location && (
                        <p className="text-gray-500 text-sm">📍 {experience.location}</p>
                      )}
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-gray-600">
                        {formatDateRange(experience.startDate, experience.endDate, experience.isCurrentlyWorking)}
                      </p>
                      {experience.isCurrentlyWorking && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                          Currently Working
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                            style={{ backgroundColor: data.customization.secondaryColor + '20' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project, index) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors shadow-md hover:shadow-lg">
                  {project.projectImages && (
                    <div className="h-48 bg-gray-100 relative">
                      <img
                        src={project.projectImages.split(',')[0].trim()}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.shortDescription}</p>
                    
                    {project.projectType && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {project.projectType}
                      </span>
                    )}
                    
                    {project.technologies && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {project.liveDemoLink && (
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Live Demo →
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 text-sm"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section id="education" className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="bg-white rounded-lg p-6 border-l-4 shadow-md" style={{ borderLeftColor: data.customization.primaryColor }}>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{edu.fieldOfStudy}</h3>
                  <p className="text-blue-600 font-medium mb-2">{edu.institution}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </p>
                  {edu.grade && (
                    <p className="text-gray-700">Grade: {edu.grade}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section id="skills" className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill, index) => (
                <div key={skill.id} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <span className="text-sm text-gray-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: data.customization.primaryColor,
                        width: `${skill.level === 'Beginner' ? 20 : skill.level === 'Elementary' ? 40 : skill.level === 'Intermediate' ? 60 : skill.level === 'Advanced' ? 80 : 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.contact.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">{data.contact.email}</span>
              </a>
            )}
            
            {data.contact.phone && (
              <a
                href={`tel:${data.contact.phone}`}
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">{data.contact.phone}</span>
              </a>
            )}
            
            {data.contact.github && (
              <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-gray-700">GitHub</span>
              </a>
            )}
            
            {data.contact.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-gray-700">LinkedIn</span>
              </a>
            )}
            
            {data.contact.twitter && (
              <a
                href={data.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="text-gray-700">Twitter</span>
              </a>
            )}
            
            {data.contact.website && (
              <a
                href={data.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span className="text-gray-700">Website</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 
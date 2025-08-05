'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/types/portfolio';
import Template1 from '@/templates/template1';
import Template2 from '@/templates/template2';
import Link from 'next/link';

interface LivePreviewProps {
  data: PortfolioData;
}

export default function LivePreview({ data }: LivePreviewProps) {
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Add escape key handler for closing expanded view
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const generateSimpleHTML = (portfolioData: PortfolioData): string => {
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

    const isDarkTheme = portfolioData.customization.template === 'template1';
    const bgColor = isDarkTheme ? 'bg-gray-900' : 'bg-white';
    const textColor = isDarkTheme ? 'text-white' : 'text-gray-900';
    const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50';
    const borderColor = isDarkTheme ? 'border-gray-700' : 'border-gray-200';

    // Generate navigation links based on available data
    const navLinks = [];
    navLinks.push('<a href="#about" class="hover:text-blue-400 transition-colors">About</a>');
    if (portfolioData.workExperience && portfolioData.workExperience.length > 0) {
      navLinks.push('<a href="#experience" class="hover:text-blue-400 transition-colors">Experience</a>');
    }
    if (portfolioData.projects && portfolioData.projects.length > 0) {
      navLinks.push('<a href="#projects" class="hover:text-blue-400 transition-colors">Projects</a>');
    }
    if (portfolioData.education && portfolioData.education.length > 0) {
      navLinks.push('<a href="#education" class="hover:text-blue-400 transition-colors">Education</a>');
    }
    if (portfolioData.skills && portfolioData.skills.length > 0) {
      navLinks.push('<a href="#skills" class="hover:text-blue-400 transition-colors">Skills</a>');
    }
    navLinks.push('<a href="#contact" class="hover:text-blue-400 transition-colors">Contact</a>');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${portfolioData.fullName} - Portfolio</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          html { scroll-behavior: smooth; }
          body { font-family: ${portfolioData.customization.font}, sans-serif; }
          @keyframes wave { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .e-card { margin: 0 auto; background: transparent; box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45); position: relative; width: 280px; height: 200px; border-radius: 16px; overflow: hidden; }
          .wave { position: absolute; width: 540px; height: 700px; opacity: 0.6; left: 0; top: 0; margin-left: -50%; margin-top: -70%; background: linear-gradient(744deg,#af40ff,#5b42f3 60%,#00ddeb); }
          .icon { width: 3em; margin-top: -1em; padding-bottom: 1em; }
          .infotop { text-align: center; font-size: 20px; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: rgb(255, 255, 255); font-weight: 600; padding: 1rem; }
          .name { font-size: 14px; font-weight: 100; text-transform: lowercase; max-width: 240px; margin: 0 auto; line-height: 1.4; margin-top: 0.5rem; }
          .wave:nth-child(2), .wave:nth-child(3) { top: 210px; }
          .playing .wave { border-radius: 40%; animation: wave 3000ms infinite linear; }
          .wave { border-radius: 40%; animation: wave 55s infinite linear; }
          .playing .wave:nth-child(2) { animation-duration: 4000ms; }
          .wave:nth-child(2) { animation-duration: 50s; }
          .playing .wave:nth-child(3) { animation-duration: 5000ms; }
          .wave:nth-child(3) { animation-duration: 45s; }
        </style>
      </head>
              <body class="bg-black text-white">
          <!-- LOCKED: Work Experience Section Complete -->
          <!-- 
            ✅ Hero Section - Complete
            ✅ About Section - Complete (Vision & Mission Cards)
            ✅ Work Experience Section - Complete (Glass Blur Cards with Tab Background)
            🔒 LOCKED: No further changes to Hero, About, and Work Experience sections
            📝 TODO: Continue with Projects, Education, Skills, and Contact sections
          -->
                <!-- Glass Blur Navigation -->
        <nav class="fixed top-0 left-0 right-0 w-full z-50">
          <div class="max-w-6xl mx-auto px-6 py-8">
            <div class="bg-gray-900/20 backdrop-blur-md border border-gray-200/20 rounded-2xl px-8 py-6">
              <div class="flex items-center justify-between">
                <!-- Logo and Name -->
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-lg">
                      ${portfolioData.fullName ? portfolioData.fullName.charAt(0).toUpperCase() : 'P'}
                    </span>
                  </div>
                  <h1 class="text-xl font-bold text-white">
                    ${portfolioData.fullName || 'Portfolio'}
              </h1>
            </div>

                <!-- Navigation Links -->
                <div class="hidden md:flex space-x-8">
                  <a href="#hero" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('hero').scrollIntoView({behavior: 'smooth'});">Home</a>
                  <a href="#about" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('about').scrollIntoView({behavior: 'smooth'});">About</a>
                  ${portfolioData.workExperience && portfolioData.workExperience.length > 0 ? `
                    <a href="#experience" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('experience').scrollIntoView({behavior: 'smooth'});">Experience</a>
                  ` : ''}
                  ${portfolioData.projects && portfolioData.projects.length > 0 ? `
                    <a href="#projects" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('projects').scrollIntoView({behavior: 'smooth'});">Projects</a>
                  ` : ''}
                  ${portfolioData.education && portfolioData.education.length > 0 ? `
                    <a href="#education" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('education').scrollIntoView({behavior: 'smooth'});">Education</a>
                  ` : ''}
                  ${portfolioData.skills && portfolioData.skills.length > 0 ? `
                    <a href="#skills" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('skills').scrollIntoView({behavior: 'smooth'});">Skills</a>
                  ` : ''}
                  <a href="#contact" class="text-white hover:text-blue-400 transition-colors duration-200" onclick="event.preventDefault(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div class="min-h-screen">
          <!-- Modern Hero Section -->
          <section id="hero" class="h-auto lg:h-screen flex items-center relative overflow-hidden py-16 lg:py-0 pt-24 lg:pt-32">
            <!-- Background Image -->
            <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/template1/hro-bg.png');"></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/60"></div>
            
            <div class="container mx-auto px-6 relative z-10 flex items-center justify-center min-h-full">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
                <!-- Left Content - Text and CTA -->
                <div class="space-y-8">
                  <!-- Welcome Text -->
                  <p class="text-blue-300 text-lg font-medium">
                    Let's make something great together.
                  </p>
                  
                  <!-- Main Headline -->
                  <h1 class="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    <span style="color: ${portfolioData.customization.primaryColor}">
                      ${portfolioData.fullName || 'Portfolio Owner'}
                    </span>
                    here — let me show you what I do.
                  </h1>
                  
                  <!-- Tagline -->
                  ${portfolioData.tagline ? `
                    <p class="text-lg text-blue-300 font-medium max-w-lg">
                      ${portfolioData.tagline}
                    </p>
                  ` : ''}
                  

                  
                  <!-- Action Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4">
                    ${portfolioData.resume ? `
                      <a href="${portfolioData.resume}" download="resume.pdf" 
                         class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Download CV
                      </a>
                    ` : ''}
                    <a href="#projects" 
                       onclick="event.preventDefault(); document.getElementById('projects').scrollIntoView({behavior: 'smooth'});"
                       class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium text-lg group">
                      See my work
                      <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                  
                  <!-- Scroll Indicator -->
                  <div class="flex items-center gap-2 text-gray-400 text-sm pt-8 cursor-pointer hover:text-gray-300 transition-colors" 
                       onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'});">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center animate-bounce">
                      <svg class="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <span>Scroll down</span>
                  </div>
                </div>
                
                <!-- Right Content - Profile Image -->
                <div class="flex justify-center lg:justify-end">
                  <!-- Profile Image Container -->
                  <div class="relative w-96 h-96 lg:w-[28rem] lg:h-[28rem]">
                    <!-- Simple Border -->
                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                      <div class="w-full h-full rounded-full bg-gray-900 p-2">
                        ${portfolioData.profilePicture ? `
                          <img src="${portfolioData.profilePicture}" alt="${portfolioData.fullName}" 
                               class="w-full h-full rounded-full object-cover object-center"
                               style="image-rendering: auto;">
                        ` : `
                          <div class="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                            <svg class="w-32 h-32 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        `}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Scroll to Top Button -->
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" 
                    class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 z-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </section>

          <!-- About Section -->
          <section id="about" class="py-16 px-6 bg-black">
            <div class="max-w-6xl mx-auto">
              <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4" style="color: ${portfolioData.customization.primaryColor}">
                  About Me
                </h2>
                <div class="w-24 h-1 mx-auto rounded-full" style="background-color: ${portfolioData.customization.primaryColor}"></div>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Left Side - About Me Content -->
                <div class="space-y-6">
                  <div>
                    <p class="text-xl text-blue-400 font-medium mb-4">
                      ${portfolioData.title || 'Professional'}
                    </p>
                    ${portfolioData.address ? `
                      <div class="flex items-center text-gray-400 mb-6">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        ${portfolioData.address}
                      </div>
                    ` : ''}
                  </div>
                  
                  <div class="text-gray-300 leading-relaxed">
                    ${portfolioData.aboutMe ? `
                      <ul class="list-disc list-inside space-y-2 text-lg">
                        ${portfolioData.aboutMe.split('.').filter(sentence => sentence.trim()).map((sentence, index) => `
                          <li class="text-gray-300">
                            ${sentence.trim()}.
                          </li>
                        `).join('')}
                      </ul>
                    ` : `
                      <p class="text-lg text-gray-300">
                        I'm a ${portfolioData.title || 'professional'} from ${portfolioData.address || 'the world'}. Currently working on amazing projects and building innovative solutions.
                      </p>
                    `}
                  </div>
                </div>
                
                                  <!-- Right Side - Vision & Mission Cards -->
                  <div class="flex flex-col gap-6 justify-center">
                  <!-- Vision Card -->
                  <div class="e-card playing">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3" style="border: 3px solid ${portfolioData.customization.primaryColor}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6" style="color: ${portfolioData.customization.primaryColor}">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      Vision
                      <br />
                      <div class="name">To chase the wildest ideas, build stuff that matters, and leave behind more inspiration than footprints.</div>
                    </div>
                  </div>
                  
                  <!-- Mission Card -->
                  <div class="e-card playing">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3" style="border: 3px solid ${portfolioData.customization.primaryColor}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6" style="color: ${portfolioData.customization.primaryColor}">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Mission
                      <br />
                      <div class="name">To create innovative solutions that solve real-world problems, while continuously learning and growing as a professional.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Work Experience -->
           ${portfolioData.workExperience && portfolioData.workExperience.length > 0 ? `
             <section id="experience" class="py-16 px-6 bg-black">
               <div class="max-w-6xl mx-auto">
                 <h2 class="text-3xl font-bold text-center mb-4" style="color: ${portfolioData.customization.primaryColor}">
                   Work Experience
                </h2>
                 <div class="w-24 h-1 mx-auto rounded-full mb-12" style="background-color: ${portfolioData.customization.primaryColor}"></div>
                 <div class="space-y-8">
                   ${portfolioData.workExperience.map(experience => `
                     <div class="relative">
                       <!-- Tab Background -->
                       <div class="absolute inset-0 rounded-2xl" style="background: linear-gradient(135deg, ${portfolioData.customization.primaryColor}25, ${portfolioData.customization.primaryColor}15, rgba(0,0,0,0.9)); transform: translateY(4px); filter: blur(8px); opacity: 0.7;"></div>
                       
                       <!-- Main Card -->
                       <div class="relative rounded-2xl p-8 border border-gray-700/50 shadow-md backdrop-blur-md" 
                            style="border-left-color: ${portfolioData.customization.primaryColor}; border-left-width: 6px; background: linear-gradient(135deg, ${portfolioData.customization.primaryColor}15, ${portfolioData.customization.primaryColor}08, rgba(0,0,0,0.8)); box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${portfolioData.customization.primaryColor}20;">
                       <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                         <div>
                           <h3 class="text-xl font-semibold">${experience.role}</h3>
                           <p class="${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}">${experience.companyName}</p>
                           ${experience.location ? `<p class="${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} text-sm">📍 ${experience.location}</p>` : ''}
                         </div>
                         <div class="text-right mt-2 md:mt-0">
                           <p class="${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}">
                             ${formatDateRange(experience.startDate, experience.endDate, experience.isCurrentlyWorking)}
                           </p>
                           ${experience.isCurrentlyWorking ? `
                             <span class="inline-block ${isDarkTheme ? 'bg-green-600' : 'bg-green-100'} ${isDarkTheme ? 'text-white' : 'text-green-800'} text-xs px-2 py-1 rounded-full mt-1">
                               Currently Working
                             </span>
                           ` : ''}
                         </div>
                       </div>
                       ${experience.responsibilities && experience.responsibilities.length > 0 ? `
                         <div class="mb-4">
                           <h4 class="font-semibold mb-2">Key Responsibilities & Achievements:</h4>
                           <ul class="list-disc list-inside space-y-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}">
                             ${experience.responsibilities.map(responsibility => `<li class="text-sm leading-relaxed">${responsibility}</li>`).join('')}
                           </ul>
                         </div>
                       ` : ''}
                       ${experience.technologies && experience.technologies.length > 0 ? `
                         <div>
                           <h4 class="font-semibold mb-2">Technologies Used:</h4>
                           <div class="flex flex-wrap gap-2">
                             ${experience.technologies.map(tech => `
                               <span class="px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105" style="background: linear-gradient(135deg, ${portfolioData.customization.primaryColor}40, ${portfolioData.customization.primaryColor}25, rgba(0,0,0,0.8)); border: 1px solid ${portfolioData.customization.primaryColor}50; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
                                 ${tech}
                               </span>
                             `).join('')}
                           </div>
                         </div>
                       ` : ''}
                     </div>
                     </div>
                   `).join('')}
                 </div>
               </div>
             </section>
           ` : ''}

           <!-- Projects -->
           ${portfolioData.projects && portfolioData.projects.length > 0 ? `
             <section id="projects" class="py-16 px-6 bg-black">
               <div class="max-w-7xl mx-auto">
                 <div class="text-center mb-12 slide-up">
                   <h2 class="text-4xl font-bold mb-4 text-white">
                     PROJECTS
                   </h2>
                 </div>
                 
                 <!-- Project Slider -->
                 <div class="relative">
                   <!-- Navigation Arrows -->
                   ${portfolioData.projects.length > 1 ? `
                     <button
                       onclick="
                         const slider = document.getElementById('project-slider');
                         if (slider) {
                           const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
                           const newIndex = currentIndex === 0 ? ${portfolioData.projects.length} - 1 : currentIndex - 1;
                           slider.setAttribute('data-current', newIndex.toString());
                           slider.style.transform = 'translateX(-' + (newIndex * 100) + '%)';
                           updateProjectDots(newIndex);
                         }
                       "
                       class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-gray-600/50"
                     >
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                       </svg>
                     </button>
                     <button
                       onclick="
                         const slider = document.getElementById('project-slider');
                         if (slider) {
                           const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
                           const newIndex = currentIndex === ${portfolioData.projects.length} - 1 ? 0 : currentIndex + 1;
                           slider.setAttribute('data-current', newIndex.toString());
                           slider.style.transform = 'translateX(-' + (newIndex * 100) + '%)';
                           updateProjectDots(newIndex);
                         }
                       "
                       class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-gray-600/50"
                     >
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                       </svg>
                     </button>
                   ` : ''}
                   
                   <!-- Slider Container -->
                   <div class="overflow-hidden rounded-2xl">
                     <div 
                       id="project-slider"
                       class="flex transition-transform duration-500 ease-in-out"
                       style="width: ${portfolioData.projects.length * 100}%"
                       data-current="0"
                     >
                       ${portfolioData.projects.map((project, index) => `
                         <div class="w-full flex-shrink-0">
                           <div class="max-w-5xl mx-auto">
                             <div class="bg-white rounded-2xl overflow-hidden shadow-lg relative">
                               <!-- Gradient Background with Glow Animation -->
                               <div 
                                 class="absolute inset-0 rounded-2xl opacity-20"
                                 style="background: linear-gradient(135deg, ${portfolioData.customization.secondaryColor}20, ${portfolioData.customization.secondaryColor}10, ${portfolioData.customization.secondaryColor}30, ${portfolioData.customization.secondaryColor}15); animation: glowPulse 3s ease-in-out infinite;"
                               ></div>
                               <!-- Content Container -->
                               <div class="relative z-10">
                               <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                                 <!-- Left Side - Project Image -->
                                 <div class="relative overflow-hidden">
                                   ${project.projectImages && project.projectImages.trim() ? `
                                     <img
                                       src="${project.projectImages}"
                                       alt="${project.title}"
                                       class="w-full h-full object-cover"
                                       onerror="console.log('Image failed to load:', '${project.projectImages}'); this.style.display='none'"
                                     />
                                   ` : `
                                     <img
                                       src="https://picsum.photos/700/500?random=${index + 23}"
                                       alt="${project.title}"
                                       class="w-full h-full object-cover"
                                       onerror="console.log('Picsum image failed to load'); this.style.display='none'"
                                     />
                                   `}
                                 </div>
                                 
                                 <!-- Right Side - Project Content -->
                                 <div class="p-8 lg:p-12 flex flex-col justify-center bg-white">
                                   <div class="space-y-6">
                                                                          <!-- Title and Subtitle -->
                                     <div>
                                       <h3 class="text-2xl lg:text-3xl font-bold text-black mb-3">
                                         ${project.title || 'Project Title'}
                                       </h3>
                                       <p class="text-lg text-black font-semibold">
                                         ${project.shortDescription || 'Project short description goes here'}
                                       </p>
                                     </div>
                                     
                                     <!-- Full Description -->
                                     <p class="text-gray-700 text-base leading-relaxed">
                                       ${project.fullDescription || 'This is a detailed description of the project. It explains what the project does, how it works, and what technologies were used. The project demonstrates various skills and capabilities.'}
                                     </p>
                                     
                                     <!-- Project Details Grid -->
                                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                       <div class="flex items-center">
                                         <span class="text-gray-500 mr-2">👤</span>
                                         <span class="text-gray-700">${project.role || 'Developer'}</span>
                                       </div>
                                       <div class="flex items-center">
                                         <span class="text-gray-500 mr-2">📅</span>
                                         <span class="text-gray-700">${project.date || '2024'}</span>
                                       </div>
                                       <div class="flex items-center">
                                         <span class="text-gray-500 mr-2">👥</span>
                                         <span class="text-gray-700">${project.teamSize || 'Solo Project'}</span>
                                       </div>
                                     </div>
                                     
                                     <!-- Use Cases -->
                                     <div>
                                       <h4 class="font-semibold text-black mb-2">Use Cases:</h4>
                                       <p class="text-gray-700 text-sm leading-relaxed">
                                         ${project.usecases || 'This project can be used for various purposes including demonstration of skills, portfolio showcase, and real-world applications.'}
                                       </p>
                                     </div>
                                     
                                     <!-- Technologies -->
                                     <div>
                                       <h4 class="font-semibold text-black mb-3">Technologies Used:</h4>
                                       <div class="flex flex-wrap gap-2">
                                         ${project.technologies ? project.technologies.split(',').map((tech, idx) => `
                                           <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">
                                             ${tech.trim()}
                                           </span>
                                         `).join('') : `
                                           <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">React</span>
                                           <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">TypeScript</span>
                                           <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">Tailwind CSS</span>
                                         `}
                                       </div>
                                     </div>
                                     
                                     <!-- Action Buttons -->
                                     <div class="flex flex-wrap gap-4 pt-4">
                                       <a
                                         href="${project.liveDemoLink || '#'}"
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         class="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                       >
                                         Live Demo
                                       </a>
                                       <a
                                         href="${project.githubLink || '#'}"
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         class="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
                                       >
                                         <span>Preview</span>
                                         <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                         </svg>
                                       </a>
                                                                            </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                               </div>
                             </div>
                           </div>
                         `).join('')}
                     </div>
                   </div>
                   
                   <!-- Dots Navigation -->
                   ${portfolioData.projects.length > 1 ? `
                     <div class="flex justify-center mt-8 space-x-3">
                       ${portfolioData.projects.map((_, index) => `
                         <button
                           onclick="
                             const slider = document.getElementById('project-slider');
                             if (slider) {
                               slider.setAttribute('data-current', '${index}');
                               slider.style.transform = 'translateX(-${index * 100}%)';
                               updateProjectDots(${index});
                             }
                           "
                           class="w-3 h-3 rounded-full transition-all duration-300 project-dot"
                           style="background-color: ${index === 0 ? '#8b5cf6' : 'rgba(156, 163, 175, 0.3)'}"
                         ></button>
                       `).join('')}
                     </div>
                   ` : ''}
                 </div>
               </div>
             </section>
             
             <style>
               @keyframes glowPulse {
                 0%, 100% {
                   opacity: 0.2;
                   transform: scale(1);
                 }
                 50% {
                   opacity: 0.4;
                   transform: scale(1.02);
                 }
               }
             </style>
             <script>
               // Project slider dots function
               function updateProjectDots(activeIndex) {
                 const dots = document.querySelectorAll('.project-dot');
                 dots.forEach((dot, index) => {
                   if (index === activeIndex) {
                     dot.style.backgroundColor = '#8b5cf6';
                   } else {
                     dot.style.backgroundColor = 'rgba(156, 163, 175, 0.3)';
                   }
                 });
               }
               
               // Auto-play for project slider
               if (${portfolioData.projects.length} > 1) {
                 setInterval(() => {
                   const slider = document.getElementById('project-slider');
                   if (slider) {
                     const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
                     const newIndex = currentIndex === ${portfolioData.projects.length} - 1 ? 0 : currentIndex + 1;
                     slider.setAttribute('data-current', newIndex.toString());
                     slider.style.transform = 'translateX(-' + (newIndex * 100) + '%)';
                     updateProjectDots(newIndex);
                   }
                 }, 5000); // Auto-play every 5 seconds
               }
             </script>
           ` : ''}

           <!-- Education -->
           ${portfolioData.education && portfolioData.education.length > 0 ? `
             <section id="education" class="py-16 px-6 ${cardBg}">
               <div class="max-w-6xl mx-auto">
                 <h2 class="text-3xl font-bold text-center mb-12" style="color: ${portfolioData.customization.primaryColor}">
                   Education
                 </h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   ${portfolioData.education.map(edu => `
                     <div class="${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 border-l-4 shadow-lg" 
                          style="border-left-color: ${portfolioData.customization.primaryColor}">
                       <div class="flex justify-between items-start mb-3">
                         <h3 class="text-xl font-semibold">${edu.fieldOfStudy}</h3>
                         ${edu.grade ? `
                           <span class="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                             ${edu.grade}
                           </span>
                         ` : ''}
                       </div>
                       <p class="${isDarkTheme ? 'text-blue-400' : 'text-blue-600'} mb-3 font-medium">${edu.institution}</p>
                       <div class="flex items-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} text-sm mb-3">
                         <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         ${formatDateRange(edu.startDate, edu.endDate, false)}
                       </div>
                       <div class="${isDarkTheme ? 'bg-gray-600' : 'bg-gray-100'} rounded-lg p-3">
                         <h4 class="font-semibold text-sm mb-1" style="color: ${portfolioData.customization.secondaryColor}">
                           Field of Study
                         </h4>
                         <p class="${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} text-sm">${edu.fieldOfStudy}</p>
                       </div>
                     </div>
                   `).join('')}
                 </div>
               </div>
             </section>
           ` : ''}

           <!-- Skills -->
           ${portfolioData.skills && portfolioData.skills.length > 0 ? `
             <section id="skills" class="py-16 px-6">
               <div class="max-w-6xl mx-auto">
                 <h2 class="text-3xl font-bold text-center mb-12" style="color: ${portfolioData.customization.primaryColor}">
                   Skills & Expertise
                 </h2>
                 
                 <div class="text-center mb-8">
                   <p class="${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-lg">
                     Professional skills and technical expertise
                   </p>
                 </div>
                 
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   ${portfolioData.skills.map(skill => {
                     const getLevelColor = (level: string) => {
                       switch (level) {
                         case 'Beginner': return 'bg-red-500';
                         case 'Elementary': return 'bg-orange-500';
                         case 'Intermediate': return 'bg-yellow-500';
                         case 'Advanced': return 'bg-green-500';
                         case 'Expert': return 'bg-blue-500';
                         default: return 'bg-gray-500';
                       }
                     };
                     
                     const getLevelWidth = (level: string) => {
                       switch (level) {
                         case 'Beginner': return 20;
                         case 'Elementary': return 40;
                         case 'Intermediate': return 60;
                         case 'Advanced': return 80;
                         case 'Expert': return 100;
                         default: return 50;
                       }
                     };
                     
                     return `
                       <div class="${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${borderColor} hover:border-blue-500 transition-colors shadow-lg">
                         <div class="flex justify-between items-center mb-4">
                           <h3 class="font-semibold text-lg">${skill.name}</h3>
                           <span class="text-xs px-2 py-1 rounded-full text-white ${getLevelColor(skill.level)}">
                             ${skill.level}
                           </span>
                         </div>
                         
                         <div class="mb-3">
                           <div class="flex justify-between text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} mb-1">
                             <span>Proficiency</span>
                             <span>${getLevelWidth(skill.level)}%</span>
                           </div>
                           <div class="w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3">
                             <div class="h-3 rounded-full transition-all duration-500 ease-out"
                                  style="background-color: ${portfolioData.customization.primaryColor}; width: ${getLevelWidth(skill.level)}%">
                             </div>
                           </div>
                         </div>
                         
                         <div class="text-center">
                           <div class="inline-flex items-center justify-center w-12 h-12 rounded-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'} mb-2">
                             <span class="text-xl font-bold" style="color: ${portfolioData.customization.primaryColor}">
                               ${skill.name.charAt(0).toUpperCase()}
                             </span>
                           </div>
                         </div>
                       </div>
                     `;
                   }).join('')}
                 </div>
                 
                 <div class="mt-12 text-center">
                   <div class="${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${borderColor}">
                     <h3 class="text-xl font-semibold mb-3" style="color: ${portfolioData.customization.secondaryColor}">
                       Skills Summary
                     </h3>
                     <div class="flex flex-wrap justify-center gap-2">
                       ${portfolioData.skills.map(skill => `
                         <span class="px-3 py-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'} rounded-full text-sm border"
                               style="border-color: ${portfolioData.customization.primaryColor}">
                           ${skill.name} (${skill.level})
                         </span>
                       `).join('')}
                     </div>
                   </div>
                </div>
              </div>
             </section>
           ` : ''}

                     <!-- Contact -->
           <section id="contact" class="py-16 px-6 ${cardBg}">
             <div class="max-w-6xl mx-auto">
               <h2 class="text-3xl font-bold text-center mb-12" style="color: ${portfolioData.customization.primaryColor}">
                 Contact Information
               </h2>
               
               <!-- Essential Contact -->
               <div class="mb-8">
                 <h3 class="text-xl font-semibold mb-4 text-center" style="color: ${portfolioData.customization.secondaryColor}">
                   Essential Contact
                 </h3>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                   ${portfolioData.contact.email ? `
                     <a href="mailto:${portfolioData.contact.email}" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                       <span>${portfolioData.contact.email}</span>
                     </a>
                   ` : ''}
                   ${portfolioData.contact.phone ? `
                     <a href="tel:${portfolioData.contact.phone}" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                       <span>${portfolioData.contact.phone}</span>
                     </a>
                   ` : ''}
                 </div>
               </div>

               <!-- Professional Networks -->
               <div class="mb-8">
                 <h3 class="text-xl font-semibold mb-4 text-center" style="color: ${portfolioData.customization.secondaryColor}">
                   Professional Networks
                 </h3>
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   ${portfolioData.contact.github ? `
                     <a href="${portfolioData.contact.github}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                       </svg>
                       <span>GitHub</span>
                     </a>
                   ` : ''}
                   ${portfolioData.contact.linkedin ? `
                     <a href="${portfolioData.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                       </svg>
                       <span>LinkedIn</span>
                     </a>
                   ` : ''}
                   ${portfolioData.contact.twitter ? `
                     <a href="${portfolioData.contact.twitter}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                       </svg>
                       <span>Twitter</span>
                     </a>
                   ` : ''}
                   ${portfolioData.contact.website ? `
                     <a href="${portfolioData.contact.website}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                       <svg class="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                       </svg>
                       <span>Website</span>
                     </a>
                   ` : ''}
                 </div>
               </div>

               <!-- Additional Contact -->
               ${(portfolioData.contact.dribbble || portfolioData.contact.behance || portfolioData.contact.blog || portfolioData.contact.media || portfolioData.contact.whatsapp || portfolioData.contact.telegram) ? `
                 <div>
                   <h3 class="text-xl font-semibold mb-4 text-center" style="color: ${portfolioData.customization.secondaryColor}">
                     Additional Links
                   </h3>
                   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     ${portfolioData.contact.dribbble ? `
                       <a href="${portfolioData.contact.dribbble}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-pink-400">🎨</span>
                         <span>Dribbble</span>
                       </a>
                     ` : ''}
                     ${portfolioData.contact.behance ? `
                       <a href="${portfolioData.contact.behance}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-blue-400">📐</span>
                         <span>Behance</span>
                       </a>
                     ` : ''}
                     ${portfolioData.contact.blog ? `
                       <a href="${portfolioData.contact.blog}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-green-400">📝</span>
                         <span>Blog</span>
                       </a>
                     ` : ''}
                     ${portfolioData.contact.media ? `
                       <a href="${portfolioData.contact.media}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-red-400">🎥</span>
                         <span>Media</span>
                       </a>
                     ` : ''}
                     ${portfolioData.contact.whatsapp ? `
                       <a href="${portfolioData.contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-green-400">💬</span>
                         <span>WhatsApp</span>
                       </a>
                     ` : ''}
                     ${portfolioData.contact.telegram ? `
                       <a href="${portfolioData.contact.telegram}" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg hover:${isDarkTheme ? 'bg-gray-600' : 'bg-gray-50'} transition-colors">
                         <span class="w-5 h-5 mr-3 text-blue-400">📱</span>
                         <span>Telegram</span>
                       </a>
                     ` : ''}
                   </div>
                 </div>
               ` : ''}
             </div>
           </section>

          <!-- Footer -->
          <footer class="py-8 px-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} border-t ${borderColor}">
            <div class="max-w-6xl mx-auto text-center">
              <p class="${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}">
                © ${new Date().getFullYear()} ${portfolioData.fullName}. All rights reserved.
              </p>
            </div>
          </footer>
          </div>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    try {
      // Generate HTML from React component
      const generateHTMLFromComponent = () => {
        const TemplateComponent = data.customization.template === 'template1' ? Template1 : Template2;
        
        // Create a temporary div to render the component
        const tempDiv = document.createElement('div');
        const root = document.createElement('div');
        tempDiv.appendChild(root);
        
        // For now, we'll use a simple HTML generation approach
        // In a real implementation, you'd use ReactDOMServer.renderToString
        const html = generateSimpleHTML(data);
        return html;
      };
      
      const html = generateHTMLFromComponent();
      setGeneratedHtml(html);
    } catch (error) {
      console.error('Error generating template:', error);
      setGeneratedHtml('<div style="padding: 20px; color: red;">Error generating template</div>');
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.fullName.replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      alert('HTML code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Generating your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Live Preview</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Expand
              </>
            )}
          </button>
        <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
        >
            Copy HTML
        </button>
        <button
            onClick={downloadHtml}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
            Download
        </button>
        </div>
      </div>

      {isExpanded ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl w-full h-full max-w-7xl relative">
            {/* Close button overlay */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              title="Close (ESC)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Full Screen Portfolio Preview</span>
              <div className="w-10"></div> {/* Spacer to balance the layout */}
            </div>
            <iframe
              srcDoc={generatedHtml}
              className="w-full h-full border-0"
              title="Portfolio Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600">Portfolio Preview</span>
          </div>
          
          <div className="h-[600px] overflow-auto">
            <iframe
              srcDoc={generatedHtml}
              className="w-full h-full border-0"
              title="Portfolio Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

    </div>
  );
} 
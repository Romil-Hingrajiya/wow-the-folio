'use client';

import { PortfolioData } from '@/types/portfolio';
import { useEffect } from 'react';

interface Template1Props {
  data: PortfolioData;
}

export default function Template1({ data }: Template1Props) {
  useEffect(() => {
    // Add enhanced CSS with animations and smooth scroll
    const style = document.createElement('style');
    style.textContent = `
      html { 
        scroll-behavior: smooth; 
        scroll-padding-top: 80px;
      }
      body { 
        font-family: ${data.customization.font}, sans-serif; 
      }
      .fade-in {
        animation: fadeIn 0.8s ease-in-out;
      }
      .slide-up {
        animation: slideUp 0.6s ease-out;
      }
      .scale-in {
        animation: scaleIn 0.5s ease-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      @keyframes scaleIn {
        from { 
          opacity: 0; 
          transform: scale(0.9); 
        }
        to { 
          opacity: 1; 
          transform: scale(1); 
        }
      }
      @keyframes wave {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
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
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      .gradient-bg {
        background: linear-gradient(135deg, ${data.customization.primaryColor}20, ${data.customization.secondaryColor}20);
      }
      .e-card {
        margin: 0 auto;
        background: transparent;
        box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
        position: relative;
        width: 280px;
        height: 200px;
        border-radius: 16px;
        overflow: hidden;
      }
      .wave {
        position: absolute;
        width: 540px;
        height: 700px;
        opacity: 0.6;
        left: 0;
        top: 0;
        margin-left: -50%;
        margin-top: -70%;
        background: linear-gradient(744deg,#af40ff,#5b42f3 60%,#00ddeb);
      }
      .icon {
        width: 3em;
        margin-top: -1em;
        padding-bottom: 1em;
      }
      .infotop {
        text-align: center;
        font-size: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
        font-weight: 600;
        padding: 1rem;
      }
      .name {
        font-size: 14px;
        font-weight: 100;
        text-transform: lowercase;
        max-width: 240px;
        margin: 0 auto;
        line-height: 1.4;
        margin-top: 0.5rem;
      }
      .wave:nth-child(2),
      .wave:nth-child(3) {
        top: 210px;
      }
      .playing .wave {
        border-radius: 40%;
        animation: wave 3000ms infinite linear;
      }
      .wave {
        border-radius: 40%;
        animation: wave 55s infinite linear;
      }
      .playing .wave:nth-child(2) {
        animation-duration: 4000ms;
      }
      .wave:nth-child(2) {
        animation-duration: 50s;
      }
      .playing .wave:nth-child(3) {
        animation-duration: 5000ms;
      }
      .wave:nth-child(3) {
        animation-duration: 45s;
      }
    `;
    document.head.appendChild(style);

    // Enhanced smooth scroll effect for navigation links
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

    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });



    // Project slider dots function
    const updateProjectDots = (activeIndex: number) => {
      const dots = document.querySelectorAll('.project-dot');
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          (dot as HTMLElement).style.backgroundColor = '#8b5cf6';
        } else {
          (dot as HTMLElement).style.backgroundColor = 'rgba(156, 163, 175, 0.3)';
        }
      });
    };

    // Make updateProjectDots available globally
    (window as any).updateProjectDots = updateProjectDots;

    // Auto-play for project slider
    let autoPlayInterval: NodeJS.Timeout;
    if (data.projects && data.projects.length > 1) {
      // Initialize slider position
      const slider = document.getElementById('project-slider');
      if (slider) {
        slider.setAttribute('data-current', '0');
        slider.style.transform = 'translateX(0%)';

      }
      
      autoPlayInterval = setInterval(() => {
        const slider = document.getElementById('project-slider');
        if (slider) {
          const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
          const newIndex = currentIndex === data.projects.length - 1 ? 0 : currentIndex + 1;
          slider.setAttribute('data-current', newIndex.toString());
          slider.style.transform = `translateX(-${newIndex * 100}%)`;
          updateProjectDots(newIndex);
        }
      }, 5000); // Auto-play every 5 seconds
    }

    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      document.head.removeChild(style);
      observer.disconnect();
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [data.customization.font, data.customization.primaryColor, data.customization.secondaryColor]);

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
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: data.customization.font }}>
      {/* LOCKED: Work Experience Section Complete */}
      {/* 
        ✅ Hero Section - Complete
        ✅ About Section - Complete (Vision & Mission Cards)
        ✅ Work Experience Section - Complete (Glass Blur Cards with Tab Background)
        🔒 LOCKED: No further changes to Hero, About, and Work Experience sections
        📝 TODO: Continue with Projects, Education, Skills, and Contact sections
      */}
                    {/* Glass Blur Navigation */}
       <nav className="fixed top-0 left-0 right-0 w-full z-50">
         <div className="max-w-6xl mx-auto px-6 py-8">
           <div className="bg-gray-900/20 backdrop-blur-md border border-gray-200/20 rounded-2xl px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Logo and Name */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {data.fullName ? data.fullName.charAt(0).toUpperCase() : 'P'}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white">
                  {data.fullName || 'Portfolio'}
                </h1>
              </div>
              
                             {/* Navigation Links */}
               <div className="hidden md:flex space-x-8">
                             <a href="#hero" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Home
            </a>
            <a href="#about" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              About
            </a>
                 {data.workExperience && data.workExperience.length > 0 && (
                   <a href="#experience" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
                     e.preventDefault();
                     document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                     Experience
                   </a>
                 )}
                 {data.projects && data.projects.length > 0 && (
                   <a href="#projects" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
                     e.preventDefault();
                     document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                     Projects
                   </a>
                 )}
                 {data.education && data.education.length > 0 && (
                   <a href="#education" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
                     e.preventDefault();
                     document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                     Education
                   </a>
                 )}
                 {data.skills && data.skills.length > 0 && (
                   <a href="#skills" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
                     e.preventDefault();
                     document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                     Skills
                   </a>
                 )}
                 <a href="#contact" className="text-white hover:text-blue-400 transition-colors duration-200" onClick={(e) => {
                   e.preventDefault();
                   document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                 }}>
                   Contact
                 </a>
               </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Split Layout Hero Section */}
      <section id="hero" className="h-auto lg:h-screen flex items-center relative overflow-hidden py-16 lg:py-0 pt-24 lg:pt-32">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/template1/hro-bg.png)' }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container mx-auto px-6 relative z-10 flex items-center justify-center min-h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            {/* Left Content - Text and CTA */}
            <div className="space-y-8 slide-up">
              {/* Welcome Text */}
              <p className="text-blue-300 text-lg font-medium">
                Let's make something great together.
              </p>
              
              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span style={{ color: data.customization.primaryColor }}>
                  {data.fullName || 'Portfolio Owner'}
                </span>{' '}
                here — let me show you what I do.
              </h1>
              
                             {/* Tagline */}
               {data.tagline && (
                 <p className="text-lg text-blue-300 font-medium max-w-lg">
                   {data.tagline}
                 </p>
               )}
               

              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {data.resume && (
                  <a
                    href={data.resume}
                    download="resume.pdf"
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Download CV
                  </a>
                )}
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium text-lg group"
                >
                  See my work
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              
              {/* Scroll Indicator */}
              <div 
                className="flex items-center gap-2 text-gray-400 text-sm pt-8 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center animate-bounce">
                  <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <span>Scroll down</span>
              </div>
            </div>
            
            {/* Right Content - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              {/* Profile Image Container */}
              <div className="relative w-96 h-96 lg:w-[28rem] lg:h-[28rem]">
                {/* Simple Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 p-2">
                    {data.profilePicture ? (
                      <img
                        src={data.profilePicture}
                        alt={data.fullName}
                        className="w-full h-full rounded-full object-cover object-center"
                        style={{ imageRendering: 'auto' }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-32 h-32 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 z-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-4xl font-bold mb-4" style={{ color: data.customization.primaryColor }}>
              About Me
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: data.customization.primaryColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - About Me Content */}
            <div className="space-y-6">
              <div>
                <p className="text-xl text-blue-400 font-medium mb-4">
                  {data.title || 'Professional'}
                </p>
                {data.address && (
                  <div className="flex items-center text-gray-400 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {data.address}
                  </div>
                )}
              </div>
              
              <div className="text-gray-300 leading-relaxed">
                {data.aboutMe ? (
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    {data.aboutMe.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                      <li key={index} className="text-gray-300">
                        {sentence.trim()}.
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-300">
                    I'm a {data.title || 'professional'} from {data.address || 'the world'}. Currently working on amazing projects and building innovative solutions.
                  </p>
                )}
              </div>
            </div>
            
            {/* Right Side - Vision & Mission Cards */}
            <div className="flex flex-col gap-6 justify-center">
              {/* Vision Card */}
              <div className="e-card playing">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="infotop">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3" style={{border: `3px solid ${data.customization.primaryColor}`}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6" style={{color: data.customization.primaryColor}}>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Vision
                  <br />
                  <div className="name">To chase the wildest ideas, build stuff that matters, and leave behind more inspiration than footprints.</div>
                </div>
              </div>
              
              {/* Mission Card */}
              <div className="e-card playing">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="infotop">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3" style={{border: `3px solid ${data.customization.primaryColor}`}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6" style={{color: data.customization.primaryColor}}>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Mission
                  <br />
                  <div className="name">To create innovative solutions that solve real-world problems, while continuously learning and growing as a professional.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section id="experience" className="py-16 px-6 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 slide-up">
              <h2 className="text-4xl font-bold mb-4" style={{ color: data.customization.primaryColor }}>
                Work Experience
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: data.customization.primaryColor }}></div>
            </div>
            <div className="space-y-8">
              {data.workExperience.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Tab Background */}
                  <div className="absolute inset-0 rounded-2xl" style={{ 
                    background: `linear-gradient(135deg, ${data.customization.primaryColor}25, ${data.customization.primaryColor}15, rgba(0,0,0,0.9))`,
                    transform: 'translateY(4px)',
                    filter: 'blur(8px)',
                    opacity: 0.7
                  }}></div>
                  
                  {/* Main Card */}
                  <div className="relative rounded-2xl p-8 border border-gray-700/50 hover-lift backdrop-blur-md" style={{ 
                    background: `linear-gradient(135deg, ${data.customization.primaryColor}15, ${data.customization.primaryColor}08, rgba(0,0,0,0.8))`,
                    borderLeftColor: data.customization.primaryColor, 
                    borderLeftWidth: '6px',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${data.customization.primaryColor}20`
                  }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: data.customization.primaryColor }}></div>
                        <h3 className="text-2xl font-bold text-white">{experience.role}</h3>
                      </div>
                      <p className="text-xl text-blue-400 font-medium mb-2">{experience.companyName}</p>
                      {experience.location && (
                        <div className="flex items-center text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {experience.location}
                        </div>
                      )}
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <div className="rounded-lg p-3 backdrop-blur-sm" style={{ 
                        background: `linear-gradient(135deg, ${data.customization.primaryColor}20, rgba(0,0,0,0.6))`,
                        border: `1px solid ${data.customization.primaryColor}30`
                      }}>
                        <p className="text-gray-300 font-medium">
                          {formatDateRange(experience.startDate, experience.endDate, experience.isCurrentlyWorking)}
                        </p>
                        {experience.isCurrentlyWorking && (
                          <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full mt-2 font-medium">
                            Currently Working
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: data.customization.primaryColor }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Responsibilities & Achievements
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: data.customization.primaryColor }}></div>
                            <span className="text-sm leading-relaxed">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: data.customization.primaryColor }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${data.customization.primaryColor}40, ${data.customization.primaryColor}25, rgba(0,0,0,0.8))`,
                              border: `1px solid ${data.customization.primaryColor}50`,
                              boxShadow: `0 2px 8px rgba(0,0,0,0.4)`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="py-16 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 slide-up">
              <h2 className="text-4xl font-bold mb-4 text-white">
                PROJECTS
              </h2>
            </div>
            
            {/* Project Slider */}
            <div className="relative">
              {/* Navigation Arrows */}
              {data.projects.length > 1 && (
                <>
                  <button
                                        onClick={() => {
                      const slider = document.getElementById('project-slider');
                      if (slider) {
                        const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
                        const newIndex = currentIndex === 0 ? data.projects.length - 1 : currentIndex - 1;
                        slider.setAttribute('data-current', newIndex.toString());
                        slider.style.transform = `translateX(-${newIndex * 100}%)`;
                        (window as any).updateProjectDots(newIndex);

                      }
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-gray-600/50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                                                                 onClick={() => {
                        const slider = document.getElementById('project-slider');
                        if (slider) {
                          const currentIndex = parseInt(slider.getAttribute('data-current') || '0');
                          const newIndex = currentIndex === data.projects.length - 1 ? 0 : currentIndex + 1;
                          slider.setAttribute('data-current', newIndex.toString());
                          slider.style.transform = `translateX(-${newIndex * 100}%)`;
                          (window as any).updateProjectDots(newIndex);

                        }
                      }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-gray-600/50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Slider Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  id="project-slider"
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ width: `${data.projects.length * 100}%` }}
                  data-current="0"
                >
                  {data.projects.map((project, index) => (
                    <div key={project.id} className="w-full flex-shrink-0">
                      <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative">
                          {/* Gradient Background with Glow Animation */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-20"
                            style={{
                              background: `linear-gradient(135deg, ${data.customization.secondaryColor}20, ${data.customization.secondaryColor}10, ${data.customization.secondaryColor}30, ${data.customization.secondaryColor}15)`,
                              animation: 'glowPulse 3s ease-in-out infinite'
                            }}
                          ></div>
                          {/* Content Container */}
                          <div className="relative z-10">
                          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                            {/* Left Side - Project Image */}
                            <div className="relative overflow-hidden">
                              {project.projectImages && project.projectImages.trim() ? (
                                <img
                                  src={project.projectImages}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <img
                                  src={`https://picsum.photos/700/500?random=${index + 23}`}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                            </div>
                            
                            {/* Right Side - Project Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                              <div className="space-y-6">
                                {/* Title and Subtitle */}
                                <div>
                                  <h3 className="text-2xl lg:text-3xl font-bold text-black mb-3">
                                    {project.title || 'Project Title'}
                                  </h3>
                                  <p className="text-lg text-black font-semibold">
                                    {project.shortDescription || 'Project short description goes here'}
                                  </p>
                                </div>
                                
                                {/* Full Description */}
                                <p className="text-gray-700 text-base leading-relaxed">
                                  {project.fullDescription || 'This is a detailed description of the project. It explains what the project does, how it works, and what technologies were used. The project demonstrates various skills and capabilities.'}
                                </p>
                                
                                {/* Project Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">👤</span>
                                    <span className="text-gray-700">{project.role || 'Developer'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">📅</span>
                                    <span className="text-gray-700">{project.date || '2024'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">👥</span>
                                    <span className="text-gray-700">{project.teamSize || 'Solo Project'}</span>
                                  </div>
                                </div>
                                
                                {/* Use Cases */}
                                <div>
                                  <h4 className="font-semibold text-black mb-2">Use Cases:</h4>
                                  <p className="text-gray-700 text-sm leading-relaxed">
                                    {project.usecases || 'This project can be used for various purposes including demonstration of skills, portfolio showcase, and real-world applications.'}
                                  </p>
                                </div>
                                
                                {/* Technologies */}
                                <div>
                                  <h4 className="font-semibold text-black mb-3">Technologies Used:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {(project.technologies ? project.technologies.split(',').map((tech, idx) => (
                                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">
                                        {tech.trim()}
                                      </span>
                                    )) : [
                                      <span key="1" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">React</span>,
                                      <span key="2" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">TypeScript</span>,
                                      <span key="3" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200">Tailwind CSS</span>
                                    ])}
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                  <a
                                    href={project.liveDemoLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                  >
                                    Live Demo
                                  </a>
                                  <a
                                    href={project.githubLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
                                  >
                                    <span>Preview</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
                  ))}
                </div>
              </div>
              
              {/* Dots Navigation */}
              {data.projects.length > 1 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {data.projects.map((_, index) => (
                    <button
                      key={index}
                                                                   onClick={() => {
                        const slider = document.getElementById('project-slider');
                        if (slider) {
                          slider.setAttribute('data-current', index.toString());
                          slider.style.transform = `translateX(-${index * 100}%)`;
                          (window as any).updateProjectDots(index);

                        }
                      }}
                      className="w-3 h-3 rounded-full transition-all duration-300 project-dot"
                      style={{ 
                        backgroundColor: index === 0 ? '#8b5cf6' : 'rgba(156, 163, 175, 0.3)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}


             {/* Education */}
       {data.education && data.education.length > 0 && (
         <section id="education" className="py-16 px-6 bg-gray-800">
           <div className="max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
               Education
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {data.education.map((edu, index) => (
                 <div key={edu.id} className="bg-gray-700 rounded-lg p-6 border-l-4 shadow-lg" style={{ borderLeftColor: data.customization.primaryColor }}>
                   <div className="flex justify-between items-start mb-3">
                     <h3 className="text-xl font-semibold">{edu.fieldOfStudy}</h3>
                     {edu.grade && (
                       <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                         {edu.grade}
                       </span>
                     )}
                   </div>
                   <p className="text-blue-400 mb-3 font-medium">{edu.institution}</p>
                   <div className="flex items-center text-gray-400 text-sm mb-3">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     {formatDateRange(edu.startDate, edu.endDate, false)}
                   </div>
                   <div className="bg-gray-600 rounded-lg p-3">
                     <h4 className="font-semibold text-sm mb-1" style={{ color: data.customization.secondaryColor }}>
                       Field of Study
                     </h4>
                     <p className="text-gray-300 text-sm">{edu.fieldOfStudy}</p>
                   </div>
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
               Skills & Expertise
             </h2>
             
             {/* Skills Overview */}
             <div className="text-center mb-8">
               <p className="text-gray-400 text-lg">
                 Professional skills and technical expertise
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.skills.map((skill, index) => {
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
                 
                 return (
                   <div key={skill.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-semibold text-lg">{skill.name}</h3>
                       <span className={`text-xs px-2 py-1 rounded-full text-white ${getLevelColor(skill.level)}`}>
                         {skill.level}
                       </span>
                     </div>
                     
                     <div className="mb-3">
                       <div className="flex justify-between text-sm text-gray-400 mb-1">
                         <span>Proficiency</span>
                         <span>{getLevelWidth(skill.level)}%</span>
                       </div>
                       <div className="w-full bg-gray-700 rounded-full h-3">
                         <div
                           className="h-3 rounded-full transition-all duration-500 ease-out"
                           style={{
                             backgroundColor: data.customization.primaryColor,
                             width: `${getLevelWidth(skill.level)}%`
                           }}
                         />
                       </div>
                     </div>
                     
                     <div className="text-center">
                       <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 mb-2">
                         <span className="text-xl font-bold" style={{ color: data.customization.primaryColor }}>
                           {skill.name.charAt(0).toUpperCase()}
                         </span>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
             
             {/* Skills Summary */}
             <div className="mt-12 text-center">
               <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                 <h3 className="text-xl font-semibold mb-3" style={{ color: data.customization.secondaryColor }}>
                   Skills Summary
                 </h3>
                 <div className="flex flex-wrap justify-center gap-2">
                   {data.skills.map((skill, index) => (
                     <span
                       key={skill.id}
                       className="px-3 py-1 bg-gray-700 rounded-full text-sm border"
                       style={{ borderColor: data.customization.primaryColor }}
                     >
                       {skill.name} ({skill.level})
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </section>
       )}

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.customization.primaryColor }}>
            Contact Information
          </h2>
          
          {/* Essential Contact */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: data.customization.secondaryColor }}>
              Essential Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.contact.email && (
                <a href={`mailto:${data.contact.email}`} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{data.contact.email}</span>
                </a>
              )}
              {data.contact.phone && (
                <a href={`tel:${data.contact.phone}`} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{data.contact.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Professional Networks */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: data.customization.secondaryColor }}>
              Professional Networks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.contact.github && (
                <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {data.contact.twitter && (
                <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
              )}
              {data.contact.website && (
                <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Additional Contact */}
          {(data.contact.dribbble || data.contact.behance || data.contact.blog || data.contact.media || data.contact.whatsapp || data.contact.telegram) && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: data.customization.secondaryColor }}>
                Additional Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.contact.dribbble && (
                  <a href={data.contact.dribbble} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-pink-400">🎨</span>
                    <span>Dribbble</span>
                  </a>
                )}
                {data.contact.behance && (
                  <a href={data.contact.behance} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-blue-400">📐</span>
                    <span>Behance</span>
                  </a>
                )}
                {data.contact.blog && (
                  <a href={data.contact.blog} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-green-400">📝</span>
                    <span>Blog</span>
                  </a>
                )}
                {data.contact.media && (
                  <a href={data.contact.media} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-red-400">🎥</span>
                    <span>Media</span>
                  </a>
                )}
                {data.contact.whatsapp && (
                  <a href={data.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-green-400">💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
                {data.contact.telegram && (
                  <a href={data.contact.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="w-5 h-5 mr-3 text-blue-400">📱</span>
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 
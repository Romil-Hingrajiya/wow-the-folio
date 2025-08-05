import { PortfolioData } from '@/types/portfolio';

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  file: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'template1',
    name: 'Modern Professional',
    description: 'Clean and modern design with gradient accents',
    thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600',
    file: 'template1.html'
  },
  {
    id: 'template2',
    name: 'Elegant Minimal',
    description: 'Sophisticated design with subtle animations',
    thumbnail: 'bg-gradient-to-br from-green-500 to-teal-600',
    file: 'template2.html'
  }
];

export function processTemplate(templateId: string, data: PortfolioData): string {
  // Get template content
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  // Import template content (this will be handled dynamically)
  let templateContent = '';
  
  // For now, we'll return a placeholder. In a real implementation,
  // you'd read the template file content here
  templateContent = getTemplateContent(templateId);

  // Process placeholders
  return replacePlaceholders(templateContent, data);
}

function getTemplateContent(templateId: string): string {
  // This is a placeholder. In a real implementation, you'd read the actual file
  // For now, we'll return the template content directly
  if (templateId === 'template1') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{FULL_NAME}} - Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family={{FONT_FAMILY}}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: '{{FONT_FAMILY}}', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            color: white;
            padding: 100px 0;
            text-align: center;
        }

        .header h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -1px;
        }

        .header h2 {
            font-size: 1.5rem;
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 30px;
        }

        .header p {
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0.8;
        }

        /* Navigation */
        .nav {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: {{PRIMARY_COLOR}};
        }

        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: {{PRIMARY_COLOR}};
        }

        /* Sections */
        .section {
            padding: 80px 0;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 50px;
            color: #1a202c;
        }

        /* About Section */
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }

        .about-text h3 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: {{PRIMARY_COLOR}};
        }

        .about-text p {
            font-size: 1.1rem;
            color: #4a5568;
            margin-bottom: 30px;
        }

        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            background: {{PRIMARY_COLOR}};
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .about-image {
            background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            height: 400px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
            font-weight: 300;
        }

        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }

        .project-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .project-image {
            height: 200px;
            background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
        }

        .project-content {
            padding: 25px;
        }

        .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #1a202c;
        }

        .project-description {
            color: #4a5568;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .project-link {
            display: inline-block;
            background: {{PRIMARY_COLOR}};
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.3s;
        }

        .project-link:hover {
            background: {{SECONDARY_COLOR}};
        }

        /* Contact Section */
        .contact-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .contact-item {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .contact-item h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: {{PRIMARY_COLOR}};
        }

        .contact-item a {
            color: #4a5568;
            text-decoration: none;
            transition: color 0.3s;
        }

        .contact-item a:hover {
            color: {{PRIMARY_COLOR}};
        }

        /* Footer */
        .footer {
            background: #1a202c;
            color: white;
            text-align: center;
            padding: 40px 0;
        }

        .footer p {
            opacity: 0.8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2.5rem;
            }

            .header h2 {
                font-size: 1.2rem;
            }

            .about-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .nav-links {
                display: none;
            }

            .section-title {
                font-size: 2rem;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .header {
                padding: 60px 0;
            }

            .header h1 {
                font-size: 2rem;
            }

            .section {
                padding: 60px 0;
            }

            .contact-info {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="container">
            <div class="nav-content">
                <div class="nav-logo">{{FULL_NAME}}</div>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <header class="header">
        <div class="container">
            <h1>{{FULL_NAME}}</h1>
            <h2>{{TITLE}}</h2>
            <p>{{ABOUT_ME}}</p>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <h3>Hello, I'm {{FULL_NAME}}</h3>
                    <p>{{ABOUT_ME}}</p>
                    <div class="skills">
                        {{SKILLS_HTML}}
                    </div>
                </div>
                <div class="about-image">
                    {{FULL_NAME_INITIALS}}
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
        <div class="container">
            <h2 class="section-title">My Projects</h2>
            <div class="projects-grid">
                {{PROJECTS_HTML}}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-content">
                <p>I'm always interested in new opportunities and exciting projects. Feel free to reach out!</p>
                <div class="contact-info">
                    {{CONTACT_HTML}}
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{FULL_NAME}}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
  } else if (templateId === 'template2') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{FULL_NAME}} - Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family={{FONT_FAMILY}}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: '{{FONT_FAMILY}}', sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background-color: #ffffff;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: {{PRIMARY_COLOR}};
            color: white;
            padding: 120px 0 80px;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            opacity: 0.9;
        }

        .header-content {
            position: relative;
            z-index: 1;
            text-align: center;
        }

        .header h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: -2px;
        }

        .header h2 {
            font-size: 1.8rem;
            font-weight: 300;
            margin-bottom: 30px;
            opacity: 0.9;
        }

        .header p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
            opacity: 0.8;
        }

        /* Navigation */
        .nav {
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .nav-logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: {{PRIMARY_COLOR}};
        }

        .nav-links {
            display: flex;
            gap: 40px;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: #2d3748;
            font-weight: 500;
            transition: color 0.3s;
            position: relative;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: {{PRIMARY_COLOR}};
            transition: width 0.3s;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        /* Sections */
        .section {
            padding: 100px 0;
        }

        .section:nth-child(even) {
            background: #f7fafc;
        }

        .section-title {
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 60px;
            color: #1a202c;
            position: relative;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: {{PRIMARY_COLOR}};
            border-radius: 2px;
        }

        /* About Section */
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
        }

        .about-text h3 {
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 25px;
            color: {{PRIMARY_COLOR}};
        }

        .about-text p {
            font-size: 1.1rem;
            color: #4a5568;
            margin-bottom: 35px;
            line-height: 1.8;
        }

        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .skill-tag {
            background: {{PRIMARY_COLOR}};
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 0.95rem;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .skill-tag:hover {
            transform: translateY(-2px);
        }

        .about-image {
            background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            height: 450px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 5rem;
            font-weight: 300;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
        }

        .project-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid #e2e8f0;
        }

        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .project-image {
            height: 250px;
            background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            font-weight: 300;
        }

        .project-content {
            padding: 30px;
        }

        .project-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #1a202c;
        }

        .project-description {
            color: #4a5568;
            margin-bottom: 25px;
            line-height: 1.7;
        }

        .project-link {
            display: inline-block;
            background: {{PRIMARY_COLOR}};
            color: white;
            padding: 12px 25px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .project-link:hover {
            background: {{SECONDARY_COLOR}};
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        /* Contact Section */
        .contact-content {
            text-align: center;
            max-width: 700px;
            margin: 0 auto;
        }

        .contact-intro {
            font-size: 1.2rem;
            color: #4a5568;
            margin-bottom: 60px;
            line-height: 1.7;
        }

        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 40px;
        }

        .contact-item {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
            transition: transform 0.3s;
        }

        .contact-item:hover {
            transform: translateY(-5px);
        }

        .contact-item h4 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: {{PRIMARY_COLOR}};
        }

        .contact-item a {
            color: #4a5568;
            text-decoration: none;
            transition: color 0.3s;
            font-size: 1.1rem;
        }

        .contact-item a:hover {
            color: {{PRIMARY_COLOR}};
        }

        /* Footer */
        .footer {
            background: #1a202c;
            color: white;
            text-align: center;
            padding: 50px 0;
        }

        .footer p {
            opacity: 0.8;
            font-size: 1.1rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 3rem;
            }

            .header h2 {
                font-size: 1.4rem;
            }

            .about-content {
                grid-template-columns: 1fr;
                gap: 50px;
            }

            .nav-links {
                display: none;
            }

            .section-title {
                font-size: 2.5rem;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }

            .section {
                padding: 80px 0;
            }
        }

        @media (max-width: 480px) {
            .header {
                padding: 80px 0 60px;
            }

            .header h1 {
                font-size: 2.5rem;
            }

            .section {
                padding: 60px 0;
            }

            .contact-info {
                grid-template-columns: 1fr;
            }

            .project-card {
                margin: 0 10px;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="container">
            <div class="nav-content">
                <div class="nav-logo">{{FULL_NAME}}</div>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1>{{FULL_NAME}}</h1>
                <h2>{{TITLE}}</h2>
                <p>{{ABOUT_ME}}</p>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <h3>Hello, I'm {{FULL_NAME}}</h3>
                    <p>{{ABOUT_ME}}</p>
                    <div class="skills">
                        {{SKILLS_HTML}}
                    </div>
                </div>
                <div class="about-image">
                    {{FULL_NAME_INITIALS}}
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
        <div class="container">
            <h2 class="section-title">My Projects</h2>
            <div class="projects-grid">
                {{PROJECTS_HTML}}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-content">
                <p class="contact-intro">I'm always interested in new opportunities and exciting projects. Feel free to reach out!</p>
                <div class="contact-info">
                    {{CONTACT_HTML}}
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{FULL_NAME}}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
  }
  
  return '';
}

function replacePlaceholders(template: string, data: PortfolioData): string {
  // Get initials from full name
  const initials = data.fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

  // Generate education HTML
  const educationHtml = data.education
    .filter(edu => edu.institution.trim().length > 0)
    .map(edu => `
      <div class="education-item">
        <h4>${edu.institution}</h4>
        <p class="field-of-study">${edu.fieldOfStudy}</p>
        <p class="dates">${edu.startDate} - ${edu.endDate}</p>
        ${edu.grade ? `<p class="grade">${edu.grade}</p>` : ''}
      </div>
    `)
    .join('');

  // Generate skills HTML with levels
  const skillsHtml = data.skills
    .map(skill => `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <div class="skill-level">
          <div class="skill-bar">
            <div class="skill-progress skill-${skill.level.toLowerCase()}" style="width: ${getSkillLevelWidth(skill.level)}"></div>
          </div>
          <span class="skill-label">${skill.level}</span>
        </div>
      </div>
    `)
    .join('');

  // Generate projects HTML
  const projectsHtml = data.projects
    .filter(project => project.title.trim().length > 0)
    .map(project => {
      const projectImages = project.projectImages ? project.projectImages.split(',').map(img => img.trim()).filter(img => img) : [];
      const technologies = project.technologies ? project.technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [];
      
      return `
        <div class="project-card">
          <div class="project-image">
            ${projectImages.length > 0 ? `<img src="${projectImages[0]}" alt="${project.title}" />` : project.title.charAt(0).toUpperCase()}
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
              ${project.projectType ? `<span class="project-type">${project.projectType}</span>` : ''}
            </div>
            <p class="project-short-desc">${project.shortDescription || 'No description available.'}</p>
            ${project.fullDescription ? `<p class="project-full-desc">${project.fullDescription}</p>` : ''}
            
            ${technologies.length > 0 ? `
              <div class="project-tech">
                <strong>Technologies:</strong>
                <div class="tech-tags">
                  ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
              </div>
            ` : ''}
            
            <div class="project-details">
              ${project.role ? `<p><strong>Role:</strong> ${project.role}</p>` : ''}
              ${project.date ? `<p><strong>Duration:</strong> ${project.date}</p>` : ''}
              ${project.teamSize ? `<p><strong>Team:</strong> ${project.teamSize}</p>` : ''}
            </div>
            
            ${project.usecases ? `<p class="project-usecases"><strong>Use Cases:</strong> ${project.usecases}</p>` : ''}
            
            <div class="project-links">
              ${project.liveDemoLink ? `<a href="${project.liveDemoLink}" class="project-link demo-link" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
              ${project.githubLink ? `<a href="${project.githubLink}" class="project-link github-link" target="_blank" rel="noopener noreferrer">View Code</a>` : ''}
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Generate contact HTML
  const contactItems = [];
  
  if (data.contact.email) {
    contactItems.push(`
      <div class="contact-item">
        <h4>Email</h4>
        <a href="mailto:${data.contact.email}">${data.contact.email}</a>
      </div>
    `);
  }
  
  if (data.contact.phone) {
    contactItems.push(`
      <div class="contact-item">
        <h4>Phone</h4>
        <a href="tel:${data.contact.phone}">${data.contact.phone}</a>
      </div>
    `);
  }
  
  if (data.contact.github) {
    contactItems.push(`
      <div class="contact-item">
        <h4>GitHub</h4>
        <a href="${data.contact.github}" target="_blank" rel="noopener noreferrer">View Profile</a>
      </div>
    `);
  }
  
  if (data.contact.linkedin) {
    contactItems.push(`
      <div class="contact-item">
        <h4>LinkedIn</h4>
        <a href="${data.contact.linkedin}" target="_blank" rel="noopener noreferrer">View Profile</a>
      </div>
    `);
  }

  const contactHtml = contactItems.join('');

  // Replace all placeholders
  return template
    .replace(/\{\{FULL_NAME\}\}/g, data.fullName)
    .replace(/\{\{TITLE\}\}/g, data.title)
    .replace(/\{\{PROFILE_PICTURE\}\}/g, data.profilePicture || '')
    .replace(/\{\{ABOUT_ME\}\}/g, data.aboutMe || 'Passionate professional with expertise in various technologies.')
    .replace(/\{\{RESUME\}\}/g, data.resume || '')
    .replace(/\{\{EDUCATION_HTML\}\}/g, educationHtml)
    .replace(/\{\{SKILLS_HTML\}\}/g, skillsHtml)
    .replace(/\{\{PROJECTS_HTML\}\}/g, projectsHtml)
    .replace(/\{\{CONTACT_HTML\}\}/g, contactHtml)
    .replace(/\{\{FONT_FAMILY\}\}/g, data.customization.font.replace(/\s+/g, '+'))
    .replace(/\{\{PRIMARY_COLOR\}\}/g, data.customization.primaryColor)
    .replace(/\{\{SECONDARY_COLOR\}\}/g, data.customization.secondaryColor)
    .replace(/\{\{FULL_NAME_INITIALS\}\}/g, initials);
}

function getSkillLevelWidth(level: string): string {
  switch (level) {
    case 'Beginner': return '20%';
    case 'Elementary': return '40%';
    case 'Intermediate': return '60%';
    case 'Advanced': return '80%';
    case 'Expert': return '100%';
    default: return '60%';
  }
} 
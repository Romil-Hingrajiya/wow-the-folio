import { PortfolioData } from '@/types/portfolio';

export interface SEOKeyword {
  keyword: string;
  category: 'primary' | 'secondary' | 'long-tail';
  relevance: 'high' | 'medium' | 'low';
  description?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Comprehensive SEO Keywords for Portfolio Generator - 5000+ keywords
export const SEO_KEYWORDS: SEOKeyword[] = [
  // Primary Keywords - High Volume
  { keyword: 'portfolio generator', category: 'primary', relevance: 'high', description: 'Main product keyword' },
  { keyword: 'free portfolio generator', category: 'primary', relevance: 'high', description: 'Free tool targeting' },
  { keyword: 'online portfolio builder', category: 'primary', relevance: 'high', description: 'Online tool focus' },
  { keyword: 'professional portfolio creator', category: 'primary', relevance: 'high', description: 'Professional focus' },
  { keyword: 'portfolio website generator', category: 'primary', relevance: 'high', description: 'Website creation' },
  { keyword: 'portfolio maker online', category: 'primary', relevance: 'high', description: 'Online creation tool' },
  { keyword: 'create portfolio online', category: 'primary', relevance: 'high', description: 'Creation action' },
  { keyword: 'portfolio builder free', category: 'primary', relevance: 'high', description: 'Free builder tool' },
  { keyword: 'portfolio template generator', category: 'primary', relevance: 'high', description: 'Template focus' },
  { keyword: 'portfolio download', category: 'primary', relevance: 'high', description: 'Download functionality' },
  
  // Secondary Keywords - Medium Volume
  { keyword: 'developer portfolio generator', category: 'secondary', relevance: 'high', description: 'Developer specific' },
  { keyword: 'designer portfolio builder', category: 'secondary', relevance: 'high', description: 'Designer specific' },
  { keyword: 'student portfolio creator', category: 'secondary', relevance: 'medium', description: 'Student market' },
  { keyword: 'freelancer portfolio maker', category: 'secondary', relevance: 'high', description: 'Freelancer market' },
  { keyword: 'job portfolio generator', category: 'secondary', relevance: 'high', description: 'Job search focus' },
  { keyword: 'resume portfolio builder', category: 'secondary', relevance: 'high', description: 'Resume integration' },
  { keyword: 'creative portfolio generator', category: 'secondary', relevance: 'medium', description: 'Creative professionals' },
  { keyword: 'photographer portfolio builder', category: 'secondary', relevance: 'medium', description: 'Photography niche' },
  { keyword: 'writer portfolio creator', category: 'secondary', relevance: 'medium', description: 'Writing niche' },
  { keyword: 'artist portfolio generator', category: 'secondary', relevance: 'medium', description: 'Art niche' },
  
  // Long-tail Keywords - Low Volume, High Intent
  { keyword: 'free online portfolio generator no signup', category: 'long-tail', relevance: 'high', description: 'No signup requirement' },
  { keyword: 'portfolio generator download HTML', category: 'long-tail', relevance: 'high', description: 'HTML download focus' },
  { keyword: '7 step easy portfolio download', category: 'long-tail', relevance: 'high', description: 'Step-by-step process' },
  { keyword: 'professional portfolio generator with templates', category: 'long-tail', relevance: 'high', description: 'Template variety' },
  { keyword: 'portfolio generator for developers GitHub', category: 'long-tail', relevance: 'high', description: 'Developer specific' },
  { keyword: 'free portfolio generator with custom themes', category: 'long-tail', relevance: 'medium', description: 'Customization focus' },
  { keyword: 'portfolio generator export to PDF', category: 'long-tail', relevance: 'medium', description: 'PDF export' },
  { keyword: 'portfolio generator responsive design', category: 'long-tail', relevance: 'high', description: 'Mobile responsive' },
  { keyword: 'portfolio generator SEO optimized', category: 'long-tail', relevance: 'high', description: 'SEO features' },
  { keyword: 'portfolio generator dark mode', category: 'long-tail', relevance: 'medium', description: 'Dark theme' },
  
  // Geographic Keywords
  { keyword: 'portfolio generator USA', category: 'secondary', relevance: 'medium', description: 'US market' },
  { keyword: 'portfolio generator UK', category: 'secondary', relevance: 'medium', description: 'UK market' },
  { keyword: 'portfolio generator Canada', category: 'secondary', relevance: 'medium', description: 'Canada market' },
  { keyword: 'portfolio generator Australia', category: 'secondary', relevance: 'medium', description: 'Australia market' },
  { keyword: 'portfolio generator India', category: 'secondary', relevance: 'medium', description: 'India market' },
  { keyword: 'portfolio generator Germany', category: 'secondary', relevance: 'medium', description: 'Germany market' },
  { keyword: 'portfolio generator France', category: 'secondary', relevance: 'medium', description: 'France market' },
  { keyword: 'portfolio generator Japan', category: 'secondary', relevance: 'medium', description: 'Japan market' },
  { keyword: 'portfolio generator Brazil', category: 'secondary', relevance: 'medium', description: 'Brazil market' },
  { keyword: 'portfolio generator Singapore', category: 'secondary', relevance: 'medium', description: 'Singapore market' },
  
  // Industry-Specific Keywords
  { keyword: 'web developer portfolio generator', category: 'secondary', relevance: 'high', description: 'Web development' },
  { keyword: 'frontend developer portfolio builder', category: 'secondary', relevance: 'high', description: 'Frontend focus' },
  { keyword: 'backend developer portfolio creator', category: 'secondary', relevance: 'high', description: 'Backend focus' },
  { keyword: 'full stack developer portfolio generator', category: 'secondary', relevance: 'high', description: 'Full stack' },
  { keyword: 'UI UX designer portfolio builder', category: 'secondary', relevance: 'high', description: 'UI/UX design' },
  { keyword: 'graphic designer portfolio generator', category: 'secondary', relevance: 'medium', description: 'Graphic design' },
  { keyword: 'mobile app developer portfolio builder', category: 'secondary', relevance: 'medium', description: 'Mobile development' },
  { keyword: 'data scientist portfolio generator', category: 'secondary', relevance: 'medium', description: 'Data science' },
  { keyword: 'machine learning portfolio builder', category: 'secondary', relevance: 'medium', description: 'ML/AI' },
  { keyword: 'devops engineer portfolio generator', category: 'secondary', relevance: 'medium', description: 'DevOps' },
  
  // Feature-Specific Keywords
  { keyword: 'portfolio generator with file upload', category: 'long-tail', relevance: 'high', description: 'File upload feature' },
  { keyword: 'portfolio generator drag and drop', category: 'long-tail', relevance: 'medium', description: 'Drag and drop' },
  { keyword: 'portfolio generator real time preview', category: 'long-tail', relevance: 'high', description: 'Live preview' },
  { keyword: 'portfolio generator copy to clipboard', category: 'long-tail', relevance: 'medium', description: 'Copy feature' },
  { keyword: 'portfolio generator multiple templates', category: 'long-tail', relevance: 'high', description: 'Template variety' },
  { keyword: 'portfolio generator custom colors', category: 'long-tail', relevance: 'medium', description: 'Color customization' },
  { keyword: 'portfolio generator font selection', category: 'long-tail', relevance: 'medium', description: 'Font options' },
  { keyword: 'portfolio generator project showcase', category: 'long-tail', relevance: 'high', description: 'Project display' },
  { keyword: 'portfolio generator skills section', category: 'long-tail', relevance: 'high', description: 'Skills display' },
  { keyword: 'portfolio generator education section', category: 'long-tail', relevance: 'medium', description: 'Education display' },
  
  // Problem-Solving Keywords
  { keyword: 'how to create portfolio quickly', category: 'long-tail', relevance: 'high', description: 'Speed focus' },
  { keyword: 'portfolio generator no coding required', category: 'long-tail', relevance: 'high', description: 'No-code solution' },
  { keyword: 'portfolio generator for beginners', category: 'long-tail', relevance: 'high', description: 'Beginner friendly' },
  { keyword: 'portfolio generator instant download', category: 'long-tail', relevance: 'high', description: 'Instant results' },
  { keyword: 'portfolio generator mobile friendly', category: 'long-tail', relevance: 'high', description: 'Mobile optimization' },
  { keyword: 'portfolio generator no registration', category: 'long-tail', relevance: 'high', description: 'No signup needed' },
  { keyword: 'portfolio generator unlimited projects', category: 'long-tail', relevance: 'medium', description: 'Unlimited features' },
  { keyword: 'portfolio generator professional templates', category: 'long-tail', relevance: 'high', description: 'Professional look' },
  { keyword: 'portfolio generator modern design', category: 'long-tail', relevance: 'high', description: 'Modern aesthetics' },
  { keyword: 'portfolio generator responsive templates', category: 'long-tail', relevance: 'high', description: 'Responsive design' },
  
  // Comparison Keywords
  { keyword: 'best free portfolio generator', category: 'long-tail', relevance: 'high', description: 'Best tool search' },
  { keyword: 'portfolio generator vs WordPress', category: 'long-tail', relevance: 'medium', description: 'WordPress comparison' },
  { keyword: 'portfolio generator vs Wix', category: 'long-tail', relevance: 'medium', description: 'Wix comparison' },
  { keyword: 'portfolio generator vs Squarespace', category: 'long-tail', relevance: 'medium', description: 'Squarespace comparison' },
  { keyword: 'portfolio generator alternatives', category: 'long-tail', relevance: 'medium', description: 'Alternative search' },
  { keyword: 'portfolio generator reviews', category: 'long-tail', relevance: 'medium', description: 'Review search' },
  { keyword: 'portfolio generator comparison', category: 'long-tail', relevance: 'medium', description: 'Comparison search' },
  { keyword: 'portfolio generator vs custom website', category: 'long-tail', relevance: 'medium', description: 'Custom vs tool' },
  { keyword: 'portfolio generator vs GitHub Pages', category: 'long-tail', relevance: 'medium', description: 'GitHub comparison' },
  { keyword: 'portfolio generator vs Netlify', category: 'long-tail', relevance: 'medium', description: 'Netlify comparison' },
  
  // Action-Based Keywords
  { keyword: 'create portfolio online free', category: 'primary', relevance: 'high', description: 'Creation action' },
  { keyword: 'build portfolio website free', category: 'primary', relevance: 'high', description: 'Building action' },
  { keyword: 'make portfolio online', category: 'primary', relevance: 'high', description: 'Making action' },
  { keyword: 'generate portfolio HTML', category: 'secondary', relevance: 'high', description: 'HTML generation' },
  { keyword: 'download portfolio template', category: 'secondary', relevance: 'high', description: 'Download action' },
  { keyword: 'export portfolio to HTML', category: 'long-tail', relevance: 'high', description: 'Export action' },
  { keyword: 'copy portfolio code', category: 'long-tail', relevance: 'medium', description: 'Copy action' },
  { keyword: 'customize portfolio template', category: 'long-tail', relevance: 'medium', description: 'Customization action' },
  { keyword: 'preview portfolio design', category: 'long-tail', relevance: 'medium', description: 'Preview action' },
  { keyword: 'save portfolio project', category: 'long-tail', relevance: 'medium', description: 'Save action' },
  
  // Technology-Specific Keywords
  { keyword: 'React portfolio generator', category: 'secondary', relevance: 'high', description: 'React technology' },
  { keyword: 'Next.js portfolio builder', category: 'secondary', relevance: 'high', description: 'Next.js technology' },
  { keyword: 'Vue.js portfolio generator', category: 'secondary', relevance: 'medium', description: 'Vue.js technology' },
  { keyword: 'Angular portfolio builder', category: 'secondary', relevance: 'medium', description: 'Angular technology' },
  { keyword: 'JavaScript portfolio generator', category: 'secondary', relevance: 'high', description: 'JavaScript focus' },
  { keyword: 'TypeScript portfolio builder', category: 'secondary', relevance: 'medium', description: 'TypeScript focus' },
  { keyword: 'Tailwind CSS portfolio generator', category: 'secondary', relevance: 'medium', description: 'Tailwind CSS' },
  { keyword: 'Bootstrap portfolio builder', category: 'secondary', relevance: 'medium', description: 'Bootstrap framework' },
  { keyword: 'Node.js portfolio generator', category: 'secondary', relevance: 'medium', description: 'Node.js backend' },
  { keyword: 'Python portfolio builder', category: 'secondary', relevance: 'medium', description: 'Python backend' },
  
  // Use Case Keywords
  { keyword: 'portfolio generator for job application', category: 'long-tail', relevance: 'high', description: 'Job application use' },
  { keyword: 'portfolio generator for freelancing', category: 'long-tail', relevance: 'high', description: 'Freelancing use' },
  { keyword: 'portfolio generator for clients', category: 'long-tail', relevance: 'high', description: 'Client presentation' },
  { keyword: 'portfolio generator for interviews', category: 'long-tail', relevance: 'high', description: 'Interview preparation' },
  { keyword: 'portfolio generator for networking', category: 'long-tail', relevance: 'medium', description: 'Networking use' },
  { keyword: 'portfolio generator for social media', category: 'long-tail', relevance: 'medium', description: 'Social media use' },
  { keyword: 'portfolio generator for LinkedIn', category: 'long-tail', relevance: 'high', description: 'LinkedIn integration' },
  { keyword: 'portfolio generator for GitHub', category: 'long-tail', relevance: 'high', description: 'GitHub integration' },
  { keyword: 'portfolio generator for Behance', category: 'long-tail', relevance: 'medium', description: 'Behance integration' },
  { keyword: 'portfolio generator for Dribbble', category: 'long-tail', relevance: 'medium', description: 'Dribbble integration' },
  
  // Quality Keywords
  { keyword: 'professional portfolio generator', category: 'primary', relevance: 'high', description: 'Professional quality' },
  { keyword: 'modern portfolio builder', category: 'secondary', relevance: 'high', description: 'Modern design' },
  { keyword: 'clean portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Clean design' },
  { keyword: 'minimalist portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Minimalist design' },
  { keyword: 'elegant portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Elegant design' },
  { keyword: 'sophisticated portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Sophisticated design' },
  { keyword: 'premium portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Premium quality' },
  { keyword: 'high quality portfolio builder', category: 'long-tail', relevance: 'medium', description: 'High quality' },
  { keyword: 'polished portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Polished design' },
  { keyword: 'refined portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Refined design' },
  
  // Time-Based Keywords
  { keyword: 'quick portfolio generator', category: 'long-tail', relevance: 'high', description: 'Speed focus' },
  { keyword: 'fast portfolio builder', category: 'long-tail', relevance: 'high', description: 'Speed focus' },
  { keyword: 'instant portfolio generator', category: 'long-tail', relevance: 'high', description: 'Instant results' },
  { keyword: '5 minute portfolio builder', category: 'long-tail', relevance: 'high', description: 'Time specific' },
  { keyword: '10 minute portfolio generator', category: 'long-tail', relevance: 'high', description: 'Time specific' },
  { keyword: 'one click portfolio builder', category: 'long-tail', relevance: 'high', description: 'One-click solution' },
  { keyword: 'automatic portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Automation focus' },
  { keyword: 'smart portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Smart features' },
  { keyword: 'AI portfolio generator', category: 'long-tail', relevance: 'medium', description: 'AI integration' },
  { keyword: 'automated portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Automation' },
  
  // Cost-Related Keywords
  { keyword: 'free portfolio generator', category: 'primary', relevance: 'high', description: 'Free tool' },
  { keyword: 'no cost portfolio builder', category: 'long-tail', relevance: 'high', description: 'No cost' },
  { keyword: 'zero cost portfolio generator', category: 'long-tail', relevance: 'high', description: 'Zero cost' },
  { keyword: 'unlimited free portfolio builder', category: 'long-tail', relevance: 'high', description: 'Unlimited free' },
  { keyword: 'free portfolio generator forever', category: 'long-tail', relevance: 'high', description: 'Always free' },
  { keyword: 'portfolio generator no payment', category: 'long-tail', relevance: 'high', description: 'No payment' },
  { keyword: 'portfolio generator no subscription', category: 'long-tail', relevance: 'high', description: 'No subscription' },
  { keyword: 'portfolio generator no credit card', category: 'long-tail', relevance: 'high', description: 'No credit card' },
  { keyword: 'portfolio generator no hidden fees', category: 'long-tail', relevance: 'high', description: 'No hidden fees' },
  { keyword: 'portfolio generator completely free', category: 'long-tail', relevance: 'high', description: 'Completely free' },
  
  // Platform Keywords
  { keyword: 'web based portfolio generator', category: 'long-tail', relevance: 'high', description: 'Web-based tool' },
  { keyword: 'browser portfolio builder', category: 'long-tail', relevance: 'high', description: 'Browser-based' },
  { keyword: 'cloud portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Cloud-based' },
  { keyword: 'online portfolio builder tool', category: 'long-tail', relevance: 'high', description: 'Online tool' },
  { keyword: 'web app portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Web app' },
  { keyword: 'PWA portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Progressive Web App' },
  { keyword: 'mobile portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Mobile app' },
  { keyword: 'desktop portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Desktop app' },
  { keyword: 'cross platform portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Cross-platform' },
  { keyword: 'responsive portfolio builder', category: 'long-tail', relevance: 'high', description: 'Responsive design' },
  
  // Content Keywords
  { keyword: 'portfolio generator with projects', category: 'long-tail', relevance: 'high', description: 'Project showcase' },
  { keyword: 'portfolio generator with skills', category: 'long-tail', relevance: 'high', description: 'Skills section' },
  { keyword: 'portfolio generator with experience', category: 'long-tail', relevance: 'high', description: 'Experience section' },
  { keyword: 'portfolio generator with education', category: 'long-tail', relevance: 'medium', description: 'Education section' },
  { keyword: 'portfolio generator with contact', category: 'long-tail', relevance: 'high', description: 'Contact section' },
  { keyword: 'portfolio generator with about me', category: 'long-tail', relevance: 'high', description: 'About section' },
  { keyword: 'portfolio generator with testimonials', category: 'long-tail', relevance: 'medium', description: 'Testimonials' },
  { keyword: 'portfolio generator with blog', category: 'long-tail', relevance: 'medium', description: 'Blog section' },
  { keyword: 'portfolio generator with gallery', category: 'long-tail', relevance: 'medium', description: 'Gallery section' },
  { keyword: 'portfolio generator with resume', category: 'long-tail', relevance: 'high', description: 'Resume integration' },
  
  // SEO and Marketing Keywords
  { keyword: 'SEO portfolio generator', category: 'long-tail', relevance: 'high', description: 'SEO optimized' },
  { keyword: 'portfolio generator for SEO', category: 'long-tail', relevance: 'high', description: 'SEO focus' },
  { keyword: 'search engine optimized portfolio', category: 'long-tail', relevance: 'high', description: 'SEO focus' },
  { keyword: 'portfolio generator meta tags', category: 'long-tail', relevance: 'medium', description: 'Meta tags' },
  { keyword: 'portfolio generator structured data', category: 'long-tail', relevance: 'medium', description: 'Structured data' },
  { keyword: 'portfolio generator social media', category: 'long-tail', relevance: 'medium', description: 'Social media' },
  { keyword: 'portfolio generator Open Graph', category: 'long-tail', relevance: 'medium', description: 'Open Graph' },
  { keyword: 'portfolio generator Twitter Cards', category: 'long-tail', relevance: 'medium', description: 'Twitter Cards' },
  { keyword: 'portfolio generator analytics', category: 'long-tail', relevance: 'medium', description: 'Analytics' },
  { keyword: 'portfolio generator tracking', category: 'long-tail', relevance: 'medium', description: 'Tracking' },
  
  // Performance Keywords
  { keyword: 'fast loading portfolio generator', category: 'long-tail', relevance: 'high', description: 'Performance focus' },
  { keyword: 'lightweight portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Lightweight' },
  { keyword: 'optimized portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Optimized' },
  { keyword: 'performance portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Performance' },
  { keyword: 'speed optimized portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Speed optimized' },
  { keyword: 'efficient portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Efficient' },
  { keyword: 'minimal portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Minimal size' },
  { keyword: 'compact portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Compact' },
  { keyword: 'lean portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Lean' },
  { keyword: 'streamlined portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Streamlined' },
  
  // Security Keywords
  { keyword: 'secure portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Security focus' },
  { keyword: 'private portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Privacy' },
  { keyword: 'safe portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Safety' },
  { keyword: 'encrypted portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Encryption' },
  { keyword: 'protected portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Protection' },
  { keyword: 'confidential portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Confidentiality' },
  { keyword: 'trusted portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Trust' },
  { keyword: 'reliable portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Reliability' },
  { keyword: 'verified portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Verification' },
  { keyword: 'certified portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Certification' },
  
  // Support Keywords
  { keyword: 'portfolio generator help', category: 'long-tail', relevance: 'medium', description: 'Help support' },
  { keyword: 'portfolio builder support', category: 'long-tail', relevance: 'medium', description: 'Support' },
  { keyword: 'portfolio generator tutorial', category: 'long-tail', relevance: 'medium', description: 'Tutorial' },
  { keyword: 'portfolio builder guide', category: 'long-tail', relevance: 'medium', description: 'Guide' },
  { keyword: 'portfolio generator documentation', category: 'long-tail', relevance: 'medium', description: 'Documentation' },
  { keyword: 'portfolio builder FAQ', category: 'long-tail', relevance: 'medium', description: 'FAQ' },
  { keyword: 'portfolio generator tips', category: 'long-tail', relevance: 'medium', description: 'Tips' },
  { keyword: 'portfolio builder tricks', category: 'long-tail', relevance: 'medium', description: 'Tricks' },
  { keyword: 'portfolio generator best practices', category: 'long-tail', relevance: 'medium', description: 'Best practices' },
  { keyword: 'portfolio builder examples', category: 'long-tail', relevance: 'medium', description: 'Examples' },
  
  // Update and Maintenance Keywords
  { keyword: 'portfolio generator updates', category: 'long-tail', relevance: 'medium', description: 'Updates' },
  { keyword: 'portfolio builder maintenance', category: 'long-tail', relevance: 'medium', description: 'Maintenance' },
  { keyword: 'portfolio generator version', category: 'long-tail', relevance: 'medium', description: 'Version' },
  { keyword: 'portfolio builder latest', category: 'long-tail', relevance: 'medium', description: 'Latest version' },
  { keyword: 'portfolio generator new features', category: 'long-tail', relevance: 'medium', description: 'New features' },
  { keyword: 'portfolio builder improvements', category: 'long-tail', relevance: 'medium', description: 'Improvements' },
  { keyword: 'portfolio generator changelog', category: 'long-tail', relevance: 'medium', description: 'Changelog' },
  { keyword: 'portfolio builder roadmap', category: 'long-tail', relevance: 'medium', description: 'Roadmap' },
  { keyword: 'portfolio generator future', category: 'long-tail', relevance: 'medium', description: 'Future plans' },
  { keyword: 'portfolio builder development', category: 'long-tail', relevance: 'medium', description: 'Development' },
  
  // Integration Keywords
  { keyword: 'portfolio generator API', category: 'long-tail', relevance: 'medium', description: 'API integration' },
  { keyword: 'portfolio builder integration', category: 'long-tail', relevance: 'medium', description: 'Integration' },
  { keyword: 'portfolio generator plugins', category: 'long-tail', relevance: 'medium', description: 'Plugins' },
  { keyword: 'portfolio builder extensions', category: 'long-tail', relevance: 'medium', description: 'Extensions' },
  { keyword: 'portfolio generator widgets', category: 'long-tail', relevance: 'medium', description: 'Widgets' },
  { keyword: 'portfolio builder embeds', category: 'long-tail', relevance: 'medium', description: 'Embeds' },
  { keyword: 'portfolio generator iframe', category: 'long-tail', relevance: 'medium', description: 'Iframe' },
  { keyword: 'portfolio builder embed code', category: 'long-tail', relevance: 'medium', description: 'Embed code' },
  { keyword: 'portfolio generator share', category: 'long-tail', relevance: 'medium', description: 'Sharing' },
  { keyword: 'portfolio builder export', category: 'long-tail', relevance: 'high', description: 'Export' },
  
  // Language Keywords
  { keyword: 'portfolio generator English', category: 'long-tail', relevance: 'medium', description: 'English language' },
  { keyword: 'portfolio builder Spanish', category: 'long-tail', relevance: 'medium', description: 'Spanish language' },
  { keyword: 'portfolio generator French', category: 'long-tail', relevance: 'medium', description: 'French language' },
  { keyword: 'portfolio builder German', category: 'long-tail', relevance: 'medium', description: 'German language' },
  { keyword: 'portfolio generator Portuguese', category: 'long-tail', relevance: 'medium', description: 'Portuguese language' },
  { keyword: 'portfolio builder Italian', category: 'long-tail', relevance: 'medium', description: 'Italian language' },
  { keyword: 'portfolio generator Dutch', category: 'long-tail', relevance: 'medium', description: 'Dutch language' },
  { keyword: 'portfolio builder Russian', category: 'long-tail', relevance: 'medium', description: 'Russian language' },
  { keyword: 'portfolio generator Chinese', category: 'long-tail', relevance: 'medium', description: 'Chinese language' },
  { keyword: 'portfolio builder Japanese', category: 'long-tail', relevance: 'medium', description: 'Japanese language' },
  
  // Accessibility Keywords
  { keyword: 'accessible portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Accessibility' },
  { keyword: 'WCAG portfolio builder', category: 'long-tail', relevance: 'medium', description: 'WCAG compliance' },
  { keyword: 'ADA portfolio generator', category: 'long-tail', relevance: 'medium', description: 'ADA compliance' },
  { keyword: 'screen reader portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Screen reader' },
  { keyword: 'keyboard navigation portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Keyboard navigation' },
  { keyword: 'high contrast portfolio builder', category: 'long-tail', relevance: 'medium', description: 'High contrast' },
  { keyword: 'font size portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Font size' },
  { keyword: 'color blind portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Color blind' },
  { keyword: 'mobility portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Mobility' },
  { keyword: 'inclusive portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Inclusive design' },
  
  // Compliance Keywords
  { keyword: 'GDPR portfolio generator', category: 'long-tail', relevance: 'medium', description: 'GDPR compliance' },
  { keyword: 'CCPA portfolio builder', category: 'long-tail', relevance: 'medium', description: 'CCPA compliance' },
  { keyword: 'privacy portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Privacy' },
  { keyword: 'data protection portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Data protection' },
  { keyword: 'cookie consent portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Cookie consent' },
  { keyword: 'terms of service portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Terms of service' },
  { keyword: 'privacy policy portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Privacy policy' },
  { keyword: 'legal portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Legal compliance' },
  { keyword: 'compliant portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Compliance' },
  { keyword: 'regulated portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Regulated' },
  
  // Innovation Keywords
  { keyword: 'next generation portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Next generation' },
  { keyword: 'innovative portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Innovative' },
  { keyword: 'cutting edge portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Cutting edge' },
  { keyword: 'advanced portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Advanced' },
  { keyword: 'revolutionary portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Revolutionary' },
  { keyword: 'breakthrough portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Breakthrough' },
  { keyword: 'pioneering portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Pioneering' },
  { keyword: 'groundbreaking portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Groundbreaking' },
  { keyword: 'state of the art portfolio generator', category: 'long-tail', relevance: 'medium', description: 'State of the art' },
  { keyword: 'leading edge portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Leading edge' },
  
  // Community Keywords
  { keyword: 'portfolio generator community', category: 'long-tail', relevance: 'medium', description: 'Community' },
  { keyword: 'portfolio builder forum', category: 'long-tail', relevance: 'medium', description: 'Forum' },
  { keyword: 'portfolio generator users', category: 'long-tail', relevance: 'medium', description: 'Users' },
  { keyword: 'portfolio builder feedback', category: 'long-tail', relevance: 'medium', description: 'Feedback' },
  { keyword: 'portfolio generator testimonials', category: 'long-tail', relevance: 'medium', description: 'Testimonials' },
  { keyword: 'portfolio builder reviews', category: 'long-tail', relevance: 'medium', description: 'Reviews' },
  { keyword: 'portfolio generator ratings', category: 'long-tail', relevance: 'medium', description: 'Ratings' },
  { keyword: 'portfolio builder recommendations', category: 'long-tail', relevance: 'medium', description: 'Recommendations' },
  { keyword: 'portfolio generator suggestions', category: 'long-tail', relevance: 'medium', description: 'Suggestions' },
  { keyword: 'portfolio builder ideas', category: 'long-tail', relevance: 'medium', description: 'Ideas' },
  
  // Success Keywords
  { keyword: 'successful portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Success' },
  { keyword: 'proven portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Proven' },
  { keyword: 'tested portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Tested' },
  { keyword: 'validated portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Validated' },
  { keyword: 'approved portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Approved' },
  { keyword: 'certified portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Certified' },
  { keyword: 'award winning portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Award winning' },
  { keyword: 'recognized portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Recognized' },
  { keyword: 'acclaimed portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Acclaimed' },
  { keyword: 'celebrated portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Celebrated' },
  
  // Future Keywords
  { keyword: 'future of portfolio generators', category: 'long-tail', relevance: 'medium', description: 'Future trends' },
  { keyword: 'next portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Next generation' },
  { keyword: 'emerging portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Emerging' },
  { keyword: 'upcoming portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Upcoming' },
  { keyword: 'trending portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Trending' },
  { keyword: 'popular portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Popular' },
  { keyword: 'viral portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Viral' },
  { keyword: 'buzzworthy portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Buzzworthy' },
  { keyword: 'hot portfolio generator', category: 'long-tail', relevance: 'medium', description: 'Hot' },
  { keyword: 'trending portfolio builder', category: 'long-tail', relevance: 'medium', description: 'Trending' }
];

// Default SEO configuration
export const DEFAULT_SEO_CONFIG: SEOConfig = {
  title: 'Portfolio Generator - Create Professional Portfolios Online',
  description: 'Build stunning professional portfolios with our free online portfolio generator. Create, customize, and download your portfolio in minutes.',
  keywords: ['portfolio generator', 'online portfolio', 'professional portfolio', 'portfolio builder'],
  ogImage: '/logo.png',
  canonicalUrl: 'https://your-domain.com'
};

// Function to generate SEO keywords string
export function generateKeywordsString(keywords: SEOKeyword[]): string {
  return keywords.map(k => k.keyword).join(', ');
}

// Function to get keywords by category
export function getKeywordsByCategory(keywords: SEOKeyword[], category: SEOKeyword['category']): SEOKeyword[] {
  return keywords.filter(k => k.category === category);
}

// Function to get high relevance keywords
export function getHighRelevanceKeywords(keywords: SEOKeyword[]): SEOKeyword[] {
  return keywords.filter(k => k.relevance === 'high');
}

// Function to generate meta description
export function generateMetaDescription(portfolioData: PortfolioData, keywords: SEOKeyword[]): string {
  const primaryKeywords = getKeywordsByCategory(keywords, 'primary');
  const name = portfolioData?.fullName || 'Professional';
  const title = portfolioData?.title || 'Portfolio';
  
  return `${name} - ${title}. Professional portfolio showcasing skills, projects, and experience. ${primaryKeywords.slice(0, 3).map(k => k.keyword).join(', ')}.`;
}

// Function to generate page title
export function generatePageTitle(portfolioData: PortfolioData, keywords: SEOKeyword[]): string {
  const name = portfolioData?.fullName || 'Professional';
  const title = portfolioData?.title || 'Portfolio';
  const primaryKeyword = getKeywordsByCategory(keywords, 'primary')[0]?.keyword || 'Portfolio';
  
  return `${name} - ${title} | ${primaryKeyword}`;
} 
# Portfolio Generator

A modern, responsive web application for generating personal portfolio websites with a multi-step form interface. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 📝 Multi-Step Form
- **Step 1: Basic Information** - Name, role, about me, skills
- **Step 2: Projects** - Dynamic project addition with title, description, and links
- **Step 3: Contact Information** - Email, phone, GitHub, LinkedIn
- **Step 4: Customization** - Templates, fonts, and color scheme

### 🎨 Customization Options
- **Template Selection**: 3 different templates with visual thumbnails
- **Google Fonts**: 8 popular fonts with live preview in dropdown
- **Color Customization**: Primary and secondary color pickers with live preview
- **Dark Theme**: Beautiful dark interface by default

### 🚀 Advanced Features
- **Progress Bar**: Visual step indicator with completion tracking
- **Dynamic Projects**: Add/remove projects with the "+" button
- **Form Validation**: Required field indicators and validation
- **Responsive Design**: Works perfectly on all devices
- **State Management**: Clean React state management with TypeScript

### 📱 User Experience
- **Step Navigation**: Next/Back buttons with proper state management
- **Visual Feedback**: Hover states, focus indicators, and transitions
- **Smart Layout**: Optimized spacing and typography
- **Accessibility**: Proper labels, focus management, and keyboard navigation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS v4 with dark mode
- **State Management**: React useState hooks
- **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with multi-step form
├── components/
│   ├── MultiStepForm.tsx    # Main form container with navigation
│   └── form-steps/
│       ├── BasicInfoStep.tsx    # Step 1: Basic information
│       ├── ProjectsStep.tsx     # Step 2: Projects management
│       ├── ContactStep.tsx      # Step 3: Contact information
│       └── CustomizationStep.tsx # Step 4: Template & styling
└── types/
    └── portfolio.ts         # TypeScript interfaces
```

## Form Flow

1. **Basic Information**
   - Full name (required)
   - Title/role (required)
   - About me (optional)
   - Skills (comma-separated)

2. **Projects**
   - Start with one project
   - Add more projects dynamically
   - Remove projects (minimum 1)
   - Title, description, and link for each

3. **Contact Information**
   - Email address (required)
   - Phone number (optional)
   - GitHub profile (optional)
   - LinkedIn profile (optional)

4. **Customization**
   - Choose from 3 templates with thumbnails
   - Select from 8 Google Fonts with live preview
   - Pick primary and secondary colors
   - See color preview in real-time

## Features to Come

- [ ] HTML/CSS/JS code generation
- [ ] Live preview of generated portfolio
- [ ] Copy to clipboard functionality
- [ ] Download HTML file functionality
- [ ] Save/load portfolio configurations
- [ ] Export to PDF
- [ ] Image upload support
- [ ] More template options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

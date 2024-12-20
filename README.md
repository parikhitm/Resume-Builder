# Resume Generator

## Overview
A dynamic React-based resume builder application with real-time preview and multiple export formats.

## Features 🚀
### Core Functionality
 - ⚡ Real-time preview
 - 📤 Multiple export formats (PDF, DOC, TXT, PNG)
 - 📝 Customizable sections
 - 🎨 Modern, responsive design
### Export Options
 - ```PDF``` - Professional document format
 - ```DOC``` - Microsoft Word compatible
 - ```TXT``` - Plain text version
 - ```PNG``` - Image snapshot

## Tech Stack 💻
```
- React 18
- Vite
- CSS Modules
- Material Design Icons
- React Icons
- html2pdf.js
- html2canvas
- file-saver
```

## Usage
1. Fill in your personal information in the General Info section
2. Add your educational background using the Education section
3. Include your work experience in the Practical Experience section
4. Use the real-time preview to check your resume's appearance
5. Export your resume in your preferred format using the "Export As" button

## Quick Start 🚀
```
# Clone repository
git clone <repository-url>

# Navigate to project
cd resume-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts 📝
```
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Code linting
npm run preview  # Production preview
```

## Project Structure 🗂️
```
resume-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── CV.jsx
│   │   ├── CVDisplay.jsx
│   │   ├── Education.jsx
│   │   ├── GeneralInfo.jsx
│   │   └── PracticalExperience.jsx
│   ├── styles/
│   │   ├── CV.css
│   │   ├── CVDisplay.css
│   │   ├── Education.css
│   │   ├── GeneralInfo.css
│   │   └── PracticalExperience.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Features Detail 📋
1. General Information
 - Full Name
 - Email Address
 - Phone Number
 - Location
2. Education Section
 - School/University Name
 - Degree/Certificate
 - Start/End Dates
 - Location
3. Professional Experience
 - Company Name
 - Position
 - Employment Period
 - Location
 - Job Description

---
Made with ❤️ using React and Vite
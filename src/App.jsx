import React, { useState } from 'react';
import CV from './components/CV';
import './App.css'
import CVDisplay from './components/CVDisplay';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [education, setEducation] = useState([]);

  const [practicalExperience, setPracticalExperience] = useState([]);

  const handleClearResume = () => {
    setGeneralInfo({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setEducation([]);
    setPracticalExperience([]);
  };

  const handleLoadExample = () => {
    setGeneralInfo({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: 'New York City, US',
    });
    setEducation([
      {
        schoolName: "School of Boston",
        degree: "Bachelor of Science",
        startDate: "08/2018",
        endDate: "09/2022",
        location: "Boston, MA",
        id: 1, // unique identifier for each entry
    }, {
        schoolName: "London City University",
        degree: "Master Bachelor of Science",
        startDate: "08/2016",
        endDate: "07/2018",
        location: "New York City, US",
        id: 2,
    }, 
    ]);
    setPracticalExperience([
      {
        companyName: "Softech Inc.",
        position: "Senior Software Developer",
        startDate: "09/2022",
        endDate: "Present",
        location: "San Francisco, CA",
        description: "Description of your role and responsibilities",
        id: 1, // unique identifier for each entry
      }, {
        companyName: "Goldman Auto Inc.",
        position: "Junior Software Developer",
        startDate: "10/2018",
        endDate: "07/2022",
        location: "New York, NY",
        description: "Description of your role and responsibilities",
        id: 2,
      }, 
    ]);
  };





  const handleExport = async (format) => {
    const element = document.querySelector(".cv-display-container");
    
    try {
      switch(format) {
        case 'pdf':
          const dimensions = getPageDimensions();
          const pdfOptions = {
            margin: 0,
            filename: 'my-resume.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
              scale: 2,
            width: element.offsetWidth,
            height: element.offsetHeight,
            windowWidth: element.offsetWidth,
            windowHeight: element.offsetHeight,
            useCORS: true,
            logging: true,
            letterRendering: true,
            },
            jsPDF: {
              unit: 'px', 
            format: [element.offsetWidth, element.offsetHeight],
            orientation: 'portrait',
            hotfixes: ["px_scaling"]
            }
          };


          const originalStyle = element.style.transform;
        element.style.transform = 'none';


          await html2pdf().set(pdfOptions).from(element).save().then(() => {
            // Restore original style
            element.style.transform = originalStyle;
          });
          break;
  
        case 'png':
          const canvas = await html2canvas(element, { scale: 2 });
          canvas.toBlob((blob) => {
            saveAs(blob, 'my-resume.png');
          });
          break;
  
        case 'txt':
          const text = generatePlainText();
          const textBlob = new Blob([text], {type: 'text/plain;charset=utf-8'});
          saveAs(textBlob, 'my-resume.txt');
          break;
  
        case 'doc':
          const htmlContent = element.innerHTML;
          const docContent = `
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  ${getComputedStyles()}
                </style>
              </head>
              <body>
                ${htmlContent}
              </body>
            </html>
          `;
          const docBlob = new Blob([docContent], {type: 'application/msword'});
          saveAs(docBlob, 'my-resume.doc');
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export. Please try again.');
    }
  };
  
  // Helper function to generate plain text version
  const generatePlainText = () => {
    return `
      ${generalInfo.name}
      ${generalInfo.email} | ${generalInfo.phone} | ${generalInfo.address}
  
      EDUCATION
      ${education.map(edu => (
        `${edu.schoolName}
         ${edu.degree}
         ${edu.startDate} - ${edu.endDate}
         ${edu.location}`
      )).join('\n\n')}
  
      EXPERIENCE
      ${practicalExperience.map(exp => (
        `${exp.companyName}
         ${exp.position}
         ${exp.startDate} - ${exp.endDate}
         ${exp.location}
         ${exp.description}`
      )).join('\n\n')}
    `.trim();
  };
  
  // Helper function to get computed styles
  const getComputedStyles = () => {
    const styles = Array.from(document.styleSheets)
      .map(sheet => Array.from(sheet.cssRules))
      .flat()
      .map(rule => rule.cssText)
      .join('\n');
    return styles;
  };

  const getPageDimensions = () => {
    const element = document.querySelector(".cv-display-container");
    // A4 dimensions in pixels at 96 DPI
    return {
      width: 794, // A4 width in pixels
      height: 1123, // A4 height in pixels
      element: {
        width: element.offsetWidth,
        height: element.offsetHeight
      }
    };
  };





  const handleGeneralInfoChange = (onGeneralInfoChange) => {
    setGeneralInfo(onGeneralInfoChange);
  };

  const handleEducationChange = (onEducationChange) => {
    setEducation(onEducationChange);
  };

  const handlePracticalExperienceChange = (onPracticalExperience) => {
    setPracticalExperience(onPracticalExperience);
  };


  return (
    <div className='App'>
      <CV onGeneralInfoChange={handleGeneralInfoChange} onEducationChange={handleEducationChange} onPracticalExperienceChange={handlePracticalExperienceChange}  generalInfo={generalInfo} education={education} practicalExperience={practicalExperience} handleClearResume={handleClearResume} handleLoadExample={handleLoadExample} handleExport={handleExport}/>
      <CVDisplay generalInfo={generalInfo} education={education} practicalExperience={practicalExperience}/>
    </div>
  )
}

export default App;

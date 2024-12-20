import React, { useState } from 'react';
import GeneralInfo from './GeneralInfo';
import Education from './Education';
import PracticalExperience from './PracticalExperience';
import '../styles/CV.css';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { BiExport } from "react-icons/bi";

function CV({ onGeneralInfoChange, onEducationChange, onPracticalExperienceChange, generalInfo, education, practicalExperience, handleClearResume, handleLoadExample, handleExport }) {


    const [showExportOptions, setShowExportOptions] = useState(false);

    const toggleExportOptions = () => {
        setShowExportOptions(!showExportOptions);
    }


    return (
        <div className='cv-container'>
            <div className='resume-buttons'>
                <button className='clear-resume-button' onClick={handleClearResume}><Icon path={mdiDelete} size={0.8} /> Clear Resume</button>
                <button className='load-example-button' onClick={handleLoadExample}>Load Example</button>
                <div className="export-dropdown">
                    <button className='export-button' onClick={toggleExportOptions}><BiExport size={18} /> Export As</button>
                    <div className={`export-options ${showExportOptions ? 'show' : ''}`}>
                        <button style={{margin: "0", borderRadius: "6px 6px 0 0"}} onClick={() => {handleExport('pdf'); setShowExportOptions(false);}}>PDF</button>
                        <button onClick={() => {handleExport('doc'); setShowExportOptions(false);}}>DOC</button>
                        <button onClick={() => {handleExport('txt'); setShowExportOptions(false);}}>Text</button>
                        <button style={{borderRadius: "0 0 6px 6px"}} onClick={() => {handleExport('png'); setShowExportOptions(false);}}>Image</button>
                    </div>
                </div>
            </div>
            <div className='cv-input-container'>
                <GeneralInfo onGeneralInfoChange={onGeneralInfoChange} initialData={generalInfo} />
                <Education onEducationChange={onEducationChange} initialData={education} />
                <PracticalExperience onPracticalExperienceChange={onPracticalExperienceChange} initialData={practicalExperience} />
            </div>
        </div>
    );
}

export default CV;
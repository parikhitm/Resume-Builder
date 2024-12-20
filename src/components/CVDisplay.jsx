import React from "react";
import "../styles/CVDisplay.css";
import Icon from '@mdi/react';
import { mdilEmail } from '@mdi/light-js';
import { mdiPhone, mdiMapMarker } from '@mdi/js';

function CVDisplay({ generalInfo, education, practicalExperience }) {
    return (
        <div className="cv-display-container">
            <div className="personal-info-display">
                <h1>{generalInfo?.name}</h1>
                <div className="contact-info-display">
                    {generalInfo.email && (
                        <div>
                            <Icon path={mdilEmail} size={1} color="white" />
                            <span>{generalInfo?.email}</span>
                        </div>)}
                    {generalInfo.phone && (<div>
                        <Icon path={mdiPhone} size={1} color="white" />
                        <span>{generalInfo.phone}</span>
                    </div>)}
                    {generalInfo.address && (<div>
                        <Icon path={mdiMapMarker} size={1} color="white" />
                        <span>{generalInfo.address}</span>
                    </div>)}
                </div>
            </div>
            <div className="education-and-experience-info-display">
                <div className="education-info-section">
                    <h2>Education</h2>
                    {education?.map((edu, index) => (
                        <div key={index} className="education-details-display">
                            <div style={{width: "20%"}}>
                                <span>{edu.startDate} - {edu.endDate}</span>
                                <span>{edu.location}</span>
                            </div>
                            <div style={{width: "65%"}}>
                                <h3>{edu.schoolName}</h3>
                                <span>{edu.degree}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="practical-experience-section">
                    <h2>Practical Experience</h2>
                    {practicalExperience?.map((exp, index) => (
                        <div key={index} className="practical-experience-details-display">
                            <div style={{width: "20%"}}>
                                <span>{exp.startDate} - {exp.endDate}</span>
                                <span>{exp.location}</span>
                            </div>
                            <div style={{width: "76%"}}>
                                <h3>{exp.companyName}</h3>
                                <span>{exp.position}</span>
                                <span>{exp.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CVDisplay;
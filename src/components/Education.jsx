import React, { useState, useEffect } from "react";
import '../styles/Education.css';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";


function Education({ initialData, onEducationChange }) {
    const [educationList, setEducationList] = useState(initialData?.educationList || [{
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
    },]);

    useEffect(() => {
        // Only call onEducationChange if educationList is different from initialData
        if (typeof onEducationChange === 'function' &&
            JSON.stringify(educationList) !== JSON.stringify(initialData?.educationList || [])) {
            onEducationChange(educationList);
        }
    }, [educationList]);



    const handleEducationChange = (index, field, value) => {
        const updatedList = educationList.map((education, i) => {
            if (i === index) {
                return { ...education, [field]: value };
            }
            return education;
        });
        setEducationList(updatedList);
    };

    const removeEducation = (index) => {
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
    };

    const [editingId, setEditingId] = useState(null);

    const editEducation = (id) => {
        setEditingId(id);
    };

    // At the top of both components, after useState declarations:
    const [nextId, setNextId] = useState(3); // Start after initial items (1,2)

    const handleCancel = (id) => {
        //Remove the entry if it was new and empty
        if (id ===editingId) {
            const entry = educationList.find(edu => edu.id ===id);
            if (!entry.schoolName && !entry.degree && !entry.startDate && !entry.endDate && !entry.location) {
                setEducationList(educationList.filter(edu => edu.id !== id));
            }
        }
        setEditingId(null);
    };

    return (
        <div className="education-form">
            <h2>Education</h2>
            {educationList.map((education, index) => (
                <div key={education.id} className="education-entries">
                    {editingId === education.id ? (
                        //Edit Mode
                        <div className="education-entry-edit">
                            <div className="form-group">
                                <label htmlFor={`schoolName-${index}`}>School Name:</label>
                                <input type="text" id={`schoolName-${index}`} value={education.schoolName} onChange={(e) => handleEducationChange(index, "schoolName", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`degree-${index}`}>Degree:</label>
                                <input type="text" id={`degree-${index}`} value={education.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} />
                            </div>
                            <div style={{ display: "flex", gap: "5%", flexWrap: "nowrap", marginBottom: "10px" }}>
                                <div className="form-group" style={{ width: "47%" }}>
                                    <label htmlFor={`startDate-${index}`}>Start Date:</label>
                                    <input type="text" id={`startDate-${index}`} value={education.startDate} onChange={(e) => handleEducationChange(index, "startDate", e.target.value)} />
                                </div>
                                <div className="form-group" style={{ width: "47%" }}>
                                    <label htmlFor={`endDate-${index}`}>End Date:</label>
                                    <input type="text" id={`endDate-${index}`} value={education.endDate} onChange={(e) => handleEducationChange(index, "endDate", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor={`location-${index}`}>Location:</label>
                                <input type="text" id={`location-${index}`} value={education.location} onChange={(e) => handleEducationChange(index, "location", e.target.value)} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", gap: "30px", marginTop: "10px" }}>
                                <button type="button" onClick={() => handleCancel(education.id)} className="cancel-education-button">Cancel</button>
                                <button type="button" onClick={() => setEditingId(null)} className="save-education-button">Save</button>
                            </div>
                        </div>) : (
                        //Display Mode
                        <>
                            <p>{education.schoolName}</p>
                            <div className="education-entries-buttons">
                                <FaEdit style={{ width: "22px", height: "22px", cursor: "pointer" }} type="button" onClick={() => editEducation(education.id)} />
                                <MdOutlineDelete style={{ width: "24px", height: "24px", cursor: "pointer" }} type="button" onClick={() => removeEducation(index)} />
                            </div>
                        </>
                    )}
                </div>
            ))}
            <div className="add-education-button-div">
                <button type="button" onClick={() => {
                    setEducationList([...educationList, {
                        schoolName: "",
                        degree: "",
                        startDate: "",
                        endDate: "",
                        location: "",
                        id: nextId,
                    }]);
                    setEditingId(nextId);
                    setNextId(nextId + 1);
                }} className="add-education-button"><IoMdAdd style={{ width: "18px", height: "18px" }} />Education</button>
            </div>
        </div>
    )
}

export default Education;
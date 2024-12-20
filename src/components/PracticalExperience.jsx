import React, { useState, useEffect } from "react";
import '../styles/PracticalExperience.css';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function PracticalExperience({ initialData, onPracticalExperienceChange }) {
  const [practicalExperienceList, setPracticalExperienceList] = useState(initialData?.practicalExperienceList || [{
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
  },]);


  useEffect(() => {
    if (typeof onPracticalExperienceChange === "function") {
      // Only update if the values are different from initialData
      if (JSON.stringify(practicalExperienceList) !== JSON.stringify(initialData?.practicalExperienceList)) {
        onPracticalExperienceChange(practicalExperienceList);
      }
    }
  }, [practicalExperienceList]);

  const handlePracticalExperienceChange = (index, field, value) => {
    const updatedList = practicalExperienceList.map((practicalExperience, i) => {
      if (i === index) {
        return { ...practicalExperience, [field]: value };
      }
      return practicalExperience;
    });
    setPracticalExperienceList(updatedList);
  };

  const removePracticalExperience = (index) => {
    const updatedList = practicalExperienceList.filter((_, i) => i !== index);
    setPracticalExperienceList(updatedList);
  };

  const [editingId, setEditingId] = useState(null);

  const editPracticalExperience = (id) => {
    setEditingId(id);
  };

  // At the top of both components, after useState declarations:
  const [nextId, setNextId] = useState(3); // Start after initial items (1,2)

  const handleCancel = (id) => {
    //Remove the entry if it was new and empty
    if (id === editingId) {
        const entry = practicalExperienceList.find(exp => exp.id ===id);
        if (!entry.companyName && !entry.position && !entry.startDate && !entry.endDate && !entry.location) {
            setPracticalExperienceList(practicalExperienceList.filter(exp => exp.id !== id));
        }
    }
    setEditingId(null);
};


  return (
    <div className="practical-experience-form">
      <h2>Experience</h2>
      {practicalExperienceList.map((practicalExperience, index) => (
        <div key={practicalExperience.id} className="practical-experience-entry">
          {editingId === practicalExperience.id ? (
            // Editing Mode
            <div key={practicalExperience.id} className="practical-experience-entry-edit">
              <div className="form-group">
                <label htmlFor={`companyName-${index}`}>Company Name:</label>
                <input type="text" id={`companyName-${index}`} value={practicalExperience.companyName} onChange={(e) => handlePracticalExperienceChange(index, "companyName", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor={`position-${index}`}>Position:</label>
                <input type="text" id={`position-${index}`} value={practicalExperience.position} onChange={(e) => handlePracticalExperienceChange(index, "position", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor={`startDate-${index}`}>Start Date:</label>
                <input type="text" id={`startDate-${index}`} value={practicalExperience.startDate} onChange={(e) => handlePracticalExperienceChange(index, "startDate", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor={`endDate-${index}`}>End Date:</label>
                <input type="text" id={`endDate-${index}`} value={practicalExperience.endDate} onChange={(e) => handlePracticalExperienceChange(index, "endDate", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor={`location-${index}`}>Location:</label>
                <input type="text" id={`location-${index}`} value={practicalExperience.location} onChange={(e) => handlePracticalExperienceChange(index, "location", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description:</label>
                <textarea id={`description-${index}`} style={{resize: "none"}} rows={6} value={practicalExperience.description} onChange={(e) => handlePracticalExperienceChange(index, "description", e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", gap: "30px", marginTop: "10px" }}>
                <button type="button" onClick={() => handleCancel(practicalExperience.id)} className="cancel-practical-experience-button">Cancel</button>
                <button type="button" onClick={() => setEditingId(null)} className="save-practical-experience-button">Save</button>
              </div>
            </div>
          ) : (
            // Display Mode
            <>
            <p>{practicalExperience.companyName}</p>
            <div className="practical-experience-entries-button">
            <FaEdit style={{ width: "22px", height: "22px", cursor: "pointer" }} type="button" onClick={() => editPracticalExperience(practicalExperience.id)} />
            <MdOutlineDelete style={{ width: "24px", height: "24px", cursor: "pointer" }} type="button" onClick={() => removePracticalExperience(index)} />
            </div>
            </>
          )}
        </div>
      ))}
      <div className="add-practical-experience-button-div">
      <button type="button" onClick={() => {
        setPracticalExperienceList([...practicalExperienceList, {
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
          id: nextId,
        }]);
        setEditingId(nextId);
        setNextId(nextId + 1);
      }} className="add-practical-experience-button"><IoMdAdd style={{ width: "18px", height: "18px" }} />Experience</button>
      </div>
    </div>
  )
}

export default PracticalExperience;
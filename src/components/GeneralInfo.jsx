import React, { useState, useEffect } from "react";
import '../styles/GeneralInfo.css';

function GeneralInfo({ onGeneralInfoChange, initialData }) {
    const [name, setName] = useState(initialData?.name || "John Doe");
    const [email, setEmail] = useState(initialData?.email || "john.doe@example.com");
    const [phone, setPhone]  = useState(initialData?.phone || "123-456-7890");
    const [address, setAddress] = useState(initialData?.address || "New York City, NY");


    useEffect(() => {
        if (typeof onGeneralInfoChange === 'function') {
            // Only update if the values are different from initialData
            if (name !== initialData?.name || 
                email !== initialData?.email || 
                phone !== initialData?.phone ||
                address !== initialData?.address) {
                onGeneralInfoChange({ name, email, phone, address });
            }
        }
    }, [name, email, phone, address]); // Removed onGeneralInfoChange from dependencies



    return (
        <form className="general-info-form">
            <h2>Personal Information</h2>
            <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
        </form>
    )
}

export default GeneralInfo;
// src/components/InterestForm.jsx
import React, { useState } from 'react';
import styles from './InterestForm.module.css';

const InterestForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    secretPin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Special handler for the formatted PIN
  const handlePinChange = (e) => {
    // Remove all non-digit characters
    const cleanValue = e.target.value.replace(/\D/g, '');
    // Limit to 16 digits
    const truncatedValue = cleanValue.slice(0, 16);
    
    // Add dashes every 4 characters
    const formattedValue = truncatedValue.match(/.{1,4}/g)?.join('-') || '';

    setFormData((prevData) => ({
      ...prevData,
      secretPin: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the raw digits by removing dashes and other non-digit characters
    const cleanPin = formData.secretPin.replace(/\D/g, '');

    // Check if the length is not 16
    if (cleanPin.length !== 16) {
      alert('Validation Error: The secret PIN must contain exactly 16 digits.');
      return; // Stop the function from proceeding
    }

    // If validation passes, the rest of the code will run
    console.log('Air Fryer Interest Form Submission:', formData);
    alert('Thank you! Your interest has been submitted. Check the console for data.');
};

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Be the First to Know      </h1>
      <p className={styles.subtitle}>Sign up to get notified when the new Spidr Air Fryer drops.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="costGuess">Guess the air fryer’s cost ($)</label>
          <input type="number" id="costGuess" name="costGuess" value={formData.costGuess} onChange={handleChange} placeholder="0.00" min="0" step="0.01" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="secretPin">Secret 16-digit Spidr PIN</label>
          <input type="text" id="secretPin" name="secretPin" value={formData.secretPin} onChange={handlePinChange} placeholder="####-####-####-####" maxLength="19" required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Notify Me
        </button>
        
      </form>
      
    </div>
    
  );
};

export default InterestForm;
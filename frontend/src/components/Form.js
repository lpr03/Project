import React, { useState, useEffect } from "react";
import axios from "axios";
import './Form.css'; 

function Form({ formType }) {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setName(data.name);
      setCountryCode(data.countryCode);
      setPhoneNumber(data.phoneNumber);
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!name.match(/^[A-Za-z]+$/)) {
      errors.name = "Name must contain only alphabets";
      valid = false;
    }

    if (!countryCode) {
      errors.countryCode = "Please select a country code";
      valid = false;
    }

    if (!phoneNumber.match(/^[0-9]+$/)) {
      errors.phoneNumber = "Phone number must be numeric";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      const formData = { name, countryCode, phoneNumber, formType };
      console.log("Submitting data:", formData); // Debugging log
      localStorage.setItem("formData", JSON.stringify(formData));
      setLoading(true);

      axios.post("http://localhost:5000/submit", formData)
        .then(() => {
          alert("Form submitted successfully");
          setName("");
          setCountryCode("");
          setPhoneNumber("");
        })
        .catch(err => {
          console.error("Form submission error:", err);
          alert("Error submitting form");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="form-container">
      <h1>{formType === "A" ? "Form A" : "Form B"}</h1>
      <form className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className={`form-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className={`form-select ${errors.countryCode ? 'error' : ''}`}
        >
          <option value="">Select Country Code</option>
          <option value="+1">+1</option>
          <option value="+91">+91</option>
        </select>
        {errors.countryCode && <p className="error-message">{errors.countryCode}</p>}

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
        />
        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

        <button type="button" onClick={handleSubmit} disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Form;

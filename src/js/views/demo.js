// demo.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const AddContactForm = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch to send data to the backend
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
      });

      const data = await response.json();

      // Once the data is successfully added to the backend, update the local state
      actions.addContact(data.data);

      setContactInfo({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        email: ""
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={contactInfo.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={contactInfo.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={contactInfo.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={contactInfo.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block AddContactBtn">
          Add Contact
        </button>
      </form>

      <Link to="/" className="text-primary text-decoration-underline">
        or get back to contacts
      </Link>
    </div>
  );
};

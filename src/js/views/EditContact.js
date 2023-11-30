// EditContact.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/editContact.css"; // You can create a separate CSS file for styling if needed

const EditContact = () => {
  const { store, actions } = useContext(Context);
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [editedContact, setEditedContact] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  // Fetch contact details based on the contactId when the component mounts
  useEffect(() => {
    const contactDetails = store.contacts.find(
      (contact) => contact.id === parseInt(contactId, 10)
    );

    if (contactDetails) {
      setEditedContact({
        firstName: contactDetails.firstName,
        lastName: contactDetails.lastName,
        address: contactDetails.address,
        phoneNumber: contactDetails.phoneNumber,
        email: contactDetails.email
      });
    }
  }, [store.contacts, contactId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    actions.updateContact(contactId, editedContact);
    navigate("/");
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
            value={editedContact.firstName}
            onChange={handleInputChange}
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
            value={editedContact.lastName}
            onChange={handleInputChange}
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
            value={editedContact.address}
            onChange={handleInputChange}
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
            value={editedContact.phoneNumber}
            onChange={handleInputChange}
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
            value={editedContact.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContact;

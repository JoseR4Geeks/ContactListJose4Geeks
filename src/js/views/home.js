// home.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faPencil,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../styles/home.css";

const imageUrl = 'https://picsum.photos/130/130';

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleEditContact = (contact) => {
    navigate(`/edit/${contact.id}`);
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      actions.deleteContact(contactToDelete.id);
      setContactToDelete(null);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setContactToDelete(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-2 ContactButton">
        <Link to="/demo">
          <button className="btn btn-success">Add new contact</button>
        </Link>
      </div>
      <div>
        <ul>
          {store.contacts.map((contact) => (
            <li key={contact.id}>
              <img src={imageUrl} alt="Description of the image" />
              <div className="contact-text">
                <h6>
                  {contact.firstName} {contact.lastName}
                </h6>
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#ababab" }}
                    className="FaIcon"
                  />
                  {contact.address}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#ababab" }}
                    className="FaIcon"
                  />
                  {contact.phoneNumber}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "#ababab" }}
                    className="FaIcon"
                  />
                  {contact.email}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faPencil}
                className="Pencil"
                onClick={() => handleEditContact(contact)}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="TrashCan"
                onClick={() => handleDeleteContact(contact)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this contact?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const express = require("express");
const cors = require("cors"); // Import the cors middleware
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3001;

// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());

// Read contacts from JSON file
const readContacts = () => {
  const contactsData = fs.readFileSync("contacts.json", "utf8");
  return JSON.parse(contactsData);
};

// Write contacts to JSON file
const writeContacts = (contacts) => {
  fs.writeFileSync("contacts.json", JSON.stringify(contacts, null, 2), "utf8");
};

// Get all contacts
app.get("/contacts", (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// Add a new contact
app.post("/contacts", (req, res) => {
  const contacts = readContacts();
  const newContact = req.body;
  newContact.id = contacts.length + 1;
  contacts.push(newContact);
  writeContacts(contacts);
  res.json(newContact); // Send the newly added contact as the response
});

// Update a contact
app.put("/contacts/:id", (req, res) => {
  const contacts = readContacts();
  const updatedContact = req.body;
  const contactId = parseInt(req.params.id, 10);

  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...updatedContact } : contact
  );

  writeContacts(updatedContacts);
  res.json(updatedContact);
});

// Delete a contact
app.delete("/contacts/:id", (req, res) => {
  const contacts = readContacts();
  const contactId = parseInt(req.params.id, 10);

  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

  writeContacts(updatedContacts);
  res.json({ message: "Contact deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// flux.js

const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		contacts: [
		  {
		  }
		]
	  },
	  actions: {
		addContact: (contact) => {
		  const store = getStore();
		  const newContact = { ...contact, id: store.contacts.length + 1 };
		  const updatedContacts = [...store.contacts, newContact];
		  setStore({ contacts: updatedContacts });
		},
		deleteContact: async (contactId) => {
		  try {
			const store = getStore();
			const updatedContacts = store.contacts.filter(
			  (contact) => contact.id !== contactId
			);
  
			// Update the backend to reflect the deletion
			await fetch(`http://localhost:3001/contacts/${contactId}`, {
			  method: "DELETE"
			});
  
			setStore({ contacts: updatedContacts });
		  } catch (error) {
			console.error("Error deleting contact:", error);
		  }
		},
		updateContact: async (contactId, updatedContact) => {
		  try {
			const store = getStore();
			const updatedContacts = store.contacts.map((contact) =>
			  contact.id === parseInt(contactId, 10)
				? { ...contact, ...updatedContact }
				: contact
			);
  
			// Update the backend to reflect the changes
			await fetch(`http://localhost:3001/contacts/${contactId}`, {
			  method: "PUT",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify(updatedContact)
			});
  
			setStore({ contacts: updatedContacts });
		  } catch (error) {
			console.error("Error updating contact:", error);
		  }
		},
		fetchContacts: async () => {
		  try {
			const response = await fetch("http://localhost:3001/contacts");
			const data = await response.json();
			setStore({ contacts: data });
		  } catch (error) {
			console.error("Error fetching contacts:", error);
		  }
		},
		
	  }
	};
  };
  
  export default getState;
  
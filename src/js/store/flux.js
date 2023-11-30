// flux.js
const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		contacts: [
		  
		]
	  },
	  actions: {
		addContact: (contact) => {
		  const store = getStore();
		  const newContact = { ...contact, id: store.contacts.length + 1 };
		  const updatedContacts = [...store.contacts, newContact];
		  setStore({ contacts: updatedContacts });
		},
		deleteContact: (contactId) => {
		  const store = getStore();
		  const updatedContacts = store.contacts.filter(
			(contact) => contact.id !== contactId
		  );
		  setStore({ contacts: updatedContacts });
		},
		updateContact: (contactId, updatedContact) => {
		  const store = getStore();
		  const updatedContacts = store.contacts.map((contact) =>
			contact.id === parseInt(contactId, 10)
			  ? { ...contact, ...updatedContact }
			  : contact
		  );
		  setStore({ contacts: updatedContacts });
		}
		// Add other actions as needed
	  }
	};
  };
  
  export default getState;
  
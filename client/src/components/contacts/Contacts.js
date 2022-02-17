import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
	const { contacts, filtered } = useContext(ContactContext);

	if (contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<Fragment>
			{/* Conditionally render filtered contacts, or the full contacts list */}
			{filtered !== null
				? filtered.map(contact => (
						<ContactItem key={contact.id} contact={contact} />
				  ))
				: contacts.map(contact => (
						<ContactItem key={contact.id} contact={contact} />
				  ))}
		</Fragment>
	);
};

export default Contacts;

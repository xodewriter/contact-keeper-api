import React, { Fragment, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	}

	// Separate component to keep DRY for a cleaner return()
	const getContactList = contactArray => {
		return (
			<TransitionGroup className='contact-list'>
				{contactArray.map(contact => {
					const itemRef = React.createRef();
					return (
						<CSSTransition
							nodeRef={itemRef}
							key={contact.id}
							classNames='item'
							timeout={667}>
							<div ref={itemRef}>
								<ContactItem contact={contact} />
							</div>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		);
	};

	return (
		<Fragment>
			{filtered ? getContactList(filtered) : getContactList(contacts)}
		</Fragment>
	);
};

export default Contacts;

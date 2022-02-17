import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const initialState = {
	name: '',
	email: '',
	phone: '',
	type: 'personal',
};

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const { addContact, updateContact, current, clearCurrent } = contactContext;

	const [contact, setContact] = useState(initialState);

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact(initialState);
		}
	}, [current]);

	const { name, email, phone, type } = contact;

	// Event Handlers

	const onChange = e =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		if (current === null) {
			addContact(contact);
		} else {
			// Contact is from "state" of the form
			updateContact(contact);
		}

		// Clears, resets form
		setContact(initialState);
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional{' '}
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<input
						type='button'
						value='Clear'
						className='btn btn-light btn-block'
						onClick={clearAll}
					/>
				</div>
			)}
		</form>
	);
};

export default ContactForm;

import React, {Fragment, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if(contacts.length === 0) {
        return <h3>Please use the form to add a contact.</h3>
    }

    return (
        <Fragment>
            {filtered !== null ?
                filtered.map( contact => (
                    <ContactItem key={contact._id} contact={contact} />
                    )) :
                contacts.map( contact => (
                     <ContactItem key={contact._id} contact={contact} />
                    ))
                }
        </Fragment>
    )
}

export default Contacts

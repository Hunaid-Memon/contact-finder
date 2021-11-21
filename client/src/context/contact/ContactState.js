import React, { useReducer } from "react";
// import { v4 as uuidv4 } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../type';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Hunaid",
                email: "hunaid@gmail.com",
                phone: "1313-1313-122",
                type: "professional"
            },
            {
                id: 2,
                name: "Yousuf",
                email: "yousuf@gmail.com",
                phone: "3434-1313-122",
                type: "personal"
            },
            {
                id: 3,
                name: "Hadi",
                email: "Hadi@gmail.com",
                phone: "3434-3234-122",
                type: "personal"
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = 222;
        dispatch({ type: ADD_CONTACT, payload: contact })

    }


    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter COntacts

    // Clear Filter

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;
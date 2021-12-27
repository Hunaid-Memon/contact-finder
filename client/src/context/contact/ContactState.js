import React, { useReducer } from "react";
import contactContext from './contactContext';
import axios from 'axios'
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../type';

const ContactState = props => {
    const initialState = {
        contacts: null,
            // {
            //     id: 1,
            //     name: "Hunaid",
            //     email: "hunaid@gmail.com",
            //     phone: "1313-1313-122",
            //     type: "professional"
            // },
            // {
            //     id: 2,
            //     name: "Yousuf",
            //     email: "yousuf@gmail.com",
            //     phone: "3434-1313-122",
            //     type: "personal"
            // },
            // {
            //     id: 3,
            //     name: "Hadi",
            //     email: "Hadi@gmail.com",
            //     phone: "3434-3234-122",
            //     type: "personal"
            // }
        
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data })
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    // Add Contact
    const addContact = async contact => {
        // contact.id = uuidv4();
        const config = {
            headers: {
                'Content-Types': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }

    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    // Filter COntacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;
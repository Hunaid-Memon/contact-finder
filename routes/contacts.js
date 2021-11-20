const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth')

const User = require('../models/User');
const Contact = require('../models/Contact');


// @route   GET api/contacts
// @desc    Get all the user's contact
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        })
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   POST api/contacts
// @desc    Add a new contacts
// @access  Private

router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
] ] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body;

    try {

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.json(contact)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    
    const { name, email, phone, type } = req.body;

    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id)

        // Check if the contact exist
        if(!contact) return res.status(404).json({ msg: 'This contact does not exist.' })

        // If the contact exist, then make sure the currently sign in user owns the user
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You do not have the correct authorization to update this contact.' });
        }

        // Update contact if above condition pass
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
            );

        // Return the contact update
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' })
    }
})

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth , async (req, res) => {
    
    try {
        let contact = await Contact.findById(req.params.id)

        // Check if the contact exist
        if(!contact) return res.status(404).json({ msg: 'This contact does not exist.' })

        // If the contact exist, then make sure the currently sign in user owns the user
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You do not have the correct authorization to update this contact.' });
        }

        // Find and remove the contact from MongoDB
        await Contact.findByIdAndRemove(req.params.id)

        // Return a confirmation message
        res.json({ msg: 'This contact has been removed'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' })
    }
})

module.exports = router;
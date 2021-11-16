const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get the logged in user
// @access  Private

router.get('/', (req, res) => {
    res.send('Get the logged in user')
})

// @route   POST api/auth
// @desc    Authorized user and get the token
// @access  Public

router.post('/', (req, res) => {
    res.send('Login the user')
})

module.exports = router;
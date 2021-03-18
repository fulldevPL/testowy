const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Logowanie użytkownika
// @access  Private
router.get('/', (req, res) => {
  res.send('Logowanie uzytkownika');
});

// @route   POST api/auth
// @desc    Autoryzaja uzytkownika  i pobranie tokena
// @access  Public
router.post('/', (req, res) => {
  res.send('Logowanie użytkownika');
});

module.exports = router;

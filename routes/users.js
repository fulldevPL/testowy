const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Rejestracja użytkownika
// @access  public
router.post('/', (req, res) => {
  res.send('Rejestracja uzytkownika');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Rejestracja użytkownika
// @access  public
router.post(
  '/',
  [
    check('name', 'Imię jest wymagane').not().isEmpty(),
    check('email', 'Proszę wpisać email').isEmail(),
    check('password', 'Hasło powinno składać sie z min 6 znaków').isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

module.exports = router;

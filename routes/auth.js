const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Autentykacja użytkownika(Pobranie danych użytkownika rozkodowanych z tokena)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   POST api/auth
// @desc    Autoryzaja Logowanie użytkownika  i pobranie tokena
// @access  Public
router.post(
  '/',
  [
    check('email', 'Proszę wpisać poprawany email').isEmail(),
    check('password', 'Hasło jest wymagane').exists(),
  ],
  async (req, res) => {
    // Informacja zwrotna błędu walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destrukturyzacja zwrotna z body
    const { email, password } = req.body;

    try {
      // Wyszukanie użytkownika w bazie
      let user = await User.findOne({ email });

      // NEGATYWNY Informacja zwrotna o braku użytkownika z bazie
      if (!user) {
        return res.status(400).json({ msg: 'Nipoprawne dane logowania' });
      }
      // Rozkodowanie hasłą
      const isMatch = await bcrypt.compare(password, user.password);

      // NEGATYWNY Informacja zwrotna o błędnym haśle
      if (!isMatch) {
        return res.status(400).json({ msg: 'Nipoprawne dane logowania' });
      }
      // POZYTYW Informacja zwrotna TOKEN
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

module.exports = router;

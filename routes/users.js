const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
  async (req, res) =>
  {
    // Informacja zwrotna błędu walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destrukturyzacja zwrotna z body
    const { name, email, password } = req.body;

    try {
      // Sprawdzanie czy użytkownik istnieje w bazie
      let user = await User.findOne({ email });

      // NEGATYW Przesłanie informacji zwrotnej że użytkownik istnieje
      if (user) {
        return res.status(400).json({ msg: 'Użytkownik istnieje w bazie' });
      }

      // Utworzenie nowej instancji użytkownika
      user = new User({
        name,
        email,
        password,
      });

      // Solenie hasła
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // POZYTYW Zapisywanie do bazy
      await user.save();
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

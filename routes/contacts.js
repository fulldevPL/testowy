const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Pobranie wszystkich kontaktów
// @access  Private
router.get('/', (req, res) => {
  res.send('Pobranie wszystkich kontaktów');
});

// @route   POST api/contacts
// @desc    Dodanie nowego kontaktu
// @access  Private
router.post('/', (req, res) => {
  res.send('Dodanie nowego kontaktu');
});

// @route   PUT api/contacts/:id
// @desc    Aktualizacja kontaktu
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Aktualizacja kontaktu');
});

// @route   PUT api/contacts/:id
// @desc    Aktualizacja kontaktu
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Aktualizacja kontaktu');
});

// @route   DELETE api/contacts/:id
// @desc    Usówanie kontaktu
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Usówanie kontaktu');
});

module.exports = router;

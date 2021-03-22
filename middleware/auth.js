const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Pobranie TOKENA z nagłówka
  const token = req.header('x-auth-token');

  // Informacja zwrotna z powodu braku TOKENA
  if (!token) {
    return res.status(401).json({ msg: 'Brak tokena, Brak autoryzacji' });
  }

  try {
    // Rozkodowanie TOKENA
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //   Przypisanie rozkodowanego usera do req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token nipoprawny' });
  }
};

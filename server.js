const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Contact API...' });
});

//Zdefiniowane Ścieżki
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log(`Server działa na porcie: ${PORT}`);
});

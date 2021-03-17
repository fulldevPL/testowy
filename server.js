const express = require('express');

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Node.js appssik...');
});
app.get('/about', (req, res) => {
  res.send('Node.js abełt...');
});

app.listen(PORT, () => {
  console.log('Server działa na porcie: ' + PORT);
});

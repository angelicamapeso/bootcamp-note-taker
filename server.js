const express = require('express');
const path = require('path');

//define port
const PORT = 3000;

//creates express application
const app = express();

//----- Paths -----//
//Home
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

const express = require('express');

//define port
const PORT = 3000;

//creates express application
const app = express();

//----- Paths -----//
//Home
app.get('/', function(req, res) {
  res.send('Server has started!');
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

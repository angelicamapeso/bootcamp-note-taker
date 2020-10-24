const express = require('express');
const path = require('path');
const fs = require('fs');

//define port
const PORT = 3000;

//creates express application
const app = express();

//to serve static files (css and javascript)
app.use(express.static(path.join(__dirname, 'public')));

//----- Paths -----//
//Home
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//Notes
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//API
app.get('/api/notes', function(req, res) {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

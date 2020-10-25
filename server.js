const express = require('express');
const path = require('path');
const fs = require('fs');

//define port
const PORT = 3000;

//creates express application
const app = express();

//to serve static files (css and javascript)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//id counter must start at 1
//ids with 0 will not render (falsey)
let idCount = 1;

const NOTES_DATABASE = path.join(__dirname, 'db', 'db.json');

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
//get
app.get('/api/notes', function(req, res) {
  fs.readFile(NOTES_DATABASE, (err, data) => {
    const notes = handleReadNotes(err, data);
    res.json(notes);
  });
});
//post
app.post('/api/notes', function(req, res) {
  const newNote = req.body;
  fs.readFile(NOTES_DATABASE, (err, data) => {
    const existingNotes = handleReadNotes(err, data);
    addNote(newNote, existingNotes);
    writeAndSendNotes(existingNotes, res);
  });
});
//delete
app.delete('/api/notes/:id', function(req, res) {
  const id = parseInt(req.params.id);
  fs.readFile(NOTES_DATABASE, (err, data) => {
    const notes = handleReadNotes(err, data);
    deleteNote(id, notes);
    writeAndSendNotes(notes, res);
  });
});

//----- Additional Functions -----//
function writeAndSendNotes(noteList, res) {
  const JSONNoteList = JSON.stringify(noteList);
  fs.writeFile(NOTES_DATABASE, JSONNoteList, (err) => {
    if (err) throw err;
    res.json(noteList);
  });
}

function handleReadNotes(err, data) {
  if (err) throw err;
  return JSON.parse(data);
}

function addNote(newNote, currentNotes) {
  //to add unique id to new note
  newNote.id = idCount++;
  currentNotes.push(newNote);
}

function deleteNote(id, currentNotes) {
  let noteIndex;
  currentNotes.forEach(function(note, index){
    if (note.id === id) {
      noteIndex = index;
    }
  });
  currentNotes.splice(noteIndex, 1);
}

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

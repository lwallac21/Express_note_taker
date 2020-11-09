const util = require("util");
const fs = require("fs");

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const {v4: uuidv4} = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let listNotes;

     try{
        listNotes = [].concat(JSON.parse(notes));
     }catch(err){
        listNotes=[];
     }
      return listNotes;
    })
    
  }

  addNote(note) {
    const{title, text} = note
    var anId = uuidv4("string");
    const newNote = {title, text, id: anId}
    return this.getNotes()
    .then(notes => [...notes, newNote])
    .then(newNoteList => this.write(newNoteList))
    .then(() => newNote);

  }

    removeNote(id) {
      return this.getNotes()
      .then(notes => notes.filter(note => note.id !== id))
      .then(update => this.write(update))
  }
}

module.exports = new Notes();
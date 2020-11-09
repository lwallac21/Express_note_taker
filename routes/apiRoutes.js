const router = require("express").Router()
const db = require("../db/db.json")
const fs = require("fs")
const {v4: uuidv4} = require("uuid")
const notes = require("../db/notes.js")

router.get("/notes", (req, res) => {
   notes
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

router.post("/notes", (req, res) => {
    notes
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(error => res.status(500).json(error));
})

router.delete("/notes/:id", (req, res) => {
    notes
    .removeNote(req.params.id)
})

module.exports = router
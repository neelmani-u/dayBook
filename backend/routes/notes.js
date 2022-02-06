const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');


// ROUTE 1: Fetching all notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const note = await Note.find({ user: req.user.id });
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

// ROUTE 2: Add new note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title!').isLength({ min: 3 }),
    body('description', 'Description must be at least 6 characters!').isLength({ min: 6 }),
], async (req, res) => {
    try {
        // If there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

// ROUTE 3: Update note using: POST "/api/notes/updatenote". Login required
router.post("/updatenote/:id", fetchuser, [
    body('title', 'Enter a valid title!').isLength({ min: 3 }),
    body('description', 'Description must be at least 6 characters!').isLength({ min: 6 }),
], async (req, res) => {
    try {
        // If there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) {newNote.title = title};
        if (description) {newNote.description = description};
        if (tag) {newNote.tag = tag};

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {return res.status(404).send("Not Found")}

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})


// ROUTE 4: Delete note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {return res.status(404).send("Not Found")}

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        // note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({"Succes": "Note has been deleted", note: note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = router;

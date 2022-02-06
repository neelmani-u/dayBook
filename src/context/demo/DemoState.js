import React, { useState } from "react";
import DemoContext from "./demoContext";

const DemoState = (props) => {
    const [notes, setNotes] = useState([]);

    // Get all Notes
    const getNotes = () => {
        setNotes(notes);
    };

    // Add a Note
    const addNote = (title, description, tag) => {
        var id = "id" + Math.random().toString(16).slice(2);
        var today = new Date();
        var str = today.toGMTString();
        const note = [{
            "_id": id,
            "title": title,
            "description": description,
            "tag": tag,
            "date": str
        }]
        setNotes(notes.concat(note));
        // console.log("test:", notes.concat(note))
    };

    // Edit a Note
    const editNote = (id, title, description, tag) => {
        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    // Delete a Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    };

    return (
        <DemoContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </DemoContext.Provider>
    );
}

export default DemoState;


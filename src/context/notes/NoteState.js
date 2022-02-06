import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const URL = "http://localhost:5000";

    const [notes, setNotes] = useState([]);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const url = `${URL}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("authToken")
            }
        });
        const notes = await response.json();
        setNotes(notes);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const url = `${URL}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("authToken")
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        
        // Client Logic for adding note
        setNotes(notes.concat(note));
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const url = `${URL}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("authToken")
            },
            body: JSON.stringify({title, description, tag})
        });
        const editedNote = await response.json();

        // Client Logic for editing Note
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
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const url = `${URL}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem("authToken")
            }
        });
        const deletedNote = await response.json();

        // Client Logic for deleting Note
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;


import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import userContext from '../context/users/userContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import EditNote from './EditNote';

const Notes = () => {
    const context = useContext(noteContext);
    const user = useContext(userContext);
    const openModal = useRef(null);
    var keyUpTimer = useRef(null);
    let navigate = useNavigate();

    const keyUpTimerDelay = 3;
    const { notes, getNotes } = context;
    const { getUser } = user;
    const [currentNote, setCurrentNote] = useState({});

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user/home");
            getNotes();
            getUser(localStorage.getItem("authToken"));
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        setCurrentNote(currentNote);

        clearTimeout(keyUpTimer.current);
        keyUpTimer.current = setTimeout(() => {
            openModal.current.click();
        }, keyUpTimerDelay);
    };

    return (
        <>
            <AddNote />

            <EditNote openModal={openModal} currentNote={currentNote} />

            <div className="container" >
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-2">
                        {notes.length === 0 && "No Notes to display"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                        // return <Loading key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;

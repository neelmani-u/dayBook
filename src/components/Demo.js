import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import demoContext from '../context/demo/demoContext';
import alertContext from '../context/alerts/alertContext';

export function NoteItem(props) {
    const context = useContext(demoContext);
    const alert = useContext(alertContext);
    const { deleteNote } = context;
    const { showAlert } = alert;

    const { note, updateNote } = props;

    const handleDelete = () => {
        deleteNote(note._id);
        showAlert("Note Deleted Successfully!", "success");
    };

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body" id="card">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                            <i className="far fa-edit mx-1" onClick={() => { updateNote(note) }}></i>
                            <i className="far fa-trash-alt mx-1" onClick={handleDelete}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <span className="badge" style={{ fontWeight: 'normal', backgroundColor: 'rgba(13, 110, 250, 1)' }}>{note.tag}</span>
                </div>
            </div>
        </div>
    );
}

export function Demo() {
    const context = useContext(demoContext);
    const alert = useContext(alertContext);
    const navigate = useNavigate();
    const openModal = useRef(null);
    var closeModal = useRef(null);
    var keyUpTimer = useRef(null);

    const keyUpTimerDelay = 3;
    const { notes, addNote, editNote } = context;
    const { showAlert } = alert;
    const [currentNote, setCurrentNote] = useState({});
    const [note, setNote] = useState({ title: "", description: "", tag: "General" });
    const [enote, setENote] = useState({ id: "", etitle: "", edescription: "", etag: "General" });

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user/home");
            showAlert("Demo Notes is not available for already registered user!", "danger");
        } else {
            navigate("/demo");
        }
        // eslint-disable-next-line
    }, []);

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added Successfully!", "success");
        resetAllInputFields("add");
    };

    const handleEditNote = () => {
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
        closeModal.current.click();
        showAlert("Note Edited Successfully!", "success");
    };

    const updateNote = (currentNote) => {
        setCurrentNote(currentNote);

        clearTimeout(keyUpTimer.current);
        keyUpTimer.current = setTimeout(() => {
            openModal.current.click();
        }, keyUpTimerDelay);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        setENote({ ...enote, [e.target.name]: e.target.value });
    };

    const resetAllInputFields = (fnc) => {
        document.querySelectorAll("input")
            .forEach(input => (input.value = ""));
        if (fnc === "add") {
            setNote({ title: "", description: "", tag: "General" });
        } else if (fnc === "edit") {
            setENote({ id: "", etitle: "", edescription: "", etag: "General" });
        }
    };

    const control = () => {
        clearTimeout(keyUpTimer.current);
        keyUpTimer.current = setTimeout(() => {
            setENote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        }, keyUpTimerDelay);
    };

    return (
        <>
            {/* Add Note */}
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-2" onSubmit={handleAddNote}>
                    <div className="my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={6} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag (Optional)</label>
                        <input type="text" className="form-control" placeholder="Default: General" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" disabled={(note.title.length <= 3) || (note.description.length <= 3)} className="btn btn-primary" >Add Note</button>
                </form>
            </div>

            {/* Edit Note */}
            <button type="button" ref={openModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }} onClick={control} >
                Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="my-2" onSubmit={handleEditNote} >
                            <div className="modal-body">
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={enote.edescription} onChange={onChange} minLength={6} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag (Optional)</label>
                                    <input type="text" className="form-control" placeholder="Default: General" id="etag" name="etag" value={enote.etag} onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={(enote.etitle.length <= 5) && (enote.edescription.length <= 6)} className="btn btn-primary" onClick={handleEditNote} >Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container" >
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-2">
                        {notes.length === 0 && "No Notes to display"}
                    </div>
                    {notes.map((note) => {
                        return (
                            <NoteItem key={note._id} updateNote={updateNote} note={note} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

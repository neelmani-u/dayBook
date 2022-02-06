import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alerts/alertContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const alert = useContext(alertContext);
    const { addNote } = context;
    const { showAlert } = alert;

    const [note, setNote] = useState({ title: "", description: "", tag: "General" });

    const handleAddNote = async (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added Successfully!", "success");
        resetAllInputFields();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const resetAllInputFields = () => {
        document.querySelectorAll("input")
        .forEach(input => (input.value = ""));
        setNote({ title: "", description: "", tag: "General" });
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-2" onSubmit={handleAddNote} >
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
                <button type="submit" disabled={(note.title.length <= 5) || (note.description.length <= 6)} className="btn btn-primary" >Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;

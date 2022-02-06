import React, { useContext, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alerts/alertContext';

const EditNote = (props) => {
    const context = useContext(noteContext);
    const alert = useContext(alertContext);
    var closeModal = useRef(null);
    var keyUpTimer = useRef(null);
    
    const { editNote } = context;
    const { showAlert } = alert;

    const { openModal, currentNote } = props;
    const keyUpTimerDelay = 1;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" });

    const handleEditNote = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeModal.current.click();
        showAlert("Note Edited Successfully!", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const control = () => {
        clearTimeout(keyUpTimer.current);
        keyUpTimer.current = setTimeout(() => {
            setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
        }, keyUpTimerDelay);
    };

    return (
        <>
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
                            <form className="my-2" onSubmit={handleEditNote}>
                        <div className="modal-body">
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={6} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag (Optional)</label>
                                    <input type="text" className="form-control" placeholder="Default: General" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={(note.etitle.length <= 5) || (note.edescription.length <= 6)} className="btn btn-primary" onClick={handleEditNote} >Update Note</button>
                        </div>
                            </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditNote;

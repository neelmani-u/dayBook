import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body" id="card">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                            <i className="far fa-edit mx-1" onClick={() => { updateNote(note) }}></i>
                            <i className="far fa-trash-alt mx-1" onClick={() => { deleteNote(note._id) }}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <span className="badge" style={{fontWeight: 'normal', backgroundColor: 'rgba(13, 110, 250, 1)'}}>{note.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;

import React, { useState } from "react";
import { getInitialData, showFormattedDate } from "./initialData";

const Application = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = () => {
    setAddingNote(true);
  };

  const handleSubmit = () => {
    if (title === "" || body === "") {
      alert("Both fields can't be empty.");
      return;
    }
    const newNote = {
      id: +new Date(),
      title: title,
      body: body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setBody("");
    setAddingNote(false);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1> Noted </h1>
      {addingNote ? (
        <div className="div-add-note">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className="button-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          {notes.length === 0 ? (
            <p>No Notes</p>
          ) : (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <p>Created At: {showFormattedDate(note.createdAt)}</p>
                  <button
                    className="button-delete"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <button className="button-add" onClick={addNote}>
            Add Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Application;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("https://your-backend-url.onrender.com/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    axios.post("https://your-backend-url.onrender.com/notes", { text: newNote })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote("");
      });
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Заметки</h1>
      <div className="flex space-x-2 mb-4">
        <input
          className="p-2 border rounded w-80"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Введите заметку..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addNote}
        >
          Добавить
        </button>
      </div>
      <ul className="w-96">
        {notes.map((note, index) => (
          <li key={index} className="p-2 bg-white shadow rounded mb-2">
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

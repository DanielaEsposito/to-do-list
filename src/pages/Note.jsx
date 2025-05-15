import { useState, useEffect } from "react";
import { getCsrfCookie, getCookie } from "../api/api";
export default function Note() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data);
      });
  }, []);
  return (
    <div className="container">
      <h1 className="text-center">Note</h1>
      <p className="text-center">Questa è la pagina delle note.</p>
      <div className="row">
        {notes?.map((note) => (
          <div className="col-4" key={note.id}>
            <div className="home-card notes-card">
              <p>{note.date}</p>
              <h2 className="fw-semibold">{note.title}</h2>
              <p>{note.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

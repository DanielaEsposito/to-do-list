import { getCsrfCookie, getCookie } from "../api/api";
import { useEffect, useState } from "react";
export default function FormNotesPage() {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    date: "",
  });
  //function to handle the change of the form
  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  //function to handle the submit of the form
  const handleFormSubmit = (e) => {
    getCsrfCookie();
    const csrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));
    e.preventDefault();
    fetch("http://localhost:8000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(notes),
    }).then((res) => {
      if (res.ok) {
        console.log("success");
      } else {
        throw new Error("Error status code: " + res.status);
      }
    });
  };
  return (
    <div className="container">
      <div className="home-card notes-card">
        <h2 className="fw-semibold">Note</h2>
        <p>Prendi appunti e annotazioni importanti.</p>
      </div>
      <form action="" method="post" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            value={notes.title}
            placeholder="Inserisci il titolo della tua nota"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={notes.date}
            className="form-control"
            id="data"
            placeholder="Inserisci la data della tua nota"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Aggiungi una nota
          </label>
          <textarea
            className="form-control"
            name="description"
            onChange={handleChange}
            value={notes.description}
            id="decsription"
            rows="3"
            placeholder="Scrivi qui la tua nota..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Nota
        </button>
      </form>
    </div>
  );
}

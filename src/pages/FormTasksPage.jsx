import { useState, useEffect } from "react";
import { getCsrfCookie, getCookie } from "../api/api";
export default function FormTasksPage() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category_id: "",
    priority_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/tasks-categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
    fetch("http://localhost:8000/api/tasks-priorities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPriorities(data.data);
      });
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  // function to handle the submit of the form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    getCsrfCookie();
    const csrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));
    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(task),
    }).then((res) => {
      if (res.ok) {
        console.log("success");
      } else {
        throw new Error("Error status code: " + res.status);
      }
    });
    setTask({
      title: "",
      description: "",
      category_id: "",
      priority_id: "",
    });
  };
  console.log(task);

  return (
    <div className="container">
      <form
        method="post"
        className="form-task row g-3"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center">Aggiungi una nuova attività</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            onChange={handleChange}
            value={task.title}
            name="title"
            type="text"
            className="form-control"
            id="title"
            placeholder="Inserisci il titolo della tua attività"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            onChange={handleChange}
            value={task.description}
            name="description"
            type="text"
            required
            className="form-control"
            id="description"
            rows="3"
            placeholder="Inserisci la descrizione della tua attività"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">
            Categoria
          </label>
          <select
            className="form-select"
            id="category_id"
            name="category_id"
            value={task.category_id}
            onChange={handleChange}
          >
            <option disabled>Seleziona una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="priority_id">Priorità</label>
          <select
            className="form-select"
            id="priority_id"
            value={task.priority_id}
            name="priority_id"
            onChange={handleChange}
          >
            <option disabled>Seleziona una priorità</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Attività
        </button>
      </form>
    </div>
  );
}

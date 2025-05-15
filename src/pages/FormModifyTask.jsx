import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCsrfCookie, getCookie } from "../api/api";
export default function FormModifyTask() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const navigate = useNavigate();
  const [modifyTask, setModifyTask] = useState();

  useEffect(() => {
    // Fetch task, categories, and priorities from the API
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setModifyTask({
          title: data.data.title,
          description: data.data.description,
          category_id: data.data.category_id,
          priority_id: data.data.priority_id,
          completed: data.data.completed,
          date: data.data.date,
        });
      });
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
  if (!modifyTask) {
    return <div>Caricamento in corso...</div>;
  }
  // function to handle the change of the form
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setModifyTask({
      ...modifyTask,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  //function to handle the submit of the form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    getCsrfCookie();
    const csrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(modifyTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/tasks");
        } else {
          console.error("Error updating task:", data);
        }
      });
  };
  return (
    <div className="container">
      <form
        method="post"
        className="form-task row g-3"
        // onSubmit={handleFormSubmit}
      >
        <h1 className="text-center">Modifica questa ttività</h1>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Data
          </label>
          <input
            onChange={handleChange}
            value={modifyTask.date}
            name="date"
            type="date"
            className="form-control"
            id="date"
            placeholder="Inserisci la data della tua attività"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            onChange={handleChange}
            value={modifyTask.title}
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
            value={modifyTask.description}
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
            value={modifyTask.category_id}
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
            value={modifyTask.priority_id}
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
        <div className="mb-3">
          <label htmlFor="completed">Completata</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            onChange={handleChange}
            checked={modifyTask.completed}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Modifica attività
        </button>
      </form>
    </div>
  );
}

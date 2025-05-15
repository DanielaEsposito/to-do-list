import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCsrfCookie, getCookie } from "../api/api";
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  //set filter
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);

  // Fetch  categories and priorities from the API
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

  // Fetch tasks from the API and filter by category and priority
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append("category", category);
    if (priority) queryParams.append("priority", priority);
    if (completed) queryParams.append("completed", completed);
    if (date) queryParams.append("date", date);
    fetch(`http://localhost:8000/api/tasks?${queryParams.toString()}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [category, priority, completed]);

  // Delete task
  const deliteForm = (id) => {
    getCsrfCookie();
    const csrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella cancellazione");
        }
        return response.json();
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };
  return (
    <div className="container">
      <h2 className="fw-semibold text-center">Le tue attività</h2>
      <p className="text-center">
        Qui puoi visualizzare e gestire tutte le tue attività.
      </p>
      <div className="row g-3 my-4">
        <div className="col-3">
          <label className="form-label" htmlFor="category">
            Categoria
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="priority">
            Priorità
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Tutte le priorità</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="completed">
            Completata
          </label>
          <select
            className="form-select"
            id="completed"
            name="completed"
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value="">Tutte le attività</option>
            <option value="1">Completate</option>
            <option value="0">Non completate</option>
          </select>
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="date">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row">
        {/* TASKS */}
        {tasks.map((task) => (
          <div key={task.id} className="col-3">
            <div className={`card task-card ${task.category.color}`}>
              <div className="card-body">
                <p className="card-text">
                  <small className="text-muted">{task.category.title}</small>
                </p>
                <p className="card-text fw-semibold">{task.date}</p>
                <h5 className="card-title fw-semibold">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">
                  <small className="text-muted">{task.priority.title}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    {task.completed ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-xmark"></i>
                    )}
                  </small>
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn ">
                  <Link
                    to={`/modifytask/${task.id}`}
                    className="fa-solid fa-pencil"
                  ></Link>
                </button>
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-${task.id}`}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id={`modal-${task.id}`}
              tabIndex="-1"
              aria-labelledby={`modal-label-${task.id}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id={`modal-label-${task.id}`}
                    >
                      Sicuro di voler eliminare questa attività?
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Annulla
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deliteForm(task.id)}
                      data-bs-dismiss="modal"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="alert alert-info" role="alert">
            Non hai attività da visualizzare.
          </div>
        )}
      </div>
    </div>
  );
}

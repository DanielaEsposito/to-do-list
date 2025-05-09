import { useState, useEffect } from "react";
export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  // const [completed, setCompleted] = useState(false);

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
  }, [category, priority]);
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
          <label htmlFor="completed">Completata</label>
        </div>
        <div className="col-3"></div>
        <div className="col-3"></div>
      </div>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-3">
            <div className={`card task-card ${task.category.color}`}>
              <div className="card-body">
                <p className="card-text">
                  <small className="text-muted">{task.category.title}</small>
                </p>
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
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button className="btn">
                  <i className="fa-solid fa-trash"></i>
                </button>
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

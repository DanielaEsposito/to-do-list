import { useState, useEffect } from "react";
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/tasks", {
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
  }, []);
  return (
    <div className="container">
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
                    {task.completed ? "Completed" : "Not Completed"}
                  </small>
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary">Modifica</button>
                <button className="btn btn-danger">Elimina</button>
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

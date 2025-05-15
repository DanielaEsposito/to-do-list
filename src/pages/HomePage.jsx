import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
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
  console.log(tasks);
  const filteredWorkTasks = tasks.filter(
    (task) => task.category.title === "Lavoro"
  );
  const filteredHealthTasks = tasks.filter(
    (task) => task.category.title === "Salute e Benessere"
  );
  const filteredPersonalTasks = tasks.filter(
    (task) => task.category.title === "Svago"
  );
  const filteredGeneralTasks = tasks.filter(
    (task) => task.category.title === "Altro"
  );

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <div className="home-welcome d-flex justify-content-between">
              <div className="text">
                <h2 className="fw-semibold">Benvenuto nella tua dashboard</h2>
                <p>Qui puoi gestire le tue attività e rimanere organizzato.</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="home-card task-card">
              <h2 className="fw-semibold text-center">Le tue attività</h2>
              <ul className="list-unstyled">
                {tasks?.map((task) => (
                  <li key={task.id} className="px-5">
                    <div
                      className={`task-container ${task.category.color} d-flex justify-content-between`}
                    >
                      <div className="taks-description">
                        <h5 className="fw-semibold">{task.title}</h5>
                        <p>{task.description}</p>
                      </div>
                      <div className="completed d-flex align-items-center justify-content-center">
                        <p>
                          {task.completed ? (
                            <i className="fa-solid fs-2 fa-check"></i>
                          ) : (
                            <i className="fa-solid fs-2 fa-xmark"></i>
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-6">
            <div className="home-card calendar-card">
              <h2 className="fw-semibold text-center">Calendario</h2>
              <p>Visualizza le tue attività nel calendario.</p>
            </div>
          </div>
          <div className="col-3 text-center  p-3">
            <div className="category-container orange">
              <h4 className="fw-semibold">Lavoro</h4>
              {filteredWorkTasks.length > 0 ? (
                <h4>{filteredWorkTasks.length}</h4>
              ) : (
                <h4>0</h4>
              )}
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container yellow">
              <h4 className="fw-semibold">Svago</h4>
              {filteredPersonalTasks.length > 0 ? (
                <h4>{filteredPersonalTasks.length}</h4>
              ) : (
                <h4>0</h4>
              )}
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container mint">
              <h4 className="fw-semibold">Salute e Benessere</h4>
              {filteredHealthTasks.length > 0 ? (
                <h4>{filteredHealthTasks.length}</h4>
              ) : (
                <h4>0</h4>
              )}
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container light-blu">
              <h4 className="fw-semibold">Altro</h4>
              {filteredGeneralTasks.length > 0 ? (
                <h4>{filteredGeneralTasks.length}</h4>
              ) : (
                <h4>0</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

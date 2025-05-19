import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import WeeklyTaskSummary from "../components/WeeklyTaskSummary";
export default function HomePage() {
  const { user, notes, tasks } = useAuth();
  const today = new Date().toISOString().split("T")[0]; // "2025-05-16"
  const tasksOfTheDay = tasks.filter((task) => task.date === today);
  const notesOfTheDay = notes.filter((note) => note.date === today);
  // Usa direttamente le tasks dal context
  const filteredWorkTasks = tasksOfTheDay?.filter(
    (task) => task.category.title === "Lavoro"
  );
  const filteredHealthTasks = tasksOfTheDay?.filter(
    (task) => task.category.title === "Salute e Benessere"
  );
  const filteredPersonalTasks = tasksOfTheDay?.filter(
    (task) => task.category.title === "Svago"
  );
  const filteredGeneralTasks = tasksOfTheDay?.filter(
    (task) => task.category.title === "Altro"
  );
  return (
    <div className="wrapper mb-5">
      <div className="container">
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="home-welcome d-flex justify-content-between">
              <div className="text">
                <h2 className="fw-semibold">Benvenuto nella tua dashboard</h2>
                <h3>Prova</h3>
                <p>Qui puoi gestire le tue attività e rimanere organizzato.</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="home-calendar calendar-card">
              <h2 className="fw-semibold text-center">Calendario</h2>
              <WeeklyTaskSummary tasks={tasks} />
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-3 text-center p-3">
            <div className="category-container orange">
              <h4>
                <i class="fa-solid fa-briefcase"></i>
              </h4>

              <h4>{filteredWorkTasks?.length || 0}</h4>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container yellow">
              <h4>
                <i class="fa-solid fa-masks-theater"></i>
              </h4>

              <h4>{filteredPersonalTasks?.length || 0}</h4>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container mint">
              <h4>
                <i class="fa-solid fa-suitcase-medical"></i>
              </h4>

              <h4>{filteredHealthTasks?.length || 0}</h4>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="category-container light-blu">
              <h4>
                <i class="fa-solid fa-puzzle-piece"></i>
              </h4>

              <h4>{filteredGeneralTasks?.length || 0}</h4>
            </div>
          </div>
        </div>
        <h3 className="text-center fw-semibold">Le tue attività del giorno </h3>
        <div className="row mt-4">
          {/* TASKS */}
          {tasksOfTheDay.map((task) => (
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
                <div className="card-footer d-flex justify-content-between"></div>
              </div>
            </div>
          ))}
          {tasksOfTheDay.length === 0 && (
            <div className="alert alert-info" role="alert">
              Non hai attività da visualizzare.
            </div>
          )}
        </div>
        <h3 className="text-center fw-semibold ">Note del giorno </h3>
        <div className="row mt-4">
          {notesOfTheDay.length > 0 ? (
            notesOfTheDay?.map((note) => (
              <div className="col-3" key={note.id}>
                <div className=" notes-card card yellow">
                  <div className="card-body">
                    <p>{note.date}</p>
                    <h5 className="fw-semibold card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info" role="alert">
              Non hai note da visualizzare.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

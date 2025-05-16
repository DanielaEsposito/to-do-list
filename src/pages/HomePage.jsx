import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import WeeklyTaskSummary from "../components/WeeklyTaskSummary";
export default function HomePage() {
  const { user, notes, tasks } = useAuth(); // Usa direttamente le tasks dal context

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="home-welcome d-flex justify-content-between">
              <div className="text">
                <h2 className="fw-semibold">Benvenuto nella tua dashboard</h2>
                <p>Qui puoi gestire le tue attività e rimanere organizzato.</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="home-card calendar-card">
              <h2 className="fw-semibold text-center">Calendario</h2>
              <WeeklyTaskSummary tasks={tasks} />
            </div>
          </div>
        </div>
        <h3 className="text-center fw-semibold">Le tue attività del giorno </h3>
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
                <div className="card-footer d-flex justify-content-between"></div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="alert alert-info" role="alert">
              Non hai attività da visualizzare.
            </div>
          )}
        </div>
        <h3 className="text-center fw-semibold ">Note del giorno </h3>
        <div className="row">
          {notes?.map((note) => (
            <div className="col-3" key={note.id}>
              <div className=" notes-card card yellow">
                <div className="card-body">
                  <p>{note.date}</p>
                  <h5 className="fw-semibold card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

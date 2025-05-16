import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
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
              <p>Visualizza le tue attività nel calendario.</p>
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
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn ">
                    <Link className="fa-solid fa-pencil"></Link>
                  </button>
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${note.id}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div
                  className="modal fade"
                  id={`modal-${note.id}`}
                  tabIndex="-1"
                  aria-labelledby={`modal-label-${note.id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id={`modal-label-${note.id}`}
                        >
                          Sicuro di voler eliminare questa nota?
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
                          data-bs-dismiss="modal"
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

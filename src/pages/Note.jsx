import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Note() {
  const { notes } = useAuth();
  return (
    <div className="container">
      <h1 className="text-center">Note</h1>
      <p className="text-center">Questa è la pagina delle note.</p>
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
  );
}

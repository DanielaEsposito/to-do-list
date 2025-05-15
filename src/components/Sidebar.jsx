import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="p-3 fw-bold fs-1">Done</h2>
      <ul className="sidebar-list list-unstyled">
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/home"}>
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </div>
        </li>
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/tasks"}>
              <i className="fa-solid fa-list"></i> Tasks
            </Link>
          </div>
        </li>
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/note"}>
              <i className="fa-solid fa-calendar-day"></i> Note
            </Link>
          </div>
        </li>
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/calendar"}>
              <i className="fa-solid fa-calendar"></i> Calendario
            </Link>
          </div>
        </li>
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/newnote"}>
              <i className="fa-solid fa-plus"></i> Aggiungi una nota
            </Link>
          </div>
        </li>
        <li className="sidebar-li">
          <div className="sidebar-item">
            <Link to={"/newtasks"}>
              <i className="fa-solid fa-plus"></i> Aggiungi una nuova attività
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

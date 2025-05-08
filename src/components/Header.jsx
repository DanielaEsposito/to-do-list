import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Header() {
  const { user } = useAuth();
  return (
    <nav className="d-flex justify-content-between p-3">
      <div className="user">
        <h4 className="fw-semibold">Ciao {user?.name}</h4>
        <p>Gestisci oggi. Semplifica domani.</p>
      </div>
      <div className="user-function">
        <ul className="d-flex gap-3">
          <li>logout</li>
        </ul>
      </div>
    </nav>
  );
}

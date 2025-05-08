import { login, register } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function WelcomePage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //handleChange for Login Form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //handleChange for Register Form
  const handleRegisterFormChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  //Login form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(form);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  // Register form
  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await register(registerForm);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  // Switch to Register Form
  const welcomeColumn = document.getElementById("welcome-column");
  const switchToRegister = () => {
    welcomeColumn.classList.remove("right");
    welcomeColumn.classList.add("left");
  };
  // Switch to Login Form
  const switchToLogin = () => {
    welcomeColumn.classList.remove("left");
    welcomeColumn.classList.add("right");
  };
  return (
    <div className="wrapper d-flex h-100 ">
      <div className="row w-100 h-100 position-absolute z-1">
        <div className="col-6 d-flex flex-column align-items-center justify-content-center h-100 position-relative">
          <div className="container">
            <div className="register-page">
              <h2 className="text-center mb-4">Registrati</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form
                className="row g-3 mx-auto welcome-form"
                onSubmit={handleRegisterFormSubmit}
              >
                <div className="col-md-12 d-flex flex-column align-items-center ">
                  <label className="form-label" htmlFor="name">
                    Nome
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={registerForm.name}
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <div className="col-md-12 d-flex flex-column align-items-center">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <div className="col-md-12 d-flex flex-column align-items-center">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <div className="col-md-12 d-flex flex-column align-items-center">
                  <label className="form-label" htmlFor="confirm-password">
                    Conferma Password
                  </label>
                  <input
                    id="confirm-password"
                    className="form-control"
                    type="password"
                    name="password_confirmation"
                    placeholder="Conferma Password"
                    value={form.password_confirmation}
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <div className="col-md-12 right d-flex flex-column align-items-center">
                  <button className="btn btn-primary" type="submit">
                    Registrati
                  </button>
                </div>
              </form>
              <div className="col-md-12">
                <p className="text-center">
                  Hai già un account?
                  <a onClick={switchToLogin} className="link-primary">
                    Fai il login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="welcome-column" className="col-6 h-100 right welcome-column">
          <div className="container d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="text-center">Benvenuto in Task Manager</h1>
            <p className="text-center">
              Gestisci le tue attività in modo semplice e veloce.
            </p>
            <p className="text-center">
              Inizia subito a organizzare il tuo lavoro.
            </p>
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-items-center justify-content-center h-100 position-relative">
          <div className="container">
            <h2 className="text-center mb-4">Accedi al tuo account</h2>

            <form
              onSubmit={handleFormSubmit}
              className="row welcome-form g-3 mx-auto"
            >
              <div className="col-12 d-flex flex-column align-items-center">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 d-flex flex-column align-items-center">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 d-flex flex-column align-items-center">
                <button type="submit" className="btn btn-primary">
                  Invia
                </button>
              </div>
            </form>
            <p className="text-center">
              Non hai un account?{" "}
              <a onClick={switchToRegister} className="link-primary">
                Registrati
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { fetchUser } from "../api/api";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    //fetch user from api
    fetchUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });

    //fetch tasks from api
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
    //fetch categories and priorities from the API
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
    //fetch notes from the API
    fetch("http://localhost:8000/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data);
      });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        categories,
        setCategories,
        priorities,
        setPriorities,
        notes,
        setNotes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

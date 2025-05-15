import { useEffect, useState } from "react";
import FullCalendarView from "../components/FullCalendarView.JSX";

export default function CalendarPage() {
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
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="container">
      <FullCalendarView tasks={tasks} />
    </div>
  );
}

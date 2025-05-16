import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function FullCalendarView({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => date.toLocaleDateString("sv-SE");

  // Trova le task per la data selezionata
  const selectedTasks = tasks.filter(
    (task) => task.date === formatDate(selectedDate)
  );

  return (
    <div className="container my-4">
      <h2>Calendario attività</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={({ date }) => {
          const dayTasks = tasks.filter(
            (task) => task.date === formatDate(date)
          );
          return dayTasks.length > 0 ? (
            <div style={{ textAlign: "center", color: "light-blu" }}>•</div>
          ) : null;
        }}
      />

      <div className="mt-4">
        <h4>Attività per il {selectedDate.toLocaleDateString("it-IT")}</h4>
        {selectedTasks.length > 0 ? (
          <ul className="list-group">
            {selectedTasks.map((task) => (
              <li
                key={task.id}
                className={`list-group-item d-inline-block ${task.category.color}`}
              >
                <div>
                  <i className="fa-solid fa-calendar-day"></i> {task.title}–{" "}
                  {task.category.title} – {task.priority.name}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessuna attività per questo giorno.</p>
        )}
      </div>
    </div>
  );
}

import React from "react";

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek + 1); // start Monday

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
};

const formatDate = (date) => date.toISOString().split("T")[0];

export default function WeeklyTaskSummary({ tasks }) {
  const weekDates = getWeekDates();

  return (
    <div className="d-flex justify-content-between bg-light p-3 rounded">
      {weekDates.map((date) => {
        const dateStr = formatDate(date);
        const dayTasks = tasks.filter((t) => t.date === dateStr);
        const color = dayTasks.length > 0 ? "#0d6efd" : "#ccc";

        return (
          <div key={dateStr} className="text-center" style={{ width: "12%" }}>
            <div
              style={{
                backgroundColor: color,
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                margin: "0 auto",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={dayTasks.map((t) => t.title).join(", ")}
            >
              {date.getDate()}
            </div>
            <small>
              {date.toLocaleDateString("it-IT", { weekday: "short" })}
            </small>
          </div>
        );
      })}
    </div>
  );
}

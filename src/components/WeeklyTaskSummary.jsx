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
  const todayStr = formatDate(new Date());

  return (
    <div className="d-flex justify-content-between p-3 rounded">
      {weekDates.map((date) => {
        const dateStr = formatDate(date);
        const isToday = dateStr === todayStr;
        const dayTasks = tasks.filter((t) => t.date === dateStr);

        return (
          <div key={dateStr} className="text-center" style={{ width: "12%" }}>
            <div
              style={{
                backgroundColor: isToday ? "#0d6efd" : "white",

                width: "35px",
                height: "35px",
                borderRadius: "50%",
                margin: "0 auto",
                color: isToday ? "white" : "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: isToday ? "bold" : "normal",
              }}
              title={dayTasks.map((t) => t.title).join(", ")}
            >
              {date.getDate()}
            </div>
            <small>
              {date.toLocaleDateString("it-IT", { weekday: "short" })}
            </small>
            {/* Pallino attività sotto il giorno */}
            {dayTasks.length > 0 && (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#0d6efd",
                  borderRadius: "50%",
                  margin: "4px auto 0",
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

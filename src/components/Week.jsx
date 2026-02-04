import { useState } from "react";

function Week() {
  const [today, setToday] = useState(new Date().toLocaleDateString("en-US"));
  const [days, setDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

  return (
    <div>
      <section className="center">
        <p>Today: {today}</p>
      </section>
      <section className="week">
        {days.map((day, i) => (
          <section key={i}>
            <p>{day}</p>
          </section>
        ))}
      </section>
    </div>
  );
}

export default Week;

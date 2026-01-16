import { useState } from "react";

function Week() {
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
    <div className="week"> 
      {days.map((day, i) => (
        <section key={i}>
          <p>{day}</p>
        </section>
      ))}
    </div>
  );
}

export default Week;

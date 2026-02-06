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
    <div>
      <section className="week">
        {days.map((day, i) => (
          <acticle key={i} className="week-day">
            {day}
          </acticle>
        ))}
      </section>
    </div>
  );
}

export default Week;

import { useState, useEffect } from "react";

function Month() {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  console.log(currentMonth);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const days = new Date(year, month, 0).getDate();
    let arr_days = []
    for (let i=1; i<=days; i++) {
        arr_days.push(i)
    }
    setDaysOfMonth(arr_days)
  }, []);

  return (
    <div>
      <h1>{currentMonth}</h1>
      <section className="calendar-month">
        {daysOfMonth.map((d, i) => (
          <article key={i} className="calendar-day">
            <p>{d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Month;

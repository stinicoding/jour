import { useState, useEffect } from "react";
import Week from "../components/Week";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Month({ habits }) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [open, setOpen] = useState(false);

  //console.log(currentMonth);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); //index for month
    const days = new Date(year, month + 1, 0).getDate();
    //finding out the weekday of first of current month - sunday 0 to saturday 6
    const first_day = new Date(year, month, 1);
    //console.log(first_day)
    let first_weekday = first_day.getDay();
    if (first_weekday === 0) {
      first_weekday = 7;
    }
    //array for calendar days
    let arr_days = [];
    //generating blanks to fit the format with the week days in Week component
    for (let i = 1; i < first_weekday; i++) {
      arr_days.push("");
    }
    //then pushing the actual days of the month into the array
    for (let i = 1; i <= days; i++) {
      arr_days.push(i);
    }
    setDaysOfMonth(arr_days);
  }, []);

  return (
    <div>
      <h1>{currentMonth}</h1>
      <Week />
      <section className="calendar-month">
        {daysOfMonth.map((d, i) => (
          <article
            key={i}
            className={d === "" ? "calendar-blank" : "calendar-day"}
            onClick={() => setOpen(true)}
          >
            <p className={d === new Date().getDate() ? "calendar-today" : ""}>
              {d}
            </p>
          </article>
        ))}
      </section>
      {open && (
        <Dialog open={open}>
          <DialogTitle className="dialog-caption">
            Add habits for this day
          </DialogTitle>
          <DialogContent>
            {habits?.map((hab, i) => (
              <article className="dialog-habits">
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: hab.color,
                    borderRadius: 3,
                    marginRight: 8,
                  }}
                ></div>
                <p key={i}>{hab.name}</p>
              </article>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Month;

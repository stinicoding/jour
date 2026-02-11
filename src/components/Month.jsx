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
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth(),
  );
  const [selectedMonthName, setSelectedMonthName] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  //console.log(selectedMonthIndex);
  console.log(selectedDay);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); //index for month
  const days = new Date(year, month + 1, 0).getDate();

  const saveHabits = () => {};

  useEffect(() => {
    //finding out the weekday of first of selected month - sunday 0 to saturday 6
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
      <h1>{selectedMonthName}</h1>
      <Week />
      <section className="calendar-month">
        {daysOfMonth.map((d, i) => (
          <article
            key={i}
            className={d === "" ? "calendar-blank" : "calendar-day"}
            onClick={
              d !== ""
                ? () => {
                    setOpen(true);
                    setSelectedDay(new Date(year, selectedMonthIndex, d));
                  }
                : undefined
            }
          >
            <p className={d === new Date().getDate() ? "calendar-today" : ""}>
              {d}
            </p>
          </article>
        ))}
      </section>
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <section className="dialog-caption-flex">
            <DialogTitle className="dialog-caption">
              add habits for this day
            </DialogTitle>
            <button className="button-close" onClick={() => setOpen(false)}>
              x
            </button>
          </section>
          <section>
            <DialogContent>
              {habits?.map((hab, i) => (
                <article key={i} className="dialog-habits-flex">
                  <div className="dialog-habits">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: hab.color,
                        borderRadius: 3,
                        marginRight: 8,
                      }}
                    ></div>
                    <p>{hab.name}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </article>
              ))}
              <button className="button-save" onClick={() => saveHabits()}>
                save
              </button>
            </DialogContent>
          </section>
        </Dialog>
      )}
    </div>
  );
}

export default Month;

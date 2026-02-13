import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";
import Week from "../components/Week";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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
  const [checked, setChecked] = useState({}); // {1: true, 2: false, 3: true}
  const [trackedOfMonth, setTrackedOfMonth] = useState([])
  const [habitsPerDay, setHabitsPerDay] = useState({});


  //console.log(selectedMonthIndex);
  //console.log(selectedDay);
  //console.log(checked);
  //console.log(habits)
  console.log(trackedOfMonth)
  console.log(habitsPerDay)

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); //index for month
  const days = new Date(year, month + 1, 0).getDate();
  const first_day = new Date(year, month, 1);
  const last_day = new Date(year, month, days);
  //console.log(first_day)
  //console.log(last_day)

  const trackHabits = async () => {
    const checkedHabits = Object.keys(checked)
      .filter((id) => checked[id] === true)
      .map(Number);
    //console.log(checkedHabits)
    let arr_habits = [];
    for (let i = 0; i < checkedHabits.length; i++) {
      arr_habits.push(habits[checkedHabits[i]]);
    }
    try {
      for (let i = 0; i < arr_habits.length; i++) {
        //console.log(selectedDay, arr_habits[i]._id, arr_habits[i].name)
        await axios.post(`${URL}/habitlog/newlog`, {
          date: selectedDay,
          habit_id: arr_habits[i]._id,
          habit_name: arr_habits[i].name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTrackedHabits = async () => {
    try {
      const response = await axios.get(`${URL}/habitlog/gettracked/${first_day}/${last_day}`);
      //console.log(response.data.data)
      setTrackedOfMonth(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const map = {}
    for (const log of trackedOfMonth) {
      const day = new Date(log.date).toISOString().slice(0, 10); // "2026-02-13"
      if (!map[day]) {
        map[day] = []
      }
      map[day].push(log.habit_id)
    }
    setHabitsPerDay(map)
  }, [trackedOfMonth])

  useEffect(() => {
    //finding out the weekday of first of selected month - sunday 0 to saturday 6
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
    getTrackedHabits();
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
            <div>
              <p className="calendar-today">
                <span
                  className={
                    d === new Date().getDate() ? "calendar-today-inner" : ""
                  }
                >
                  {d}
                </span>
              </p>
            </div>
            <div>
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "black",
                  borderRadius: 3,
                  marginRight: 8,
                }}
              ></div>
            </div>
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
                    checked={checked[i] || false}
                    onChange={
                      (e) => setChecked((prev) => ({ ...prev, [i]: !prev[i] })) //change Checkbox with Index between true and false
                    }
                  />
                </article>
              ))}
              <button className="button-save" onClick={() => trackHabits()}>
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

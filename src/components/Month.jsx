import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";
import Week from "../components/Week";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import Tooltip from "@mui/material/Tooltip";

function Month({ habits, owner, postsOfMonth, setPostsOfMonth }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [monthName, setMonthName] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [days, setDays] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), //day 0 is last day of last month --> +1 on month
  );
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const [trackedOfMonth, setTrackedOfMonth] = useState([]);
  const [habitsPerDay, setHabitsPerDay] = useState({});
  const [input, setInput] = useState("");

  //console.log(year);
  //console.log(monthIndex);
  //console.log(monthName);
  //console.log(days);
  //console.log(daysOfMonth);
  //console.log(selectedDay);
  //console.log(checked); // {1: true, 2: false, 3: true}
  //console.log(habits); //array containing objects [{habit}, {habit}]
  //console.log(trackedOfMonth);
  //console.log(habitsPerDay); //object containing arrays { date: [habit, habit]}
  //console.log(postsOfMonth);

  //change date object into string
  const toDayString = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const first_day = toDayString(year, monthIndex, 1);
  const last_day = toDayString(year, monthIndex, days);
  //console.log(first_day);
  //console.log(last_day);

  const handleBack = () => {
    const currentIndex = monthIndex;
    const currentYear = year;
    let newIndex = 0;
    let newYear = currentYear;
    if (currentIndex === 0) {
      newIndex = 12;
      newYear = currentYear - 1;
    } else {
      newIndex = currentIndex - 1;
    }
    setMonthIndex(newIndex);
    setMonthName(
      new Date(newYear, newIndex).toLocaleString("en-US", { month: "long" }),
    );
    setYear(newYear);
    setDays(new Date(newYear, newIndex + 1, 0).getDate());
  };

  const handleForward = () => {
    const currentIndex = monthIndex;
    const currentYear = year;
    let newIndex = 0;
    let newYear = currentYear;
    if (currentIndex === 12) {
      newIndex = 0;
      newYear = currentYear + 1;
    } else {
      newIndex = currentIndex + 1;
    }
    setMonthIndex(newIndex);
    setMonthName(
      new Date(newYear, newIndex).toLocaleString("en-US", { month: "long" }),
    );
    setYear(newYear);
    setDays(new Date(newYear, newIndex + 1, 0).getDate());
  };

  const cleanLog = async () => {
    try {
      const del = await axios.delete(
        `${URL}/habitlog/cleanlog/${selectedDay}/${owner}`,
      );
      //console.log(del);
    } catch (error) {
      console.log(error);
    }
  };

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
      await cleanLog();
      for (let i = 0; i < arr_habits.length; i++) {
        //console.log(selectedDay, arr_habits[i]._id, arr_habits[i].name)
        await axios.post(`${URL}/habitlog/newlog`, {
          owner: owner,
          date: selectedDay,
          habit_id: arr_habits[i]._id,
          habit_name: arr_habits[i].name,
        });
      }
      await getTrackedHabits();
      setChecked({}); //reset checkboxes
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const saveJournal = async () => {
    try {
      await axios.post(`${URL}/journal/newpost`, {
        text: input,
        date: selectedDay,
        owner: owner,
      });
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateJournal = async (id) => {
    try {
      await axios.patch(`${URL}/journal/updatepost/${id}`, {
        text: input,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveDailyInformation = async () => {
    await trackHabits();
    const existingPost = postsOfMonth?.find((ele) => ele.date === selectedDay);
    if (existingPost) {
      await updateJournal(existingPost._id);
    } else {
      await saveJournal();
    }
    await getPostsOfMonth();
    setOpen(false);
  };

  const getTrackedHabits = async () => {
    try {
      const response = await axios.get(
        `${URL}/habitlog/gettracked/${first_day}/${last_day}/${owner}`,
      );
      //console.log(response.data.data)
      setTrackedOfMonth(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHabitsForDay = async (date) => {
    try {
      const response = await axios.get(
        `${URL}/habitlog/gethabitsofday/${date}/${owner}`,
      );
      const habit_arr = response.data.data;
      const newChecked = {};
      //console.log(habit_arr);
      /*
      for (let i = 0; i < habits.length; i++) {
        for (let j = 0; j < habit_arr.length; j++) {
          if (habit_arr[j].habit_id === habits[i]._id) {
            newChecked[i] = true;
            break
          }
        }
      }
      */
      habits.forEach((hab, i) => {
        const found = habit_arr.find((h) => h.habit_id === hab._id);
        if (found) {
          newChecked[i] = true;
        }
      });
      setChecked(newChecked);
    } catch (error) {
      console.log(error);
    }
  };

  const getColorsForDay = (dateObj) => {
    const key = toDayString(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
    );
    // "2026-02-14"
    const ids = habitsPerDay[key] || [];
    return ids
      .map((id) => habits.find((h) => h._id === id))
      .filter(Boolean)
      .map((h) => h.color);
  };

  const getPostsOfMonth = async () => {
    try {
      const response = await axios.get(
        `${URL}/journal/getposts/${first_day}/${last_day}/${owner}`,
      );
      //console.log(response.data.data)
      setPostsOfMonth(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const map = {};
    for (const log of trackedOfMonth) {
      const day = log.date; // "2026-02-13"
      if (!map[day]) {
        map[day] = [];
      }
      map[day].push(log.habit_id);
    }
    setHabitsPerDay(map);
  }, [trackedOfMonth]);

  useEffect(() => {
    //finding out the weekday of first of selected month - sunday 0 to saturday 6
    const firstDate = new Date(first_day + "T12:00:00"); // 12:00 (no UTC rollover)
    let first_weekday = firstDate.getDay();
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
    //getTrackedHabits();
  }, [monthIndex, year]);

  useEffect(() => {
    getTrackedHabits();
    getPostsOfMonth();
  }, [monthIndex]);

  return (
    <div>
      <h1>
        {monthName} {year}
      </h1>
      <Week />
      <div className="calendar-flex">
        <IconButton
          onClick={() => handleBack()}
          sx={{
            backgroundColor: "#719daa",
            color: "white",
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <section className="calendar-month">
          {daysOfMonth.map((d, i) => (
            <article
              key={i}
              className={d === "" ? "calendar-blank" : "calendar-day"}
              onClick={
                d !== ""
                  ? () => {
                      const dateString = toDayString(year, monthIndex, d);
                      setSelectedDay(dateString);
                      const post = postsOfMonth?.find(
                        (ele) => ele.date === dateString,
                      );
                      setInput(post ? post.text : "");
                      getHabitsForDay(dateString);
                      setOpen(true);
                    }
                  : undefined
              }
            >
              <div>
                <p className="calendar-today">
                  <span
                    className={
                      d === new Date().getDate() &&
                      monthIndex === new Date().getMonth() &&
                      year === new Date().getFullYear()
                        ? "calendar-today-inner"
                        : ""
                    }
                  >
                    {d}
                  </span>
                </p>
              </div>
              <div>
                {(() => {
                  const postForDay = postsOfMonth?.find(
                    (ele) => ele.date === toDayString(year, monthIndex, d),
                  );
                  return (postForDay && postForDay.text.length>0) ? (
                    <Tooltip title={postForDay.text} arrow>
                      <SmsIcon
                        sx={{
                          height: "18px",
                          width: "18px",
                          color: "#719daa",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  ) : null;
                })()}
              </div>
              <div>
                <div className="habit-colors">
                  {d !== "" &&
                    getColorsForDay(new Date(year, monthIndex, d)).map(
                      (c, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: c,
                            borderRadius: 3,
                          }}
                        />
                      ),
                    )}
                </div>
              </div>
            </article>
          ))}
        </section>
        <IconButton
          onClick={() => handleForward()}
          sx={{
            backgroundColor: "#719daa",
            color: "white",
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </div>
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
              <section>
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
                        (e) =>
                          setChecked((prev) => ({ ...prev, [i]: !prev[i] })) //change Checkbox with Index between true and false
                      }
                    />
                  </article>
                ))}
              </section>
              <section>
                {(() => {
                  const postForDay = postsOfMonth?.find(
                    (ele) => ele.date === selectedDay,
                  );
                  return (
                    <textarea
                      className="journal-text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  );
                })()}
              </section>
              <button
                className="button-save"
                onClick={() => saveDailyInformation()}
              >
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

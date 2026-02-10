import { useState, useEffect } from "react";
//import { TextField, Button } from "@mui/material";
import good from "../pictures/smiley_good.jpg";
import bad from "../pictures/smiley_bad.jpg";
import axios from "axios";
import URL from "../config.js";

function Habits({ goodHabits, setGoodHabits, badHabits, setBadHabits }) {
  const [newHabit, setNewHabit] = useState("");
  const [smiley, setSmiley] = useState("good");
  const [today, setToday] = useState(new Date().toLocaleDateString("en-US"));

  //console.log(newHabit);
  //console.log(goodHabits);
  //console.log(badHabits);

  const getHabits = async () => {
    try {
      const res = await axios.get(`${URL}/habits`);
      //console.log(res.data.good);
      setGoodHabits(res.data.good);
      setBadHabits(res.data.bad);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSmiley = () => {
    setSmiley((prev) => (prev === "good" ? "bad" : "good"));
  };

  const saveHabit = async () => {
    try {
      await axios.post(`${URL}/habits/newhabit`, {
        name: newHabit,
        typeofhabit: smiley,
        color: "#ffffff",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewHabit = async () => {
    const habObj = {
      name: newHabit,
      color: "#ffffff",
    };
    if (smiley === "good") {
      setGoodHabits((prev) => [...prev, habObj]);
    } else if (smiley === "bad") {
      setBadHabits((prev) => [...prev, habObj]);
    }
    await saveHabit();
  };

  const updateHabit = async (name, typeofhabit, color) => {
    //console.log(typeof color);
    try {
      await axios.patch(`${URL}/habits/updatehabit`, {
        name: name,
        typeofhabit: typeofhabit,
        color: color,
      });
      getHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHabit = async (hab) => {
    try {
      await axios.delete(`${URL}/habits/deletehabit/${hab}`);
      getHabits();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
      <section className="center">
        <p>Today: {today}</p>
      </section>
      <section>
        <h3 className="center">add new {smiley} habit</h3>
        <div className="flex">
          <img
            className="smiley clickable"
            src={smiley === "good" ? good : bad}
            onClick={toggleSmiley}
          />
          <input onChange={(e) => setNewHabit(e.target.value)} />
          <button onClick={addNewHabit}>+ add</button>
        </div>
      </section>
      <section className="habit_list">
        <div>
          <ul className="bold">good habits</ul>
          {goodHabits?.map((hab) => (
            <li key={hab.name}>
              <p>{hab.name}</p>
              <div className="habit_adjustments">
                <input
                  type="color"
                  className="colorpicker"
                  value={hab.color}
                  onChange={(e) =>
                    updateHabit(hab.name, "good", e.target.value)
                  }
                />
                <button onClick={() => deleteHabit(hab.name)}>x</button>
              </div>
            </li>
          ))}
        </div>
        <div>
          <ul className="bold">bad habits</ul>
          {badHabits?.map((hab) => (
            <li key={hab.name}>
              <p>{hab.name}</p>
              <div className="habit_adjustments">
                <input
                  type="color"
                  className="colorpicker"
                  value={hab.color}
                  onChange={(e) => updateHabit(hab.name, "bad", e.target.value)}
                />
                <button onClick={() => deleteHabit(hab.name)}>x</button>
              </div>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Habits;

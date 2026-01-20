import { useState, useEffect } from "react";
//import { TextField, Button } from "@mui/material";
import good from "../pictures/smiley_good.jpg";
import bad from "../pictures/smiley_bad.jpg";
import axios from "axios";
import URL from "../config.js";

function Habits() {
  const [newHabit, setNewHabit] = useState("");
  const [smiley, setSmiley] = useState("good");
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);

  //console.log(newHabit);
  //console.log(goodHabits);
  //console.log(badHabits);

  const getHabits = async () => {
    try {
      const res = await axios.get(`${URL}/habits`);
      //console.log(res);
      setGoodHabits(res.data.good.map((hab) => hab.name) || []);
      setBadHabits(res.data.bad.map((hab) => hab.name) || []);
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewHabit = () => {
    if (smiley === "good") {
      let goodHabitsCopy = [...goodHabits];
      goodHabitsCopy.push(newHabit);
      setGoodHabits(goodHabitsCopy);
    } else if (smiley === "bad") {
      let badHabitsCopy = [...badHabits];
      badHabitsCopy.push(newHabit);
      setBadHabits(badHabitsCopy);
    }
    saveHabit();
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
            <li key={hab}>
              <p>{hab}</p>
              <button onClick={() => deleteHabit(hab)}>x</button>
            </li>
          ))}
        </div>
        <div>
          <ul className="bold">bad habits</ul>
          {badHabits?.map((hab) => (
            <li key={hab}>
              <p>{hab}</p>
              <button onClick={() => deleteHabit(hab)}>x</button>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Habits;

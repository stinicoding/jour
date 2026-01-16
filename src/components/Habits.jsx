import { useState } from "react";
//import { TextField, Button } from "@mui/material";
import good from "../pictures/smiley_good.jpg";
import bad from "../pictures/smiley_bad.jpg";

function Habits() {
  const [newHabit, setNewHabit] = useState("");
  const [smiley, setSmiley] = useState("good");
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);

  console.log(newHabit)
  console.log(goodHabits)
  console.log(badHabits)

  const toggleSmiley = () => {
    setSmiley((prev) => (prev === "good" ? "bad" : "good"));
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
  };

  return (
    <div>
      <section>
        <h3 className="center">
          add new {smiley} habit
        </h3>
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
            <li key={hab}>{hab}</li>
          ))}
        </div>
        <div>
          <ul className="bold">bad habits</ul>
          {badHabits?.map((hab) => (
            <li key={hab}>{hab}</li>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Habits;

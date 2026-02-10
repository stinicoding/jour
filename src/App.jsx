import "./App.css";
import Header from "./components/Header";
import Habits from "./components/Habits";
import Month from "./components/Month";
import { useState } from "react";

function App() {
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);

  const habits = [...goodHabits, ...badHabits];

  //console.log(habits);

  return (
    <>
      <Header />
      <div className="startpage">
        <Habits
          goodHabits={goodHabits}
          setGoodHabits={setGoodHabits}
          badHabits={badHabits}
          setBadHabits={setBadHabits}
        />
        <Month habits={habits} />
      </div>
    </>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import Habits from "./components/Habits";
import Month from "./components/Month";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);

  const habits = [...goodHabits, ...badHabits];

  //console.log(habits);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <div className="startpage">
                <Habits
                  goodHabits={goodHabits}
                  setGoodHabits={setGoodHabits}
                  badHabits={badHabits}
                  setBadHabits={setBadHabits}
                />
                <Month habits={habits} />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

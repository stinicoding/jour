import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URL from "./config.js";
import axios from "axios";
import * as jose from "jose";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Habits from "./components/Habits";
import Journal from "./components/Journal";
import Month from "./components/Month";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);
  const [today, setToday] = useState(
    `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
  );

  const habits = [...goodHabits, ...badHabits];

  //console.log(habits);
  //console.log(today);

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/token`);
          return response.data.ok ? login(token) : setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token, isLoggedIn]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    let user = { email: decodedToken.userEmail };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          owner={user?.email}
          today={today}
        />
        <Routes>
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <div className="startpage">
                <div className="startpage-journal">
                  <Habits
                    goodHabits={goodHabits}
                    setGoodHabits={setGoodHabits}
                    badHabits={badHabits}
                    setBadHabits={setBadHabits}
                    owner={user?.email}
                  />
                  <Journal owner={user?.email} today={today} />
                </div>
                <Month habits={habits} owner={user?.email} />
              </div>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

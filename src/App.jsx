import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URL from "./config.js"
import axios from "axios";
import * as jose from "jose";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Habits from "./components/Habits";
import Month from "./components/Month";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [goodHabits, setGoodHabits] = useState([]);
  const [badHabits, setBadHabits] = useState([]);

  const habits = [...goodHabits, ...badHabits];

  //console.log(habits);

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
  }, [token]);

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
        />
        <Routes>
          <Route path="/login" element={<Login login={login} />} />
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

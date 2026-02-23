import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, owner }) {
  const [today, setToday] = useState(new Date().toLocaleDateString("en-US"));
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <section>
        <p className="header-today">{today}</p>
      </section>
      <section>
        <NavLink className="app-name" to="/">
          <h1>jour.</h1>
        </NavLink>
        <h2>every day counts</h2>
      </section>
      <section>
        {isLoggedIn ? (
          <div className="login-welcome">
            <p className="welcome">Welcome, {owner}!</p>
            <button className="login-button" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        ) : (
          <div className="login-buttons">
            <NavLink className="login-button" to="/login">
              Login
            </NavLink>
            <NavLink className="login-button" to="/register">
              Register
            </NavLink>
          </div>
        )}
      </section>
    </div>
  );
}

export default Header;

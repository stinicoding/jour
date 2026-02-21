import { NavLink, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, owner }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <div>
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
      </div>
      <div>
        <NavLink className="app-name" to="/">
          <h1>jour.</h1>
        </NavLink>
        <h2>every day counts</h2>
      </div>
    </div>
  );
}

export default Header;

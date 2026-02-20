import { NavLink } from "react-router-dom";

function Header() {

  return (
    <div className="header">
      <div className="login-buttons">
        <NavLink className="login-button" to="/login">Login</NavLink>
        <NavLink className="login-button" to="/register">Register</NavLink>
      </div>
      <div>
        <NavLink className="app-name" to="/"><h1>jour.</h1></NavLink>
        <h2>every day counts</h2>
      </div>
    </div>
  );
}

export default Header;

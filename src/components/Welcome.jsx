import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import good from "../pictures/smiley_good.jpg";
import bad from "../pictures/smiley_bad.jpg";

function Welcome() {
  const [smiley, setSmiley] = useState("good");

  useEffect(() => {
    const interval = setInterval(() => {
      setSmiley((prev) => (prev === "good" ? "bad" : "good"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex_column">
      <img
        className="start-smiley"
        src={smiley === "good" ? good : bad}
        alt="smiley"
      />
      <div className="card flex_column">
        <section className="space_s">
          <h2>track your habits.</h2>
          <h2>see the progress.</h2>
          <h2>feel the change.</h2>
          <h2>every day counts.</h2>
        </section>
        <section className="flex_column">
          <NavLink className="login-button" to="/login">
            Login
          </NavLink>
          <NavLink className="login-button space_s" to="/register">
            Register
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default Welcome;

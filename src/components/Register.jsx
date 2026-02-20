import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [shown, setShown] = useState(false);
  const navigate = useNavigate();

  //console.log(email);

  const register = async () => {
    try {
      const response = await axios.post(`${URL}/users/register`, {
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      //console.log(response);
      if (response.data.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateRegistration = async () => {
    let email_split1 = email.split("@");
    let email_split2 = email.split(".");
    //console.log(email_split1);
    //console.log(email_split2);
    if (email_split1.length !== 2 || email_split2.length < 2) {
      setMessage("Invalid Email");
    } else if (password.length < 8) {
      setMessage("Password must have at least 8 characters.");
    } else if (password !== passwordConfirmation) {
      setMessage("Passwords should match.");
    } else {
      let result = await register();
      //console.log(result);
      if (result === true) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    setShown(true);
  }, [email, password, passwordConfirmation]);

  return (
    <div>
      <h1 className="center">Register</h1>
      <div className="flex_column">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label>Password Confirmation</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button className="button-login" onClick={() => validateRegistration()}>
          Register
        </button>
      </div>
      <div className="center">{shown && <p>{message}</p>}</div>
    </div>
  );
}

export default Register;

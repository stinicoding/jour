import { useState } from "react";
import { useNavigate } from "react-router";
import * as jose from "jose";
import axios from "axios";
import URL from "../config.js";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: email.toLowerCase(),
        password: password,
      });
      //console.log(response.data)
      if (response.data.ok) {
        let decodedToken = jose.decodeJwt(response.data.token);
        console.log(
          "Email extracted from the JWT token after login: ",
          decodedToken.userEmail,
        );
        login(response.data.token);
        navigate("/");
      } else {
        setShown(true);
        setMessage("User not found or wrong password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="center">Login</h1>
      <div className="flex_column">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="space_l" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <div className="center">{shown && <p>{message}</p>}</div>
    </div>
  );
}

export default Login;

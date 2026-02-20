import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div>
      <h1 className="center">Register</h1>
      <div className="flex_column">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label>Password Confirmation</label>
        <input type="password confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button className="button-login">Register</button>
      </div>
    </div>
  );
}

export default Register;
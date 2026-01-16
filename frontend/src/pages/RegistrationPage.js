import React, { useState } from "react";
import "./css/login.css";
import "./css/registration.css";
import { NavLink } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [name, setFullname] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const obj=validateForm();

    setErrors({ ...obj });

    console.log("LOGIN:", { email, password });
  }

    function validateForm() {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Az email cím kötelező";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Érvénytelen email formátum";
    }

    if (!password) {
      newErrors.password = "A jelszó kötelező";
    } else if (password.length < 6) {
      newErrors.password =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie";
    }

    return newErrors;
 
  }

  return (
    <div className="page">
      <div className="registration">
        <h1>Új fiók létrehozása</h1>
        <form onSubmit={submit}>
          <label>Teljes név</label>
          <input
            type="name"
            value={name}
            placeholder="Add meg a teljes neved"
            onChange={(e) => setFullname(e.target.value)}
          />
           {errors.name && (
    <span className="error-text">{errors.name}</span>
  )}

          <label>Email Cím</label>
          <input
            type="email"
            value={email}
            placeholder="Add meg az email címed"
            onChange={(e) => setEmail(e.target.value)}
          />
           {errors.email && (
    <span className="error-text">{errors.email}</span>
  )}

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => setPassword(e.target.value)}
          />
           {errors.password && (
    <span className="error-text">{errors.password}</span>
  )}

          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={cpassword}
            placeholder="Jelszó megerősítése"
            onChange={(e) => setCPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <button type="submit">Fiók létrehozása</button>
        </form>
        <p className="bottom-text">
          Már van fiókod? <NavLink to="/login">Jelentkezz be itt</NavLink>
        </p>
      </div>
    </div>
  );


}

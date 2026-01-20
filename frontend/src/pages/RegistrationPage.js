import React, { useState, useContext } from "react";
import "./css/login.css";
import "./css/registration.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [name, setFullname] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { register, serverError, clearServerError, loading } = useContext(AuthContext);

  function submit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = { email, password, name };
    register(data);
  }

  function validateForm() {
    const newErrors = {};

    if (!name) {
      newErrors.name = "A teljes név kötelező";
    }

    if (!email) {
      newErrors.email = "Az email cím kötelező";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Érvénytelen email formátum";
    }

    if (!password) {
      newErrors.password = "A jelszó kötelező";
    } else if (password.length < 6) {
      newErrors.password = "A jelszónak legalább 6 karakter hosszúnak kell lennie";
    }

    if (!cpassword) {
      newErrors.cpassword = "A jelszó megerősítése kötelező";
    } else if (password !== cpassword) {
      newErrors.cpassword = "A jelszavak nem egyeznek";
    }

    return newErrors;
  }

  return (
    <div className="page">
      <div className="registration">
        <h1>Új fiók létrehozása</h1>
        {serverError && <div className="alert-error">{serverError}</div>}
        <form onSubmit={submit}>
          <label>Teljes név</label>
          <input
            type="name"
            value={name}
            placeholder="Add meg a teljes neved"
            onChange={(e) => {
              setFullname(e.target.value);
              if (serverError) clearServerError();
            }}
          />
           {errors.name && (
    <span className="error-text">{errors.name}</span>
  )}

          <label>Email Cím</label>
          <input
            type="email"
            value={email}
            placeholder="Add meg az email címed"
            onChange={(e) => {
              setEmail(e.target.value);
              if (serverError) clearServerError();
            }}
          />
           {errors.email && (
    <span className="error-text">{errors.email}</span>
  )}

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => {
              setPassword(e.target.value);
              if (serverError) clearServerError();
            }}
          />
           {errors.password && (
    <span className="error-text">{errors.password}</span>
  )}

          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={cpassword}
            placeholder="Jelszó megerősítése"
            onChange={(e) => {
              setCPassword(e.target.value);
              if (serverError) clearServerError();
            }}
          />
          {errors.cpassword && (
            <span className="error-text">{errors.cpassword}</span>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Fiók létrehozása..." : "Fiók létrehozása"}
          </button>
        </form>
        <p className="bottom-text">
          Már van fiókod? <NavLink to="/login">Jelentkezz be itt</NavLink>
        </p>
      </div>
    </div>
  );


}

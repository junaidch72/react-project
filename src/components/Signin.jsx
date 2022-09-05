import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../style.css";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const credentials = JSON.parse(localStorage.getItem("credentials"));

  const navigate = useNavigate();

  const userid = () => {
    for (var i = 0; i < credentials.length; i++) {
      if (credentials[i].user === username) {
        localStorage.setItem("loginname", JSON.stringify(username));
        localStorage.setItem("loginid", credentials[i].userId);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const findname = (data, where, val, pass, pwd) => {
      const mail = data.some((obj) => obj[where] === val && obj[pass] === pwd);
      localStorage.setItem("loginstatus", JSON.stringify(true));
      let login = localStorage.getItem("loginstatus");
      if (login && mail) {
        userid();
        navigate("/home");
      } else {
        alert("wrong username or password");
      }
    };

    findname(credentials, "user", username, "pwd", password);
  };

  return (
    <>
      <div className="form-container">
        <div className="card">
          <h1>Sign in</h1>
          <div className="form-holder">
            <form action="">
              <input
                type="text"
                placeholder=" username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit" onClick={handleSubmit}>
                login Now
              </button>
            </form>
          </div>
          <p>
            Don't have an account?{" "}
            <Link className="links" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

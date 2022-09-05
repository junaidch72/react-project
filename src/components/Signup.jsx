import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";


import "../style.css";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const credentials = JSON.parse(localStorage.getItem("credentials") || "[]");


  const handleSubmit = (e) => {
    e.preventDefault();
    const findobj = (data, where, val,mail,val2) => {
      const search = data.some((obj) => obj[where] === val);
      const esearch =data.some((obj) => obj[mail] === val2);

      if (username === "" || password === "" || email === "") {
        alert("All field required");
      }
      else if (!validator.isEmail(email)) {
        alert(" invalid email");
        console.log(validator.isEmail(email))
        console.log(email)
      }
     
      else if (search) {
        alert("username not availabe");
      }
      else if (esearch) {
        alert("email not availabe");
      } 
      else {
        const credential = {
          userId: Date.now(),
          user: username,
          email: email,
          pwd: password,
        };
        credentials.push(credential);

        localStorage.setItem("credentials", JSON.stringify(credentials));

        navigate("/");
      }
    };

    findobj(credentials, "user", username,"email",email);
  };

  return (
    <>
      <div className="   form-container">
        <div className="card">
          <h1>Sign up</h1>
          <div className="form-holder">
            <form action="">
              <input
                type="text"
                placeholder="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder=" email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit" onClick={handleSubmit}>
                register Now
              </button>
            </form>
          </div>
          <p>
            Already have an account?{" "}
            <Link className="links" to="/">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

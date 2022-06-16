import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/appSlice";

async function loginUser(signInObject) {
  return fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(signInObject),
  }).then((data) => data.json());
}

export function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  //   const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const errors = {
    email: "Email invalide",
    pass: "Mot de passe invalide",
  };

  useEffect(() => {
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, []);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const validateForm = () => {
    console.log(email.length > 0 && password.length > 0);
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    })
      .then((data) => data.token)
      .catch(console.log);
    localStorage.setItem("token", token);

    dispatch(setToken(token));
    navigate("/admin", { replace: true });
  };

  return (
    <>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          <p className="auth__label">Email</p>
          <input
            autoFocus
            //   required
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {renderErrorMessage("email")}
        </label>
        <label>
          <p className="auth__label">Mot de passe</p>
          <input
            //   required
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMessage("password")}
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </>
  );
}

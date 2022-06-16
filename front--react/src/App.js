import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setToken, deleteToken } from "./store/appSlice";
import { BackLayout, NotFound } from "./component/back-index";
import { FrontLayout } from "./component/front-index";

import "./App.scss";

// import poweroff from '/icons/poweroff.svg'

function App() {
  const dispatch = useDispatch();
  let token =
    useSelector((state) => state.token) ||
    localStorage.getItem("token") ||
    undefined;

  const deleteToken = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
  };

  useEffect(() => {
    console.log(token);
    console.log("localstorage", localStorage.getItem("token"));
    if (token === null) {
      // token = localStorage.getItem("token");
      dispatch(setToken(localStorage.getItem("token")));
    }
  }, []);

  return (
    <div className="App">
      <Routes className="main-content">
        <Route exact path="/*" element={<FrontLayout />} />
        <Route exact path="/admin/*" element={<BackLayout />} />
      </Routes>
    </div>
  );
}

export default App;

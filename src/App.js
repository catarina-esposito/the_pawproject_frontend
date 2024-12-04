import "./App.css";
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect } from "react";
import { MainProvider, useMainContext } from './shared/context/MainContext';
import RouterApp from "./routerApp/RouterApp";


const App = () => {
  return (
      <MainProvider>
          <MainApp />
      </MainProvider>
  );
};

const MainApp = () => {
  const { darkMode, toggleDarkMode } = useMainContext();

  return (
      <div className="App">
          <button
              className="button is-primary"
              onClick={toggleDarkMode}
              style={{ margin: "1rem" }}
          >
              Switch to {darkMode ? "Light" : "Dark"} Mode
          </button>
          <RouterApp />
      </div>
  );
};

export default App;
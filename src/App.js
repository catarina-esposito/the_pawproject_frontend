import "./App.css";
import 'bulma/css/bulma.min.css';
import React from "react";
import { MainProvider } from './shared/context/MainContext';
import RouterApp from "./routerApp/RouterApp";


const App = () => {
  return (
    <MainProvider>
      <RouterApp/>
    </MainProvider>
  );
};

export default App;
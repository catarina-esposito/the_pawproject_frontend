import React, { useState, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Pets from "./pets/pages/Pets";
import AddPet from "./pets/pages/AddPet";
import UpdatePet from "./pets/pages/UpdatePet";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";
import Login from "./users/pages/Login";
import { MainContext } from "./shared/context/MainContext";

const App = () => {
  // to test the state for user logged in or not edit "useState(true)" or "useState(false)"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Pets />
        </Route>
        <Route path="/pets/add" exact>
          <AddPet />
        </Route>
        <Route path="/pets/:petId" exact>
          <UpdatePet />
        </Route>
        {/* <Route path="/pets/delete/:petId" exact>
          <DeletePet />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Pets />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    );
  }

  return (
    <MainContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </MainContext.Provider>
  );
};

export default App;

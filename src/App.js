import React, { useState, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Pets from "./pets/pages/Pets";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";
import Login from "./users/pages/Login";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [petId, setPetId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setPetId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setPetId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Pets />
        </Route>
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
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        petId: petId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

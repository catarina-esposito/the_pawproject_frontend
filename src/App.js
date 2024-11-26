import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home";
import LoginForm from "./components/LoginForm"; 
import LogoutButton from "./components/LogoutButton"; 
import React, { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <main>
        <Switch>
          {/* Home Route */}
          <Route path="/" exact>
            <Home />
            {isAuthenticated && <LogoutButton onLogout={handleLogout} />} {/* Show Logout Button if logged in */}
          </Route>

          {/* Login Route */}
          <Route path="/login" exact>
            <LoginForm onLogin={handleLogin} /> {/* Pass login callback */}
          </Route>

          {/* Redirect to Home */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

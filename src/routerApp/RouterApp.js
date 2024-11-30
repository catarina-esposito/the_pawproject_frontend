import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from "react-router-dom";
  
  import Home from "../home/Home.js";
  import Login from '../users/pages/LoginForm.js';
  import React from "react";
  import User from '../users/User.js';
  import SiteHeader from '../components/SiteHeader/SiteHeader.js';
  
  const RouterApp = () => {

    return (
        <Router>
          <main>
            <SiteHeader />
            <Switch>

              <Route path="/" exact>
                <Home />
              </Route>
  
              {/* Login Route */}
              <Route path="/login" exact>
                <Login />
              </Route>
  
              <Route path="/users" exact>
                <User/>
              </Route>
  
              {/* Redirect to Home */}
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
    );
  };
  
  export default RouterApp;
  
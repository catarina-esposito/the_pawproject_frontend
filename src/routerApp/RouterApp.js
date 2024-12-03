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
import Pet from "../pets/pages/Pet.js";
import Footer from '../components/Footer/Footer.js';
import SiteHeader from '../components/SiteHeader/SiteHeader.js';
import AddPet from "../pets/pages/AddPet.js";
import SignUp from '../users/pages/SignUp.js';

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

            <Route  path="/add-pet" exact>
              <AddPet/>
            </Route>

            <Route path="/users" exact>
              <User/>
            </Route>

            <Route path="/pet/:id" exact>
              <Pet/>
            </Route>

            <Route path="/signup" exact> 
              <SignUp /> 
            </Route>

            {/* Redirect to Home */}
            <Redirect to="/" />
          </Switch>
        </main>
        <Footer/>
      </Router>
  );
};

export default RouterApp;

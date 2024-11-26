import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import 'bulma/css/bulma.min.css';
import { MainProvider } from "./components/context/MainContext";
import Header from "./components/Header/Header";
import { UserPage } from "./components/Users/UserPage";


const App = () => {
  return (
    <Router>
      <MainProvider>
      <Header/>
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/users" exact>
              <UserPage />
            </Route>
            <Route path="/login" exact><Login/></Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </MainProvider>
    </Router>
  );
};

export default App;
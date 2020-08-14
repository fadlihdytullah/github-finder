import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import User from "./components/users/User";
import GithubContextProvider from "./components/contexts/GithubContextProvider";

const App = () => {
  return (
    <Router>
      <GithubContextProvider>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search />
                    <Users />
                  </>
                )}
              />

              <Route path='/about' component={About} />

              <Route
                path='/user/:username'
                render={(props) => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </GithubContextProvider>
    </Router>
  );
};

export default App;

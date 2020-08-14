import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import User from "./components/users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchUser = async (username) => {
    setLoading(true);

    const url = `https://api.github.com/search/users?q=${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const res = await axios.get(url).catch((err) => {
      setLoading(false);
      alert("Oops there something wrong!");
    });

    if (res && res.status === 200) {
      setUsers(res.data.items);
      setLoading(false);
    }
  };

  const handleGetUser = async (username) => {
    setLoading(true);

    const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const reposUrl = `https://api.github.com/users/${username}/repos?per_page=10&sort=updated&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const userPromise = axios.get(url).catch((err) => console.log(err.message));
    const reposPromise = axios
      .get(reposUrl)
      .catch((err) => console.log(err.message));

    const [userResponse, reposResponse] = await Promise.all([
      userPromise,
      reposPromise,
    ]);

    if (
      userResponse &&
      userResponse.status === 200 &&
      reposResponse &&
      reposResponse.status === 200
    ) {
      setUser(userResponse.data);
      setRepos(reposResponse.data);
      setLoading(false);
    }
  };

  const handleClearUser = () => {
    setUsers([]);
    setLoading(false);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <>
                  <Search
                    showClear={!!users.length}
                    onSearch={handleSearchUser}
                    onClear={handleClearUser}
                  />
                  <Users loading={loading} users={users} />
                </>
              )}
            />

            <Route path='/about' component={About} />

            <Route
              path='/user/:username'
              render={(props) => (
                <User
                  {...props}
                  data={{ user, repos }}
                  loading={loading}
                  onFetch={handleGetUser}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

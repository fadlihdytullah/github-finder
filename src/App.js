import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  handleSearchUser = async (username) => {
    this.setState({ loading: true });

    const url = `https://api.github.com/search/users?q=${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const res = await axios.get(url).catch((err) => console.log(err.message));

    if (res.status === 200) {
      this.setState({ users: res.data.items, loading: false });
    }
  };

  handleGetUser = async (username) => {
    this.setState({ loading: true });

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

    if (userResponse.status === 200 && reposResponse.status === 200) {
      this.setState({
        user: userResponse.data,
        repos: reposResponse.data,
        loading: false,
      });
    }
  };

  handleClearUser = () => this.setState({ users: [], loading: false });

  render() {
    const { users, user, repos, loading } = this.state;

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
                      onSearch={this.handleSearchUser}
                      onClear={this.handleClearUser}
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
                    onFetch={this.handleGetUser}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

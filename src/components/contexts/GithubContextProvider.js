import React, { useState } from "react";
import Axios from "axios";

export const githubContext = React.createContext({});

const GithubContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchUser = async (username) => {
    setLoading(true);

    const url = `https://api.github.com/search/users?q=${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const res = await Axios.get(url).catch((err) => {
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

    const userPromise = Axios.get(url).catch((err) => console.log(err.message));
    const reposPromise = Axios.get(reposUrl).catch((err) =>
      console.log(err.message),
    );

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
    <githubContext.Provider
      value={{
        users,
        user,
        repos,
        loading,
        onClearSearch: handleClearUser,
        onSearchUser: handleSearchUser,
        onFetchUser: handleGetUser,
      }}
    >
      {children}
    </githubContext.Provider>
  );
};

export default GithubContextProvider;

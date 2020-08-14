import React from "react";
import Axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import { SET_LOADING, SEARCH_USER, GET_USER, CLEAR_SEARCH } from "./../types";

const initialState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
};

const GithubState = ({ children }) => {
  const [state, dispatch] = React.useReducer(githubReducer, initialState);

  const handleSearchUser = async (username) => {
    setLoading();

    const url = `https://api.github.com/search/users?q=${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const res = await Axios.get(url).catch((err) => {
      setLoading(false);
      alert("Oops there something wrong!");
    });

    if (res && res.status === 200) {
      dispatch({ type: SEARCH_USER, payload: res.data.items });
    }
  };

  const handleGetUser = async (username) => {
    setLoading();

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
      const user = userResponse.data;
      const repos = reposResponse.data;

      dispatch({ type: GET_USER, payload: { user, repos } });
    }
  };

  const handleClearUser = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        onSearchUser: handleSearchUser,
        onClearSearch: handleClearUser,
        onFetchUser: handleGetUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;

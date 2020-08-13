import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => (
  <div className='my-1'>
    <h2>Public Repositories</h2>

    {repos.map((repo) => (
      <RepoItem key={repo.id} repo={repo} />
    ))}
  </div>
);

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;

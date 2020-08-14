import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";

const User = ({ data: { user, repos }, loading, onFetch, match }) => {
  React.useEffect(
    () => {
      onFetch(match.params.username);
    },
    // eslint-disable-next-line
    [],
  );

  const {
    login,
    company,
    name,
    avatar_url,
    html_url,
    location,
    bio,
    blog,
    public_repos,
    public_gists,
    followers,
    following,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable: &nbsp;
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt={`${login}'s avatar profile`}
            className='round-img'
            style={{ width: "150px" }}
          />
          <h3>{name}</h3>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}

          <a
            className='btn btn-dark my-1'
            href={html_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            Visit Github Profile
          </a>

          <ul>
            {login && <li>Username: {login}</li>}

            {company && <li>Company: {company}</li>}

            {blog && <li>Website: {blog}</li>}
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-dark'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-success'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

User.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
};

export default User;

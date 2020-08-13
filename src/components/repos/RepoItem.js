import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  const { name, html_url, description, forks, open_issues } = repo;

  return (
    <div className='card'>
      <div className='grid-2'>
        <div>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
        </div>
        <div className='flex flex-end'>
          <div className='badge badge-light'>Forks: {forks}</div>
          <div className='badge badge-danger'>Issues: {open_issues}</div>
          <a
            className='btn btn-dark btn-sm'
            href={html_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;

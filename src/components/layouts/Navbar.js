import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => {
  return (
    <nav className='navbar bg-primary'>
      <h3>
        <i className={icon} /> {title}
      </h3>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github-alt",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;

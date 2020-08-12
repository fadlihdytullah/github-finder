import React from "react";
import PropTypes from "prop-types";

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-${type || "light"}`}>
      <i className='fas fa-exclamation-circle'></i> {message}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default Alert;

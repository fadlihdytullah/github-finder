import React from "react";
import PropTypes from "prop-types";
import Alert from "../layouts/Alert";

const Search = ({ showClear, onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  const handleChange = (event) => setSearchTerm(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm) {
      setShowAlert(true);
      return;
    }

    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowAlert(false);
    onClear();
  };

  return (
    <div>
      {showAlert && (
        <Alert
          message='Please input the
          search field'
        />
      )}

      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search users...'
          value={searchTerm}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-dark btn-block'>
          Search
        </button>

        {showClear && (
          <button
            type='button'
            className='btn btn-block my-1'
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  showClear: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Search;

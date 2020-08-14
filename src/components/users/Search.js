import React from "react";
import Alert from "../layouts/Alert";
import GithubContext from "./../../contexts/github/githubContext";
const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const { users, onSearchUser, onClearSearch } = React.useContext(
    GithubContext,
  );

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

    onSearchUser(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowAlert(false);
    onClearSearch();
  };

  const showClear = !!users.length;

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

export default Search;

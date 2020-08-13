import React, { Component } from "react";
import PropTypes from "prop-types";
import Alert from "../layouts/Alert";

class Search extends Component {
  state = {
    searchTerm: "",
    showAlert: false,
  };

  static propTypes = {
    showClear: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showAlert) {
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
    }
  }

  handleChange = (event) => this.setState({ searchTerm: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      this.setState({ showAlert: true });
      return;
    }

    this.props.onSearch(this.state.searchTerm);
  };

  handleClear = () => {
    this.setState({ searchTerm: "", showAlert: false });
    this.props.onClear();
  };

  render() {
    return (
      <div>
        {this.state.showAlert && (
          <Alert
            message='Please input the
          search field'
          />
        )}

        <form className='form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Search users...'
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn btn-dark btn-block'>
            Search
          </button>

          {this.props.showClear && (
            <button
              type='button'
              className='btn btn-block my-1'
              onClick={this.handleClear}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default Search;

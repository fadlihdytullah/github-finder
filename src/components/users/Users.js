import React from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";

const Users = ({ loading, users }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={userStyle}>
          {users.map((user) => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div>
      )}
    </>
  );
};

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;

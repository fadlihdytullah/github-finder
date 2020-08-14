import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import GithubContext from "./../../contexts/github/githubContext";
const Users = () => {
  const { loading, users } = React.useContext(GithubContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={userStyle}>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;

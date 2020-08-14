import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import { githubContext } from "../contexts/GithubContextProvider";

const Users = () => {
  const { loading, users } = React.useContext(githubContext);

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

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;

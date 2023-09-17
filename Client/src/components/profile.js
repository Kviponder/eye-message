import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import authInstance from "../utils/Auth";
import FriendsList from "./friendsList";
import { ADD_FRIEND } from "../utils/mutations";
import { Container } from "react-bootstrap";

export default function Profile() {
  const username = authInstance.getUsername();
  const loggedIn = authInstance.loggedIn();
  const [friendUsername, setFriendUsername] = useState(""); // Use setFriendUsername instead of setUsername

  const [handleAddFriend] = useMutation(ADD_FRIEND);

  const handleAddFriendClick = async () => {
    try {
      await handleAddFriend({
        variables: { username: friendUsername },
      });

      setFriendUsername("");
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  return (
    <>
      {loggedIn ? (
        <div className="profile">
          <h1 className="profile-title">Profile</h1>
          <h2 className="profile-welcome">Welcome, {username}!</h2>
          <h3 className="profile-success">You have successfully logged in</h3>
          <div className="add-friend-container">
            <h3 className="add-friend-header">Add Friend</h3>
            <input
              type="text"
              placeholder="Friend's Username"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)} // Update friendUsername state
              className="add-friend-input"
            />
            <button
              onClick={handleAddFriendClick}
              className="add-friend-button"
            >
              Add Friend
            </button>{" "}
          </div>
          <Container>
            <FriendsList />
          </Container>
        </div>
      ) : (
        <h1 className="not-logged-in-message">You are not logged in, loser</h1>
      )}
    </>
  );
}

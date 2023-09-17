// FriendsList.js
import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../utils/queries";

const FriendsList = () => {
  const { loading, error, data } = useQuery(QUERY_FRIENDS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  const friends = data?.friends || [];

  return (
    <div className="friends-list-container">
      <h3 className="friends-list-header">Friends List</h3>
      <ul className="friends-list">
        {friends.map((friend) => (
          <li className="friends-list-item" key={friend._id}>
            <a href="/friendProfile">{friend.username}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;

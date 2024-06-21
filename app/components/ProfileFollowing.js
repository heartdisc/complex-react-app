import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfileFollowing() {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPost() {
      try {
        const response = await Axios.get(
          `/profile/${username}/following`,
          {
            token: appState.user.token
          },
          {
            signal: controller.signal
          }
        );

        setIsLoading(false);
        setFollowing(response.data);
      } catch (error) {
        console.log("There was a problem in ProfilePost");
        console.log(error.response);
      }
    }

    fetchPost();
  }, [username]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {following.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollowing;

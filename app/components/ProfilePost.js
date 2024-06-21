import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import PostItem from "./PostItem";

export default function ProfilePost() {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPost() {
      try {
        const response = await Axios.get(
          `/profile/${username}/posts`,
          {
            token: appState.user.token
          },
          {
            signal: controller.signal
          }
        );

        setIsLoading(false);
        setPosts(response.data);
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
      {posts &&
        posts.map(post => {
          return <PostItem key={post._id} post={post} noAuthor="true" />;
        })}
    </div>
  );
}

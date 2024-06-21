import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import Axios from "axios";
import StateContext from "../StateContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "react-tooltip";
import NotFound from "./NotFound";
import DispatchContext from "../DispatchContext";

export default function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    // const ourRequest = Axios.CancelToken.source();
    const controller = new AbortController();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          signal: controller.signal
        });

        setIsLoading(false);
        setPost(response.data);
      } catch (error) {
        console.log("There was a problem in ProfilePost or the request was cancelled");
        if (error.response) console.log(error.response);
      }
    }

    fetchPost();
    return () => {
      controller.abort();
    };
  }, [id]);

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title="Loading">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  function isOwner() {
    return appState.loggedIn && appState.user.username === post.author.username;
  }

  async function deleteHandler() {
    const areYouSure = window.confirm("Do you really want to delete this post?");
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: {
            token: appState.user.token
          }
        });
        if (response.data == "Success") {
          appDispatch({ type: "flashMessages", value: "Post was successfully deleted." });
          navigate(`/profile/${appState.user.username}`);
        }
      } catch (error) {
        console.log("something error");
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link to={`/posts/${post._id}/edit`} data-tooltip-content="Edit" data-tooltip-id="edit" className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <Tooltip id="edit" className="custom-tooltip" />{" "}
            <a onClick={deleteHandler} data-tooltip-content="Delete" data-tooltip-id="delete" className="delete-post-button text-danger">
              <i className="fas fa-trash"></i>
            </a>
            <Tooltip id="delete" className="custom-tooltip" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  );
}

import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Page title="Not found">
      <div className="text-center">
        <h2>Whoops, we cannot find that page</h2>
        <div className="lead text-mute">
          You can always visit the <Link to="/">homepage</Link> to get a fresh start.
        </div>
      </div>
    </Page>
  );
}

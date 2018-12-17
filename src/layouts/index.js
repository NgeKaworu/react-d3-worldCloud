import React from "react";
import Header from "./Header";
import withRouter from "umi/withRouter";

function Layout({ children, location }) {
  return (
    <div>
      <Header location={location} />
      <div>
        <div style={{ width: "800px", margin: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

export default withRouter(Layout);

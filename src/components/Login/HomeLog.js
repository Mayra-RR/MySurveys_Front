import React, { Fragment, Component } from "react";
import "./Login.css";
import { GlobalContextProvider } from "./GlobalContextProvider";
import Login from "./Login";
class HomeLog extends Component {
render() {
  return (
    <Fragment>
      <div>LOG IN</div>
      <GlobalContextProvider settings={{ username: "mysurveys", password: "surveys123" }}>
        <Login />
      </GlobalContextProvider>
    </Fragment>
  );
}
}
export default HomeLog; 
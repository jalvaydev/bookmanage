import React from "react";
import { Route } from "react-router";
import App from "./App";
import Login from "./login";
import Register from "./register";

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Route>
);

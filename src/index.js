import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import Admin from "layouts/Admin.js";
import rootReducer from "reducers/index.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

const store = createStore(rootReducer);
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Redirect from="/" to="/admin/dashboard"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

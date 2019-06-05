import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);

/**
 * ****** Challenges ******
 * 1. Author administration
 * 2. Filter course list
 * 3. Hide empty course list
 * 4. Unsaved changes message
 * 5. Enhance validation
 * 6. Handle 404 on edit course
 * 7. Show # courses in Header
 * 8. Pagination
 * 9. Sort course table
 * 10. Revert abandoned changes
 */

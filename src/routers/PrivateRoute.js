import React from "react";
import PropTypes from "prop-types"
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({
  isAuteticated,
  component: Component,
  ...rest
}) => {




  return (
    <Route
      {...rest}
      component={(props) =>
        isAuteticated ? <Component {...props} /> : <Redirect to="/index" />
      }
    />
  );
};
PrivateRoute.propTypes = {
  isAuteticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

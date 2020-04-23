import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return localStorage.getItem('barnesToken') !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/log-in',
            state: { redirectTo: { ...rest } }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;

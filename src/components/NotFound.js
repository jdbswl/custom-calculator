import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => (
  <React.Fragment>
    <h3>Page not found</h3>
    <Link to="/">Home</Link>
  </React.Fragment>
);

export default NotFound;

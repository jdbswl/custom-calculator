import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Orders() {
  return <h2>Orders</h2>;
}

function About() {
  return <h2>About</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/orders/'>Orders</Link>
            </li>
          </ul>
        </nav>

        <Route path='/' exact component={Orders} />
        <Route path='/orders/' component={Orders} />
        <Route path='/about/' component={About} />
      </div>
    </Router>
  );
}

export default AppRouter;

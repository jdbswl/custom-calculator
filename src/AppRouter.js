import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AddOrder from './components/AddOrder';
import OrderList from './components/OrderList';

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/add-order/'>Add Order</Link>
            </li>
            <li>
              <Link to='/order-list/'>Order List</Link>
            </li>
          </ul>
        </nav>
        <Route path='/' exact component={OrderList} />
        <Route path='/add-order/' component={AddOrder} />
        <Route path='/order-list/' component={OrderList} />
      </div>
    </Router>
  );
}

export default AppRouter;

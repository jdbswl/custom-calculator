import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppSyncOrderList from './components/AppSyncOrderList';
import AppSyncAddOrder from './components/AppSyncAddOrder';
import OrderList from './components/OrderList';

function Orders() {
  return (
    <div>
      <AppSyncOrderList />
    </div>
  )
}

function OrdeList() {
  return (
    <div>
      <OrderList />
    </div>
  )
}

function AddOrder() {
  return (
    <div>
      <AppSyncAddOrder />
    </div>
  )
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
            <li>
              <Link to='/add-order/'>Add Order</Link>
            </li>
            <li>
              <Link to='/order-list/'>Order List</Link>
            </li>
          </ul>
        </nav>

        <Route path='/' exact component={Orders} />
        <Route path='/orders/' component={Orders} />
        <Route path='/about/' component={About} />
        <Route path='/add-order/' component={AddOrder} />
        <Route path='/order-list/' component={OrderList} />
      </div>
    </Router>
  );
}

export default AppRouter;

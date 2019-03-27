import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AddOrder from './components/AddOrder';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import NotFound from './components/NotFound';

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
        <Switch>
          <Route path='/' exact component={OrderList} />
          <Route path='/add-order/' component={AddOrder} />
          <Route path='/order-list/' component={OrderList} />
          <Route path='/order-details/:id' render={
            (props) => <OrderDetails {...props} />
          } />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

//          <Route path='/order-details/:id' component={OrderDetails} />
           // <li>
            //   <Link to='/order-details/'>Order Details</Link>
            // </li>

export default AppRouter;

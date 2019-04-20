import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import AddOrder from './components/AddOrder';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import NotFound from './components/NotFound';


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log('logout');
    Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }

  render() {
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
              <li>
                <button type='button' onClick={this.logout}>Logout</button>
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
}

export default AppRouter;

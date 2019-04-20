import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import NavDrawer from './NavDrawer'
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
          <NavDrawer logout={this.logout}>
            <Switch>
              <Route path='/' exact component={OrderList} />
              <Route path='/add-order/' component={AddOrder} />
              <Route path='/order-list/' component={OrderList} />
              <Route path='/order-details/:id' render={
                (props) => <OrderDetails {...props} />
              } />
              <Route component={NotFound} />
            </Switch>
          </NavDrawer>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

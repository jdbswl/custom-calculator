import React, { Component } from 'react';
import './App.css';
import Amplify, { Analytics, API, graphqlOperation} from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import MinimalOrderList from './components/MinimalOrderList';

Amplify.configure(awsmobile);

const listOrders = `query listOrders {
  listOrders{
    items{
      id
      name
    }
  }
}`

const addOrder = `mutation createOrder($name:String!) {
  createOrder(input:{
    name:$name
  }){
    id
    name
  }
}`


class App extends Component {
  orderMutation = async () => {
    const orderDetails = {
      name: 'New order'
    };
    const newEvent = await API.graphql(graphqlOperation(addOrder, orderDetails));
    alert(JSON.stringify(newEvent));
  }

  listQuery = async () => {
    console.log('listing orders');
    const allOrders = await API.graphql(graphqlOperation(listOrders));
    alert(JSON.stringify(allOrders));
  }

  render() {
    return (
      <div className="App">
        <MinimalOrderList />
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.orderMutation}>GraphQL Mutation</button>
      </div>
    );
  }
}

const signUpConfig = {
  includeGreetings: true,
  hiddenDefaults: ['phone_number'],
}

export default withAuthenticator(App, {
  signUpConfig
});

import React, { Component } from 'react';
import '../App.css';

import Amplify, { API, graphqlOperation} from 'aws-amplify';
import awsmobile from '../aws-exports';

import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

Amplify.configure(awsmobile);

class MinimalOrderList extends Component {
  listQuery = async () => {
    console.log('listing orders');
    const allOrders = await API.graphql(graphqlOperation(queries.listOrders));
    alert(JSON.stringify(allOrders));
  }

  render() {
    return (
      <div className="MinimalOrderList">
        <button onClick={this.listQuery}>Codegen GraphQL Query</button>
      </div>
    );
  }
}

export default MinimalOrderList;

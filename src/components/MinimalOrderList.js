import React from 'react';
import Amplify, { graphqlOperation} from 'aws-amplify';
import awsmobile from '../aws-exports';
import { Connect } from 'aws-amplify-react';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

Amplify.configure(awsmobile);

class MinimalOrderList extends React.Component {
  render() {
    const ListView = ({ orders }) => (
      <div>
        <h3>All Orders</h3>
        <ul>
          {orders.map(order => <li key={order.id}>{order.name}</li>)}
        </ul>
      </div>
    );

    return (
      <Connect query={graphqlOperation(queries.listOrders)}>
        {({ data: { listOrders }, loading, error }) => {
          if(error) return (<h3>Error</h3>);
          if(loading || !listOrders) return (<h3>Loading...</h3>);
          return (<ListView orders={listOrders.items} />);
        }}
      </Connect>
    );
  }
}

export default MinimalOrderList;

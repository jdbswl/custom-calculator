import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import * as queries from '../graphql/queries';

class AppSyncOrderList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {
          this.props.orders.map((order, index) => (
            <h2 key={index}>{index + 1}. {order.name}</h2>
          ))
        }
      </div>
    )
  }
}

export default graphql(gql(queries.listOrders), {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    orders: props.data.listOrders ? props.data.listOrders.items : []
  })
})(AppSyncOrderList);

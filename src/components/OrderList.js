import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';

import * as queries from '../graphql/queries';

const LIST_ORDERS = gql(queries.listOrders);

const OrderList = () => (
  <Query query={LIST_ORDERS}>
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) return (<p>Error</p>);
      return data.listOrders.items.map((order, index) => (
        <div key={index}>
          <p>{index+1}. {order.name}  <Button color="primary">Edit</Button></p>
        </div>
      ));
    }}
  </Query>
)

export default OrderList;

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

const OrderList = () => (
  <Query
    query={gql(queries.listOrders)}
  >
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) return (<p>Error</p>);

      return (<p>here</p>);
    }}
  </Query>
)

export default OrderList;

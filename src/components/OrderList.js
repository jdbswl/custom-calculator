import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

const LIST_ORDERS = gql(queries.listOrders);

const OrderList = () => (
  <Query query={LIST_ORDERS}>
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) return (<p>Error</p>);
      return data.listOrders.items.map(({id, name}) => (
        <div key={id}>
          <p>{name}</p>
        </div>
      ));
    }}
  </Query>
)

export default OrderList;

      // return (
      //   <div>
      //     <p>Still here....</p>
      //     <p>{data.listOrders.items.length}</p>
      //   </div>
      // );


      // return data.listOrders.items.map((item) => {
      //   <div>
      //     <p>{item.name}</p>
      //   </div>
      // })

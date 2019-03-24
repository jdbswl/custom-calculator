import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as queries from '../graphql/queries';

const GET_ORDER = gql(queries.getOrder);

// const demoId=
// {orderId=
//'70326b5c-c78a-4a0e-952b-2c8ba213af60'
//}
const OrderDetails = () => (
  <Query query={GET_ORDER} variables={{id:'70326b5c-c78a-4a0e-952b-2c8ba213af60'}}>
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) {console.log(error); return (<p>Error</p>);};
      return (
        <div>
          <h2>Order Details</h2>
            {
              data.getOrder.name
            }
        </div>
      );

      // data.listOrders.items.map((order, index) => (
      //   <ListItem key={order.id}>
      //     <ListItemText primary={order.name} secondary={order.id}/>
      //     <ListItemLink>Edit</ListItemLink>
      //   </ListItem>
      // ))
      // return data.listOrders.items.map((order, index) => (
      //   <div key={index}>
      //     <p>{index+1}. {order.name}  <Button variant="outlined" color="primary">Edit</Button></p>
      //   </div>
      // ));
    }}
  </Query>
)

export default OrderDetails;


      // return data.listOrders.items.map((order, index) => (
      //   <div key={index}>
      //     <p>{index+1}. {order.name}  <Button variant="outlined" color="primary">Edit</Button></p>
      //   </div>
      // ));

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

const OrderDetails = (props) => (
  <Query query={GET_ORDER} variables={{id:props.match.params.id}}>
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) {console.log(error); return (<p>Error</p>);};
      return (
        <div>
          <h2>Order Details</h2>
            <div>
              <p>Name: {data.getOrder.name}</p>
              <p>Link: /order-details/{data.getOrder.id} (todo: copy-to-clipboard button)</p>
              <p>Notes: {data.getOrder.notes ? data.getOrder.notes : 'No Notes'}</p>
              <p>List Items: {data.getOrder.listItems ? data.getOrder.listItems : 'No List Items'}</p>
            </div>
        </div>
      );
    }}
  </Query>
)


export default OrderDetails;





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
      // return data.listOrders.items.map((order, index) => (
      //   <div key={index}>
      //     <p>{index+1}. {order.name}  <Button variant="outlined" color="primary">Edit</Button></p>
      //   </div>
      // ));

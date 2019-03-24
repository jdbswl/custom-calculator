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

const LIST_ORDERS = gql(queries.listOrders);

const styles = theme => ({
  // root: {
  //   width: '100%',
  //   maxWidth: 360,
  //   backgroundColor: theme.pallete.background.paper,
  // },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props}/>;
}

const OrderList = () => (
  <Query query={LIST_ORDERS}>
    {({ loading, error, data }) => {
      if(loading) return (<p>Loading...</p>);
      if(error) return (<p>Error</p>);
      return (
        <div>
          <h2>Orders</h2>
          <List>
            {
              data.listOrders.items.map((order, index) => (
                <ListItem key={order.id}>
                  <ListItemText primary={order.name} />
                  <ListItemLink>Edit</ListItemLink>
                </ListItem>
              ))
            }
          </List>
        </div>
      );
      // return data.listOrders.items.map((order, index) => (
      //   <div key={index}>
      //     <p>{index+1}. {order.name}  <Button variant="outlined" color="primary">Edit</Button></p>
      //   </div>
      // ));
    }}
  </Query>
)

export default OrderList;


      // return data.listOrders.items.map((order, index) => (
      //   <div key={index}>
      //     <p>{index+1}. {order.name}  <Button variant="outlined" color="primary">Edit</Button></p>
      //   </div>
      // ));

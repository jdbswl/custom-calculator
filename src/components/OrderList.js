import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddOrder from './AddOrder'
import * as queries from '../graphql/queries'



const LIST_ORDERS = gql(queries.listOrders)



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
})


function ListItemLink(props) {
  return <ListItem button component="a" {...props}/>
}


class OrderList extends React.Component {
  render() {
    console.log('Order List Component props:', this.props)
    return (
      <div>

        <AddOrder />

        <Query query={LIST_ORDERS} variables={{}} pollInterval={500}>
          {({ loading, error, data }) => {
            console.log('Order List Component Query Response Handler', loading, error, data)
            if(loading) {
              console.log('  Loading', loading)
              return (<p> Loading Orders... </p>)
            } else if(error) {
              console.log('  error', error)
              return (<p>Error</p>)
            } else {
              console.log('  data', data)
              return (
                <div>
                  <h2>Orders</h2>
                  <List>{
                    data.listOrders.items.map((order, index) =>
                    (
                      <ListItem key={order.id}>
                        <ListItemText primary={(index + 1) + ': ' + order.name} secondary={order.id}/>
                        <ListItemLink href={'/orders/' + order.id}>Details</ListItemLink>
                      </ListItem>
                    ))
                  }</List>
                </div>
              )
            }
          }}
        </Query>
      </div>
    )
  }
}


export default withStyles(styles)(OrderList)

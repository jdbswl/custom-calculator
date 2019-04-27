import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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


class Home extends React.Component {
  render() {
    console.log('Order List Component props:', this.props)
    return (
      <div>

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
                <React.Fragment>
                  <h2>Welcome to your Custom Calculator!</h2>
                  <div>
                    <Grid container spacing={12}>
                      <Grid item xs={6}>
                        <Card>
                          <CardContent>
                            <p>You have {data.listOrders.items.length} order{data.listOrders.items.length === 1 ? '' : 's'}</p>
                            <CardActions>
                              <Button component={Link} size="small" to="/orders">View Orders</Button>
                            </CardActions>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </div>

                </React.Fragment>
              )
            }
          }}
        </Query>
      </div>
    )
  }
}
                  //
                  // <p>You have {data.listOrders.items.length} orders.</p>
                  // <Link to='/orders'>View Orders</Link>


export default withStyles(styles)(Home)

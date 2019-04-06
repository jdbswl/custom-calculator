import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

// import { withStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
// import Divider from '@material-ui/core/Divider'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'

// import OrderList from './OrderList'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'


const GET_ORDER = gql(queries.getOrder)
const DELETE_ORDER = gql(mutations.deleteOrder)
const UPDATE_ORDER = gql(mutations.updateOrder)


class OrderDetails extends React.Component {
  constructor(props) {
    super(props)
    this.backToOrderList = this.backToOrderList.bind(this)
  }

  backToOrderList() {
    let path = `/order-list`
    this.props.history.push(path)
  }

  render() {
    return (
      <div>
        <Query
          query={GET_ORDER}
          variables={{id:this.props.match.params.id}}
          pollInterval={500}>
            {({ loading, error, data }) => {
              if(loading) {
                return (<p>Loading...</p>)
              } else if(error) {
                console.log(error)
                return (<p>Error</p>)
              } else {
                const orderId = this.props.match.params.id
                return (
                  <div>
                    <h2>Order Details</h2>
                    <div>
                       <p>{data.getOrder.name}</p>
                       <p>{JSON.stringify(data.getOrder.notes)}</p>
                    </div>

                    <Mutation mutation={UPDATE_ORDER}>
                    {(updateOrder, {data}) => (
                      <div>
                        <button onClick={e => {
                          updateOrder({
                            variables: {
                              input: {
                                id: orderId,
                                name: 'Updated',
                                notes: ['cats', 'dogs', 'squirrels']
                              }
                            }
                          })
                        }}>Update</button>
                      </div>
                    )}
                    </Mutation>

                    <Mutation mutation={DELETE_ORDER}>
                    {(deleteOrder, {data}) => (
                      <div>
                        <button onClick={e => {
                          deleteOrder({ variables: { input: {
                            id: this.props.match.params.id
                          }}})
                          this.backToOrderList()
                        }}>
                          Delete
                        </button>
                      </div>
                    )}
                    </Mutation>
                  </div>
                )
                // return (
                //   <div>
                //     <h2>Order Details</h2>
                //       <div>

                //         <p>Link: /order-details/{data.getOrder.id} (todo: copy-to-clipboard button)</p>

                //         <p>Line Items: {data.getOrder.lineItems ? data.getOrder.lineItems : 'No Line Items'}</p>
                //       </div>

                //   </div>
                // )
              }
            }}
        </Query>
      </div>
    )
  }
}


export default withRouter(OrderDetails)

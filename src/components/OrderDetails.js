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
const CREATE_LINE_ITEM = gql(mutations.createLineItem)


function DeleteOrderButton({id, clickHandler}) {
  return (
    <Mutation mutation={DELETE_ORDER}>
    {(deleteOrder, {data}) => (
      <div>
        <button onClick={e => {
          if(!id) return
          deleteOrder({ variables: { input: {
            id
          }}})
          clickHandler()
        }}>
          Delete
        </button>
      </div>
    )}
    </Mutation>
  )
}


function BackButton({clickHandler}) {
  return (
    <button onClick={e => {
      clickHandler()
    }}>
      Order List
    </button>
  )
}


function BasicOrderDetails({order}) {
  return (
    <div>
      <h2>Order Details</h2>
       <p><span><label>Order Name: </label></span>{order ? order.name : ''}</p>
       <p><span><label>Line Items: </label></span>{order ? JSON.stringify(order.lineItems) : 'No Line Items'}</p>
    </div>
  )
}


function UpdateOrderForm({id}) {
  let updatedOrderName = ''
  return (
    <Mutation mutation={UPDATE_ORDER}>
    {(updateOrder, {data}) => (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateOrder({ variables: { input: {
              id,
              name: updatedOrderName.value
            }}});
            updatedOrderName.value = "";
          }}
        >
          <input
            ref={node => {
              updatedOrderName = node;
            }}
          />
          <button type="submit">Update Order Name</button>
        </form>
      </div>
    )}
    </Mutation>
  )
}

// 
// function AddLineItem({id}) {
//   let lineItemName = ''
//   let lineItemCost = ''
//   return (
//     <Mutation mutation={CREATE_LINE_ITEM}>
//     {(createLineItem, {data}) => (
//       <div>
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             createLineItem({ variables: { input: {
//               name:
//             }}});
//             updatedOrderName.value = "";
//           }}
//         >
//           <input
//             ref={node => {
//               updatedOrderName = node;
//             }}
//           />
//           <button type="submit">Update Order Name</button>
//         </form>
//       </div>
//     )}
//     </Mutation>
//   )
// }
//
//
// <div>
//   <button onClick={e => {
//     updateOrder({
//       variables: {
//         input: {
//           id,
//           name: 'Updated',
//           notes: ['cats', 'dogs', 'squirrels']
//         }
//       }
//     })
//   }}>Update</button>
//
// </div>




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
    let newOrderName = ''
    return (
      <div>
        <Query query={GET_ORDER} variables={{id:this.props.match.params.id}} pollInterval={500}>
            {({ loading, error, data }) => {
              if(loading) {
                return (<p>Loading...</p>)
              } else if(error) {
                console.log(error)
                return (<p>Error</p>)
              } else {
                const orderId = this.props.match.params.id
                const order = data.getOrder
                return (
                  <div>
                    <BasicOrderDetails order={order}/>
                    <UpdateOrderForm id={orderId}/>
                    <BackButton clickHandler={this.backToOrderList}/>
                    <DeleteOrderButton id={orderId} clickHandler={this.backToOrderList}/>
                  </div>
                )
              }
            }}
        </Query>
      </div>
    )
  }
}


export default withRouter(OrderDetails)


//
// function UpdateOrderFormOld({id}) {
//   return (
//     <Mutation mutation={UPDATE_ORDER}>
//     {(updateOrder, {data}) => (
//       <div>
//         <button onClick={e => {
//           updateOrder({
//             variables: {
//               input: {
//                 id,
//                 name: 'Updated',
//                 notes: ['cats', 'dogs', 'squirrels']
//               }
//             }
//           })
//         }}>Update</button>
//
//       </div>
//     )}
//     </Mutation>
//   )
// }

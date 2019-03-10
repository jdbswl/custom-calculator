import React from 'react'

class AppSyncOrderList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.orders.map((order, index) => (
            <h2 key={index}>{order.name}</h2>
          ))
        }
      </div>
    )
  }
}

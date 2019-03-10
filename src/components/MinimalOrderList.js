import React from 'react';

class MinimalOrderList extends React.Component {
  render() {
    return (
      <div>
        <h3>All Orders</h3>
        <ul>
          {this.props.orders.map(order => <li key={order.id}>{order.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default MinimalOrderList;

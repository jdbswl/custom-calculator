import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';

import * as mutations from '../graphql/mutations';

const CREATE_ORDER = gql(mutations.createOrder);


class AppSyncAddOrder extends React.Component {
  constructor(props) {
    super(props);
    console.log('App Sync Add Order props:', props);
    this.state = {
      name: ''
    };
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  render() {
    return (
      <Mutation mutation={CREATE_ORDER}>
        {(createOrder, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefaults();
                createOrder({ variables: { type: this.state.name }});
                this.state.name = '';
              }}
            >

            <button type="submit">Add Order</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  };
}


            // <input ref={node => { input = node; }} />


      //
      //
      // <div>
      //   <h1>App Sync Add Order</h1>
      //   <input
      //     name="name"
      //     placeholder="Order name"
      //     onChange={(ev) => { this.handleChange('name', ev)}}
      //   />
      //   <button onClick={this.submit.bind(this)}>
      //     Add
      //   </button>
      // </div>


    // return (
    //   <div>
    //     <h1>App Sync Add Order</h1>
    //     <input
    //       name="name"
    //       placeholder="Order name"
    //       onChange={(ev) => { this.handleChange('name', ev)}}
    //     />
    //     <button onClick={this.submit.bind(this)}>
    //       Add
    //     </button>
    //   </div>
    // );
  // }
// }


export default AppSyncAddOrder;

// export default graphql(CREATE_ORDER, {
//   options: {
//     fetchPolicy: 'cache-and-network'
//   },
//   props: props => ({
//     createOrder: 'todo'
//     // orders: props.data.listOrders ? props.data.listOrders.items : []
//   })
// })(AppSyncAddOrder);

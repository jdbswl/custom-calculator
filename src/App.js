import React, { Component } from 'react';
import './App.css';
import Amplify, { graphqlOperation} from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import MinimalOrderList from './components/MinimalOrderList';
import MinimalAddOrder from './components/MinimalAddOrder';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';


Amplify.configure(awsmobile);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Connect mutation={graphqlOperation(mutations.createOrder)}>
          {({mutation}) => (
            <MinimalAddOrder onCreate={mutation} />
          )}
        </Connect>

        <Connect query={graphqlOperation(queries.listOrders)}
          subscription={graphqlOperation(subscriptions.onCreateOrder)}
          onSubscriptionMsg={(prev, {onCreateOrder}) => {
            console.log('Order data: ', onCreateOrder);
            return prev;
          }
        }>
          {({ data: { listOrders }, loading, error }) => {
            if(error) return (<h3>Error</h3>);
            if(loading || !listOrders) return (<h3>Loading...</h3>);
            return (<MinimalOrderList orders={listOrders.items} />);
          }}
        </Connect>
      </div>
    );
  }
}

const signUpConfig = {
  includeGreetings: true,
  hiddenDefaults: ['phone_number'],
}

export default withAuthenticator(App, {
  signUpConfig
});

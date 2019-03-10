import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import React, { Component } from 'react';
import './App.css';
import Amplify, { Auth, graphqlOperation} from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import MinimalOrderList from './components/MinimalOrderList';
import MinimalAddOrder from './components/MinimalAddOrder';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';


Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currenSession()).getAccessToken().getJwtToken(),
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
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
        </Rehydrated>
      </ApolloProvider>
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

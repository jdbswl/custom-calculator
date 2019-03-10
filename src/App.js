import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import awsmobile from './aws-exports';
import AppRouter from './AppRouter';


Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currenSession()).getAccessToken().getJwtToken(),
  }
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <AppRouter />
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



//
//
//
// <div className="App">
//   <Connect mutation={graphqlOperation(mutations.createOrder)}>
//     {({mutation}) => (
//       <MinimalAddOrder onCreate={mutation} />
//     )}
//   </Connect>
//
//   <Connect query={graphqlOperation(queries.listOrders)}
//     subscription={graphqlOperation(subscriptions.onCreateOrder)}
//     onSubscriptionMsg={(prev, {onCreateOrder}) => {
//       console.log('Order data: ', onCreateOrder);
//       return prev;
//     }
//   }>
//     {({ data: { listOrders }, loading, error }) => {
//       if(error) return (<h3>Error</h3>);
//       if(loading || !listOrders) return (<h3>Loading...</h3>);
//       return (<MinimalOrderList orders={listOrders.items} />);
//     }}
//   </Connect>
// </div>

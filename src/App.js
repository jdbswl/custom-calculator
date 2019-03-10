import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import gql from 'graphql-tag';
import React from 'react';
import { ApolloProvider, graphql } from 'react-apollo';

import './App.css';
import awsmobile from './aws-exports';
import AppRouter from './AppRouter';
import * as queries from './graphql/queries';

Amplify.configure(awsmobile);

const ApolloRoutes = graphql(
  gql(queries.listOrders), {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      orders: props.data.listOrders ? props.data.listOrders.items : []
    })
  }
)(AppRouter)

class App extends React.Component {
  render() {
    const signInUserSession = this.props.authData.signInUserSession;
    let accessToken = null;
    if(signInUserSession) {
      accessToken = signInUserSession.accessToken.jwtToken;
      console.log(`Access Token: ${accessToken}`)
    }

    const client = new AWSAppSyncClient({
      url: awsmobile.aws_appsync_graphqlEndpoint,
      region: awsmobile.aws_appsync_region,
      auth: {
        type: awsmobile.aws_appsync_authenticationType,
        jwtToken: accessToken
        // jwtToken: async () => (await Auth.currenSession()).getAccessToken().getJwtToken(),
      }
    });

    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <ApolloRoutes />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

const signUpConfig = {
  includeGreetings: true,
  hiddenDefaults: ['phone_number'],
}

// class AppWithAuthenticator extends React.Component {
//   render() {
//     return withAuthenticator(App, {
//       signUpConfig
//     });
//   }
// }

export default withAuthenticator(App, signUpConfig);



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

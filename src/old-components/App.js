import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import './App.css'
import awsmobile from './aws-exports'



Amplify.configure(awsmobile)

function x => (
  <h1>X</h1>
)

class App extends React.Component {
  render() {
    console.log('App Component props:', this.props)
    const signInUserSession = this.props.authData.signInUserSession
    let accessToken = null
    if(signInUserSession) {
      accessToken = signInUserSession.accessToken.jwtToken
    }

    const client = new AWSAppSyncClient({
      url: awsmobile.aws_appsync_graphqlEndpoint,
      region: awsmobile.aws_appsync_region,
      auth: {
        type: awsmobile.aws_appsync_authenticationType,
        jwtToken: accessToken
      }
    })

    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Sidebar />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}


export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
})

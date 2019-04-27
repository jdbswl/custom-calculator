import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import React, { ReactChild } from 'react'
import { ApolloProvider } from 'react-apollo'

import './App.css'
import awsmobile from './aws-exports'

Amplify.configure(awsmobile)


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

    // use default plus named slots projection
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <div>
            <Card>{{
              header: "Custom Calculator",
              content: (
                <p>Welcome to your Custom Calculator</p>
              )
            }}</Card>
          </div>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

type CardProps = {
  children: NamedCardChildSlots
}

type NamedCardChildSlots = {
  header?: ReactNode,
  content: ReactNode
}

class Card extends React.Component<CardProps> {

  render() {
    const { header, content } = this.props.children
    return (
      <div className="card">
        {header ? <div className="card-header">{header}</div> : null}
        <div className="card-content">{content}</div>
      </div>
    )
  }
}


export default withAuthenticator(App, {
  // includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
})




// const isNamedSlots = () => true
//
//
// class Card extends React.Component<CardProps> {
//
//   render() {
//     const { children } = this.props
//
//     if( !children ) {
//       throw new Error('Card missing children')
//     }
//
//     if(isNamedSlots(children)) {
//       const { header, content } = children
//       return (
//         <div className="card">
//           {header ? <div className="card-header">{header}</div> : null}
//           <div className="card-content">{content}</div> : null
//         </div>
//       )
//     }
//
//     return <div className="card">{children}</div>
//   }
// }
//
// const isNamedSlots = () => true




// const isObject = <T extends object>(value: any): value is T =>
//   typeof value === 'object' && typeof value !== 'function' && value != undefined
// const isNamedSlots = (children: any): children is NamedCardChildSlots =>
//   isObject(children) && 'content' in children

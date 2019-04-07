import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


import * as mutations from '../graphql/mutations'


const CREATE_ORDER = gql(mutations.createOrder)


const AddOrder = () => {
  let input

  return (
      <Mutation
        mutation={CREATE_ORDER}>
          {(addOrder, {data, error}) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  addOrder({ variables: { input: {name: input.value} } })
                  input.value = ''
                }}>
                <input ref={node => {
                    input=node
                  }}/>
                <button type="submit">Add Order</button>
              </form>
            </div>
          )}
      </Mutation>
  )
}

export default AddOrder

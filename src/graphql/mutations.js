// eslint-disable
// this is an auto generated file. This will be overwritten

export const createOrder = `mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    name
    notes
    lineItems {
      items {
        id
        name
        costPerItem
        pricePerItem
        count
      }
      nextToken
    }
  }
}
`;
export const updateOrder = `mutation UpdateOrder($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
    name
    notes
    lineItems {
      items {
        id
        name
        costPerItem
        pricePerItem
        count
      }
      nextToken
    }
  }
}
`;
export const deleteOrder = `mutation DeleteOrder($input: DeleteOrderInput!) {
  deleteOrder(input: $input) {
    id
    name
    notes
    lineItems {
      items {
        id
        name
        costPerItem
        pricePerItem
        count
      }
      nextToken
    }
  }
}
`;
export const createLineItem = `mutation CreateLineItem($input: CreateLineItemInput!) {
  createLineItem(input: $input) {
    id
    name
    costPerItem
    pricePerItem
    count
    order {
      id
      name
      notes
      lineItems {
        nextToken
      }
    }
  }
}
`;
export const updateLineItem = `mutation UpdateLineItem($input: UpdateLineItemInput!) {
  updateLineItem(input: $input) {
    id
    name
    costPerItem
    pricePerItem
    count
    order {
      id
      name
      notes
      lineItems {
        nextToken
      }
    }
  }
}
`;
export const deleteLineItem = `mutation DeleteLineItem($input: DeleteLineItemInput!) {
  deleteLineItem(input: $input) {
    id
    name
    costPerItem
    pricePerItem
    count
    order {
      id
      name
      notes
      lineItems {
        nextToken
      }
    }
  }
}
`;

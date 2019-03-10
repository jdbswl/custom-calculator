// eslint-disable
// this is an auto generated file. This will be overwritten

export const getOrder = `query GetOrder($id: ID!) {
  getOrder(id: $id) {
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
export const listOrders = `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      notes
      lineItems {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getLineItem = `query GetLineItem($id: ID!) {
  getLineItem(id: $id) {
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
export const listLineItems = `query ListLineItems(
  $filter: ModelLineItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listLineItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      costPerItem
      pricePerItem
      count
      order {
        id
        name
        notes
      }
    }
    nextToken
  }
}
`;

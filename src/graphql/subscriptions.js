// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateOrder = `subscription OnCreateOrder {
  onCreateOrder {
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
export const onUpdateOrder = `subscription OnUpdateOrder {
  onUpdateOrder {
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
export const onDeleteOrder = `subscription OnDeleteOrder {
  onDeleteOrder {
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
export const onCreateLineItem = `subscription OnCreateLineItem {
  onCreateLineItem {
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
export const onUpdateLineItem = `subscription OnUpdateLineItem {
  onUpdateLineItem {
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
export const onDeleteLineItem = `subscription OnDeleteLineItem {
  onDeleteLineItem {
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

import OrderList from './components/OrderList'
import AddOrder from './components/AddOrder'

const Routes = [
  {
    path: '/order-list/',
    sidebarName: 'Orders',
    navbarName: 'Orders',
    component: OrderList
  }, {
    path: '/add-order/',
    sidebarName: 'Add Order',
    navbarName: 'Add Order',
    component: AddOrder
  }
]

export default Routes

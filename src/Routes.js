import { Home, ContentPaste, Notifications, AccountCircle } from '@material-ui/icons'

import OrderList from './components/OrderList'
import AddOrder from './components/AddOrder'

const Routes = [
  {
    path: '/order-list/',
    sidebarName: 'Orders',
    navbarName: 'Orders',
    icon: null,
    component: OrderList
  }, {
    path: '/add-order/',
    sidebarName: 'Add Order',
    navbarName: 'Add Order',
    icon: null,
    component: AddOrder
  }
]

export default Routes

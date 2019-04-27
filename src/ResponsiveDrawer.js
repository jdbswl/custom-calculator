import React from 'react'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';

import AddOrder from './components/AddOrder'
import NotFound from './components/NotFound'
import OrderList from './components/OrderList'
import OrderDetails from './components/OrderDetails'
import Home from './components/Home'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})


const MockHome = () => (<h1>Home</h1>)
function MockOrderList(props) {
  const orders = [{
    orderId: 'abc',
    name: 'First Order'
  }, {
    orderId: 'def',
    name: 'Second Order'
  }]
  return (
    <React.Fragment>
      <h3>Order List</h3>
      <ul>
        {
          orders.map(o => (
            <li key={o.orderId}>
              <Link to={`/orders/${o.orderId}`}>{o.name}</Link>
            </li>
          ))
        }
      </ul>
    </React.Fragment>
  )
}


function MockOrderDetails(props) {
  const orderId = props.match.params.orderId
  return (
    <React.Fragment>
      <h3>Order Details: {orderId}</h3>
      <Link to='/orders'>Order List</Link>
    </React.Fragment>
  )
}

function Orders() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/orders' component={OrderList}/>
        <Route path='/orders/:orderId' component={OrderDetails}/>
      </Switch>
    </React.Fragment>
  )
}

function logout() {
  console.log('logout');
  Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
}

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    const { classes, theme } = this.props

    const primaryNavItems = [{
      text: 'Home',
      to: '/'
    }, {
      text: 'Orders',
      to: '/orders'
    }]



    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {primaryNavItems.map((item, index) => (
            <ListItem button component={Link} key={item.text} to={item.to}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key="logout" onClick={logout}>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Custom Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={ Home }/>
            <Route path='/orders' component={ Orders }/>
            <Route component={ NotFound }/>
          </Switch>
        </main>
      </div>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)

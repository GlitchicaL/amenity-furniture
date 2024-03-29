import { useState, useRef, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'

/* Import Components */
import Header from "./components/Header"
import SidebarNav from "./components/SidebarNav"
import Footer from "./components/Footer"

/* Import Screens */
import HomeScreen from "./screens/HomeScreen"

import ProductsScreen from './screens/ProductsScreen'
import ProductScreen from './screens/ProductScreen'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AccountScreen from './screens/AccountScreen'

import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
	const [show, setShow] = useState(false)
	const [icon, setIcon] = useState('bars')
	const SidebarRef = useRef()

	const toggleNav = () => {
		if (show) {
			SidebarRef.current.classList.add('hide')
			setShow(false)
			setIcon('bars')
		}
		else {
			SidebarRef.current.classList.remove('hide')
			setShow(true)
			setIcon('times')
		}
	}

	return (
		<Router>
			<Header toggleNav={toggleNav} icon={icon} />

			<Container fluid>
				<div className="nav-container hide" ref={SidebarRef}>
					<SidebarNav />
				</div>

				<Route path='/' component={HomeScreen} exact />
				<Route path='/products' component={ProductsScreen} exact />
				<Route path='/products/:id' component={ProductScreen} />

				<Route path='/login' component={LoginScreen} />
				<Route path='/register' component={RegisterScreen} />
				<Route path='/account' component={AccountScreen} />

				<Route path='/cart' component={CartScreen} />
				<Route path='/shipping' component={ShippingScreen} />
				<Route path='/payment' component={PaymentScreen} />
				<Route path='/placeorder' component={PlaceOrderScreen} />
				<Route path='/order/:id' component={OrderScreen} />

				<Route path='/admin/userlist' component={UserListScreen} />
				<Route path='/admin/user/:id/edit' component={UserEditScreen} />

				<Route path='/admin/productlist' component={ProductListScreen} />
				<Route path='/admin/product/:id/edit' component={ProductEditScreen} />

			</Container>

			<Footer />
		</Router>
	);
}

export default App;

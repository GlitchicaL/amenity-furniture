import { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route } from 'react-router-dom';

/* Import Components */
import Header from "./components/Header";
import SidebarNav from "./components/SidebarNav";
import Footer from "./components/Footer";

/* Import Screens */
import HomeScreen from "./screens/HomeScreen";

import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';

import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {
  const [isClose, setIsClose] = useState(true);
  const SidebarRef = useRef();

  const toggleNav = () => {
    if (!isClose) {
      SidebarRef.current.classList.add('close');
      setIsClose(true);
    }
    else {
      SidebarRef.current.classList.remove('close');
      setIsClose(false);
    }
  }

  return (
    <Router>
      <Header toggleNav={toggleNav} />

      <Container fluid>
        <div className="nav-container close" ref={SidebarRef}>
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

      </Container>

      <Footer />
    </Router>
  );
}

export default App;

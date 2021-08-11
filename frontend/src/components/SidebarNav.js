import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

/* Import CSS */
import "../css/components/SidebarNav.css";

// Import Logout Action
import { logout } from '../actions/userActions';

const SidebarNav = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <nav className="flex">

            {userInfo ? (
                <div className="flex-c">
                    <p>{userInfo.email}</p>
                    <Button onClick={logoutHandler}>Logout</Button>
                </div>
            ) : (
                <div className="flex-c">
                    <p>Welcome, Guest</p>
                    <Link to='/login' className="btn">Login</Link>
                </div>
            )}

            <div className='my-4'>
                <Link to='/cart' className="my-3 btn d-block"><i className="mx-2 fas fa-shopping-cart"></i>My Cart</Link>
                <Link to='/account' className="my-3 btn d-block"><i className="mx-2 fas fa-user"></i>Account</Link>

                <Link to='/products' className="my-3 btn d-block"><i className="mx-2 fas fa-chair"></i>Products</Link>
            </div>

            <hr />

            {userInfo && userInfo.isAdmin ? (
                <div>
                    <p className='flex'>Admin Panel</p>
                    <Link to='/admin/userlist' className="my-3 btn d-block">View Users</Link>
                    <Link to='/admin/productlist' className="my-3 btn d-block">Edit Products</Link>
                    <Link to='/admin/orderlist' className="my-3 btn d-block">View Orders</Link>
                </div>
            ) : (
                <span></span>
            )}
        </nav>
    );
}

export default SidebarNav;
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Import CSS */
import "../css/components/Header.css";

const Header = ({ toggleNav, icon }) => {
    return (
        <header className="flex">
            <Link className='text-decoration-none' to='/'><h4 className='m-0'>Amenity Furniture</h4></Link>

            <div className="flex">
                <div className="flex" style={{ display: "none" }}>
                    <a href="/" className="header-link"><i className="fas fa-chair"></i>Products</a>
                    <a href="/" className="header-link"><i className="fas fa-shopping-cart"></i>Cart</a>
                    <a href="/" className="header-link"><i className="fas fa-user"></i>Login</a>
                </div>

                <i className={`fas fa-${icon}`} style={{ cursor: 'pointer' }} onClick={toggleNav}></i>
            </div>

        </header >
    );
}

export default Header;
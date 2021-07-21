import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

import Login from '../components/forms/Login';
import "../css/screens/LoginScreen.css";

const LoginScreen = ({ location, history }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { error } = userLogin

    return (
        <Container fluid>

            <div className="user-access-container">
                <div className="transparent-background"></div>
                <div className="user-access-form flex-c">
                    <h2 className="flex">Log In</h2>

                    <Login location={location} history={history} />

                    <p className='my-2'>Don't have an account? <Link to="/register"><strong>Register</strong></Link></p>

                    {error && <Alert variant='danger'>{error}</Alert>}
                </div>
            </div>

        </Container >
    );
}

export default LoginScreen;
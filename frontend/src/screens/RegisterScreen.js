import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

/* Import Components */
import Register from '../components/forms/Register';

const RegisterScreen = ({ history }) => {
    const userRegister = useSelector(state => state.userRegister)
    const { error } = userRegister

    return (
        <Container fluid id="register-background">

            <div className="user-access-container">
                <div className="transparent-background"></div>
                <div className="user-access-form flex-c">
                    <h2 className="flex">Create an Account</h2>

                    <Register history={history} />

                    <p className='my-2'>Already have an account? <Link className="margin-left" to="/login"><strong>Sign In</strong></Link></p>

                    {error && <Alert variant='danger'>{error}</Alert>}
                </div>
            </div>

        </Container >
    );
}

export default RegisterScreen;
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';

import { getUserDetails, adminUpdateUser } from '../actions/userActions';
import { USER_ADMIN_UPDATE_RESET, USER_DETAILS_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userAdminUpdate = useSelector(state => state.userAdminUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userAdminUpdate

    useEffect(() => {

        // If logged in user is not an admin, redirect
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        // If successful user update, redirect to user list screen
        if (successUpdate) {

            dispatch({ type: USER_ADMIN_UPDATE_RESET })
            history.push('/admin/userlist')

        } else { // Otherwise fetch user info

            if (!user || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        }

    }, [dispatch, history, userInfo, user, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <Container>
            <h1 className='my-4'>Edit User</h1>

            <Link to='/admin/userlist'><Button><i className="fas fa-chevron-left mx-1"></i>Go Back</Button></Link>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Alert variant='danger' className='my-4'>{errorUpdate}</Alert>}

            {loading ? (
                <Loader message={"Loading User Details"} />
            ) : error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : (
                <Form onSubmit={submitHandler}>
                    {/* NAME */}
                    <Form.Control
                        className='my-3'
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* EMAIL */}

                    <Form.Control
                        className='my-3'
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* ADMIN STATUS */}

                    <Form.Check
                        className='my-3'
                        type="checkbox"
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />

                    <Button type='submit'>Update</Button>
                </Form>
            )}
        </Container>
    );
}

export default UserEditScreen;
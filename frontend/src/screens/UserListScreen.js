import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';

import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { success } = userDelete

    useEffect(() => {

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch(listUsers())
        }

    }, [dispatch, history, success, userInfo])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }

    }

    return (
        <Container>
            <h1 className='my-4'>Users</h1>

            {loading ? (
                <Loader message={"Loading Users"} />
            ) : error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>

                                <td className='flex'>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`} className='m-2'>
                                        <Button><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>

                                    <Button onClick={() => deleteHandler(user._id)} className='m-2 red'><i className='fas fa-trash'></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default UserListScreen;
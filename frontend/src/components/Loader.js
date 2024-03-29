import { Spinner } from 'react-bootstrap';

const Loader = ({ message }) => {
    return (
        <div className='flex-c mx-auto'>
            <Spinner animation="grow" className='my-3 white' />
            <p className='flex'>{message}</p>
        </div>
    );
}

export default Loader;
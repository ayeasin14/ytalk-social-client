import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center mt-48'>
            <h1 className='text-4xl'>SomeThing is missing....</h1>
            <p>Make sure your URL</p>
            <Link to='/' className='text-red-500 text-xl'><button>Go to Home</button></Link>
        </div>
    );
};

export default ErrorPage;
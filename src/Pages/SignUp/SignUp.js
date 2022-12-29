import toast from 'react-hot-toast';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { GoogleAuthProvider } from 'firebase/auth';


const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedEmail] = useState('');
    const provider = new GoogleAuthProvider();
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }


    const handleSignUp = (data) => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User created succesfully');

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);

                    })
                    .catch(err => console.log(err))

            })
            .catch(error => {
                console.error(error)
                setSignUpError(error.message);
            })
    }


    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedEmail(email);
            })
    };

    const handleGoogleSignIn = (provider) => {

        googleSignIn(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSignUpError('');
                navigate('/');
            })
            .catch(err => {
                const errorMessage = err.message;
                console.error(err);
                setSignUpError(errorMessage);
            })
    }



    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span> </label>
                        <input
                            {...register("name",
                                { required: "Name is required" })}
                            type="text"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' >{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span> </label>

                        <input
                            {...register("email",
                                { required: "Email Address is required" })}
                            type="email"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span> </label>

                        <input {...register("password", {
                            required: "Password  is required",
                            minLength: { value: 6, message: 'Password must be 6 character or longer' }
                        })}
                            type="password"
                            className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div>
                        {signUpError && <p className='text-red-600 my-3'>{signUpError}</p>}
                    </div>
                    <input className='w-full my-6 btn btn-accent' value="Sign Up" type="submit" />
                </form>
                <p>Already have an account ? <Link to='/login' className='text-secondary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                    <button className='btn btn-outline btn-success' onClick={() => handleGoogleSignIn(provider)}>
                        <FaGoogle className='mr-2' /> Sign In with
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();
    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }


    const handleLogin = data => {
        console.log(data);
        setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(error => {
                console.error(error.message)
                setLoginError(error.message);
            })
    }

    const handleGoogleSignIn = (provider) => {

        googleSignIn(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginError('');
                navigate('/');
            })
            .catch(err => {
                const errorMessage = err.message;
                console.error(err);
                setLoginError(errorMessage);
            })
    }



    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl text-center'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>

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
                            required: "Password Address is required",
                            minLength: { value: 6, message: 'Password must be 6 character or longer' }
                        })}
                            type="password"
                            className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label"><span className="label-text">Forget Password</span> </label>

                    </div>

                    <input className='w-full my-6 btn btn-accent' value="Login" type="submit" />

                    <div>
                        {loginError && <p className='text-red-600 my-3'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Y-talk? <Link to='/signup' className='text-success'>Create an account</Link></p>
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

export default Login;
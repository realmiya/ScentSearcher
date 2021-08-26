import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
//Copyright (c) 2020 Jason Watmore

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);//选状态
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, [dispatch]);

    function handleChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function LoginCheckSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (username && password) {
            //when it is an existing user, has input (username && password) is valid, then get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/Homepage" } };
            dispatch(userActions.login(username, password, from));   
        }
    }

    return (
        <div className="container">
            <div className="text-center">
                <h2>Welcome to Scent Searcher!</h2>
                <p>If you are an existing user, please login your account :)</p>
            </div>
            <form name="form" onSubmit={LoginCheckSubmit}>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Please Input Your Username" aria-label="Input Your Username" value={username} onChange={handleChange} className={'form-control' + ((submitted && !username) ? ' is-invalid' : '')} />
                    {submitted && !username && <div className="invalid-feedback">Username is required</div>}
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Please Input Your Password" pattern=".{6,}" title="Must contain  at least 6 or more characters" aria-label="Input Your Password" value={password} onChange={handleChange} className={'form-control' + ((submitted && !password) ? ' is-invalid' : '')} />
                    {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"/>}
                        Login
                    </button>
                </div>
            </form>
            <div className="text-center">
                <p>Don't have an account yet?</p>
                <p><Link to="/register" className="btn btn-outline-primary btn-sm">Create Your Own Account</Link> in Scent Searcher!</p>
            </div>
        </div>
    );
}

export default LoginPage;
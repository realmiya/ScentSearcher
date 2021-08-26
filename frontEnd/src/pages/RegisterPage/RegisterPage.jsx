import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
//Copyright (c) 2020 Jason Watmore
function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        encodedPassword: '',
        gender: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status，dependency[], conduct useEffect once
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        // console.log(e.target);
        // console.log(name);//fullname lastname gender 什么的
        // console.log(value);
        setUser(user => ({ ...user, [name]: value }));
        console.log(user);
    }

    function RegisterCheckSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.encodedPassword) {
            dispatch(userActions.register(user));
        }
    }


    return (
        <div className="col-lg-8 offset-lg-2">
            <h2 className="text-center">Create your own account in Scent Searcher!</h2>
            <form name="form" onSubmit={RegisterCheckSubmit}>{/*表单的按钮被点击时发生onsubmit里面的事件*/}
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                {/* <div className="form-group">
                    <label>Email Address</label>
                    <input type="text" name="EmailAdd" value={user.EmailAdd} onChange={handleChange} className={'form-control' + (submitted && !user.EmailAdd? ' is-invalid' : '')} />
                    {submitted && !user.EmailAdd &&
                        <div className="invalid-feedback">Email Address is required</div>
                    }
                </div> */}

                <div className="form-group">
                    <label>Gender</label>
                    <select className={'form-control' + (submitted && !user.gender ? ' is-invalid' : '')}
                            name="gender"
                            value={user.gender} onChange={handleChange}>
                        <option selected disabled value="">Choose your gender...</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Prefer Not To Disclose</option>
                        <option>Gender Diverse</option>
                    </select>
                    {submitted && !user.gender &&
                        <div className="invalid-feedback">Gender is required</div>
                    }
                </div>

                <div className="form-group">
                    <label>password</label>
                    <input type="password" name="encodedPassword" value={user.encodedPassword} onChange={handleChange} pattern=".{6,}" title="Must contain  at least 6 or more characters" className={'form-control' + (submitted && !user.encodedPassword &user.encodedPassword.toString().length<6? ' is-invalid' : '')} />
                    {submitted && !user.encodedPassword &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                    {submitted &&user.encodedPassword.toString().length<6 &&
                        <div className="invalid-feedback">Password must be at least 6 characters</div>
                    }
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage ;
import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';
//Copyright (c) 2020 Jason Watmore
export const userActions = {
    login,
    logout,
    register,
    getAll,
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login({"username": username, "password": password})
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    if (error.toString()=='Error: Request failed with status code 403'){
                        dispatch(alertActions.error('login failed, please check your password or username.'))
                    }else{
                        dispatch(alertActions.error(error.toString()))}
                    

                }
            );
    };

    function request(user) {
      return { type: userConstants.LOGIN_REQUEST, user }
    }
    function success(user) {
      return { type: userConstants.LOGIN_SUCCESS, user }
    }
    function failure(error) {
      return { type: userConstants.LOGIN_FAILURE, error }
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Congratulations, you have created an account in scent searcher!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    dispatch(alertActions.error("Username existed!"));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()  
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() {
      return { type: userConstants.GETALL_REQUEST }
    }

    function success(users) {
      return { type: userConstants.GETALL_SUCCESS, users }
    }
    function failure(error) {
      return { type: userConstants.GETALL_FAILURE, error }
    }
}

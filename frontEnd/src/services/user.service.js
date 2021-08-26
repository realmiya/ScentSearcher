import { BACKEND_URL }from '../env';
import { authHeader } from '../helpers';
import getAccountId from '../utils/getAccountId';
import axios from 'axios';
//Copyright (c) 2020 Jason Watmore
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
};



function handleResponse(response) {
    console.log(response);
    return response.text().then(text => {
        console.log(text); 
        const data = text && JSON.parse(text);
        // console.log(data);//all users' object
        if (!response.ok) {//reject
            console.log(response.status);
            if (response.status === 401) {
                // auto logout if 401 response returned from api,
                logout();
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;   
            return Promise.reject(error);
            // return Promise.reject(`Response.status is ${response.status}`);
        }
        return data;
    });
}


function login(credentials) {
    const {username, password}=credentials;
    const authInstance = axios.create({
        baseURL: BACKEND_URL,
      });
      console.log(credentials)
    return authInstance
        .post("/login", credentials)
        // .then(handleResponse)
        .then((userRes) => {
            console.log(userRes);
            const authToken = userRes.headers.authorization;
            if (authToken) {
                const jwtToken = authToken.substring(7);
                localStorage.setItem("JWT_TOKEN", jwtToken);
                localStorage.setItem("username", username);
                getAccountId(username, jwtToken).then(res => {
                    localStorage.setItem("userId", res.id);
                })
            }
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${BACKEND_URL}/register`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/register/${id}`, requestOptions).then(handleResponse);
}

const ENCRYPTION_STRENGTH = 10;
const encodePassword = (password) => {
    const bcrypt = require("bcryptjs");
    const salt = bcrypt.genSaltSync(ENCRYPTION_STRENGTH);
    const code = bcrypt.hashSync(password, salt);

    return code;
};

function register(user) {
    console.log(user);
    user.encodedPassword = encodePassword(user.encodedPassword);
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
        body: JSON.stringify(user)
    };
    return fetch(`${BACKEND_URL}/register`, requestOptions).then(handleResponse);
}



function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${BACKEND_URL}/register/${user.id}`, requestOptions).then(handleResponse);
}


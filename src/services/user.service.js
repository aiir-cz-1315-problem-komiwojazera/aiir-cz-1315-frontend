import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    getAll,
    register,
    startCalc,
    getHistory,
};

const config= {
    //apiUrl: 'http://localhost:3000'
    // apiUrl: 'http://192.168.0.111:5000'
    apiUrl: 'http://localhost:5000'
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "Authorization": "Basic QWRtaW46MTIzNDU=",
        "cache-control": "no-cache",},
        "processData": false,
        body: JSON.stringify({ username, password }),
        data: JSON.stringify({ username, password })
        
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/user/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                console.log("Register succesful");
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function startCalc(data) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json',
        // "Authorization": "Basic QWRtaW46MTIzNDU=",
        // "cache-control": "no-cache",},
        // "processData": false,
        body: data,
    };
    return fetch(`${config.apiUrl}/startCalc`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log("Started Succesfully "+response);
            }
            return response;
        });
}

function getHistory(data) {
    const requestOptions = {
        method: 'POST',
        body: data,
    };
    return fetch(`${config.apiUrl}/getHistory`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function logout() {
    console.log("wtf")
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('handling response');
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
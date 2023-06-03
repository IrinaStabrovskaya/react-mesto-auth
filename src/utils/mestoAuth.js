export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ( email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
        metod: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),            
    }).then((res) => {res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)});    
}

export const authorization = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        metod: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    }).then((res) => {res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)});
}

export const isValidToken = (token) =>{
    return fetch(`${BASE_URL}/users/me`, {
        metod: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }).then((res) => {res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)});
}
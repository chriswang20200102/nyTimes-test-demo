import axios from 'axios'
import { getSavedToken } from '../util/help'

const apiKey='PXuFSADqA4IfG7uLbnLqNJ5nznxtnTcA'

const getHeaders = () => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    }
    const token = getSavedToken()
    if (token?.value) {
        headers = {...headers, 'X-Authorization': `Bearer ${token?.value}`}
    }
    return headers
}
export const getStories = category => {   
    return axios.get(`/svc/topstories/v2/${category}.json?api-key=${apiKey}`, {
        headers: getHeaders()
    })
}

export const getComments = url => {
    return axios.get(`/svc/community/v3/user-content/url.json?api-key=${apiKey}&offset=0&url=${url}`, {
        headers: getHeaders()
    })
}

export const search = (query, page=1) => {
    return axios.get(`/svc/search/v2/articlesearch.json?api-key=${apiKey}`,{
        params: {
            q: query,
            page
        },
        headers: getHeaders()
    })
}

export const signIn = (email, password) => {
    return axios.post('http://localhost:8000/auth/login', {
            params: {
                email,
                password,
            },
            headers: getHeaders()
    })
}

export const register = (email, password) => {
    return axios.post('http://localhost:8000/auth/register', {
        params: {
            email,
            password,
        },
        headers: getHeaders()
    })
}

export const refreshToken = token => {
    return axios.post('http://localhost:8000/auth/refresh', {access_token: token}, {
        headers: getHeaders()
    })
}

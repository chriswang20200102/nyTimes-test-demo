import * as service from '../service/service'

export const SIGN_IN_DONE = 'user/SIGN_IN_DONE'
export const SIGN_IN_FAILURE = 'user/SIGN_IN_FAILURE'
export const REGISTER_DONE = 'user/REGISTER_DONE'
export const REGISTER_FAILURE = 'user/REGISTER_FAILURE'
export const INIT_TOKENS ='user/INIT_TOKENS'
export const REFRESHING_TOKEN = 'user/REFRESHING_TOKEN'
export const REFRESHING_TOKEN_DONE = 'user/REFRESHING_TOKEN_DONE'
export const REFRESHING_TOKEN_FAILURE = 'user/REFRESHING_TOKEN_FAILURE'


export const signIn = (email, password) => {
    return async dispatch => {
        const result = await service.signIn(email, password)
          .then(
            response => {
                dispatch({
                    type: SIGN_IN_DONE,
                    payload: {...response.data, email, password},
                })
            },
            err => {
                const error = err?.response?.data
                dispatch({
                    type: SIGN_IN_FAILURE,
                    payload: {error, email, password},
                })
                return Promise.reject(error)
            }
          )
        return result;
    };
};

export const register = (email, password) => {
    return async dispatch => {
        const result = await service.register(email, password)
          .then(
            response => {
                dispatch({
                    type: REGISTER_DONE,
                    payload: {...response.data, email, password},
                })
            },
            err => {
                const error = err?.response?.data
                dispatch({
                    type: REGISTER_FAILURE,
                    payload: {error, email, password},
                })
                return Promise.reject(error)
            }
          )
        return result;
    };
};

export const refreshToken = (access_token) => {
    return async dispatch => {
        const result =  service.refreshToken(access_token).then(
            res => {
                dispatch({type: REFRESHING_TOKEN_DONE, payload: {...res.data}})
            },
            err => {
                const error = err?.response?.data
                dispatch({type: REFRESHING_TOKEN_FAILURE, payload: {error}})
            }
        )
        return result
    }
}

export const initTokens = (token) => {
	return { type: INIT_TOKENS, payload: { access_token: token } };
}


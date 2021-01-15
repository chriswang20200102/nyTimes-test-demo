import {
    GET_STORIES_DONE,
    SEARCH_DONE,
    SEARCH_HISTORY,
    GET_COMMENT,
    VIEW_CATEGORY_NEWS
} from '../actions/newsActions'
import {getSearchHistory} from '../util/help'

const storiesReducer = (state = {}, action) => {
    switch(action.type) {
        case VIEW_CATEGORY_NEWS: 
            return {
                ...state,
                'current_category': action.payload.category
            }
        case GET_STORIES_DONE:
        {
            const {sectionId, payload} = action
            return {
                ...state,
                [sectionId]:{
                   ...payload
                }
            }
        }
        default:
            return state
    }
}
export default storiesReducer



export const search = (state = {history:getSearchHistory()}, action) => {
    switch(action.type) {
        case SEARCH_DONE:
            const {query, payload} = action
            return {
                ...state,
                data: {
                    ...state?.data,
                    [query]:{
                        ...payload
                     }
                }
            }
        case SEARCH_HISTORY:
            return {
                ...state,
                history: getSearchHistory()
            }

        default:
            return state
    }
}

export const comments = (state = {}, action) => {
    switch(action.type) {
        case GET_COMMENT:
        {
            const {url, payload} = action
            return {
                ...state,
                [url]:{
                   ...payload
                }
            }
        }
        default:
            return state
    }
}



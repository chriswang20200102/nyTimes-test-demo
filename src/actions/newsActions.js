import * as service from '../service/service'
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
  } from './asyncActions';

export const GET_STORIES_DONE = 'page/GET_STORIES_DONE'
export const GET_STORIES_FAILURE = 'page/GET_STORIES_FAILURE'
export const GET_COMMENT = 'page/GET_COMMENT'
export const SEARCH_DONE = 'page/SEARCH_DONE'
export const SEARCH_HISTORY = 'page/SEARCH_HISTORY'
export const VIEW_DETAIL_ARTICLE = 'page/VIEW_DETAIL_ARTICLE'
export const VIEW_CATEGORY_NEWS = 'VIEW_CATEGORY_NEWS'

export const getNewsList = category => {
    return async dispatch => {
        dispatch({type: VIEW_CATEGORY_NEWS, payload: {category}})
        const sectionId = category || 'home'
        dispatch(asyncActionStart());
        const result = await service.getStories(sectionId)
          .then(
            response => {
                dispatch({
                    type: GET_STORIES_DONE,
                    sectionId,
                    payload: {...response.data},
                })
            },
            error => {
                dispatch(asyncActionError(error))
            }
          )
        dispatch(asyncActionFinish());
        return result;
    };
};

export const getCommentsData = url => {
    return async dispatch => {
        const result = await service.getComments(url)
          .then(
            response => {
                dispatch({
                    type: GET_COMMENT,
                    payload: {...response.data },
                    url
                })
            }
          )
        return result;
    };
};

export const getSearch = query => {
    return async dispatch => {
        dispatch(asyncActionStart());
        dispatch({
            type: SEARCH_HISTORY,
            query
        })
        const result = await service.search(query)
          .then(
            response => {
                dispatch({
                    type: SEARCH_DONE,
                    payload: {...response.data.response},
                    query
                })
            },
            error => {
                dispatch(asyncActionError(error))
            }
          )
        dispatch(asyncActionFinish());
        return result;
    };
};

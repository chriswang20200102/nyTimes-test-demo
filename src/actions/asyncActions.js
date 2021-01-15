export const ASYNC_ACTION_START = "ASYNC_ACTION_START";
export const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
export const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";

export const asyncActionStart = (atype=null) => {
  return {
    type: ASYNC_ACTION_START,
	  payload: atype
  }
}

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH,
    payload: null
  }
}

export const asyncActionError = (error) => {
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error
  }
}
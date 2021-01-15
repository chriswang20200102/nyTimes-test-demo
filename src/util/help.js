import jwt_decode from 'jwt-decode';
export const format = (date, fmt) => {
    const o = {
      "M+" : date.getMonth()+1,            
      "d+" : date.getDate(),
      "h+" : date.getHours(),
      "m+" : date.getMinutes(),
      "s+" : date.getSeconds(),
      "q+" : Math.floor((date.getMonth()+3)/3),
      "S"  : date.getMilliseconds()
    };
  
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
          
    for(let k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(
          RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
      }       
    }
  
    return fmt;
  }

  export const setLocalStorage = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeLocalStorage = key => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getLocalStorage = key => {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };
  
  export const getSearchHistory = () => {
    return getLocalStorage('searchHistory') || [];
  }

  export const updateSearchHistory = (newSearch) => {
    let recentSearches = getSearchHistory();
    if (recentSearches.indexOf(newSearch) > -1) {
      return
    }
    recentSearches.unshift(newSearch);
    if (recentSearches?.length > 5) {
      recentSearches.splice(5, recentSearches?.length - 5);
    }
    setLocalStorage('searchHistory', recentSearches)
  }

  export const updateSavedTokens = (accessToken) => {
      const token = formatToken(accessToken);
      setLocalStorage('token', token)
  }
  
  export const getSavedToken = () => {
      const token = getLocalStorage('token')
      return token
  }
  
  export const formatToken = (token) => {
    const body = jwt_decode(token);
    const expiresIn = body.exp;
    return { value: token, expiresIn};
  }


import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  if (window.sessionStorage && window.sessionStorage.Bearer) {
    return window.sessionStorage.Bearer
  } else if (window.localStorage && window.localStorage.Bearer) {
    return window.localStorage.Bearer
  } else if (window.document.cookie) {
    return Cookies.get('Bearer')
  }
  // return Cookies.get(TokenKey)
}

export function setToken(token, rememberTime) {
  if (window.sessionStorage) {
    window.sessionStorage.Bearer = token
  }

  if ((rememberTime && window.localStorage) || !window.sessionStorage) {
    window.localStorage.Bearer = token
  }

  if (
    window.document.cookie && !window.sessionStorage && !window.localStorage
  ) {
    if (rememberTime) {
      Cookies.set('Bearer', token, rememberTime)
      // setCookie('Bearer', token, rememberTime)
    } else {
      // setCookie('Bearer', token)
      Cookies.set('Bearer', token)
    }
  }
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  if (window.sessionStorage && window.sessionStorage.Bearer) {
    window.sessionStorage.removeItem('Bearer')
  }

  if (window.localStorage && window.localStorage.Bearer) {
    window.localStorage.removeItem('Bearer')
  }

  if (window.document.cookie) {
    Cookies.remove('Bearer')
  }
  // return Cookies.remove(TokenKey)
}

export const saveJWTToStorage = function (value) {
  window.localStorage.setItem('JWT', value)
}

export const getJWTFromStorage = function () {
  return window.localStorage.getItem('JWT')
}

export const removeJWTFromStorage = function () {
  window.localStorage.removeItem('JWT')
}

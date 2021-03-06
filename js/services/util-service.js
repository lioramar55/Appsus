export const utilService = {
  makeId,
  rand,
  saveToStorage,
  loadFromStorage,
  formatPrice,
}

function formatPrice(price) {
  let code
  if (price.currencyCode === 'ILS') {
    code = 'he'
  } else code = 'en'
  return price.amount.toLocaleString(code, { style: 'currency', currency: price.currencyCode })
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function makeId(length = 8) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function rand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

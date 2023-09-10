// You can write your own logic here to determine the actual url
window.app2Url =
  process.env.NODE_ENV === 'development'
    ? 'http://app2.mapleimage.com:3002'
    : 'http://localhost:4002'

// Use dynamic import here to allow webpack to interface with module federation code
import('./bootstrap')

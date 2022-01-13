'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    FIREBASE_NODE_ENV: '"production"',
    FIREBASE_API_KEY: "'AIzaSyAQaZ1EkdpxlMmJrKkw-c_cchtLkKBzqs8'",
    FIREBASE_AUTH_DOMAIN: "'mastervue2max.firebaseapp.com'",
    FIREBASE_DATABASE_URL: "'https://mastervue2max-default-rtdb.firebaseio.com'",
    FIREBASE_PROJECT_ID: "'mastervue2max'",
    FIREBASE_STORAGE_BUCKET: "'mastervue2max.appspot.com'",
    FIREBASE_MESSAGING_ID: "'91558580007'"
})
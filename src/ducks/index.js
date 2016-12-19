const passage = require('./passage.js');
const loginMessages = require('./loginErrors.js');
const currentUser = require('./currentUser.js');
const poems = require('./poems.js');

const { combineReducers } = require('redux');

module.exports = combineReducers({
  passage,
  loginMessages,
  currentUser,
  poems,
});
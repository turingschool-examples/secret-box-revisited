var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)

var Secret = {
  find: function(id) {
    return database.raw(
      'SELECT * FROM secrets WHERE id=?',
      [id]
    ).then(function(secret) {
      return secret.rows[0]
    })
  },

  create: function(message) {
    return database.raw(
      'INSERT INTO secrets(message, created_at) VALUES (?, ?) RETURNING *',
      [message, new Date]
    ).then(function(secret) {
      return secret.rows[0]
    })
  }
}

module.exports = Secret

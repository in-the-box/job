'use strict'

const Company = exports = module.exports = {}
const LogService = require('../Service/LogService')

Company.onEdit = function * (logData) {
  const logService = new LogService()
  yield logService.store(logData)
}
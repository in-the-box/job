const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const RestService = require('../../Service/RestService')
const RestContext = require('../Contexts/RestContext')
const HttpService = require('../../Service/HttpService')
const Validator = use('Validator')

class AttendanceController {
  constructor () {
    this.userService = new UserService()
    this.companyService = new CompanyService()
    this.restService = new RestService()
    this.restContext = new RestContext()
    this.httpService = new HttpService()
  }

  * update (req, res) {
    const userId = req.param('userId')
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, userId)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }

    const rules = this.restContext.updateRules()
    const context = this.restContext.updateContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 400)
    }

    const rest = yield this.restService.update(id, context)
    return this.httpService.success(res, {rest})
  }

  * destroy (req, res) {
    const userId = req.param('userId')
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, userId)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const rest = yield this.restService.getById(id)
    if (rest) {
      yield rest.delete()
      return this.httpService.success(res)
    }
    return this.httpService.failed(res, { error: 'Forbidden' }, 403)
  }
}

module.exports = AttendanceController

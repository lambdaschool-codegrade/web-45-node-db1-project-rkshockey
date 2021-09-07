const { getAll, getById } = require('./accounts-model')
const accountSchema = require('../../accountSchema')

exports.checkAccountPayload = (req, res, next) => {
  if (typeof req.body.name === 'string' && typeof req.body.budget === 'number'){
    accountSchema.validate(req.body)
      .then(() => next())
      .catch(err => next({ status: 400, message: err.errors[0]}))
  }else if (typeof req.body.budget === 'number'){
    next({ status: 400, message: "name of account must be a string"})
  }else{
    next({ status: 400, message: "budget of account must be a number"})
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await getAll()
  if (accounts.find(account => account.name === req.body.name)){
    next({ status: 400, message: "that name is taken" });
  }else{
    next()
  }
}

exports.checkAccountId = (req, res, next) => {
  getById(req.params.id)
    .then(account => {
      if (account){
        req.account = account;
        next()
      }else{
        next({ status: 404, message: "account not found" })
      }
    })
    .catch(next)
}
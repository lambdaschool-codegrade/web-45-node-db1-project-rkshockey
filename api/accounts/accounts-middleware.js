const { getAll, getById } = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  console.log('CheckAccountPayload wired')
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await getAll()
  if (accounts.find(account => account.name === req.body.name)){
    next({})
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
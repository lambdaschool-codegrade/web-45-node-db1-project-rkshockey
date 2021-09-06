const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => res.status(200).json(accounts))
    .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(account => res.json(account))
    .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(account => res.json(account))
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(account => res.json(account))
    .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log(err);
  res.status(err.status).json({ message: err.message });
})

module.exports = router;

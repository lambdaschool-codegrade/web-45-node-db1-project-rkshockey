const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where({ id: id }).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = (id, account) => {
  return 'updateById wired'
}

const deleteById = id => {
  return 'deleteById wired'
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

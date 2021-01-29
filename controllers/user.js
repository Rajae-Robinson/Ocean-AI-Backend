const getUser = (req, res, knex) => {
    const { id } = req.params
    knex.select('*').from('users')
    .where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('User not found!')
      }
    })
    .catch(err => res.status(400).json('Error finding user!'))
}

const updateTries = (req, res, knex) => {
    const { id } = req.params
    knex('users')
    .where('id', '=', id)
    .increment('tries', 1)
    .returning('tries')
    .then(tries => res.json(tries[0]))
    .catch(err => res.status(400).json('Unable to get tries!'))
}

module.exports = {
  getUser,
  updateTries
}
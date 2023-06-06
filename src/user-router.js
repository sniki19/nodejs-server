const Router = require('../framework/Router')
const { getUsers, createUser } = require('./user-controller')

const router = new Router()

router.get('/', (req, res) => {
  res.send('/')
})

router.get('/users', getUsers)

router.post('/users', createUser)

module.exports = router
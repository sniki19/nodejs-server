const App = require('../framework/App')
const jsonParser = require('../framework/parseJson')
const parseUrl = require('../framework/parseUrl')
const userRouter = require('./user-router')

const PORT = process.env.PORT || 5000

const app = new App()

app.use(jsonParser)
app.use(parseUrl('http://localhost:5000'))

app.addRouter(userRouter)


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}.`))
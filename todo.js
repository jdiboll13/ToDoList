const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const todos = []
const done = []

app.get('/', (req, res) => {
  res.render('index', { todos: todos, done: done })
})

app.post('/add', (req, res) => {
  todos.push(req.body.todo)
  res.redirect('/')
})
// this part isn't doing what I want.
app.post('/done', (req, res) => {
  done.push(res.body.checked)
  console.log(done)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log("Let's do this!")
})

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

let todos = []
let done = []

app.get('/', (req, res) => {
  res.render('index', { todos: todos, done: done })
})

app.post('/add', (req, res) => {
  todos.push(req.body.todo)
  console.log(todos)
  res.redirect('/')
})
app.post('/done', (req, res) => {
  let i = todos.indexOf(req.body.checked)
  if (i != -1) {
    todos.splice(i, 1)
    done.push(req.body.checked)
  }
  console.log(done)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log("Let's do this!")
})

const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

// const todos = []
// const done = []

app.get('/', (req, res) => {
  const todoList = req.session.todoList || []
  const data = {
    notcompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }
  res.render('index', data)
})

app.post('/add', (req, res) => {
  const todoList = req.session.todoList || []
  todoList.push({ id: todoList.length + 1, completed: false, todo: req.body.todo })
  req.session.todoList = todoList
  res.redirect('/')
})
// this part isn't doing what I want.
app.post('/done', (req, res) => {
  const todoList = req.session.todoList || []
  const id = parseInt(req.body.id)
  const todo = todoList.find(todo => todo.id === id)
  if (todo) {
    todo.completed = true
    todo.when = new Date()
    req.session.todoList = todoList
  }

  // done.push(req.body.todo)
  // const indexOfItem = todos.indexOf(req.body.todo)
  // todos.splice(indexOfItem, 1)
  // req.session.todos = todos
  // console.log(done)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log("Let's do this!")
})

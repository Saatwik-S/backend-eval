// const tasksRouter = require('./routes/tasksRoutes')
// const taskRouter = require('./routes/taskRoutes')

const express = require('express')
const saveRoute = require('./src/routes/saveRoute')
// npx sequelize-cli model:generate --name Task --attributes title:string,isComplete:boolean
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use((_, response, next) => {
  response.set({ 'content-type': 'application/json' })
  next()
})
app.use('/api', saveRoute)
// app.use('/api/task', taskRouter)

app.listen(3000, () => console.log('Started on port 3000'))

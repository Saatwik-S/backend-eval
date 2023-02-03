// const tasksRouter = require('./routes/tasksRoutes')
// const taskRouter = require('./routes/taskRoutes')

const express = require('express')
const saveRoute = require('./src/routes/saveRoute')
const companyRoute = require('./src/routes/companyRoutes')
const { validate, schemas, REQ_PARAMTERS } = require('./src/util/middleware/validator')
const companyController = require('./src/controllers/companyController')

// npx sequelize-cli model:generate --name Task --attributes title:string,isComplete:boolean
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use((_, response, next) => {
  response.set({ 'content-type': 'application/json' })
  next()
})
app.use('/api/save', saveRoute)
app.use('/api/companies', companyRoute)
app.patch('/api/company/:id', validate(schemas.updateCompany.body, REQ_PARAMTERS.BODY), validate(schemas.updateCompany.params, REQ_PARAMTERS.PARAMS), companyController.updateCompany)
app.listen(3000, () => console.log('Started on port 3000'))

const saveService = require('../services/saveService')
const HTTPError = require('../util/HTTPError')
const externalAPI = require('../util/externalAPI')

module.exports = {
  saveData: async (request, response) => {
    try {
      const { urlLink } = request.body
      const data = await saveService.save(urlLink)
      response.status(201).json(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        response.status(error.status).json({ message: error.message })
      } else {
        console.log(error)
        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }
}

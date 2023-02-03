const companyService = require('../services/companyService')
const HTTPError = require('../util/HTTPError')

module.exports = {
  getCompanyBySector: async (request, response) => {
    try {
      const { sector } = request.query

      const data = await companyService.getCompanyBySector(sector)
      response.json(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        response.status(error.status).json({ message: error.message })
      } else {
        console.log(error)
        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  },
  updateCompany: async (request, response) => {
    try {
      const { id } = request.params

      const finalObj = { company_ceo: request.body.ceo, company_address: request.body.address }
      if (!finalObj.company_address && !finalObj.company_ceo) throw new HTTPError('Bad request', 400)
      await companyService.updateCompany(id, finalObj)
      response.json({ message: 'Company updated successfully' })
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

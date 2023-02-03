const HTTPError = require('./HTTPError')

const EXTERNAL_URL = 'http://54.167.46.10'

module.exports = {
  fetchCompanyBySector: async (sector) => {
    const response = await fetch(`${EXTERNAL_URL}/sector?name=${sector}`)
    const data = await response.json()
    if (data.error) {
      throw new HTTPError(data.error, 400)
    }
    return data
  },

  fetchCompanySectors: async (url) => {
    const response = await fetch(url)
    const data = await response.text()
    return (data.split('\n').map(dataRow => dataRow.split(',')).map(data => ({ company_id: data[0], company_sector: data[1] }))).splice(1)
  },
  fetchCompanyById: async (id) => {
    const response = await fetch(`${EXTERNAL_URL}/company/${id}`)
    const data = await response.json()
    if (data.error) {
      throw new HTTPError(data.error, 400)
    }
    // console.log(data)
    return data
  }
}

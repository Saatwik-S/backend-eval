const db = require('../database/models/index')
const HTTPError = require('../util/HTTPError')

module.exports = {
  getCompanyBySector: async (sector) => {
    const data = await db.company_details.findAll({
      attributes: [
        ['company_id', 'id'],
        ['company_name', 'name'],

        ['company_ceo', 'ceo'],

        ['company_performance', 'score']

      ],
      include: [{

        model: db.company_sectors,
        where: { company_sector: sector },
        attributes: []
      }]
    }
    )
    if (!data || (data && data.length === 0)) { throw new HTTPError('Not found', 404) }
    data.forEach((ele, index) => { data[index] = ele.dataValues })

    return (data.sort((a, b) => b.score - a.score)).map((ele, index) => { ele.ranking = index + 1; return ele })
    // return data.sort((a, b) => b.score - a.score).
  },
  updateCompany: async (id, data) => {
    const res = await db.company_details.update(data, { where: { company_id: id } })
    if (res[0] === 0) { throw new HTTPError('Cannot update', 404) }
    const newData = await db.company_details.findOne({ where: { company_id: id } })
    return newData.dataValues
  }
}

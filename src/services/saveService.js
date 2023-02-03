const db = require('../database/models/index')
const externalAPI = require('../util/externalAPI')

const calculateCompanyScore = ({ cpi, cf, mau, roic }) => (((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4).toFixed(2)

const populatePerformace = async (allSectors) => {
  const performance = []
  for (const entry of allSectors.entries()) {
    const companies = await externalAPI.fetchCompanyBySector(entry[0])
    console.log(companies)
    companies.forEach(company => {
      const obj = {}
      company.performanceIndex.forEach(e => { obj[e.key] = e.value })
      const companyScore = calculateCompanyScore(obj)
      console.log(company)
      console.log(companyScore)
      performance.push({ company_id: company.companyId, company_score: companyScore })
    })
  }
  return performance
}
const modifyCompanies = (allCompanies, performance) => {
  allCompanies.forEach(company => {
    const companyPerformanceFromID = performance.find(e => e.company_id === company.company_id)
    if (companyPerformanceFromID) { company.company_performance = companyPerformanceFromID.company_score }
  })
}

const populateAllCompanies = async (companiesBySector) => {
  const allCompanies = []

  for (let i = 0; i < companiesBySector.length; i++) {
    const company = await externalAPI.fetchCompanyById(companiesBySector[i].company_id)
    allCompanies.push({ company_id: company.id, company_ceo: company.ceo, company_name: company.name, company_description: company.description, company_tags: company.tags })
  }
  return allCompanies
}
module.exports = {

  save: async (link) => {
    const companiesBySector = await externalAPI.fetchCompanySectors(link)
    console.log(companiesBySector)

    const allSectors = new Set()
    companiesBySector.forEach(e => allSectors.add(e.company_sector))
    const performance =
    await populatePerformace(allSectors)
    const allCompanies = await populateAllCompanies(companiesBySector)
    modifyCompanies(allCompanies, performance)
    await db.company_details.bulkCreate(allCompanies, { returning: true })
    await db.company_sectors.bulkCreate(companiesBySector, { returning: true })

    return allCompanies.map(company => ({ id: company.company_id, name: company.company_name, score: company.company_performance }))
  }
}

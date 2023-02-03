// const { it, jest, describe, expect } = require('@jest/globals')
const companyService = require('../../src/services/companyService')
const db = require('../../src/database/models/index')
const HTTPError = require('../../src/util/HTTPError')

describe('Tests for company service', () => {
  describe('getCompanyBySector', () => {
    it('should return an array of companies', async () => {
      jest.spyOn(db.company_details, 'findAll').mockResolvedValue([{ dataValues: { id: 1 } }])
      const result = await companyService.getCompanyBySector()
      expect(result).toEqual([{ id: 1, ranking: 1 }])
    })

    it('Should should send not found when company is not found for a sector', () => {
      jest.spyOn(db.company_details, 'findAll').mockResolvedValue([])
      expect(companyService.getCompanyBySector()).rejects.toThrow(new HTTPError('Not found', 404))
    })
  })

  describe('Tests for updateCompany', () => {
    it('should return updated company', async () => {
      jest.spyOn(db.company_details, 'update').mockResolvedValue([1])
      jest.spyOn(db.company_details, 'findOne').mockResolvedValue({ dataValues: { id: 1 } })
      const result = await companyService.updateCompany(1, {})
      expect(result).toEqual({ id: 1 })
    })

    it('should throw error when company not found', async () => {
      jest.spyOn(db.company_details, 'update').mockResolvedValue([0])
      expect(companyService.updateCompany(1, {})).rejects.toThrow(new HTTPError('Cannot update', 404))
    })
  })
})

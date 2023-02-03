/* eslint-disable no-undef */
// import { describe, it, expect, jest } from '@jest/globals'
const companyService = require('../../src/services/companyService')
const companyController = require('../../src/controllers/companyController')
const HTTPError = require('../../src/util/HTTPError')

// eslint-disable-next-line no-undef
describe('Tests for company controller', () => {
  describe('Tests for updateCompany', () => {
    it('should send 200 when everything is fine', async () => {
      jest.spyOn(companyService, 'updateCompany').mockResolvedValue({})
      const req = {
        params: { id: 1 },
        body: { ceo: 'lol' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.updateCompany(req, res)
      expect(res.json).toHaveBeenCalledWith({})
    })
    it('should throw http error', async () => {
      jest.spyOn(companyService, 'updateCompany').mockRejectedValue(new HTTPError('Bad request', 400))
      const req = {
        params: { id: '24214' },
        body: { ceo: 'ff' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.updateCompany(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      //  expect(res.status().json).toHaveBeenCalledWith({ message: 'Bad request' })
    })
    it('should send 500 when server error', async () => {
      jest.spyOn(companyService, 'updateCompany').mockRejectedValue(new Error('Server error'))
      const req = {
        params: { id: 1 },
        body: { ceo: 'ff' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.updateCompany(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
    })
    it('should throw http error when no ceo and address', async () => {
      const req = {
        params: { id: '24214' },
        body: { }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.updateCompany(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      //  expect(res.status().json).toHaveBeenCalledWith({ message: 'Bad request' })
    })
  })

  describe('Tests for getCompanyBySector', () => {
    it('should send 200 when everything is fine', async () => {
      jest.spyOn(companyService, 'getCompanyBySector').mockResolvedValue({})
      const req = {
        params: { id: 1 },
        query: { sector: 'lol' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.getCompanyBySector(req, res)
      expect(res.json).toHaveBeenCalledWith({})
    })
    it('should throw http error', async () => {
      jest.spyOn(companyService, 'getCompanyBySector').mockRejectedValue(new HTTPError('Bad request', 400))
      const req = {
        query: { sector: '24214' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.getCompanyBySector(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.status().json).toHaveBeenCalledWith({ message: 'Bad request' })
    })
    it('should send 500 when server error', async () => {
      jest.spyOn(companyService, 'getCompanyBySector').mockRejectedValue(new Error('Server error'))
      const req = {
        params: { urlLink: '' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await companyController.getCompanyBySector(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
})

// import { describe, it, expect, jest } from '@jest/globals'
const companyService = require('../../src/services/companyService')
const companyController = require('../../src/controllers/companyController')
const HTTPError = require('../../src/util/HTTPError')

describe('Tests for company controller', () => {
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
})

// import { describe, it, expect, jest } from '@jest/globals'
const saveService = require('../../src/services/saveService')
const saveRouterController = require('../../src/controllers/saveRouterController')
const validator = require('./../../src/util/middleware/validator')
const HTTPError = require('../../src/util/HTTPError')

describe('Tests for save controller', () => {
  it('should send 201 when everything is fine', async () => {
    jest.spyOn(saveService, 'save').mockResolvedValue([])
    const req = {
      body: { urlLink: '' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await saveRouterController.saveData(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.status().json).toHaveBeenCalledWith([])
  })
  it('should throw http error', async () => {
    jest.spyOn(saveService, 'save').mockRejectedValue(new HTTPError('Bad request', 400))
    const req = {
      body: { urlLink: '' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await saveRouterController.saveData(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status().json).toHaveBeenCalledWith({ message: 'Bad request' })
  })
  it('should send 500 when server error', async () => {
    jest.spyOn(saveService, 'save').mockRejectedValue(new Error('Server error'))
    const req = {
      body: { urlLink: '' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await saveRouterController.saveData(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })
})

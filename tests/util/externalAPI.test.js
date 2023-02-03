// import { describe, it, expect, jest } from '@jest/globals'

const db = require('../../src/database/models/index')
const saveService = require('../../src/services/saveService')
const HTTPError = require('../../src/util/HTTPError')
const externalAPI = require('../../src/util/externalAPI')
const validator = require('./../../src/util/middleware/validator')

describe('Tests for external API', () => {
  it('should return some data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({}) })

    const data = await externalAPI.fetchCompanyBySector()

    expect(data).toEqual({})
  })
  it('should throw an error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({ error: 'message' }) })

    expect(externalAPI.fetchCompanyBySector()).rejects.toThrow(new HTTPError('message', 400))
  })
  it('should return company Sectors', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ text: jest.fn().mockResolvedValue('') })

    const data = await externalAPI.fetchCompanySectors()

    expect(data).toEqual([])
  })

  it('should return company by ID', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({}) })

    const data = await externalAPI.fetchCompanyById()

    expect(data).toEqual({})
  })
  it('should throw an error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({ error: 'message' }) })

    expect(externalAPI.fetchCompanyById()).rejects.toThrow(new HTTPError('message', 400))
  })
})

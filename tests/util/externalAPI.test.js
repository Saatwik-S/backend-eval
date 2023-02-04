// import { describe, it, expect, jest } from '@jest/globals'

const db = require('../../src/database/models/index')
const saveService = require('../../src/services/saveService')
const HTTPError = require('../../src/util/HTTPError')
const externalAPI = require('../../src/util/externalAPI')
const validator = require('./../../src/util/middleware/validator')

describe('Tests for external API calls for fetching data from server', () => {
  it('should return the data when Mocking the fetching information from the server when fetching information for a company by sector', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({}) })

    const data = await externalAPI.fetchCompanyBySector()

    expect(data).toEqual({})
  })
  it('should throw 400 error when we enter the wrong sector while fetching the data from the server', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({ error: 'message' }) })

    expect(externalAPI.fetchCompanyBySector()).rejects.toThrow(new HTTPError('message', 400))
  })
  it('should return all the company sectors', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ text: jest.fn().mockResolvedValue('') })

    const data = await externalAPI.fetchCompanySectors()

    expect(data).toEqual([])
  })

  it('should return company by ID', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({}) })

    const data = await externalAPI.fetchCompanyById()

    expect(data).toEqual({})
  })
  it('should throw an error when trying to fetch a company by ID', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue({ error: 'message' }) })

    expect(externalAPI.fetchCompanyById()).rejects.toThrow(new HTTPError('message', 400))
  })
})

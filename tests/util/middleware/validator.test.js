// import { describe, it } from '@jest/globals'
const validator = require('./../../../src/util/middleware/validator')

describe('Tests for validator middleware', () => {
  it('should return 400 when urllink is not provided', () => {
    const req = {
      body: {
        urlLink: ''
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()
    validator.validate(validator.schemas.saveAPI, validator.REQ_PARAMTERS.BODY)(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status().json).toHaveBeenCalledWith({ message: '"urlLink" is not allowed to be empty' })
  })
  it('Should call next callback function wjen urlLink is provided', () => {
    const req = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()
    validator.validate(validator.schemas.saveAPI, validator.REQ_PARAMTERS.BODY)(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})

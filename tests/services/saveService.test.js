/* eslint-disable no-undef */
// import { describe, it, expect, jest } from '@jest/globals'

const db = require('../../src/database/models/index')
const saveService = require('../../src/services/saveService')
const externalAPI = require('../../src/util/externalAPI')

describe('Tests for save service', () => {
  it('should return a array', async () => {
    jest.spyOn(externalAPI, 'fetchCompanySectors').mockResolvedValue([
      {
        company_id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        company_sector: 'Automobile'
      }
    ])

    jest.spyOn(externalAPI, 'fetchCompanyById').mockResolvedValue([{
      id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
      name: 'Volkswagen',
      description: 'Tenetur nobis sit blanditiis itaque. Necessitatibus adipisci repellat nisi nam magnam provident dolor a veniam. Nemo eum tenetur dolorem voluptatem in nisi corporis illum. Illum similique id voluptatibus cum accusantium.',
      ceo: 'Al Windler',
      tags: [
        'ubiquitous',
        'innovative',
        'strategic',
        'revolutionary',
        'scalable',
        'sticky',
        'cross-platform',
        'killer',
        'collaborative',
        'enterprise'
      ]
    }])

    jest.spyOn(externalAPI, 'fetchCompanyBySector').mockResolvedValue([
      {
        companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        performanceIndex: [
          { key: 'cpi', value: 1 },
          { key: 'cf', value: 592755 },
          { key: 'mau', value: 0.87 },
          { key: 'roic', value: 7.95 }
        ]
      }
    ])

    jest.spyOn(db.company_details, 'bulkCreate').mockResolvedValue(true)
    jest.spyOn(db.company_sectors, 'bulkCreate').mockResolvedValue(true)

    const data = await saveService.save('https://store-0001.s3.amazonaws.com/input.csv')
    // expect(externalAPI.fetchCompanySectors).toHaveBeenCalled()
    // expect(externalAPI.fetchCompanyById).toHaveBeenCalled()
    // expect(externalAPI.fetchCompanyBySector).toHaveBeenCalled()
    expect(data).toEqual([{
      id: undefined,
      name: undefined,
      score: undefined
    }])
  })
})

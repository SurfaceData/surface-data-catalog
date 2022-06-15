import { mockHttpEvent } from '@redwoodjs/testing/api'

import { AWSPathSigner } from 'src/lib/aws'
const getSignedPathMock = jest
  .spyOn(AWSPathSigner.prototype, 'getSignedPath')
  .mockImplementation((path) => {
    return `mock${path}`
  })

import { pathSigner } from 'src/lib/aws'
import { db } from 'src/lib/db'

import { handler } from './download'

describe('downloadDataset function', () => {
  scenario('Should reject with bad query params', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {},
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(400)
  })

  scenario('Should reject with missing api key', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        dataset: 'testdataset',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(400)
  })

  scenario('Should reject with missing dataset', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: '1234',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(400)
  })

  scenario('Should reject invalid api key', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: '1230',
        dataset: 'testdataset',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(401)
  })

  scenario('Should reject unknown dataset', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: 'abcf',
        dataset: 'testdataset',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(404)
  })

  scenario('Should reject unknown access rights', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: 'abcd',
        dataset: 'testdataset-t',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(403)
  })

  scenario('Should reject pending access rights', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: 'abc3',
        dataset: 'testdataset-t',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(403)
  })

  scenario('Should reject rejected access rights', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: 'abce',
        dataset: 'testdataset-t',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(403)
  })

  scenario('Should return redirect', async (scenario) => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        apikey: 'abcf',
        dataset: 'testdataset-t',
      },
    })

    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(302)
    expect(response.headers.Location).toBe(
      `mock${scenario.datasetSubset.test.path}`
    )
  })
})

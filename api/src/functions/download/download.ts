import type { APIGatewayEvent, Context } from 'aws-lambda'

import { pathSigner } from 'src/lib/aws'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  if (
    !event.queryStringParameters ||
    !event.queryStringParameters.apikey ||
    !event.queryStringParameters.dataset
  ) {
    return {
      statusCode: 400,
    }
  }
  const datasetSubsetId = event.queryStringParameters.dataset
  const apikey = event.queryStringParameters.apikey

  const userApiKey = await db.userApiKey.findUnique({
    where: { key: event.queryStringParameters.apikey },
  })
  if (!userApiKey) {
    return {
      statusCode: 401,
    }
  }
  const datasetSubset = await db.datasetSubset.findUnique({
    where: {
      id: datasetSubsetId,
    },
  })
  if (!datasetSubset) {
    return {
      statusCode: 404,
    }
  }
  const datasetAccess = await db.datasetAccess.findUnique({
    where: {
      userId_datasetId: {
        userId: userApiKey.id,
        datasetId: datasetSubset.datasetId,
      },
    },
  })
  if (!datasetAccess) {
    return {
      statusCode: 404,
    }
  }
  if (datasetAccess.status != 3) {
    await db.downloadLog.create({
      data: {
        userId: userApiKey.id,
        datasetId: datasetSubsetId,
        statusCode: 403,
      },
    })
    return {
      statusCode: 403,
    }
  }

  // Verify that the API key maps to a user with access to this dataset.
  if (event.httpMethod == 'HEAD') {
    return {
      statusCode: 200,
      headers: {
        ETag: '1234',
      },
    }
  }

  const url = await pathSigner.getSignedPath(datasetSubset.path)
  await db.downloadLog.create({
    data: {
      userId: userApiKey.id,
      datasetId: datasetSubsetId,
      statusCode: 302,
    },
  })
  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  }
}

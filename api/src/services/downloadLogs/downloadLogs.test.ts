import {
  downloadLogs,
  downloadLog,
  createDownloadLog,
  updateDownloadLog,
  deleteDownloadLog,
} from './downloadLogs'
import type { StandardScenario } from './downloadLogs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('downloadLogs', () => {
  scenario('returns all downloadLogs', async (scenario: StandardScenario) => {
    const result = await downloadLogs()

    expect(result.length).toEqual(Object.keys(scenario.downloadLog).length)
  })

  scenario(
    'returns a single downloadLog',
    async (scenario: StandardScenario) => {
      const result = await downloadLog({ id: scenario.downloadLog.one.id })

      expect(result).toEqual(scenario.downloadLog.one)
    }
  )

  scenario('creates a downloadLog', async () => {
    const result = await createDownloadLog({
      input: { userId: 'String', datasetId: 'String', statusCode: 7564021 },
    })

    expect(result.userId).toEqual('String')
    expect(result.datasetId).toEqual('String')
    expect(result.statusCode).toEqual(7564021)
  })

  scenario('updates a downloadLog', async (scenario: StandardScenario) => {
    const original = await downloadLog({ id: scenario.downloadLog.one.id })
    const result = await updateDownloadLog({
      id: original.id,
      input: { userId: 'String2' },
    })

    expect(result.userId).toEqual('String2')
  })

  scenario('deletes a downloadLog', async (scenario: StandardScenario) => {
    const original = await deleteDownloadLog({
      id: scenario.downloadLog.one.id,
    })
    const result = await downloadLog({ id: original.id })

    expect(result).toEqual(null)
  })
})

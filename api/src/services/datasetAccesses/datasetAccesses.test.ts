import {
  datasetAccesses,
  datasetAccess,
  createDatasetAccess,
  updateDatasetAccess,
  deleteDatasetAccess,
} from './datasetAccesses'
import type { StandardScenario } from './datasetAccesses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('datasetAccesses', () => {
  scenario(
    'returns all datasetAccesses',
    async (scenario: StandardScenario) => {
      const result = await datasetAccesses()

      expect(result.length).toEqual(Object.keys(scenario.datasetAccess).length)
    }
  )

  scenario(
    'returns a single datasetAccess',
    async (scenario: StandardScenario) => {
      const result = await datasetAccess({ id: scenario.datasetAccess.one.id })

      expect(result).toEqual(scenario.datasetAccess.one)
    }
  )

  scenario('creates a datasetAccess', async () => {
    const result = await createDatasetAccess({
      input: { userId: 'String', datasetId: 'String' },
    })

    expect(result.userId).toEqual('String')
    expect(result.datasetId).toEqual('String')
  })

  scenario('updates a datasetAccess', async (scenario: StandardScenario) => {
    const original = await datasetAccess({ id: scenario.datasetAccess.one.id })
    const result = await updateDatasetAccess({
      id: original.id,
      input: { userId: 'String2' },
    })

    expect(result.userId).toEqual('String2')
  })

  scenario('deletes a datasetAccess', async (scenario: StandardScenario) => {
    const original = await deleteDatasetAccess({
      id: scenario.datasetAccess.one.id,
    })
    const result = await datasetAccess({ id: original.id })

    expect(result).toEqual(null)
  })
})

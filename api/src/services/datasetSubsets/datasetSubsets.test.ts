import {
  datasetSubsets,
  datasetSubset,
  createDatasetSubset,
  updateDatasetSubset,
  deleteDatasetSubset,
} from './datasetSubsets'
import type { StandardScenario } from './datasetSubsets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('datasetSubsets', () => {
  scenario('returns all datasetSubsets', async (scenario: StandardScenario) => {
    const result = await datasetSubsets()

    expect(result.length).toEqual(Object.keys(scenario.datasetSubset).length)
  })

  scenario(
    'returns a single datasetSubset',
    async (scenario: StandardScenario) => {
      const result = await datasetSubset({ id: scenario.datasetSubset.one.id })

      expect(result).toEqual(scenario.datasetSubset.one)
    }
  )

  scenario('creates a datasetSubset', async (scenario: StandardScenario) => {
    const result = await createDatasetSubset({
      input: {
        language: 'l2',
        path: 'String',
        datasetId: scenario.datasetSubset.two.datasetId,
      },
    })

    expect(result.id).toEqual('d2-l2')
    expect(result.language).toEqual('l2')
    expect(result.path).toEqual('String')
    expect(result.datasetId).toEqual(scenario.datasetSubset.two.datasetId)
  })

  scenario('updates a datasetSubset', async (scenario: StandardScenario) => {
    const original = await datasetSubset({ id: scenario.datasetSubset.one.id })
    const result = await updateDatasetSubset({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a datasetSubset', async (scenario: StandardScenario) => {
    const original = await deleteDatasetSubset({
      id: scenario.datasetSubset.one.id,
    })
    const result = await datasetSubset({ id: original.id })

    expect(result).toEqual(null)
  })
})

import {
  datasets,
  dataset,
  createDataset,
  updateDataset,
  deleteDataset,
} from './datasets'
import type { StandardScenario } from './datasets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('datasets', () => {
  scenario('returns all datasets', async (scenario: StandardScenario) => {
    const result = await datasets()

    expect(result.length).toEqual(Object.keys(scenario.dataset).length)
  })

  scenario('returns a single dataset', async (scenario: StandardScenario) => {
    const result = await dataset({ id: scenario.dataset.one.id })

    expect(result).toEqual(scenario.dataset.one)
  })

  scenario('creates a dataset', async () => {
    const result = await createDataset({
      input: {
        id: 'String',
        name: 'String',
        language: 'String',
        task: 'String',
        path: 'String',
        license: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.language).toEqual('String')
    expect(result.task).toEqual('String')
    expect(result.path).toEqual('String')
    expect(result.license).toEqual('String')
  })

  scenario('updates a dataset', async (scenario: StandardScenario) => {
    const original = await dataset({ id: scenario.dataset.one.id })
    const result = await updateDataset({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a dataset', async (scenario: StandardScenario) => {
    const original = await deleteDataset({ id: scenario.dataset.one.id })
    const result = await dataset({ id: original.id })

    expect(result).toEqual(null)
  })
})

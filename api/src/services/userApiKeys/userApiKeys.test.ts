import {
  userApiKeys,
  userApiKey,
  createUserApiKey,
  updateUserApiKey,
  deleteUserApiKey,
} from './userApiKeys'
import type { StandardScenario } from './userApiKeys.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userApiKeys', () => {
  scenario('returns all userApiKeys', async (scenario: StandardScenario) => {
    const result = await userApiKeys()

    expect(result.length).toEqual(Object.keys(scenario.userApiKey).length)
  })

  scenario(
    'returns a single userApiKey',
    async (scenario: StandardScenario) => {
      const result = await userApiKey({ id: scenario.userApiKey.one.id })

      expect(result).toEqual(scenario.userApiKey.one)
    }
  )

  scenario('creates a userApiKey', async () => {
    const result = await createUserApiKey({
      input: { id: 'String', key: 'String4080697' },
    })

    expect(result.id).toEqual('String')
    expect(result.key).toEqual('String4080697')
  })

  scenario('updates a userApiKey', async (scenario: StandardScenario) => {
    const original = await userApiKey({ id: scenario.userApiKey.one.id })
    const result = await updateUserApiKey({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a userApiKey', async (scenario: StandardScenario) => {
    const original = await deleteUserApiKey({ id: scenario.userApiKey.one.id })
    const result = await userApiKey({ id: original.id })

    expect(result).toEqual(null)
  })
})

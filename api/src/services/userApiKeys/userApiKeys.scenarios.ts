import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserApiKeyCreateArgs>({
  userApiKey: {
    one: { data: { id: 'String', key: 'String7612707' } },
    two: { data: { id: 'String', key: 'String259988' } },
  },
})

export type StandardScenario = typeof standard

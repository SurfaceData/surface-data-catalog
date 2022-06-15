import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DatasetAccessCreateArgs>({
  datasetAccess: {
    one: { data: { userId: 'abcd', datasetId: '1234' } },
    two: { data: { userId: 'bcde', datasetId: '2345' } },
  },
})

export type StandardScenario = typeof standard

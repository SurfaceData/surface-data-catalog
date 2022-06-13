import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DatasetAccessCreateArgs>({
  datasetAccess: {
    one: { data: { userId: 'String', datasetId: 'String' } },
    two: { data: { userId: 'String', datasetId: 'String' } },
  },
})

export type StandardScenario = typeof standard

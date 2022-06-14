import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DownloadLogCreateArgs>({
  downloadLog: {
    one: {
      data: { userId: 'String', datasetId: 'String', statusCode: 4677498 },
    },
    two: {
      data: { userId: 'String', datasetId: 'String', statusCode: 974417 },
    },
  },
})

export type StandardScenario = typeof standard

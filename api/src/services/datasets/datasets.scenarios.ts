import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DatasetCreateArgs>({
  dataset: {
    one: {
      data: {
        id: 'String',
        name: 'String',
        language: 'String',
        task: 'String',
        path: 'String',
        license: 'String',
      },
    },
    two: {
      data: {
        id: 'String',
        name: 'String',
        language: 'String',
        task: 'String',
        path: 'String',
        license: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard

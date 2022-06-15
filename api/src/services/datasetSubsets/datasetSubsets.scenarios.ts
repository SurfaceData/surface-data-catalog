import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DatasetSubsetCreateArgs>({
  datasetSubset: {
    one: {
      data: {
        id: 'd1-t',
        language: 't',
        path: 'String',
        dataset: {
          create: {
            id: 'd1',
            name: 'String',
            task: 'String',
            license: 'String',
          },
        },
      },
    },
    two: {
      data: {
        id: 'd2-l',
        language: 'l',
        path: 'String',
        dataset: {
          create: {
            id: 'd2',
            name: 'String',
            task: 'String',
            license: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

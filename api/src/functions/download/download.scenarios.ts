export const standard = defineScenario({
  userApiKey: {
    unknown: {
      data: {
        id: '1234',
        key: 'abcd',
      },
    },
    requested: {
      data: {
        id: '1235',
        key: 'abc3',
      },
    },
    rejected: {
      data: {
        id: '1236',
        key: 'abce',
      },
    },
    accepted: {
      data: {
        id: '1237',
        key: 'abcf',
      },
    },
  },
  datasetAccess: {
    unknown: {
      data: {
        userId: '1234',
        datasetId: 'testdataset',
        status: 0,
      },
    },
    requested: {
      data: {
        userId: '1235',
        datasetId: 'testdataset',
        status: 1,
      },
    },
    rejected: {
      data: {
        userId: '1236',
        datasetId: 'testdataset',
        status: 2,
      },
    },
    accepted: {
      data: {
        userId: '1237',
        datasetId: 'testdataset',
        status: 3,
      },
    },
  },
  dataset: {
    test: {
      data: {
        id: 'testdataset',
        name: 'Test Dataset',
        language: 't',
        task: 'test',
        path: '/some/path',
        license: 'cc-test',
      },
    },
  },
})

export type StandardScenario = typeof standard

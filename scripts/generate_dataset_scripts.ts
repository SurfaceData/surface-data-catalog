import { renderFile } from 'template-file'
import { writeFileSync } from 'fs'

import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  const datasets = await db.dataset.findMany({
    include: {
      subsets: true,
    },
  })
  datasets.forEach(async (dataset) => {
    const config = {
      citation: '',
      description: '',
      license: dataset.license,
      url: `${args.api_url}/api/download?dataset=${dataset.id}-{langpair}`,
      subsets: dataset.subsets.map((subset) => {
        const languages = subset.language.split('_')
        return {
          source_language: languages[0],
          target_language: languages[1],
        }
      }),
    }
    const data = {
      config: JSON.stringify(config, null, ' '),
    }
    const result = await renderFile(
      './datasets/task_dataset/task_dataset.py',
      data
    )
    const datasetPackage = `${dataset.task}_${dataset.id}`
    writeFileSync(`./datasets/${datasetPackage}/${datasetPackage}.py`, result)
  })
}

import { renderFile } from 'template-file'
import { existsSync, writeFileSync } from 'fs'

import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  const datasets = await db.dataset.findMany({
    include: {
      subsets: true,
    },
  })
  datasets.forEach(async (dataset) => {
    if (dataset.task != 'translation') {
      console.log(`Skipping ${dataset.name}, task type not supported yet`)
      return
    }

    const datasetPackage = `${dataset.task}_${dataset.id}`
    const packageDir = `./datasets/${datasetPackage}`
    if (!existsSync(packageDir)) {
      console.log(
        `Skipping ${dataset.name}, the repository needs to be made first`
      )
      return
    }

    const config = {
      citation: '',
      description: '',
      license: dataset.license,
      url: `${args.api_url}/download?dataset=${dataset.id}-{langpair}`,
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
      `./datasets/template_dataset/${dataset.task}.py`,
      data
    )
    writeFileSync(`${packageDir}/${datasetPackage}.py`, result)
  })
}

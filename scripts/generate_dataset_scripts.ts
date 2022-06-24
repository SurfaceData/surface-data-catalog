import { execSync } from 'child_process'
import { existsSync, writeFileSync } from 'fs'
import simpleGit from 'simple-git'
import { renderFile } from 'template-file'

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
    let shouldGitAdd = false
    if (!existsSync(packageDir)) {
      console.log(`Creating HuggingFace dataset for ${datasetPackage}`)
      execSync(
        `huggingface-cli repo create -y ${datasetPackage} --type dataset --organization ${args.organization}`
      )
      execSync(
        `git remote add -f ${datasetPackage} https://huggingface.co/datasets/${args.organization}/${datasetPackage}`
      )
      execSync(
        `git subtree add --prefix datasets/${datasetPackage} ${datasetPackage} main`
      )
      shouldGitAdd = true
    }

    console.log(`Updating dataset for ${datasetPackage}`)
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

    const gitStatus = await simpleGit().status([packageDir])
    if (gitStatus.modified.length == 0 && gitStatus.not_added.length == 0) {
      return
    }
    if (gitStatus.not_added.length >= 0) {
      execSync(`git add ${packageDir}`)
    }
    execSync(`git commit -am "Updating ${datasetPackage}"`)
    execSync(
      `git subtree push --prefix datasets/${datasetPackage} ${datasetPackage} main`
    )
  })
}

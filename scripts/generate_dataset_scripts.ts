import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import simpleGit from 'simple-git'
import { renderFile } from 'template-file'
import toml from 'toml'

import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  const tomlFile = readFileSync('redwood.toml', 'utf8')
  const options = toml.parse(tomlFile)
  const organization = options.datasets.organization
  const apiUrl = options.datasets.apiUrl
  const homepage = options.datasets.homepage

  const datasets = await db.dataset.findMany({
    include: {
      subsets: true,
    },
  })
  datasets.forEach(async (dataset) => {
    if (
      dataset.task != 'translation' &&
      dataset.task != 'automatic_speech_recognition'
    ) {
      console.log(`Skipping ${dataset.name}, task type not supported yet`)
      return
    }

    const datasetPackage = `${dataset.task}_${dataset.id}`
    const packageDir = `./datasets/${datasetPackage}`
    if (!existsSync(packageDir)) {
      console.log(`Creating HuggingFace dataset for ${datasetPackage}`)
      execSync(
        `huggingface-cli repo create -y ${datasetPackage} --type dataset --organization ${organization}`
      )
      execSync(
        `git remote add -f ${datasetPackage} https://huggingface.co/datasets/${organization}/${datasetPackage}`
      )
      execSync(
        `git subtree add --prefix datasets/${datasetPackage} ${datasetPackage} main`
      )
    }

    console.log(`Updating dataset for ${datasetPackage}`)
    const config = {
      citation: '',
      description: '',
      homepage: homepage,
      license: dataset.license,
      version: 'cv-corpus-8.0-2022-01-19',
      url: `${apiUrl}/download?dataset=${dataset.id}-{langpair}`,
      subsets: dataset.subsets.map((subset) => {
        const languages = subset.language.split('_')
        return {
          name: subset.language,
          languages: languages,
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

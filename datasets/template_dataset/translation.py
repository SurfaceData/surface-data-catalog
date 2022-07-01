# coding=utf-8
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Lint as: python3
"""A Surface Data Collective Dataset."""

import csv
import json

import datasets

logger = datasets.logging.get_logger(__name__)

config = json.loads("""
{{ config }}
""")

_HOMEPAGE = config['homepage']
_CITATION = config['citation']
_DESCRIPTION = config['description']
_LICENSE = config['license']
_LANGUAGES = list(set([
    language for subset in config["subsets"] for language in subset["languages"]
    ]))
_BASE_URL_FORMAT_STR = config['url']

class SurfacePublicDatasetConfig(datasets.BuilderConfig):
    """BuildConfig for Surface Public Datasets."""

    def __init__(self, name, languages, **kwargs):
        """BuilderConfig for Surface Public Datasets.

        Args:
          **kwargs: Keyword arguments forwarded to the BuilderConfig.
        """
        description = ("Translation dataset for %s.") % (name)
        super(SurfacePublicDatasetConfig,
                self).__init__(name=name, description=description, **kwargs)

        self.source_language = languages[0]
        self.target_language = languages[1]
        self.data_url = _BASE_URL_FORMAT_STR.format(
                langpair=name)
        self.apikey = 'placeholder'


class SurfacePublicDataset(datasets.GeneratorBasedBuilder):
    """SDC: The Surface Data Collective dataset. Version 22.06."""

    BUILDER_CONFIGS = [
            SurfacePublicDatasetConfig(
                name=subset['name'],
                languages=subset['languages']) for subset in config['subsets']
            ]

    def _info(self):
        source_language = self.config.source_language
        target_language = self.config.target_language
        return datasets.DatasetInfo(
                description=_DESCRIPTION,
                features=datasets.Features(
                    {
                        "id": datasets.Value("string"),
                        "translation": datasets.Translation(
                            languages=[source_language, target_language]
                            ),
                        }
                    ),
                supervised_keys=(source_language, target_language),
                homepage=_HOMEPAGE,
                citation=_CITATION,
                license=_LICENSE
                )

    def _split_generators(self, dl_manager):
        download_url = f"{self.config.data_url}&apikey={self.config.apikey}"
        data_file = dl_manager.download_and_extract(
                {"data_file": download_url})
        return [
                datasets.SplitGenerator(name=datasets.Split.TRAIN,
                    gen_kwargs=data_file)
                ]

    def _generate_examples(self, data_file):
        """This function returns the examples in the raw (text) form."""
        key = 0

        def line_gen(csvfile):
            for line in csvfile:
                yield line.strip()

        logger.info("generating examples from = %s", data_file)
        with open(data_file, encoding="utf-8") as f:
            data_reader = csv.reader(line_gen(f), delimiter='\t')
            for row in data_reader:
                if len(row) != 2:
                    logger.info("Skipping row with content '%s'", row)
                    continue
                content_src, content_trg = row
                yield key, {
                        "id": key,
                        "translation": {
                            self.config.source_language: content_src,
                            self.config.target_language: content_trg,
                            },
                        }
                key += 1

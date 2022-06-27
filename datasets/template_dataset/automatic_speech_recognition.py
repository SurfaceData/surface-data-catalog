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

""" Surface Data Automatic Speech Recognition"""



import csv
import json
import os

import datasets
from datasets.tasks import AutomaticSpeechRecognition

logger = datasets.logging.get_logger(__name__)

config = json.loads("""
{{ config }}
""")

_VERSION = config['version']
_HOMEPAGE = config['homepage']
_CITATION = config['citation']
_DESCRIPTION = config['description']
_LICENSE = config['license']
_BASE_URL_FORMAT_STR = config['url']


class SurfaceAutomaticSpeechRecognitionConfig(datasets.BuilderConfig):
    """BuilderConfig for Surface ASR datasets."""

    def __init__(self, name, **kwargs):
        """
        Args:
          data_dir: `string`, the path to the folder containing the files in the
            downloaded .tar
          citation: `string`, citation for the data set
          url: `string`, url for information about the data set
          **kwargs: keyword arguments forwarded to super.
        """
        super(SurfaceAutomaticSpeechRecognitionConfig, self).__init__(
                name=name, **kwargs)
        self.data_url = _BASE_URL_FORMAT_STR.format(
                langpair=name)
        self.apikey = 'placeholder'


class SurfaceAutomaticSpeechRecognitionConfig(datasets.GeneratorBasedBuilder):

    DEFAULT_WRITER_BATCH_SIZE = 1000
    BUILDER_CONFIGS = [
            SurfaceAutomaticSpeechRecognitionConfig(
                name=subset['source_language'] ,
                )
            for subset in config['subsets']
            ]

    def _info(self):
        features = datasets.Features(
                {
                    "client_id": datasets.Value("string"),
                    "path": datasets.Value("string"),
                    "audio": datasets.Audio(sampling_rate=48_000),
                    "sentence": datasets.Value("string"),
                    "up_votes": datasets.Value("int64"),
                    "down_votes": datasets.Value("int64"),
                    "age": datasets.Value("string"),
                    "gender": datasets.Value("string"),
                    "accents": datasets.Value("string"),
                    "locale": datasets.Value("string"),
                    "segment": datasets.Value("string"),
                    }
                )

        return datasets.DatasetInfo(
                description=_DESCRIPTION,
                features=features,
                supervised_keys=None,
                homepage=_HOMEPAGE,
                license=_LICENSE,
                citation=_CITATION,
                task_templates=[
                    AutomaticSpeechRecognition(audio_column="audio", transcription_column="sentence")
                    ],
                )

    def _split_generators(self, dl_manager):
        """Returns SplitGenerators."""
        # Download the TAR archive that contains the audio files:
        download_url = f"{self.config.data_url}&apikey={self.config.apikey}"
        archive_path = dl_manager.download(download_url)

        # First we locate the data using the path within the archive:
        path_to_data = "/".join([_VERSION, self.config.name])
        path_to_clips = "/".join([path_to_data, "clips"])
        metadata_filepaths = {
                split: "/".join([path_to_data, f"{split}.tsv"])
                for split in ["train", "test", "dev", "other", "validated", "invalidated"]
                }
        # (Optional) In non-streaming mode, we can extract the archive locally to have actual local audio files:
        local_extracted_archive = dl_manager.extract(archive_path) if not dl_manager.is_streaming else None

        # To access the audio data from the TAR archives using the download manager,
        # we have to use the dl_manager.iter_archive method.
        #
        # This is because dl_manager.download_and_extract
        # doesn't work to stream TAR archives in streaming mode.
        # (we have to stream the files of a TAR archive one by one)
        #
        # The iter_archive method returns an iterable of (path_within_archive, file_obj) for every
        # file in the TAR archive.

        return [
                datasets.SplitGenerator(
                    name=datasets.Split.TRAIN,
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["train"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
                datasets.SplitGenerator(
                    name=datasets.Split.TEST,
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["test"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
                datasets.SplitGenerator(
                    name=datasets.Split.VALIDATION,
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["dev"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
                datasets.SplitGenerator(
                    name="other",
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["other"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
                datasets.SplitGenerator(
                    name="validated",
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["validated"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
            datasets.SplitGenerator(
                    name="invalidated",
                    gen_kwargs={
                        "local_extracted_archive": local_extracted_archive,
                        "archive_iterator": dl_manager.iter_archive(
                            archive_path
                            ),  # use iter_archive here to access the files in the TAR archives
                        "metadata_filepath": metadata_filepaths["invalidated"],
                        "path_to_clips": path_to_clips,
                        },
                    ),
        ]

    def _generate_examples(self, local_extracted_archive, archive_iterator, metadata_filepath, path_to_clips):
        """Yields examples."""
        data_fields = list(self._info().features.keys())

        # audio is not a header of the csv files
        data_fields.remove("audio")
        path_idx = data_fields.index("path")

        all_field_values = {}
        metadata_found = False
        # Here we iterate over all the files within the TAR archive:
        for path, f in archive_iterator:
            # Parse the metadata CSV file
            if path == metadata_filepath:
                metadata_found = True
                lines = f.readlines()
                headline = lines[0].decode("utf-8")

                column_names = headline.strip().split("\t")
                assert (
                        column_names == data_fields
                        ), f"The file should have {data_fields} as column names, but has {column_names}"
                for line in lines[1:]:
                    field_values = line.decode("utf-8").strip().split("\t")
                    # set full path for mp3 audio file
                    audio_path = "/".join([path_to_clips, field_values[path_idx]])
                    all_field_values[audio_path] = field_values
            elif path.startswith(path_to_clips):
                assert metadata_found, "Found audio clips before the metadata TSV file."
                if not all_field_values:
                    break
                if path in all_field_values:
                    # retrieve the metadata corresponding to this audio file
                    field_values = all_field_values[path]

                    # if data is incomplete, fill with empty values
                    if len(field_values) < len(data_fields):
                        field_values += (len(data_fields) - len(field_values)) * ["''"]

                    result = {key: value for key, value in zip(data_fields, field_values)}

                    # set audio feature
                    result["audio"] = {"path": path, "bytes": f.read()}
                    # set path to None if the audio file doesn't exist locally (i.e. in streaming mode)
                    result["path"] = os.path.join(local_extracted_archive, path) if local_extracted_archive else None

                    yield path, result

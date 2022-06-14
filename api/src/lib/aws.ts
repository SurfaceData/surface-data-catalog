import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export class AWSPathSigner {
  client: S3Client
  bucket: string

  constructor(region: string, bucket: string) {
    this.client = new S3Client({
      region,
    })
    this.bucket = bucket
  }

  async getSignedPath(path: string): string {
    const command = new GetObjectCommand({
      Key: path,
      Bucket: bucket,
    })

    return await getSignedUrl(s3client, command, { expiresIn: 3600 })
  }
}

export const pathSigner = new AWSPathSigner(
  process.env.AWS_REGION,
  process.env.AWS_BUCKET
)

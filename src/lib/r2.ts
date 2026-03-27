import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

const BUCKET = process.env.R2_BUCKET_NAME || 'ittumo-image'
const PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://images.ittumo.net'

/**
 * Cloudflare R2 にファイルをアップロードし、公開URLを返す
 * @param key ストレージパス（例: "compositions/xxx/wearing-123.png"）
 * @param body ファイルデータ（Buffer, Uint8Array, Blob等）
 * @param contentType MIMEタイプ
 * @returns 公開URL
 */
export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  )

  return `${PUBLIC_URL}/${key}`
}

export { r2Client, BUCKET, PUBLIC_URL }

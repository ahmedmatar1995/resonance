import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env";

const r2 = new S3Client({
  region: "auto",
  endpoint: env.BACKBLAZE_ENDPOINT,
  credentials: {
    secretAccessKey: env.BACKBLAZE_APPLICATION_ID as string,
    accessKeyId: env.BACKBLAZE_KEY_ID as string,
  },
});

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

export async function UploadAudio({
  buffer,
  key,
  contentType = "audio/wave",
}: UploadAudioOptions): Promise<void> {
  await r2.send(
    new PutObjectCommand({
      Bucket: env.BACKBLAZE_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
}

export async function DeleteAudio(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: env.BACKBLAZE_BUCKET_NAME,
      Key: key,
    }),
  );
}

export async function getSignedAudioUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.BACKBLAZE_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(r2, command, { expiresIn: 3600 });
}

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    BACKBLAZE_KEY_ID: z.string().min(1),
    BACKBLAZE_APPLICATION_ID: z.string().min(1),
    BACKBLAZE_BUCKET_NAME: z.string().min(1),
    BACKBLAZE_ENDPOINT: z.string().min(1),
    BACKBLAZE_REGION: z.string().min(1),
    CHATTERBOX_API_KEY: z.string().min(1),
    CHATTERBOX_API_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  onValidationError: () => {
    throw new Error("invalid variables");
  },
});

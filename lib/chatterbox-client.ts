import createClient from "openapi-fetch";
import type { paths } from "../src/types/chatterbox-api.d.ts";
import { env } from "./env";

export const chatterbox = createClient<paths>({
  baseUrl: env.CHATTERBOX_API_URL,
  headers: {
    "x-api-key": env.CHATTERBOX_API_KEY,
  },
});

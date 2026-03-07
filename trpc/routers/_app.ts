import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  sendMessage: baseProcedure.query(() => {
    return { message: "ok" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { DeleteAudio } from "@/lib/r2";
import { createTRPCRouter, orgProcedure, protectedProcedure } from "../init";

export const voiceRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(
      z
        .object({
          query: z.string().trim().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const searchFilter = input?.query
        ? {
            OR: [
              {
                name: {
                  conatins: input?.query,
                  mode: "insensitive",
                } as const,
              },
              {
                description: {
                  contains: input?.query,
                  mode: "insensitive",
                } as const,
              },
            ],
          }
        : {};

      const [custom, system] = await Promise.all([
        prisma.voice.findMany({
          where: {
            variant: "CUSTOM",
            orgId: ctx.orgId,
            ...searchFilter,
          },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            language: true,
            category: true,
            variant: true,
          },
        }),
        await prisma.voice.findMany({
          where: {
            variant: "SYSTEM",
            ...searchFilter,
          },
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            language: true,
            variant: true,
            category: true,
          },
        }),
      ]);

      return { custom, system };
    }),
  delete: orgProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voice = await prisma.voice.findUnique({
        where: {
          id: input?.id,
          variant: "CUSTOM",
          orgId: ctx.orgId,
        },
        select: {
          id: true,
          r2ObjectKey: true,
        },
      });
      if (!voice)
        throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });

      await prisma.voice.delete({
        where: { id: input?.id },
      });

      if (voice.r2ObjectKey) {
        await DeleteAudio(voice.r2ObjectKey).catch(() => {});
      }

      return { success: true };
    }),
});

import { createTRPCRouter } from "Y/server/api/trpc";
import { tweetRouter } from "Y/server/api/routers/tweet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { resolve } from "path";
import { z } from "zod";

export const appRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ input }) {
    const url = `https://pokeapi.co/api/v2/pokemon/${input.id}/`;
    const pokemon = await fetch(url).then((response) => response.json());
    return pokemon;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

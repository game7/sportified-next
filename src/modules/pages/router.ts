import { createRouter } from "../../common/router";
import superjson from "superjson";
import * as z from "zod";
import db from "../../db";
import { Block } from "../../types";
import { Page } from "@prisma/client";

const pages = createRouter()
  .query("list", {
    resolve({ ctx }) {
      return db.page.findMany({ where: { tenantId: ctx.tenant.id } });
    },
  })
  .query("get", {
    input: z.object({
      id: z.number().positive(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      const page = await db.page.findFirst({
        where: { id, tenantId: ctx.tenant.id },
      });
      if(page === null) {
        throw new Error('Page Not Found')
      }
      return {
        ...page,
        blocks: superjson.deserialize<Block[]>({ json: page.blocks })
      }
      // const withBlocks = {
      //   ...page,
      //   blocks: superjson.deserialize<Block[]>({ json: page?.blocks }),
      // };
      // console.log(JSON.stringify(withBlocks, null, 2));
      // return withBlocks;
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string().nonempty(),
    }),
    resolve({ ctx, input }) {
      return db.page.create({
        data: { ...input, tenantId: ctx.tenant.id },
      });
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.number().positive().int(),
      data: z.object({
        title: z.string().nonempty(),
        blocks: z.array(z.any())
      })
    }),
    resolve({ ctx, input }) {
      return db.page.update({
        data: { ...input.data },
        where: { id: input.id }
      })
    }
  })

export const router = createRouter().merge("pages.", pages);

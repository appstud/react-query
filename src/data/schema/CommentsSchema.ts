import { z } from "zod"

export const CommentsSchema = z.array(
    z.object({
      postId: z.number(),
      id: z.number(),
      name: z.string(),
      email: z.string(),
      body: z.string()
    })
)

export type CommentsType = z.infer<typeof CommentsSchema>
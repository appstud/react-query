import {z} from "zod"

export const PostFormSchema = z.object({
  userId: z.number(),
  title: z.string(),
  body: z.string()
})

export const PostSchema = z.object({ id: z.number() })

export type PostType = z.infer<typeof PostSchema>
export type PostFormType = z.infer<typeof PostFormSchema>
import {UseMutationResult} from "@tanstack/react-query";
import {PostFormType, PostSchema, PostType} from "../../data/schema/PostsSchema";
import {AxiosError} from "axios";
import {usePost} from "../query/usePost";

export const usePostComment = (): UseMutationResult<PostType, AxiosError, PostFormType> => usePost({
  schema: PostSchema,
  url: 'posts'
})
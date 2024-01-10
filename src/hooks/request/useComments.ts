import {UseQueryResult} from "@tanstack/react-query";
import {CommentsSchema, CommentsType} from "../../data/schema/CommentsSchema";
import {AxiosError} from "axios";
import {useFetch} from "../query/useFetch";

type ParamsType = {
  postId: number
}
export const useComments = (params?: ParamsType): UseQueryResult<CommentsType, AxiosError> =>
    useFetch({
      schema: CommentsSchema,
      url: 'comments',
      params
    })
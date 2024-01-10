import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { z, ZodTypeAny } from 'zod'
import type { QueryFunctionT, QueryKeyT } from './fetcher'
import { fetcher } from './fetcher'
import type { AxiosError } from 'axios'

export interface IFetchParameters<
    TSchema extends ZodTypeAny = ZodTypeAny,
    ParamType extends ZodTypeAny = ZodTypeAny,
> {
    schema?: TSchema
    url: string | null
    params?: Record<any, unknown> | undefined
    config?: UseQueryOptions<
        QueryFunctionT<ParamType>,
        AxiosError,
        z.infer<TSchema>,
        QueryKeyT<ParamType>
    >
}

export const useFetch = <
    TSchema extends ZodTypeAny = ZodTypeAny,
    ParamType extends ZodTypeAny = ZodTypeAny,
>(
    parameters: IFetchParameters<TSchema, ParamType>,
): UseQueryResult<z.infer<TSchema>, AxiosError> =>
    useQuery<QueryFunctionT<ParamType>, AxiosError, z.infer<TSchema>, QueryKeyT<ParamType>>({
        queryKey: [parameters.url!, parameters.params],
        queryFn: ({ queryKey }) =>
            fetcher(parameters.schema)({ queryKey}),
        enabled: Boolean(parameters.url),
        ...parameters.config,
    })

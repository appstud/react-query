
import { AxiosHttpClient } from '../../domain/models/AxiosHttpClient'
import type { z, ZodTypeAny } from 'zod'
import type { QueryFunctionContext } from '@tanstack/react-query'

export type QueryKeyT<ParamsType extends ZodTypeAny = ZodTypeAny> = [
    string,
    ParamsType | Record<any, unknown> | undefined,
]
export type QueryFunctionT<ParamsType extends ZodTypeAny = ZodTypeAny> = Pick<
    QueryFunctionContext<QueryKeyT<ParamsType>, Record<any, unknown> | undefined>,
    'queryKey'
>
export const httpClient = new AxiosHttpClient('https://jsonplaceholder.typicode.com/')

export function fetcher<TSchema extends ZodTypeAny, ParamType extends ZodTypeAny>(
    schema?: TSchema,
): ({ queryKey }: QueryFunctionT<ParamType>) => Promise<z.infer<TSchema>> {
    return async ({ queryKey }) => {
        const [url, params] = queryKey
        const response = await httpClient.get<z.infer<TSchema>>(url, { params })
        if (!schema) return response

        try {
            return schema.parse(response)
        } catch (error) {
            console.error('error parsing data')
        }
    }
}

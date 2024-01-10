import type { z, ZodTypeAny } from 'zod'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query/build/modern'
import { useGenericMutation } from './useGenericMutation'
import { httpClient } from './fetcher'

export interface IPostParameters<TVariable, TSchema extends ZodTypeAny> {
    schema: TSchema
    url: string
    options?: Omit<AxiosRequestConfig, 'method' | 'url' | 'transformResponse' | 'data'>
    config?: UseMutationOptions<z.infer<TSchema>, Error, TVariable>
    updater?: ((oldData: z.infer<TSchema>, newData: z.infer<TSchema>) => TVariable) | undefined
}

export const usePost = <TVariable = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    parameters: IPostParameters<TVariable, TSchema>,
): UseMutationResult<z.infer<TSchema>, AxiosError, TVariable> => {
    const { url, schema, config, updater, options } = parameters

    return useGenericMutation<TVariable, TSchema>(
        async (data) => {
            const response = await httpClient.post<z.infer<TSchema>>(url, data, options)

            if (!schema) return response

            return schema.parse(response)
        },
        url,
        options,
        config,
        updater,
    )
}

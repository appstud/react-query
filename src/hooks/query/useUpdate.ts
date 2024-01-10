import type { z, ZodTypeAny } from 'zod'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from '@tanstack/react-query'
import { useGenericMutation } from './useGenericMutation'
import { httpClient } from './fetcher'
import type { IPostParameters } from './usePost'

export const useUpdate = <TVariable = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    parameters: IPostParameters<TVariable, TSchema>,
): UseMutationResult<z.infer<TSchema>, AxiosError, TVariable> => {
    const { url, schema, config, updater, options } = parameters

    return useGenericMutation<TVariable, TSchema>(
        async (data) => {
            const response = await httpClient.patch<z.infer<TSchema>>(url, data, options)

            if (!schema) return response

            return schema.parse(response)
        },
        url,
        options,
        config,
        updater,
    )
}

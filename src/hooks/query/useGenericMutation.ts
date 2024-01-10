import type { z, ZodTypeAny } from 'zod'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGenericMutation = <TVariable = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    func: (data: TVariable) => Promise<AxiosResponse<z.infer<TSchema> | unknown>>,
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url' | 'transformResponse' | 'data'>,
    config?: UseMutationOptions<z.infer<TSchema>, Error, TVariable>,
    updater?: ((oldData: z.infer<TSchema>, newData: z.infer<TSchema>) => TVariable) | undefined,
): UseMutationResult<z.infer<TSchema>, AxiosError, TVariable> => {
    const queryClient = useQueryClient()

    return useMutation<AxiosResponse, AxiosError, z.infer<TSchema>>({
        mutationFn: func,
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: [url!, options?.params] })

            const previousData = queryClient.getQueryData([url!, options?.params])
            queryClient.setQueryData<TVariable>([url!, options?.params], (oldData) =>
                updater ? oldData : data,
            )

            return previousData
        },
        /*        onError: (error, variables, context) => {
logger.error(`Error with query parsing ${error}`, {
tags: {
file: 'useGenericMutation',
function: 'useGenericMutation',
},
})
queryClient.setQueryData([url!, options?.params], context)
},
    onSettled: () => queryClient.invalidateQueries({ queryKey: [url!, options?.params] }),

     */
        ...config,
    })
}

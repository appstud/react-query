/**
 * @Project TikTools
 * @File IHttpClient.ts
 * @Path app/domain/models
 * @Author BRICE ZELE
 * @Date 25/10/2023
 */
import type { AxiosRequestConfig } from 'axios'

export type HttpHeaders = Record<string, string>

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface IHttpClient {
    baseUrl: string
    request<R>(
        config: AxiosRequestConfig,
        headers?: HttpHeaders,
        responseType?: ResponseType,
    ): Promise<R>
    post<R>(
        url: string,
        body: Record<any, unknown>,
        headers?: HttpHeaders,
        responseType?: ResponseType,
    ): Promise<R>
    patch<R>(
        url: string,
        body: Record<any, unknown>,
        headers?: HttpHeaders,
        responseType?: ResponseType,
    ): Promise<R>
    get<R>(url: string, headers?: HttpHeaders, responseType?: ResponseType): Promise<R>
    delete<R>(url: string, headers?: HttpHeaders, responseType?: ResponseType): Promise<R>
}

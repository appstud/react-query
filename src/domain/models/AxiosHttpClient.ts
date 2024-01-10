
import type {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    ResponseType,
} from 'axios'
import axios from 'axios'
import type { HttpHeaders, IHttpClient } from '../interface/IHttpClient'
import { HttpStatus } from '../enum/HttpStatus'

export class AxiosHttpClient implements IHttpClient {
    baseUrl: string

    private httpInstance: AxiosInstance

    constructor(baseURL: string) {
        const config: AxiosRequestConfig = {
            baseURL,
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
            },
        }
        this.baseUrl = baseURL
        this.httpInstance = axios.create(config)

        this.httpInstance.interceptors.request.use(
            async (request: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {

                    return request as InternalAxiosRequestConfig

            },
            (error: AxiosError): Promise<AxiosError> => {
                //RequestErrorHandler.handleRequestError(error)

                return Promise.reject(error)
            },
        )

        this.httpInstance.interceptors.response.use(
            async (response: AxiosResponse): Promise<AxiosResponse> => {
                    console.log('REQUEST RESPONSE', response)

                    return response

            },
            async (error: AxiosError): Promise<AxiosError> => {

                const requestConfig = error?.config as InternalAxiosRequestConfig & {
                    sent: boolean
                }

                if (error?.response?.status === HttpStatus.FORBIDDEN && !requestConfig.sent) {
                    const accessToken = 'NEW-TOKEN' // TODO implement refresh token function
                    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

                    return axios(config)
                }

                //RequestErrorHandler.handleRequestError(error)

                    return Promise.reject(error)

            },
        )
    }

    async request<R>(
        config: AxiosRequestConfig,
        headers?: HttpHeaders,
        responseType?: ResponseType,
    ): Promise<R> {
        const response = await this.httpInstance.request({
            ...config,
            headers,
            responseType,
        })

        return response.data as R
    }

    async get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
        const response = await this.httpInstance.get(url, config)

        return response.data as R
    }

    async post<R>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<R> {
        const response = await this.httpInstance.post(url, body, config)

        return response.data as R
    }

    async patch<R>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<R> {
        const response = await this.httpInstance.patch(url, body, config)

        return response.data as R
    }

    async delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
        const response = await this.httpInstance.delete(url, config)

        return response.data as R
    }
}

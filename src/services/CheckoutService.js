import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function submitCheckout(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.checkout,
        method: 'post',
        data,
    })
}

export async function submitExpertCheckout(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.expertCheckout,
        method: 'post',
        data,
    })
}

export async function apiSubmitToolPayment(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.toolCheckout,
        method: 'post',
        data,
    })
}
export async function apiCheckPaymentStatus(params) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.checkPaymentStatus,
        method: 'get',
        params,
    })
}


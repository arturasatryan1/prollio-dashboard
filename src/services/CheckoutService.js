import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function submitCheckout(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.checkout,
        method: 'post',
        data,
    })
}

import ApiService from './ApiService'

export async function apiGetPaymentList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/payments',
        method: 'get',
        params,
    })
}
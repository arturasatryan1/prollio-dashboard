import ApiService from './ApiService'

export async function apiGetTransactions(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/transactions',
        method: 'get',
        params,
    })
}
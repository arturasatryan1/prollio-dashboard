import ApiService from './ApiService'

export async function apiGetPayoutList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/payouts',
        method: 'get',
        params,
    })
}
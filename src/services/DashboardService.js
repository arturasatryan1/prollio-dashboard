import ApiService from './ApiService'

export async function apiGetOverview(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/overview',
        method: 'get',
        params
    })
}
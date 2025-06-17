import ApiService from './ApiService'

export async function apiGetOverview() {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/overview',
        method: 'get',
    })
}
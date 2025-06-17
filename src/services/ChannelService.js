import ApiService from './ApiService'

export async function apiGetChannel() {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/channels',
        method: 'get',
    })
}
import ApiService from './ApiService'

export async function apiGetTransferList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/transfers',
        method: 'get',
        params,
    })
}

export async function apiUpdateTransferList(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/transfers/${id}`,
        method: 'patch',
        data,
    })
}
import ApiService from './ApiService'

export async function apiGetExpertsList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/experts',
        method: 'get',
        params,
    })
}

export async function apiGetExpert({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/experts/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetExpertLog({ ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/experts/log`,
        method: 'get',
        params,
    })
}

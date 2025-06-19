import ApiService from './ApiService'

export async function apiGetRequestList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/expert-requests',
        method: 'get',
        params,
    })
}

export async function apiGetRequest({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/expert-requests/${id}`,
        method: 'get',
        params,
    })
}

export async function apiApproveRequest({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/expert-requests/${id}/approve`,
        method: 'get',
        params,
    })
}

export async function apiRejectRequest({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/expert-requests/${id}/reject`,
        method: 'get',
        params,
    })
}

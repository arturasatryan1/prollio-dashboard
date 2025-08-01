import ApiService from './ApiService'

export async function apiGetCustomersList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/members',
        method: 'get',
        params,
    })
}

export async function apiGetLeadMembersList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/lead-members',
        method: 'get',
        params,
    })
}

export async function apiGetCustomer({id, ...params}) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/members/${id}`,
        method: 'get',
        params,
    })
}

export async function apiBulkRemoveCustomers(data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/members/bulk-delete`,
        method: 'post',
        data
    })
}
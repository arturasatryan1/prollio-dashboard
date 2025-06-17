import ApiService from './ApiService'

export async function apiGetCustomersList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/customers',
        method: 'get',
        params,
    })
}

export async function apiGetCustomer({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/customers/${id}`,
        method: 'get',
        params,
    })
}

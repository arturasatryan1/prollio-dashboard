import ApiService from './ApiService'

export async function apiGetChannelList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/channels',
        method: 'get',
        params,
    })
}

export async function apiGetChannelListAll(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/channels-list',
        method: 'get',
        params,
    })
}

export async function apiGetChannel({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/channels/${id}`,
        method: 'get',
        params,
    })
}

export async function apiCreateChannel(data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/channels`,
        method: 'post',
        data,
    })
}

export async function apiUpdateChannel(id, {...data }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/channels/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteChannel({ id }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/channels/${id}`,
        method: 'delete'
    })
}

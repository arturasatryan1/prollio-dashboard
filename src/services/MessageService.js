import ApiService from './ApiService'

export async function apiGetMessageList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/messages',
        method: 'get',
        params,
    })
}

export async function apiGetMessage({id, ...params}) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/messages/${id}`,
        method: 'get',
        params,
    })
}

export async function apiDraftMessage(data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/messages`,
        method: 'post',
        data,
    })
}

export async function apiSendMessage(id, data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/messages/${id}/send`,
        method: 'post',
        data,
    })
}

export async function apiDeleteMessage(id) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/messages/${id}`,
        method: 'delete'
    })
}

export async function apiGetMessageTemplates() {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/message-templates`,
        method: 'get'
    })
}

export async function apiDeleteTemplates(id) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/message-templates/${id}`,
        method: 'delete'
    })
}
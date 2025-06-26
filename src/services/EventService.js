import ApiService from './ApiService'

export async function apiGetEventList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/events',
        method: 'get',
        params,
    })
}

export async function apiGetEventListAll(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/events-list',
        method: 'get',
        params,
    })
}

export async function apiGetEventUpcoming(params) {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/upcoming-events',
        method: 'get',
        params,
    })
}

export async function apiGetEvent({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/events/${id}`,
        method: 'get',
        params,
    })
}
export async function apiCreateEvent(data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/events`,
        method: 'post',
        data,
    })
}

export async function apiUpdateEvent(id, {...data }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/events/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteEvent(id) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/events/${id}`,
        method: 'delete'
    })
}

export async function apiGetEventSubscribers({id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/events/${id}/members`,
        method: 'get',
        params,
    })
}



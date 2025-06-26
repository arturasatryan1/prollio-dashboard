import ApiService from './ApiService'

export async function apiGetEventCalendar() {
    return ApiService.fetchDataWithAxios({
        url: '/dashboard/event-calendar',
        method: 'get',
    })
}

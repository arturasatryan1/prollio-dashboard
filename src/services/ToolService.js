import ApiService from './ApiService'

export async function apiSubmitToolSetup(data) {
    return ApiService.fetchDataWithAxios({
        url: `/tool/lead-bot/setup`,
        method: 'post',
        data,
    })
}
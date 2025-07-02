import ApiService from './ApiService'
export async function apiExpertContact(data) {
    return ApiService.fetchDataWithAxios({
        url: `/dashboard/contact`,
        method: 'post',
        data,
    })
}



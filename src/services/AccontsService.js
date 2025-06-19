import ApiService from './ApiService'

export async function apiGetSettingsProfile() {
    return await ApiService.fetchDataWithAxios({
        url: '/setting/profile',
        method: 'get',
    })
}

export async function apiGetSettingsNotification() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/notification',
        method: 'get',
    })
}

export async function apiGetSettingsBilling() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/billing',
        method: 'get',
    })
}

export async function apiGetSettingsIntergration() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/intergration',
        method: 'get',
    })
}

export async function apiGetRolesPermissionsUsers(params) {
    return ApiService.fetchDataWithAxios({
        url: '/rbac/users',
        method: 'get',
        params,
    })
}

export async function apiGetRolesPermissionsRoles() {
    return ApiService.fetchDataWithAxios({
        url: '/rbac/roles',
        method: 'get',
    })
}

export async function apiGetPricingPlans() {
    return ApiService.fetchDataWithAxios({
        url: '/pricing',
        method: 'get',
    })
}

export async function apiUpdateSettingProfile(data) {
    return ApiService.fetchDataWithAxios({
        url: '/setting/profile',
        method: 'put',
        data
    })
}
export async function apiUpdateSettingSecurityPassword(data) {
    return ApiService.fetchDataWithAxios({
        url: '/setting/security/password',
        method: 'put',
        data
    })
}

export async function apiUpdateSettingNotifications(data) {
    return ApiService.fetchDataWithAxios({
        url: '/setting/notifications',
        method: 'put',
        data
    })
}
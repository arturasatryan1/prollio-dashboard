import { lazy } from 'react'
// import { ADMIN, USER } from '@/constants/roles.constant'

const accountRoute = [
    {
        key: 'account.settings',
        path: `/account/settings`,
        component: lazy(() => import('@/views/accounts/Settings')),
        authority: [],
        meta: {
            header: {
                title: 'Profile',
            },
            pageContainerType: 'contained',
        },
    },
]

export default accountRoute

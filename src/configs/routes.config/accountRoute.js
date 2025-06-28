import { lazy } from 'react'
import {ADMIN, USER} from "@/constants/roles.constant.js";
// import { ADMIN, USER } from '@/constants/roles.constant'

const accountRoute = [
    {
        key: 'account.settings',
        path: `/settings/account`,
        component: lazy(() => import('@/views/accounts/Settings')),
        authority: [ADMIN, USER],
        meta: {
            // header: {
            //     title: 'Settings',
            // },
            pageContainerType: 'contained',
        },
    },
    {
        key: 'account.pricing',
        path: `/settings/pricing`,
        component: lazy(() => import('@/views/accounts/Pricing')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default accountRoute

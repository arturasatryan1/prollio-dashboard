import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const customerRoute = [
    {
        key: 'members.list',
        path: `/members`,
        component: lazy(
            () => import('@/views/customers/CustomerList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'members.list',
        path: `/members/:id`,
        component: lazy(
            () => import('@/views/customers/CustomerDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default customerRoute

import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const customerRoute = [
    {
        key: 'subscriber.list',
        path: `/subscribers`,
        component: lazy(
            () => import('@/views/customers/CustomerList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'subscriber.details',
        path: `/subscribers/:id`,
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

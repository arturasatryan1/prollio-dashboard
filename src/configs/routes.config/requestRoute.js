import { lazy } from 'react'
import { ADMIN } from '@/constants/roles.constant'

const requestRoute = [
    {
        key: 'requests.list',
        path: `/requests`,
        component: lazy(
            () => import('@/views/requests/RequestList/RequestList.jsx'),
        ),
        authority: [ADMIN],
    },
    {
        key: 'request.details',
        path: `/requests/:id`,
        component: lazy(
            () => import('@/views/requests/RequestDetails/RequestDetails.jsx'),
        ),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default requestRoute

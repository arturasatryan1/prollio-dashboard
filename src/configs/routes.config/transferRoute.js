import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const transferRoute = [
    {
        key: 'transfer.list',
        path: `/transfers`,
        component: lazy(
            () => import('@/views/transfers/TransferList/TransferList.jsx'),
        ),
        authority: [USER, ADMIN],
    },
]

export default transferRoute

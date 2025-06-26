import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const payoutRoute = [
    {
        key: 'payout.list',
        path: `/payouts`,
        component: lazy(
            () => import('@/views/payouts/PayoutList/PayoutList.jsx'),
        ),
        authority: [USER, ADMIN],
    },
]

export default payoutRoute

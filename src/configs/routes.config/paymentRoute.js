import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const paymentRoute = [
    {
        key: 'payment.list',
        path: `/payments`,
        component: lazy(
            () => import('@/views/payments/PaymentList/PaymentList.jsx'),
        ),
        authority: [USER, ADMIN],
    },
]

export default paymentRoute

import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const expertRoute = [
    {
        key: 'experts.list',
        path: `/experts`,
        component: lazy(
            () => import('@/views/experts/ExpertList'),
        ),
        authority: [ADMIN],
    },
    // {
    //     key: 'experts.edit',
    //     path: `/experts/edit/:id`,
    //     component: lazy(
    //         () => import('@/views/experts/CustomerEdit'),
    //     ),
    //     authority: [ADMIN],
    //     meta: {
    //         header: {
    //             title: 'Edit expert',
    //             description:
    //                 'Manage expert details.',
    //             contained: true,
    //         },
    //         footer: false,
    //     },
    // },
    // {
    //     key: 'concepts.customers.customerCreate',
    //     path: `${CONCEPTS_PREFIX_PATH}/customers/customer-create`,
    //     component: lazy(
    //         () => import('@/views/concepts/customers/CustomerCreate'),
    //     ),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         header: {
    //             title: 'Create customer',
    //             description:
    //                 'Manage customer details, track purchases, and update preferences easily.',
    //             contained: true,
    //         },
    //         footer: false,
    //     },
    // },
    {
        key: 'expert.details',
        path: `/experts/:id`,
        component: lazy(
            () => import('@/views/experts/ExpertDetails'),
        ),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default expertRoute

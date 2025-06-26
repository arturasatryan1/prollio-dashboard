import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const eventRoute = [
    {
        key: 'events.list',
        path: `/events`,
        component: lazy(
            () => import('@/views/events/EventList/EventList.jsx'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'events.list',
        path: `/events/:id`,
        component: lazy(
            () => import('@/views/events/EventDetails/EventDetails.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'events.list',
        path: `/events/create`,
        component: lazy(
            () => import('@/views/events/EventCreate/EventCreate.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'events.list',
        path: `/events/:id/edit`,
        component: lazy(
            () => import('@/views/events/EventEdit/EventEdit.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default eventRoute

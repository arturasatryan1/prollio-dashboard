import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const calendarRoute = [
    {
        key: 'calendar',
        path: `/calendar`,
        component: lazy(
            () => import('@/views/calendar/Calendar/Calendar.jsx'),
        ),
        authority: [ADMIN, USER],
    },
]

export default calendarRoute

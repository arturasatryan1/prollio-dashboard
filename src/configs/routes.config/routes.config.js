import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import accountRoute from './accountRoute.js'
import expertRoute from "./expertRoute.js";
import customerRoute from "./customerRoute.js";

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'overview',
        path: '/overview',
        component: lazy(() => import('@/views/overview/Overview.jsx')),
        authority: [],
    },
    {
        key: 'channels',
        path: '/channels',
        component: lazy(() => import('@/views/channels/Channel.jsx')),
        authority: [],
    },
    ...accountRoute,
    ...expertRoute,
    ...customerRoute,
    ...othersRoute,
]

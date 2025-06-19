import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import accountRoute from './accountRoute.js'
import expertRoute from "./expertRoute.js";
import customerRoute from "./customerRoute.js";
import requestRoute from "@/configs/routes.config/requestRoute.js";
import channelRoute from "@/configs/routes.config/channelRoute.js";

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'overview',
        path: '/overview',
        component: lazy(() => import('@/views/overview/Overview.jsx')),
        authority: [],
    },
    ...channelRoute,
    ...accountRoute,
    ...expertRoute,
    ...customerRoute,
    ...requestRoute,
    ...othersRoute,
]

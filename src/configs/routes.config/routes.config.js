import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import accountRoute from './accountRoute.js'
import expertRoute from "./expertRoute.js";
import customerRoute from "./customerRoute.js";
import requestRoute from "@/configs/routes.config/requestRoute.js";
import channelRoute from "@/configs/routes.config/channelRoute.js";
import calendarRoute from "@/configs/routes.config/calendarRoute.js";
import eventRoute from "@/configs/routes.config/eventRoute.js";
import paymentRoute from "@/configs/routes.config/paymentRoute.js";
import toolRoute from "@/configs/routes.config/toolRoute.js";

export const publicRoutes = [
    {
        key: 'terms',
        path: `/terms`,
        component: lazy(() => import('@/views/terms/Terms')),
    },
    {
        key: 'checkout',
        path: `/checkout`,
        component: lazy(() => import('@/views/checkout/Checkout')),
    },
    ...authRoute
]

export const protectedRoutes = [
    {
        key: 'overview',
        path: '/overview',
        component: lazy(() => import('@/views/overview/Overview.jsx')),
        authority: [],
    },
    {
        key: 'messages',
        path: '/messages',
        component: lazy(() => import('@/views/chat/Chat/Chat.jsx')),
        authority: [],
    },
    {
        key: 'faq',
        path: '/support/faq',
        component: lazy(() => import('@/views/faq/Faq/Faq.jsx')),
        authority: [],
    },
    {
        key: 'contactUs',
        path: '/support/contact-us',
        component: lazy(() => import('@/views/contactUs/ContactUs/ContactUs.jsx')),
        authority: [],
    },
    {
        key: 'guide',
        path: '/support/guide',
        component: lazy(() => import('@/views/guide/Guide.jsx')),
        authority: [],
    },
    ...channelRoute,
    ...eventRoute,
    ...accountRoute,
    ...expertRoute,
    ...customerRoute,
    ...requestRoute,
    ...calendarRoute,
    ...paymentRoute,
    ...toolRoute,
    ...othersRoute,
]

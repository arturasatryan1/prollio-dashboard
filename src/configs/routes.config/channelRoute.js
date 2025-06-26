import { lazy } from 'react'
import {ADMIN, USER} from '@/constants/roles.constant'

const channelRoute = [
    {
        key: 'channels.list',
        path: `/channels`,
        component: lazy(
            () => import('@/views/channels/ChannelList/ChannelList.jsx'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'channels.list',
        path: `/channels/:id`,
        component: lazy(
            () => import('@/views/channels/ChannelDetails/ChannelDetails.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'channels.list',
        path: `/channels/create`,
        component: lazy(
            () => import('@/views/channels/ChannelCreate/ChannelCreate.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'channels.list',
        path: `/channels/:id/edit`,
        component: lazy(
            () => import('@/views/channels/ChannelEdit/ChannelEdit.jsx'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default channelRoute

import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import {ADMIN, USER} from "@/constants/roles.constant.js";

const navigationConfig = [
    {
        key: 'dashboard',
        path: '',
        title: 'Dashboard',
        translateKey: 'nav.dashboard.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'dashboard.overview',
                path: `/overview`,
                title: 'Overview',
                translateKey: 'nav.dashboard.overview',
                icon: 'overview',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'experts.list',
                path: '/experts',
                title: 'Experts',
                translateKey: 'nav.dashboard.experts',
                icon: 'experts',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'subscribers.list',
                path: '/subscribers',
                title: 'Subscribers',
                translateKey: 'nav.dashboard.subscribers',
                icon: 'users',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'channels.list',
                path: '/channels',
                title: 'Channels',
                translateKey: 'nav.dashboard.channels',
                icon: 'channel',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'calendar',
                path: '/calendar',
                title: 'Event Calendar',
                translateKey: 'nav.dashboard.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'earnings',
                path: '/earnings',
                title: 'Earnings',
                translateKey: 'nav.dashboard.earnings',
                icon: 'dollar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'requests.list',
                path: '/requests',
                title: 'Requests',
                translateKey: 'nav.dashboard.requests',
                icon: 'requests',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ]
    },
    // {
    //     key: 'account',
    //     path: '',
    //     title: 'Account',
    //     translateKey: 'nav.account.account',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     meta: {
    //         horizontalMenu: {
    //             layout: 'default',
    //         },
    //     },
    //     subMenu: [
    //         {
    //             key: 'settings',
    //             path: '',
    //             title: 'Settings',
    //             translateKey: 'nav.settings.title',
    //             icon: 'setting',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'settings.profile',
    //                     path: '/settings/profile',
    //                     title: 'Profile',
    //                     translateKey: 'nav.settings.profile',
    //                     icon: 'profile',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'settings.billing',
    //                     path: '/settings/billing',
    //                     title: 'Billing & Payout',
    //                     translateKey: 'nav.settings.billing',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ]
    // },
    {
        key: 'support',
        path: '',
        title: 'Support',
        translateKey: 'nav.support.support',
        icon: 'support',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'support',
                path: '/support',
                title: 'Contact Us',
                translateKey: 'nav.support',
                icon: 'support',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'support',
                path: '/support',
                title: 'FAQ',
                translateKey: 'nav.support',
                icon: 'question',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            }
        ]
    },
]

export default navigationConfig

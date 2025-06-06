import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

const navigationConfig = [
    {
        key: 'dashboard',
        path: '',
        title: 'Dashboard',
        translateKey: 'nav.dashboard.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'home',
                path: '/home',
                title: 'Home',
                translateKey: 'nav.dashboard',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'channels',
                path: '/channels',
                title: 'My Channels',
                translateKey: 'nav.channels',
                icon: 'channel',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'calendar',
                path: '/calendar',
                title: 'Calendar',
                translateKey: 'nav.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'subscribers',
                path: '/subscribers',
                title: 'Subscribers',
                translateKey: 'nav.subscribers',
                icon: 'users',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'earnings',
                path: '/earnings',
                title: 'Earnings',
                translateKey: 'nav.earnings',
                icon: 'dollar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ]
    },
    {
        key: 'configuration',
        path: '',
        title: 'Configuration',
        translateKey: 'nav.configuration.configuration',
        icon: 'configuration',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'settings',
                path: '',
                title: 'Account Settings',
                translateKey: 'nav.settings.title',
                icon: 'setting',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'settings.profile',
                        path: '/settings/profile',
                        title: 'Profile',
                        translateKey: 'nav.settings.profile',
                        icon: 'profile',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'settings.billing',
                        path: '/settings/billing',
                        title: 'Billing & Payout',
                        translateKey: 'nav.settings.billing',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ]
    },
    {
        key: 'support',
        path: '',
        title: 'Support',
        translateKey: 'nav.support.support',
        icon: 'support',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
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
                authority: [],
                subMenu: [],
            },
            {
                key: 'support',
                path: '/support',
                title: 'FAQ',
                translateKey: 'nav.support',
                icon: 'question',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }
        ]
    },
]

export default navigationConfig

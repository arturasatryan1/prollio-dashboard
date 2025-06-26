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
                key: 'overview',
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
                key: 'members.list',
                path: '/members',
                title: 'Members',
                translateKey: 'nav.dashboard.members',
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
                key: 'events.list',
                path: '/events',
                title: 'Events',
                translateKey: 'nav.dashboard.events',
                icon: 'event',
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
    {
        key: 'finance',
        path: '',
        title: 'Finance',
        translateKey: 'nav.dashboard.finance',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'finance.payments',
                path: '/payments',
                title: 'Payments',
                translateKey: 'nav.dashboard.payments',
                icon: 'coin',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'finance.payouts',
                path: '/payouts',
                title: 'Payouts',
                translateKey: 'nav.dashboard.payouts',
                icon: 'dollar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ]
    },
    {
        key: 'settings',
        path: '',
        title: 'Settings',
        translateKey: '',
        icon: 'settings',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'account.settings',
                path: `/settings/account`,
                title: 'Account',
                translateKey: '',
                icon: 'account',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsAccount.settingsDesc',
                        label: 'Configure your settings',
                    },
                },
                subMenu: [],
            },
            {
                key: 'account.pricing',
                path: `/settings/pricing`,
                title: 'Pricing',
                translateKey: 'nav.pricing',
                icon: 'pricing',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsAccount.pricingDesc',
                        label: 'View pricing plans',
                    },
                },
                subMenu: [],
            }
        ]
    },
    {
        key: 'support',
        path: '',
        title: 'Support',
        translateKey: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'contactUs',
                path: '/support/contact-us',
                title: 'Contact Us',
                translateKey: 'nav.contactUs',
                icon: 'support',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'faq',
                path: '/support/faq',
                title: 'FAQ',
                translateKey: 'nav.faq',
                icon: 'question',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            }
        ],
    },
]

export default navigationConfig

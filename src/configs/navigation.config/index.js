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
        translateKey: 'nav.dashboard',
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
                translateKey: 'nav.overview',
                icon: 'overview',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'experts.list',
                path: '/experts',
                title: 'Experts',
                translateKey: 'nav.experts',
                icon: 'experts',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'members.list',
                path: '/members',
                title: 'Members',
                translateKey: 'nav.members',
                icon: 'users',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'channels.list',
                path: '/channels',
                title: 'Channels',
                translateKey: 'nav.channels',
                icon: 'channel',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'events.list',
                path: '/events',
                title: 'Events',
                translateKey: 'nav.events',
                icon: 'event',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'calendar',
                path: '/calendar',
                title: 'Event Calendar',
                translateKey: 'nav.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'requests.list',
                path: '/requests',
                title: 'Requests',
                translateKey: 'nav.requests',
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
        translateKey: 'nav.finance',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'payment.list',
                path: '/payments',
                title: 'Payments',
                translateKey: 'nav.payments',
                icon: 'coin',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'payout.list',
                path: '/payouts',
                title: 'Payouts',
                translateKey: 'nav.payouts',
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
        translateKey: 'nav.settings',
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
                translateKey: 'nav.settings',
                icon: 'account',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                // meta: {
                //     description: {
                //         translateKey: 'nav.settings',
                //         label: 'Configure your settings',
                //     },
                // },
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
        translateKey: 'nav.support',
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

import { lazy } from 'react'

const requestRoute = [
    {
        key: 'tools',
        path: '/tools',
        component: lazy(() => import('@/views/tools/Tools/Tools.jsx')),
        authority: [],
    },
    {
        key: 'lead_bot.setup',
        path: '/tools/lead-bot/setup',
        component: lazy(() => import('@/views/tools/Tools/lead-bot/LeadBotSetup.jsx')),
        authority: [],
    },
]

export default requestRoute

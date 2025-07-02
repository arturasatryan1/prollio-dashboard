export const getOverviewSteps = (t) => [
    {
        selector: '.overview-period-selector',
        content: t('Choose a time range (daily, weekly, monthly) to view your stats.'),
    },
    {
        selector: '.overview-chart',
        content: t('Here you can see how your revenue and engagement trends over time.'),
    },
    {
        selector: '.overview-metrics',
        content: t('Quick glance at key stats like members and visitors.'),
    },
    {
        selector: '.upcoming-events-card',
        content: t('These are your upcoming events. Make sure everything is scheduled properly.'),
    },
]

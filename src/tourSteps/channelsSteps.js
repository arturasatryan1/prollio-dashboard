export const getChannelsSteps = (t) => [
    {
        selector: '.create-channel-btn',
        content: t('Click here to create a new channel'),
    },
    {
        selector: '.channel-search-input',
        content: t('Use this search bar to find a channel by name, description quickly.'),
    },
    // {
    //     selector: '.channel-filter-btn',
    //     content: t('Filter your channels by status, activity, or other criteria.'),
    // },
    // {
    //     selector: '.channel-list',
    //     content: t('All your connected Telegram channels will appear here. Manage or view details anytime.'),
    // },
]
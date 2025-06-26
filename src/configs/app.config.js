const appConfig = {
    apiPrefix: import.meta.env.VITE_API_PREFIX || '/api',
    authenticatedEntryPath: '/overview',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: true,
}

export default appConfig

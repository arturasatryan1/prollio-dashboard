import appConfig from '@/configs/app.config'
import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import i18n from 'i18next'
import {dateLocales} from '@/locales'
import dayjs from 'dayjs'

export const useLocaleStore = create()(
    devtools(
        persist(
            (set) => ({
                currentLang: appConfig.locale,
                setLang: async (lang) => {
                    const formattedLang = lang.replace(
                        /-([a-z])/g,
                        function (g) {
                            return g[1].toUpperCase()
                        },
                    )

                    await i18n.changeLanguage(formattedLang)
                    await dateLocales[formattedLang]().then(() => {
                        dayjs.locale(formattedLang === 'hy' ? 'hy-am' : formattedLang)
                    })

                    return set({currentLang: lang})
                },
            }),
            {
                name: 'locale',
                onRehydrateStorage: () => async (state) => {
                    const lang = state?.currentLang
                    if (lang) {
                        await state.setLang(lang)
                    }
                }
            },
        ),
    ),
)

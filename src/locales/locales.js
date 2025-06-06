import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import hy from './lang/hy.json'
import appConfig from '@/configs/app.config'

const resources = {
    en: {
        translation: en,
    },
    hy: {
        translation: hy,
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: appConfig.locale,
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
}

export default i18n

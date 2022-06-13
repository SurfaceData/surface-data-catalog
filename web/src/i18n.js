import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import locale files here.
import en_admin from './locales/en/admin.json'
import en_auth from './locales/en/auth.json'
import en_layouts from './locales/en/layouts.json'
import en_translations from './locales/en/translation.json'
import fr_admin from './locales/fr/admin.json'
import fr_auth from './locales/fr/auth.json'
import fr_layouts from './locales/fr/layouts.json'
import fr_translations from './locales/fr/translation.json'

// This is a simple i18n configuration with English and French translations.
// You can find the translations in web/src/locales/{language}.json
// see: https://react.i18next.com
// Here's an example of how to use it in your components, pages or layouts:
/*
import { Link, routes } from '@redwoodjs/router'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  return (
    <>
      <h1>{t('HomePage.title')}</h1>
      <button onClick={() => i18n.changeLanguage('fr')}>fr</button>
      <button onClick={() => i18n.changeLanguage('en')}>en</button>
      <p>
        {t('HomePage.info')} <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        {t('HomePage.route')} <code>home</code>, {t('HomePage.link')}`
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
*/

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    resources: {
      en: {
        admin: en_admin,
        auth: en_auth,
        layouts: en_layouts,
        translation: en_translations,
      },
      fr: {
        admin: fr_admin,
        auth: fr_auth,
        layouts: fr_layouts,
        translation: fr_translations,
      },
    },
  })
export default i18n

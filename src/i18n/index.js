// eslint-disable import/no-unresolved
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';
import ko from '@/i18n/locales/ko.json';
import en from '@/i18n/locales/en.json';

// locale: 브라우저 설정 언어
const navLang =
  sessionStorage.getItem('lang') || navigator.language.substring(0, 2);

// fallbackLocale: 브라우저 설정 언어가 'ko'일 경우 'en', 아닐 경우 'ko'
const langSwitch = () => {
  if (navLang === 'ko') return 'en';
  return 'ko';
};

const i18n = createI18n({
  legacy: false,
  locale: navLang,
  fallbackLocale: langSwitch(),
  messages: {
    ko: {
      ...ko,
      fields: ko.fields,
      validation: ko.validation,
      menu: ko.menu
    },
    en: {
      ...en,
      fields: en.fields,
      validation: en.validation,
      menu: en.menu
    }
  }
});

export const menuNameLang = computed(() => {
  if (navLang === 'ko') {
    return 'menuNameKr';
  }
  if (navLang === 'en') {
    return 'menuNameEn';
  }
  return 'menuNameEn';
});

export default i18n;

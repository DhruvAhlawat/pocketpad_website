/**
 * Languages the website is translated into. English is the source and lives at
 * /apps/pocketpad/. Every other language gets its own folder at the site root (/ja/, /ko/, ...).
 *
 * code:     folder name and the value stored when someone picks a language
 * hreflang: value for <link rel="alternate" hreflang> (what Google matches searchers against)
 * htmlLang: value for <html lang>
 * playHl:   Google Play "hl" parameter so the store listing opens in the same language
 * ogLocale: Open Graph locale
 * name:     the language's own name, shown in the language menu
 * dir:      "rtl" for right-to-left scripts
 */
export const sourceLanguage = {
  code: "en",
  hreflang: "en",
  htmlLang: "en",
  playHl: "en",
  ogLocale: "en_US",
  name: "English",
  dir: "ltr",
};

export const languages = [
  { code: "ja", hreflang: "ja", htmlLang: "ja", playHl: "ja", ogLocale: "ja_JP", name: "日本語", dir: "ltr" },
  { code: "ko", hreflang: "ko", htmlLang: "ko", playHl: "ko", ogLocale: "ko_KR", name: "한국어", dir: "ltr" },
  { code: "zh-hans", hreflang: "zh-Hans", htmlLang: "zh-Hans", playHl: "zh-CN", ogLocale: "zh_CN", name: "简体中文", dir: "ltr" },
  { code: "zh-hant", hreflang: "zh-Hant", htmlLang: "zh-Hant", playHl: "zh-TW", ogLocale: "zh_TW", name: "繁體中文", dir: "ltr" },
  { code: "ru", hreflang: "ru", htmlLang: "ru", playHl: "ru", ogLocale: "ru_RU", name: "Русский", dir: "ltr" },
  { code: "fr", hreflang: "fr", htmlLang: "fr", playHl: "fr", ogLocale: "fr_FR", name: "Français", dir: "ltr" },
  { code: "es", hreflang: "es", htmlLang: "es-419", playHl: "es-419", ogLocale: "es_LA", name: "Español", dir: "ltr" },
  { code: "pt-br", hreflang: "pt", htmlLang: "pt-BR", playHl: "pt-BR", ogLocale: "pt_BR", name: "Português (Brasil)", dir: "ltr" },
  { code: "id", hreflang: "id", htmlLang: "id", playHl: "id", ogLocale: "id_ID", name: "Bahasa Indonesia", dir: "ltr" },
  { code: "vi", hreflang: "vi", htmlLang: "vi", playHl: "vi", ogLocale: "vi_VN", name: "Tiếng Việt", dir: "ltr" },
  { code: "th", hreflang: "th", htmlLang: "th", playHl: "th", ogLocale: "th_TH", name: "ไทย", dir: "ltr" },
  { code: "de", hreflang: "de", htmlLang: "de", playHl: "de", ogLocale: "de_DE", name: "Deutsch", dir: "ltr" },
  { code: "tr", hreflang: "tr", htmlLang: "tr", playHl: "tr", ogLocale: "tr_TR", name: "Türkçe", dir: "ltr" },
  { code: "hi", hreflang: "hi", htmlLang: "hi", playHl: "hi", ogLocale: "hi_IN", name: "हिन्दी", dir: "ltr" },
  { code: "ar", hreflang: "ar", htmlLang: "ar", playHl: "ar", ogLocale: "ar_AR", name: "العربية", dir: "rtl" },
];

export const allLanguages = [sourceLanguage, ...languages];

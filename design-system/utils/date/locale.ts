export type Locale =
    | 'de-DE'
    | 'de-AT'
    | 'de-CH'
    | 'en-US'
    | 'en-GB'
    | 'en-CH'
    | 'en-IN'
    | 'en-SG'
    | 'es-ES'
    | 'fr-FR'
    | 'fr-CH'
    | 'it-IT'
    | 'it-CH'
    | 'zh-CN'
    | 'ru-RU'
    | 'tr-TR'
    | 'da-DK';

export const LANGUAGES = ['en', 'de', 'es', 'fr', 'it', 'zh', 'ru', 'tr', 'da'] as const;
export type Language = (typeof LANGUAGES)[number];

const CANONICAL: Record<string, Locale> = {
    de: 'de-DE',
    'de-de': 'de-DE',
    de_at: 'de-AT',
    'de-at': 'de-AT',
    de_ch: 'de-CH',
    'de-ch': 'de-CH',
    en: 'en-US',
    'en-us': 'en-US',
    en_us: 'en-US',
    'en-gb': 'en-GB',
    en_gb: 'en-GB',
    'en-ch': 'en-CH',
    en_ch: 'en-CH',
    'en-in': 'en-IN',
    en_in: 'en-IN',
    'en-sg': 'en-SG',
    en_sg: 'en-SG',

    es: 'es-ES',
    'es-es': 'es-ES',
    es_es: 'es-ES',

    fr: 'fr-FR',
    'fr-fr': 'fr-FR',
    fr_fr: 'fr-FR',
    'fr-ch': 'fr-CH',
    fr_ch: 'fr-CH',

    it: 'it-IT',
    'it-it': 'it-IT',
    it_it: 'it-IT',
    'it-ch': 'it-CH',
    it_ch: 'it-CH',

    zh: 'zh-CN',
    'zh-cn': 'zh-CN',
    zh_cn: 'zh-CN',

    ru: 'ru-RU',
    'ru-ru': 'ru-RU',
    ru_ru: 'ru-RU',

    tr: 'tr-TR',
    'tr-tr': 'tr-TR',
    tr_tr: 'tr-TR',

    da: 'da-DK',
    'da-dk': 'da-DK',
    da_dk: 'da-DK',
    dansk: 'da-DK',
};

export function normalizeLocale(loc?: string): Locale {
    const key = (loc || 'en-US').trim().replace(/\s+/g, '').toLowerCase().replace('_', '-');
    return CANONICAL[key] || 'en-US';
}

export function languageOf(locale?: string): Language {
    const loc = normalizeLocale(locale);
    const lang = loc.split('-')[0];
    if (LANGUAGES.includes(lang as Language)) return lang as Language;
    return 'en';
}

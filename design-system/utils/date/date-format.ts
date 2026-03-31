import type { Locale } from './locale.js';
import { languageOf, normalizeLocale } from './locale.js';

function validYMD(y: number, m: number, d: number): boolean {
    if (y < 1900 || y > 2100) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export type DateOrder = 'DMY_DOT' | 'DMY_SLASH' | 'MDY_SLASH' | 'YMD_SLASH';

const dateOrderByLocale: Record<Locale, DateOrder> = {
    'de-DE': 'DMY_DOT',
    'de-AT': 'DMY_DOT',
    'de-CH': 'DMY_SLASH',

    'en-US': 'MDY_SLASH',
    'en-GB': 'DMY_SLASH',
    'en-CH': 'DMY_SLASH',
    'en-IN': 'DMY_SLASH',
    'en-SG': 'DMY_SLASH',

    'es-ES': 'DMY_SLASH',
    'fr-FR': 'DMY_SLASH',
    'fr-CH': 'DMY_SLASH',
    'it-IT': 'DMY_SLASH',
    'it-CH': 'DMY_SLASH',
    'da-DK': 'DMY_SLASH',

    'zh-CN': 'YMD_SLASH',
    'ru-RU': 'DMY_DOT',
    'tr-TR': 'DMY_DOT',
};

export function getDateOrder(locale?: string): DateOrder {
    const loc = normalizeLocale(locale);
    return dateOrderByLocale[loc];
}

export function getDateSeparator(locale?: string): '.' | '/' {
    const order = getDateOrder(locale);
    return order === 'DMY_DOT' ? '.' : '/';
}

export function formatDateByLocale(d: Date, locale?: string): string {
    const loc = normalizeLocale(locale);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const order = dateOrderByLocale[loc];

    if (order === 'DMY_DOT') return `${dd}.${mm}.${yyyy}`;
    if (order === 'DMY_SLASH') return `${dd}/${mm}/${yyyy}`;
    if (order === 'YMD_SLASH') return `${yyyy}/${mm}/${dd}`;
    return `${mm}/${dd}/${yyyy}`;
}

export function parseByLocale(s: string | null | undefined, locale?: string): Date | undefined {
    if (!s) return undefined;
    const t = s.trim();
    if (!t) return undefined;

    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
        const [y, m, d] = t.split('-').map(Number);
        if (!validYMD(y!, m!, d!)) return undefined;
        return new Date(y!, m! - 1, d!);
    }

    const loc = normalizeLocale(locale);
    const order = dateOrderByLocale[loc];

    if (order === 'DMY_DOT') {
        const m = t.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
        if (!m) return undefined;
        const dd = Number(m[1]),
            mm = Number(m[2]),
            yyyy = Number(m[3]);
        if (!validYMD(yyyy, mm, dd)) return undefined;
        return new Date(yyyy, mm - 1, dd);
    }

    if (order === 'DMY_SLASH') {
        const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!m) return undefined;
        const dd = Number(m[1]),
            mm = Number(m[2]),
            yyyy = Number(m[3]);
        if (!validYMD(yyyy, mm, dd)) return undefined;
        return new Date(yyyy, mm - 1, dd);
    }

    if (order === 'YMD_SLASH') {
        const m = t.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
        if (!m) return undefined;
        const yyyy = Number(m[1]),
            mm = Number(m[2]),
            dd = Number(m[3]);
        if (!validYMD(yyyy, mm, dd)) return undefined;
        return new Date(yyyy, mm - 1, dd);
    }

    {
        const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!m) return undefined;
        const mm = Number(m[1]),
            dd = Number(m[2]),
            yyyy = Number(m[3]);
        if (!validYMD(yyyy, mm, dd)) return undefined;
        return new Date(yyyy, mm - 1, dd);
    }
}

export function getDatePlaceholder(locale?: string) {
    const loc = normalizeLocale(locale);
    const order = dateOrderByLocale[loc];
    const lang = languageOf(loc);

    if (order === 'YMD_SLASH') return 'YYYY/MM/DD';

    if (order === 'DMY_DOT') {
        if (lang === 'de') return 'TT.MM.JJJJ';
        if (lang === 'ru') return 'DD.ММ.YYYY';
        if (lang === 'tr') return 'GG.AA.YYYY';
        return 'DD.MM.YYYY';
    }

    if (order === 'DMY_SLASH') {
        if (lang === 'de') return 'TT/MM/JJJJ';
        if (lang === 'fr') return 'JJ/MM/AAAA';
        if (lang === 'it') return 'GG/MM/AAAA';
        if (lang === 'es') return 'DD/MM/AAAA';
        return 'DD/MM/YYYY';
    }

    return 'MM/DD/YYYY';
}

export function getDatePattern(locale?: string): string {
    const year = '(19\\d{2}|20\\d{2}|2100)';
    const day = '(0[1-9]|[12][0-9]|3[01])';
    const month = '(0[1-9]|1[0-2])';
    const loc = normalizeLocale(locale);
    const order = dateOrderByLocale[loc];
    if (order === 'DMY_DOT') return `^${day}\\.${month}\\.${year}$`;
    if (order === 'DMY_SLASH') return `^${day}\\/${month}\\/${year}$`;
    if (order === 'YMD_SLASH') return `^${year}\\/${month}\\/${day}$`;
    return `^${month}\\/${day}\\/${year}$`;
}

/**
 * No formatting/masking.
 * Only enforce allowed characters based on locale:
 * - digits
 * - locale separator ('.' for DMY_DOT locales, otherwise '/')
 *
 * This function is intended to be used on @input to sanitize paste/IME.
 */
export function maskDateInput(value: string, locale?: string): string {
    const loc = normalizeLocale(locale);
    const order = dateOrderByLocale[loc];
    const sep: '.' | '/' = order === 'DMY_DOT' ? '.' : '/';

    // normalize unicode digits etc.
    const raw = (value ?? '').normalize('NFKC');

    // keep only digits + locale separator
    const cleaned = raw.replace(new RegExp(`[^0-9\\${sep}]`, 'g'), '');

    // hard max length
    return cleaned.slice(0, 10);
}

export function formatISODate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

const shortMonthsByLang: Record<ReturnType<typeof languageOf>, string[]> = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    it: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    da: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
};

export function formatShortRangeDate(d: Date, locale?: string): string {
    const lang = languageOf(locale);
    const m = shortMonthsByLang[lang][d.getMonth()];
    return `${m} ${d.getDate()}`;
}

export function formatShortRange(start?: Date, end?: Date, locale?: string): string {
    if (!start) return '';
    const loc = normalizeLocale(locale);
    if (!end) return `${formatShortRangeDate(start, loc)} -`;
    const sameYear = start.getFullYear() === end.getFullYear();
    if (sameYear) return `${formatShortRangeDate(start, loc)} - ${formatShortRangeDate(end, loc)}`;
    const s = `${formatShortRangeDate(start, loc)} ${start.getFullYear()}`;
    const e = `${formatShortRangeDate(end, loc)} ${end.getFullYear()}`;
    return `${s} - ${e}`;
}

export function formatToISO(input: string, locale?: string): string {
    const d = parseByLocale(input, locale);
    if (!d) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

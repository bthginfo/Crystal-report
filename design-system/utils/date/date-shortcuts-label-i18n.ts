import type { CalendarLocale } from './calendar-i18n.js';
import { languageOf, normalizeLocale } from './locale.js';

type Lang = ReturnType<typeof languageOf>;

const shortcutByLang: Record<Lang, Record<number, string>> = {
    en: {
        0: 'This week',
        1: 'Next week',
        2: 'Next 2 weeks',
        3: 'Next 3 weeks',
        4: 'Next 4 weeks',
        5: 'This month',
        6: 'Next month',
    },
    de: {
        0: 'Diese Woche',
        1: 'Nächste Woche',
        2: 'Nächste 2 Wochen',
        3: 'Nächste 3 Wochen',
        4: 'Nächste 4 Wochen',
        5: 'Diesen Monat',
        6: 'Nächsten Monat',
    },
    es: {
        0: 'Esta semana',
        1: 'Próxima semana',
        2: 'Próximas 2 semanas',
        3: 'Próximas 3 semanas',
        4: 'Próximas 4 semanas',
        5: 'Este mes',
        6: 'Próximo mes',
    },
    fr: {
        0: 'Cette semaine',
        1: 'La semaine prochaine',
        2: 'Les 2 prochaines semaines',
        3: 'Les 3 prochaines semaines',
        4: 'Les 4 prochaines semaines',
        5: 'Ce mois-ci',
        6: 'Le mois prochain',
    },
    it: {
        0: 'Questa settimana',
        1: 'Prossima settimana',
        2: 'Prossime 2 settimane',
        3: 'Prossime 3 settimane',
        4: 'Prossime 4 settimane',
        5: 'Questo mese',
        6: 'Il prossimo mese',
    },
    zh: {
        0: '本周',
        1: '下周',
        2: '未来两周',
        3: '未来三周',
        4: '未来四周',
        5: '本月',
        6: '下个月',
    },
    ru: {
        0: 'Эта неделя',
        1: 'Следующая неделя',
        2: 'Следующие 2 недели',
        3: 'Следующие 3 недели',
        4: 'Следующие 4 недели',
        5: 'Этот месяц',
        6: 'Следующий месяц',
    },
    tr: {
        0: 'Bu hafta',
        1: 'Gelecek hafta',
        2: 'Gelecek 2 hafta',
        3: 'Gelecek 3 hafta',
        4: 'Gelecek 4 hafta',
        5: 'Bu ay',
        6: 'Gelecek ay',
    },
    da: {
        0: 'Denne uge',
        1: 'Næste uge',
        2: 'Næste 2 uger',
        3: 'Næste 3 uger',
        4: 'Næste 4 uger',
        5: 'Denne måned',
        6: 'Næste måned',
    },
};

export function getShortcutLabel(locale: string | undefined, index: number): string | undefined {
    const loc = normalizeLocale(locale) as CalendarLocale;
    const lang = languageOf(loc);
    return shortcutByLang[lang]?.[index];
}

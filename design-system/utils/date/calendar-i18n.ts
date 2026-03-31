import type { Locale } from './locale.js';
import { languageOf, normalizeLocale } from './locale.js';

export type CalendarLocale = Locale;

export type CalendarErrorRule =
    | 'required'
    | 'invalidDate'
    | 'minDate'
    | 'maxDate'
    | 'minYear'
    | 'maxYear'
    | 'disabledDate'
    | 'disablePast'
    | 'disableFuture'
    | 'startAfterEnd'
    | 'endBeforeStart';

type Lang = ReturnType<typeof languageOf>;

const calendarText: Record<Lang, { monthsShort: string[]; months: string[]; weekdaysShort: string[] }> = {
    en: {
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    de: {
        months: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember',
        ],
        monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    },
    es: {
        months: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysShort: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    },
    fr: {
        months: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
        ],
        monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        weekdaysShort: ['DI', 'LU', 'MA', 'ME', 'JE', 'VE', 'SA'],
    },
    it: {
        months: [
            'Gennaio',
            'Febbraio',
            'Marzo',
            'Aprile',
            'Maggio',
            'Giugno',
            'Luglio',
            'Agosto',
            'Settembre',
            'Ottobre',
            'Novembre',
            'Dicembre',
        ],
        monthsShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        weekdaysShort: ['DO', 'LU', 'MA', 'ME', 'GI', 'VE', 'SA'],
    },
    zh: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
    },
    ru: {
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        weekdaysShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    },
    tr: {
        months: [
            'Ocak',
            'Şubat',
            'Mart',
            'Nisan',
            'Mayıs',
            'Haziran',
            'Temmuz',
            'Ağustos',
            'Eylül',
            'Ekim',
            'Kasım',
            'Aralık',
        ],
        monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        weekdaysShort: ['PA', 'PT', 'SA', 'ÇA', 'PE', 'CU', 'CT'],
    },
    da: {
        months: [
            'Januar',
            'Februar',
            'Marts',
            'April',
            'Maj',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'December',
        ],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        weekdaysShort: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
    },
};

export function normalizeKey(locale?: string): CalendarLocale {
    return normalizeLocale(locale);
}

export function getCalendarLocale(locale?: string) {
    return calendarText[languageOf(locale)];
}

const errorByLang: Record<Lang, Record<CalendarErrorRule, (p?: Record<string, string | number>) => string>> = {
    en: {
        required: () => 'This field is required.',
        invalidDate: () => 'Enter a valid date.',
        minDate: p => `Date must be on or after ${p?.minDate}.`,
        maxDate: p => `Date must be on or before ${p?.maxDate}.`,
        minYear: p => `Year must be ≥ ${p?.minYear}.`,
        maxYear: p => `Year must be ≤ ${p?.maxYear}.`,
        disabledDate: () => 'This date is not allowed.',
        disablePast: () => 'Dates before today are not allowed.',
        disableFuture: () => 'Dates after today are not allowed.',
        startAfterEnd: () => 'Start date must be before or equal to end date.',
        endBeforeStart: () => 'End date must be after or equal to start date.',
    },
    de: {
        required: () => 'Dieses Feld ist erforderlich.',
        invalidDate: () => 'Bitte ein gültiges Datum eingeben.',
        minDate: p => `Datum muss am oder nach dem ${p?.minDate} liegen.`,
        maxDate: p => `Datum muss am oder vor dem ${p?.maxDate} liegen.`,
        minYear: p => `Jahr muss ≥ ${p?.minYear} sein.`,
        maxYear: p => `Jahr muss ≤ ${p?.maxYear} sein.`,
        disabledDate: () => 'Dieses Datum ist nicht erlaubt.',
        disablePast: () => 'Daten vor heute sind nicht erlaubt.',
        disableFuture: () => 'Daten nach heute sind nicht erlaubt.',
        startAfterEnd: () => 'Startdatum muss vor oder gleich dem Enddatum sein.',
        endBeforeStart: () => 'Enddatum muss nach oder gleich dem Startdatum sein.',
    },
    es: {
        required: () => 'Este campo es obligatorio.',
        invalidDate: () => 'Introduce una fecha válida.',
        minDate: p => `La fecha debe ser en o después de ${p?.minDate}.`,
        maxDate: p => `La fecha debe ser en o antes de ${p?.maxDate}.`,
        minYear: p => `El año debe ser ≥ ${p?.minYear}.`,
        maxYear: p => `El año debe ser ≤ ${p?.maxYear}.`,
        disabledDate: () => 'Esta fecha no está permitida.',
        disablePast: () => 'No se permiten fechas anteriores a hoy.',
        disableFuture: () => 'No se permiten fechas posteriores a hoy.',
        startAfterEnd: () => 'La fecha de inicio debe ser anterior o igual a la fecha de fin.',
        endBeforeStart: () => 'La fecha de fin debe ser posterior o igual a la fecha de inicio.',
    },
    fr: {
        required: () => 'Ce champ est obligatoire.',
        invalidDate: () => 'Saisissez une date valide.',
        minDate: p => `La date doit être le ${p?.minDate} ou après.`,
        maxDate: p => `La date doit être le ${p?.maxDate} ou avant.`,
        minYear: p => `L'année doit être ≥ ${p?.minYear}.`,
        maxYear: p => `L'année doit être ≤ ${p?.maxYear}.`,
        disabledDate: () => "Cette date n'est pas autorisée.",
        disablePast: () => "Les dates avant aujourd'hui ne sont pas autorisées.",
        disableFuture: () => "Les dates après aujourd'hui ne sont pas autorisées.",
        startAfterEnd: () => 'La date de début doit être antérieure ou égale à la date de fin.',
        endBeforeStart: () => 'La date de fin doit être postérieure ou égale à la date de début.',
    },
    it: {
        required: () => 'Questo campo è obbligatorio.',
        invalidDate: () => 'Inserisci una data valida.',
        minDate: p => `La data deve essere il ${p?.minDate} o successiva.`,
        maxDate: p => `La data deve essere il ${p?.maxDate} o precedente.`,
        minYear: p => `L'anno deve essere ≥ ${p?.minYear}.`,
        maxYear: p => `L'anno deve essere ≤ ${p?.maxYear}.`,
        disabledDate: () => 'Questa data non è consentita.',
        disablePast: () => 'Non sono consentite date precedenti a oggi.',
        disableFuture: () => 'Non sono consentite date successive a oggi.',
        startAfterEnd: () => 'La data di inizio deve essere anteriore o uguale alla data di fine.',
        endBeforeStart: () => 'La data di fine deve essere posteriore o uguale alla data di inizio.',
    },
    zh: {
        required: () => '此字段为必填项。',
        invalidDate: () => '请输入有效日期。',
        minDate: p => `日期不得早于${p?.minDate}。`,
        maxDate: p => `日期不得晚于${p?.maxDate}。`,
        minYear: p => `年份必须 ≥ ${p?.minYear}。`,
        maxYear: p => `年份必须 ≤ ${p?.maxYear}。`,
        disabledDate: () => '该日期不可用。',
        disablePast: () => '不允许今天之前的日期。',
        disableFuture: () => '不允许今天之后的日期。',
        startAfterEnd: () => '开始日期必须早于或等于结束日期。',
        endBeforeStart: () => '结束日期必须晚于或等于开始日期。',
    },
    ru: {
        required: () => 'Это обязательное поле.',
        invalidDate: () => 'Введите корректную дату.',
        minDate: p => `Дата должна быть не раньше ${p?.minDate}.`,
        maxDate: p => `Дата должна быть не позже ${p?.maxDate}.`,
        minYear: p => `Год должен быть ≥ ${p?.minYear}.`,
        maxYear: p => `Год должен быть ≤ ${p?.maxYear}.`,
        disabledDate: () => 'Эта дата недоступна.',
        disablePast: () => 'Даты до сегодняшнего дня недопустимы.',
        disableFuture: () => 'Даты после сегодняшнего дня недопустимы.',
        startAfterEnd: () => 'Дата начала должна быть раньше или равна дате окончания.',
        endBeforeStart: () => 'Дата окончания должна быть позже или равна дате начала.',
    },
    tr: {
        required: () => 'Bu alan zorunludur.',
        invalidDate: () => 'Geçerli bir tarih girin.',
        minDate: p => `Tarih ${p?.minDate} veya sonrasında olmalıdır.`,
        maxDate: p => `Tarih ${p?.maxDate} veya öncesinde olmalıdır.`,
        minYear: p => `Yıl ≥ ${p?.minYear} olmalıdır.`,
        maxYear: p => `Yıl ≤ ${p?.maxYear} olmalıdır.`,
        disabledDate: () => 'Bu tarih kullanılamaz.',
        disablePast: () => 'Bugünden önceki tarihlere izin verilmez.',
        disableFuture: () => 'Bugünden sonraki tarihlere izin verilmez.',
        startAfterEnd: () => 'Başlangıç tarihi bitiş tarihinden önce veya ona eşit olmalıdır.',
        endBeforeStart: () => 'Bitiş tarihi başlangıç tarihinden sonra veya ona eşit olmalıdır.',
    },
    da: {
        required: () => 'Dette felt er påkrævet.',
        invalidDate: () => 'Angiv en gyldig dato.',
        minDate: p => `Datoen skal være på eller efter ${p?.minDate}.`,
        maxDate: p => `Datoen skal være på eller før ${p?.maxDate}.`,
        minYear: p => `Året skal være ≥ ${p?.minYear}.`,
        maxYear: p => `Året skal være ≤ ${p?.maxYear}.`,
        disabledDate: () => 'Denne dato er ikke tilladt.',
        disablePast: () => 'Datoer før i dag er ikke tilladt.',
        disableFuture: () => 'Datoer efter i dag er ikke tilladt.',
        startAfterEnd: () => 'Startdato skal være før eller lig med slutdato.',
        endBeforeStart: () => 'Slutdato skal være efter eller lig med startdato.',
    },
};

export function formatCalendarError(locale: string, rule: CalendarErrorRule, params?: Record<string, string | number>) {
    return errorByLang[languageOf(locale)][rule](params);
}

const buttonByLang: Record<Lang, { ok: string; cancel: string }> = {
    en: { ok: 'Ok', cancel: 'Cancel' },
    de: { ok: 'OK', cancel: 'Abbrechen' },
    es: { ok: 'Aceptar', cancel: 'Cancelar' },
    fr: { ok: 'OK', cancel: 'Annuler' },
    it: { ok: 'OK', cancel: 'Annulla' },
    zh: { ok: '确定', cancel: '取消' },
    ru: { ok: 'ОК', cancel: 'Отмена' },
    tr: { ok: 'Tamam', cancel: 'İptal' },
    da: { ok: 'OK', cancel: 'Annuller' },
};

export function getCalendarButtons(locale?: string) {
    return buttonByLang[languageOf(locale)];
}

const ariaByLang: Record<
    Lang,
    {
        previousMonth: string;
        nextMonth: string;
        openCalendar: string;
        selectMonth: string;
        selectYear: string;
        weekdays: string;
        calendarDateSelection: string;
        calendarIconStart: string;
        calendarIconEnd: string;
    }
> = {
    en: {
        previousMonth: 'Previous month',
        nextMonth: 'Next month',
        openCalendar: 'Open calendar',
        selectMonth: 'Select month',
        selectYear: 'Select year',
        weekdays: 'Weekdays',
        calendarDateSelection: 'Calendar date selection',
        calendarIconStart: 'Open calendar for start date',
        calendarIconEnd: 'Open calendar for end date',
    },
    de: {
        previousMonth: 'Vorheriger Monat',
        nextMonth: 'Nächster Monat',
        openCalendar: 'Kalender öffnen',
        selectMonth: 'Monat auswählen',
        selectYear: 'Jahr auswählen',
        weekdays: 'Wochentage',
        calendarDateSelection: 'Kalender-Datumsauswahl',
        calendarIconStart: 'Kalender für Startdatum öffnen',
        calendarIconEnd: 'Kalender für Enddatum öffnen',
    },
    es: {
        previousMonth: 'Mes anterior',
        nextMonth: 'Mes siguiente',
        openCalendar: 'Abrir calendario',
        selectMonth: 'Seleccionar mes',
        selectYear: 'Seleccionar año',
        weekdays: 'Días de la semana',
        calendarDateSelection: 'Selección de fecha del calendario',
        calendarIconStart: 'Abrir calendario para fecha de inicio',
        calendarIconEnd: 'Abrir calendario para fecha de fin',
    },
    fr: {
        previousMonth: 'Mois précédent',
        nextMonth: 'Mois suivant',
        openCalendar: 'Ouvrir le calendrier',
        selectMonth: 'Sélectionner le mois',
        selectYear: "Sélectionner l'année",
        weekdays: 'Jours de la semaine',
        calendarDateSelection: 'Sélection de date du calendrier',
        calendarIconStart: 'Ouvrir le calendrier pour la date de début',
        calendarIconEnd: 'Ouvrir le calendrier pour la date de fin',
    },
    it: {
        previousMonth: 'Mese precedente',
        nextMonth: 'Mese successivo',
        openCalendar: 'Apri calendario',
        selectMonth: 'Seleziona mese',
        selectYear: 'Seleziona anno',
        weekdays: 'Giorni della settimana',
        calendarDateSelection: 'Selezione data calendario',
        calendarIconStart: 'Apri calendario per la data di inizio',
        calendarIconEnd: 'Apri calendario per la data di fine',
    },
    zh: {
        previousMonth: '上个月',
        nextMonth: '下个月',
        openCalendar: '打开日历',
        selectMonth: '选择月份',
        selectYear: '选择年份',
        weekdays: '星期',
        calendarDateSelection: '日历日期选择',
        calendarIconStart: '打开开始日期日历',
        calendarIconEnd: '打开结束日期日历',
    },
    ru: {
        previousMonth: 'Предыдущий месяц',
        nextMonth: 'Следующий месяц',
        openCalendar: 'Открыть календарь',
        selectMonth: 'Выбрать месяц',
        selectYear: 'Выбрать год',
        weekdays: 'Дни недели',
        calendarDateSelection: 'Выбор даты в календаре',
        calendarIconStart: 'Открыть календарь для даты начала',
        calendarIconEnd: 'Открыть календарь для даты окончания',
    },
    tr: {
        previousMonth: 'Önceki ay',
        nextMonth: 'Sonraki ay',
        openCalendar: 'Takvimi aç',
        selectMonth: 'Ay seçin',
        selectYear: 'Yıl seçin',
        weekdays: 'Haftanın günleri',
        calendarDateSelection: 'Takvim tarih seçimi',
        calendarIconStart: 'Başlangıç tarihi için takvimi aç',
        calendarIconEnd: 'Bitiş tarihi için takvimi aç',
    },
    da: {
        previousMonth: 'Forrige måned',
        nextMonth: 'Næste måned',
        openCalendar: 'Åbn kalender',
        selectMonth: 'Vælg måned',
        selectYear: 'Vælg år',
        weekdays: 'Ugedage',
        calendarDateSelection: 'Kalender datovalg',
        calendarIconStart: 'Åbn kalender for startdato',
        calendarIconEnd: 'Åbn kalender for slutdato',
    },
};

export function getCalendarAriaLabels(locale?: string) {
    return ariaByLang[languageOf(locale)];
}

const rangeDialogByLang: Record<Lang, string> = {
    en: 'Selected date range',
    de: 'Ausgewählter Datumsbereich',
    es: 'Rango de fechas seleccionado',
    fr: 'Plage de dates sélectionnée',
    it: 'Intervallo di date selezionato',
    zh: '已选择的日期范围',
    ru: 'Выбранный диапазон дат',
    tr: 'Seçilen tarih aralığı',
    da: 'Valgt datointerval',
};

export function getRangeDialogLabels(locale?: string) {
    return rangeDialogByLang[languageOf(locale)];
}

export const fallbackLabels: Record<Lang, { start: string; end: string }> = {
    en: { start: 'Start date', end: 'End date' },
    de: { start: 'Startdatum', end: 'Enddatum' },
    es: { start: 'Fecha inicial', end: 'Fecha final' },
    fr: { start: 'Date de début', end: 'Date de fin' },
    it: { start: 'Data inizio', end: 'Data fine' },
    zh: { start: '开始日期', end: '结束日期' },
    ru: { start: 'Дата начала', end: 'Дата окончания' },
    tr: { start: 'Başlangıç tarihi', end: 'Bitiş tarihi' },
    da: { start: 'Startdato', end: 'Slutdato' },
};

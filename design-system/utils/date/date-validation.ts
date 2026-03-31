import { parseByLocale } from './date-format.js';
import { formatCalendarError } from './calendar-i18n.js';

export type DateValidationRule =
    | 'required'
    | 'invalidDate'
    | 'minDate'
    | 'maxDate'
    | 'minYear'
    | 'maxYear'
    | 'disabledDate'
    | 'disablePast'
    | 'disableFuture';

export interface DateValidationError {
    rule: DateValidationRule;
    message: string;
}

export interface DateValidationResult {
    valid: boolean;
    errors: DateValidationError[];
    date?: Date;
}

export interface DateValidationOptions {
    locale: string;
    required?: boolean;
    minDate?: string;
    maxDate?: string;
    minYear?: number;
    maxYear?: number;
    disableWeekend?: boolean;
    disableDates?: string[];
    disablePast?: boolean;
    disableFuture?: boolean;
}

const toStartOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const parse = (value: string, locale: string): Date | undefined => {
    const parsed = parseByLocale(value, locale);
    if (!parsed || Number.isNaN(parsed.getTime())) return undefined;
    const y = parsed.getFullYear();
    const m = parsed.getMonth();
    const day = parsed.getDate();
    const re = new Date(y, m, day);
    if (re.getFullYear() !== y || re.getMonth() !== m || re.getDate() !== day) return undefined;
    return re;
};

export async function validateDateValue(
    value: string | undefined,
    opts: DateValidationOptions,
): Promise<DateValidationResult> {
    const v = (value ?? '').trim();
    const errors: DateValidationError[] = [];
    if (opts.required && v === '') {
        errors.push({ rule: 'required', message: formatCalendarError(opts.locale, 'required') });
        return { valid: false, errors };
    }
    if (v === '') return { valid: true, errors: [] };

    const date = parse(v, opts.locale);
    if (!date) {
        errors.push({ rule: 'invalidDate', message: formatCalendarError(opts.locale, 'invalidDate') });
        return { valid: false, errors };
    }

    const y = date.getFullYear();
    if (typeof opts.minYear === 'number' && y < opts.minYear) {
        errors.push({
            rule: 'minYear',
            message: formatCalendarError(opts.locale, 'minYear', { minYear: opts.minYear }),
        });
    }
    if (typeof opts.maxYear === 'number' && y > opts.maxYear) {
        errors.push({
            rule: 'maxYear',
            message: formatCalendarError(opts.locale, 'maxYear', { maxYear: opts.maxYear }),
        });
    }

    if (opts.minDate) {
        const minParsed = parse(opts.minDate, opts.locale);
        if (minParsed && toStartOfDay(date).getTime() < toStartOfDay(minParsed).getTime()) {
            errors.push({
                rule: 'minDate',
                message: formatCalendarError(opts.locale, 'minDate', { minDate: opts.minDate }),
            });
        }
    }

    if (opts.maxDate) {
        const maxParsed = parse(opts.maxDate, opts.locale);
        if (maxParsed && toStartOfDay(date).getTime() > toStartOfDay(maxParsed).getTime()) {
            errors.push({
                rule: 'maxDate',
                message: formatCalendarError(opts.locale, 'maxDate', { maxDate: opts.maxDate }),
            });
        }
    }

    if (opts.disablePast || opts.disableFuture) {
        const today = toStartOfDay(new Date());
        const sd = toStartOfDay(date);
        if (opts.disablePast && sd.getTime() < today.getTime()) {
            errors.push({ rule: 'disablePast', message: formatCalendarError(opts.locale, 'disablePast') });
        }
        if (opts.disableFuture && sd.getTime() > today.getTime()) {
            errors.push({ rule: 'disableFuture', message: formatCalendarError(opts.locale, 'disableFuture') });
        }
    }

    if (opts.disableWeekend && (date.getDay() === 0 || date.getDay() === 6)) {
        errors.push({ rule: 'disabledDate', message: formatCalendarError(opts.locale, 'disabledDate') });
    }

    if (opts.disableDates && opts.disableDates.length > 0) {
        const blocked = opts.disableDates
            .map(s => parse(s, opts.locale))
            .filter((d): d is Date => !!d)
            .map(toStartOfDay);
        const hit = blocked.some(d => d.getTime() === toStartOfDay(date).getTime());
        if (hit) {
            errors.push({ rule: 'disabledDate', message: formatCalendarError(opts.locale, 'disabledDate') });
        }
    }

    return { valid: errors.length === 0, errors, date };
}

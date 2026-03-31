import { LitElement, html, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import TsDateCalendar from '../../date-picker/date-calendar/date-calendar.component.js';
import { DaysOfWeek, inRange } from '../../../utils/date/date-utils.js';
import styles from './TsCalendarStaticStyle.js';
import { getCalendarButtons } from '../../../utils/date/calendar-i18n.js';
import { TsButton } from '../../button/index.js';
import { buildDateValue, buildMeta } from '../../date-picker/src/events-date.helpers.js';
import { parseByLocale } from '../../../utils/date/date-format.js';

type SelectEvent = CustomEvent<{ value: Date }>;
type MonthChangeEvent = CustomEvent<{ focused: Date }>;

/**
 * @summary A standalone calendar component that allows users to select a single date.
 * It includes optional OK/Cancel footer actions.
 * @documentation https://create.tuvsud.com/latest/components/calendar-static/develop
 * @status stable
 * @since 1.0
 * @access public
 *
 * @dependency ts-date-calendar
 * @dependency ts-button
 *
 * @event ts-date-select - Emitted when a date is picked from the calendar. Detail: `{ date, value, locale, meta }`.
 * @event ts-date-apply - Emitted when the user confirms a selection (footer-action mode). Detail: `{ value, locale, meta }`.
 * @event ts-date-cancel - Emitted when the user cancels a selection (footer-action mode). Detail: `{ value, locale, meta }`.
 * @event ts-date-change-month - Emitted when the visible month changes. Detail: `{ focused, month, year, date }`.
 * @event ts-year-change - Emitted when the user navigates to a different year. Detail: `{ focused }`.
 * @event ts-month-change - Emitted when the user navigates to a different month. Detail: `{ focused }`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart calendar - The calendar container.
 * @csspart footer - The footer actions container.
 */
export default class TsCalendarStaticComponent extends LitElement {
    static override styles: CSSResultGroup = [styles];
    static dependencies = {
        'ts-date-calendar': TsDateCalendar,
        'ts-button': TsButton,
    };

    /** The active locale for date formatting and localization. */
    @property() locale = 'en';

    /** Minimum selectable year in date pickers. */
    @property({ type: Number }) minYear = 1900;

    /** Maximum selectable year in date pickers. */
    @property({ type: Number }) maxYear = 2100;

    /** The minimum selectable date boundary. */
    @property({ attribute: false }) min?: Date;

    /** The maximum selectable date boundary. */
    @property({ attribute: false }) max?: Date;

    /** The currently selected date. */
    @property({ attribute: false }) selected?: Date;

    /** The currently focused date determining the visible month in the calendar. */
    @property({ attribute: false }) focused?: Date;

    /** When `true`, dates are handled in UTC rather than the local timezone. */
    @property({ type: Boolean, reflect: true }) utc = true;

    /** Disables selection of past dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-past' }) disablePast = false;

    /** Disables selection of future dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-future' }) disableFuture = false;

    /** The minimum selectable date in `YYYY-MM-DD` format. */
    @property({ type: String, reflect: true, attribute: 'min-date' }) minDate?: string;

    /** The maximum selectable date in `YYYY-MM-DD` format. */
    @property({ type: String, reflect: true, attribute: 'max-date' }) maxDate?: string;

    /** Disables selection of weekend dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-weekend' }) disableWeekend = false;

    /** An array of specific dates to disable in `YYYY-MM-DD` format. */
    @property({ type: Array, attribute: 'disable-dates' }) disableDates: string[] = [];

    /** Shows OK/Cancel footer actions. The selection is only confirmed on OK click. */
    @property({ type: Boolean, reflect: true, attribute: 'footer-action' }) footerAction = true;

    private snapshotSelected?: Date;
    private tempSelected?: Date;

    private toDay(d: Date) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    private get todayStart() {
        const t = new Date();
        return new Date(t.getFullYear(), t.getMonth(), t.getDate());
    }

    private get minBound(): Date | undefined {
        const parsed = this.minDate ? parseByLocale(this.minDate, this.locale) : undefined;
        if (this.disablePast) return this.todayStart;
        if (parsed) return this.toDay(parsed);
        return this.min;
    }

    private get maxBound(): Date | undefined {
        const parsed = this.maxDate ? parseByLocale(this.maxDate, this.locale) : undefined;
        if (this.disableFuture) return this.todayStart;
        if (parsed) return this.toDay(parsed);
        return this.max;
    }

    private coerceFocused() {
        const base = this.focused ?? this.selected ?? new Date();
        const d = new Date(base.getFullYear(), base.getMonth(), 1);
        const min = this.minBound;
        const max = this.maxBound;
        if (min || max) {
            const first = new Date(d.getFullYear(), d.getMonth(), 1);
            const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            if (!inRange(first, min, max) && !inRange(last, min, max)) {
                const clamp = min && (!max || min > last) ? min : (max ?? d);
                return new Date(clamp.getFullYear(), clamp.getMonth(), 1);
            }
        }
        return d;
    }

    private isDateDisabled = (d: Date): boolean => {
        const day = this.toDay(d);

        if (this.disableWeekend && (day.getDay() === 0 || day.getDay() === 6)) return true;

        if (this.disableDates?.length) {
            const ds = this.disableDates
                .map(s => parseByLocale(s, this.locale))
                .filter(Boolean)
                .map(x => this.toDay(x!));
            if (ds.some(x => x.getTime() === day.getTime())) return true;
        }

        return false;
    };

    private handleTempSelect = (e: SelectEvent) => {
        if (this.footerAction) {
            this.tempSelected = e.detail.value;
            this.requestUpdate();
        } else {
            // Immediately apply selection when footerAction is false
            const val = e.detail.value;
            this.selected = val;
            this.snapshotSelected = val;
            this.dispatchEvent(
                new CustomEvent('ts-date-select', {
                    detail: {
                        date: val,
                        value: buildDateValue(val),
                        locale: this.locale,
                        meta: buildMeta(val, this.locale, this.utc),
                    },
                    bubbles: true,
                    composed: true,
                }),
            );
            this.requestUpdate();
        }
    };

    private handleOkClick = () => {
        const val = this.tempSelected ?? this.selected;
        if (val) {
            this.selected = val;
            this.snapshotSelected = val;

            this.dispatchEvent(
                new CustomEvent('ts-date-select', {
                    detail: {
                        date: val,
                        value: buildDateValue(val),
                        locale: this.locale,
                        meta: buildMeta(val, this.locale, this.utc),
                    },
                    bubbles: true,
                    composed: true,
                }),
            );

            this.dispatchEvent(
                new CustomEvent('ts-date-apply', {
                    detail: {
                        value: buildDateValue(val),
                        locale: this.locale,
                        meta: buildMeta(val, this.locale, this.utc),
                    },
                    bubbles: true,
                    composed: true,
                }),
            );

            this.requestUpdate();
        }
    };

    private handleCancelClick = () => {
        this.tempSelected = this.snapshotSelected ?? this.selected;

        this.dispatchEvent(
            new CustomEvent('ts-date-cancel', {
                detail: {
                    value: buildDateValue(this.tempSelected),
                    locale: this.locale,
                    meta: buildMeta(this.tempSelected, this.locale, this.utc),
                },
                bubbles: true,
                composed: true,
            }),
        );

        this.requestUpdate();
    };

    private handleMonthChange = (e: MonthChangeEvent) => {
        const prev = this.focused;
        const next = e.detail.focused;
        this.focused = next;

        // Emit ts-month-change
        this.dispatchEvent(
            new CustomEvent('ts-month-change', {
                detail: { focused: next },
                bubbles: true,
                composed: true,
            }),
        );

        // Emit ts-year-change if year changed
        if (!prev || next.getFullYear() !== prev.getFullYear()) {
            this.dispatchEvent(
                new CustomEvent('ts-year-change', {
                    detail: { focused: next },
                    bubbles: true,
                    composed: true,
                }),
            );
        }

        // Emit ts-date-change-month if month changed
        if (!prev || next.getMonth() !== prev.getMonth() || next.getFullYear() !== prev.getFullYear()) {
            this.dispatchEvent(
                new CustomEvent('ts-date-change-month', {
                    detail: {
                        focused: next,
                        month: next.getMonth() + 1,
                        year: next.getFullYear(),
                        date: buildMeta(next, this.locale, this.utc),
                    },
                    bubbles: true,
                    composed: true,
                }),
            );
        }
    };

    private get labels() {
        return getCalendarButtons(this.locale);
    }

    protected override firstUpdated() {
        this.snapshotSelected = this.selected;
    }

    override render() {
        const focusedDate = this.coerceFocused();
        return html`
            <div part="base" class="calendar-static">
                <ts-date-calendar
                    part="calendar"
                    id="calendar-panel"
                    .focusedDate=${focusedDate}
                    .selectedDate=${this.tempSelected ?? this.selected}
                    .firstDayOfWeek=${DaysOfWeek.Monday}
                    .locale=${this.locale}
                    .minYear=${this.minYear}
                    .maxYear=${this.maxYear}
                    .min=${this.minBound}
                    .max=${this.maxBound}
                    .isDateDisabled=${this.isDateDisabled}
                    @ts-month-change=${this.handleMonthChange}
                    @ts-date-select=${this.handleTempSelect}
                ></ts-date-calendar>
                ${this.footerAction
                    ? html`
                          <div class="footer-divider"></div>
                          <div part="footer" class="date-picker__footer-actions">
                              <ts-button variant="text" @click=${this.handleCancelClick}
                                  >${this.labels.cancel}</ts-button
                              >
                              <ts-button variant="text" @click=${this.handleOkClick}>${this.labels.ok}</ts-button>
                          </div>
                      `
                    : ''}
            </div>
        `;
    }
}

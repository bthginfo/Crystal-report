import { LitElement, html, nothing, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
    getViewOfMonth,
    isEqual,
    isEqualMonth,
    DaysOfWeek,
    addMonths,
    isBetween,
} from '../../../utils/date/date-utils.js';
import { getCalendarLocale, getCalendarAriaLabels } from '../../../utils/date/calendar-i18n.js';
import { TsIconButton } from '../../icon-button/index.js';
import styles from './TsDateCalendarRangeMobileStyle.js';

type CalendarI18n = { monthsShort: string[]; months: string[]; weekdaysShort: string[] };

/**
 * @summary Mobile-optimized calendar for selecting a date range, used inside the mobile date-range dialog.
 * @documentation https://create.tuvsud.com/latest/components/date-range-picker/develop-vo4zlBb4
 * @status stable
 * @since 1.0
 * @access private
 *
 * @dependency ts-icon-button
 *
 * @slot - This component has no user-facing slots. All structure is internally rendered.
 *
 * @event ts-date-range-select - Emitted when the user selects a date or completes a range. Provides `{ start, end }`.
 * @event ts-month-change - Emitted when the displayed month changes. Provides `{ focused }`.
 *
 * @csspart base - The root calendar container.
 * @csspart header - The month/year header with navigation buttons.
 * @csspart calendar - The full calendar grid containing days and weeks.
 *
 * @animation date-calendar-mobile.show - Optional open animation when embedded in dialogs.
 * @animation date-calendar-mobile.hide - Optional close animation when embedded in dialogs.
 *
 * @property startDate - Currently selected start date.
 * @property endDate - Currently selected end date.
 * @property focusedDate - The month/day currently displayed in the calendar.
 * @property firstDayOfWeek - The first day of the week (`DaysOfWeek` enum).
 * @property locale - Locale for month, weekday names, and formatting.
 * @property activeField - Which field is being selected: `'start'` or `'end'`.
 */
export default class TsDateCalendarRangeMobile extends LitElement {
    static override styles: CSSResultGroup = [styles];
    static dependencies = { 'ts-icon-button': TsIconButton };

    /** The currently selected start date. */
    @property({ type: Object }) startDate?: Date;
    /** The currently selected end date. */
    @property({ type: Object }) endDate?: Date;
    /** The month/day currently displayed in the calendar. */
    @property({ type: Object }) focusedDate: Date = new Date();
    /** The first day of the week (0 = Sunday, 1 = Monday, etc.). */
    @property({ type: Number }) firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday;
    /** BCP 47 locale tag used for month and weekday labels. */
    @property({ type: String }) locale = 'en';
    /** Indicates which field is being selected: `'start'` or `'end'`. */
    @property({ type: String }) activeField: 'start' | 'end' = 'start';

    @state() private hoverDate?: Date;

    @state() private keyboardFocusDate?: Date;

    private emitRange(start?: Date, end?: Date) {
        this.dispatchEvent(
            new CustomEvent('ts-date-range-select', { detail: { start, end }, bubbles: true, composed: true }),
        );
    }

    private emitMonth(date: Date) {
        this.dispatchEvent(
            new CustomEvent('ts-month-change', { detail: { focused: date }, bubbles: true, composed: true }),
        );
    }

    private startOfMonth(d: Date) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }

    private sameMonth(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
    }

    private daysInMonth(d: Date) {
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    }

    private clampDayInMonth(monthDate: Date, day: number) {
        const max = this.daysInMonth(monthDate);
        const dd = Math.min(Math.max(day, 1), max);
        return new Date(monthDate.getFullYear(), monthDate.getMonth(), dd);
    }

    private getInitialFocusDateForView(month: Date): Date {
        if (this.activeField === 'end') {
            if (this.endDate) return this.endDate;
            if (this.startDate) return this.startDate;
        } else {
            if (this.startDate) return this.startDate;
            if (this.endDate) return this.endDate;
        }

        const today = new Date();
        return this.clampDayInMonth(month, today.getDate());
    }

    private isoDay(d: Date) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    /** Whether the calendar (or any element in its shadow root) currently has focus. */
    private get hasFocus(): boolean {
        const root = this.renderRoot as ShadowRoot;
        const active = root.activeElement ?? document.activeElement;
        return this === active || root.contains(active as Node);
    }

    private focusDay(date: Date) {
        this.updateComplete.then(() => {
            // Only move focus if the calendar already owns focus.
            // This prevents stealing focus from the input while the user is typing.
            if (!this.hasFocus) return;

            const el = this.renderRoot.querySelector(
                `button[data-date="${this.isoDay(date)}"]`,
            ) as HTMLButtonElement | null;
            el?.focus();
        });
    }

    private ensureKeyboardFocusInitialized() {
        const month = this.startOfMonth(this.focusedDate);

        if (!this.keyboardFocusDate) {
            this.keyboardFocusDate = this.getInitialFocusDateForView(month);
            return;
        }

        if (!this.sameMonth(this.startOfMonth(this.keyboardFocusDate), month)) {
            this.keyboardFocusDate = this.getInitialFocusDateForView(month);
        }
    }

    private handleSelect(date: Date) {
        // Keep keyboard anchor aligned with user interaction
        this.keyboardFocusDate = date;

        if (!this.startDate || (this.startDate && this.endDate)) {
            this.startDate = date;
            this.endDate = undefined;
            this.hoverDate = undefined;
            this.emitRange(this.startDate);
        } else if (this.startDate && !this.endDate) {
            if (date < this.startDate) {
                this.startDate = date;
                this.endDate = undefined;
                this.hoverDate = undefined;
                this.emitRange(this.startDate);
            } else {
                this.endDate = date;
                this.hoverDate = undefined;
                this.emitRange(this.startDate, this.endDate);
            }
        }
        this.requestUpdate();
    }

    private handleHover(date: Date) {
        if (this.activeField === 'start' && this.startDate) {
            this.hoverDate = date <= this.startDate ? date : undefined;
            this.requestUpdate();
            return;
        }

        if (this.activeField === 'end' && this.endDate) {
            this.hoverDate = date >= this.endDate ? date : undefined;
            this.requestUpdate();
            return;
        }

        if (!this.startDate) return;

        if (this.startDate && !this.endDate) {
            this.hoverDate = date >= this.startDate ? date : undefined;
            this.requestUpdate();
            return;
        }

        if (this.startDate && this.endDate) {
            if (isBetween(date, this.startDate, this.endDate)) {
                this.hoverDate = undefined;
                this.requestUpdate();
                return;
            }

            const distToStart = Math.abs(date.getTime() - this.startDate.getTime());
            const distToEnd = Math.abs(date.getTime() - this.endDate.getTime());
            const pickingStart = distToStart < distToEnd;

            if (pickingStart) {
                this.hoverDate = date <= this.startDate ? date : undefined;
            } else {
                this.hoverDate = date >= this.endDate ? date : undefined;
            }

            this.requestUpdate();
        }
    }

    private clearHover() {
        if (this.hoverDate) {
            this.hoverDate = undefined;
            this.requestUpdate();
        }
    }

    private ensureVisible(date: Date) {
        // Mobile shows ONE month. If arrowing exits month, switch month and keep day number clamped.
        const currentMonth = this.startOfMonth(this.focusedDate);
        const targetMonth = this.startOfMonth(date);

        if (this.sameMonth(targetMonth, currentMonth)) return;

        // Make target month the new displayed month
        this.keyboardFocusDate = date;
        this.focusedDate = targetMonth;
        this.requestUpdate();
        this.emitMonth(this.focusedDate);
    }

    private onDayKeydown(e: KeyboardEvent, current: Date) {
        let next: Date | undefined;

        switch (e.key) {
            case 'ArrowLeft':
                next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
                break;
            case 'ArrowRight':
                next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
                break;
            case 'ArrowUp':
                next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
                break;
            case 'ArrowDown':
                next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
                break;
            default:
                return;
        }

        e.preventDefault();
        e.stopPropagation();

        this.keyboardFocusDate = next;
        this.ensureVisible(next);
        this.focusDay(next);
    }

    private onPrevMonthClick = () => {
        const newMonth = addMonths(this.focusedDate, -1);

        const target = this.keyboardFocusDate
            ? this.clampDayInMonth(newMonth, this.keyboardFocusDate.getDate())
            : this.getInitialFocusDateForView(newMonth);

        this.keyboardFocusDate = target;
        this.focusedDate = this.startOfMonth(newMonth);
        this.requestUpdate();
        this.emitMonth(this.focusedDate);
        this.focusDay(target);
    };

    private onNextMonthClick = () => {
        const newMonth = addMonths(this.focusedDate, 1);

        const target = this.keyboardFocusDate
            ? this.clampDayInMonth(newMonth, this.keyboardFocusDate.getDate())
            : this.getInitialFocusDateForView(newMonth);

        this.keyboardFocusDate = target;
        this.focusedDate = this.startOfMonth(newMonth);
        this.requestUpdate();
        this.emitMonth(this.focusedDate);
        this.focusDay(target);
    };

    private orderedWeekdays(weekdaysShort: string[]) {
        const start = this.firstDayOfWeek;
        return [...weekdaysShort.slice(start), ...weekdaysShort.slice(0, start)];
    }

    private isToday(date: Date) {
        const t = new Date();
        return isEqual(date, t);
    }

    private splitWeeks(days: Date[]) {
        const weeks: Date[][] = [];
        for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
        return weeks;
    }

    override firstUpdated() {
        this.ensureKeyboardFocusInitialized();
        if (this.keyboardFocusDate) this.focusDay(this.keyboardFocusDate);
    }

    override updated(changed: Map<string, unknown>) {
        if (changed.has('focusedDate')) {
            this.ensureKeyboardFocusInitialized();
            if (this.keyboardFocusDate) this.focusDay(this.keyboardFocusDate);
        }

        if (changed.has('startDate') || changed.has('endDate') || changed.has('activeField')) {
            this.ensureKeyboardFocusInitialized();
        }
    }

    private renderDays(monthDate: Date, i18n: CalendarI18n) {
        const days = getViewOfMonth(monthDate, this.firstDayOfWeek);
        const weeks = this.splitWeeks(days);
        const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
        const hasFinalRange = !!(this.startDate && this.endDate);

        const focusDate = this.keyboardFocusDate;

        return html`
            <div class="dow">${this.orderedWeekdays(i18n.weekdaysShort).map(w => html`<span>${w}</span>`)}</div>

            <div class="weeks" @mouseleave=${() => this.clearHover()}>
                ${weeks.map(
                    week => html`
                        <div class="week">
                            ${week.map((d, colIndex) => {
                                const muted = !isEqualMonth(d, monthDate);
                                const today = this.isToday(d);
                                const isStart = this.startDate && isEqual(d, this.startDate);
                                const isEnd = this.endDate && isEqual(d, this.endDate);
                                const inFinalRange =
                                    this.startDate && this.endDate && isBetween(d, this.startDate, this.endDate);

                                const pickingStart =
                                    this.startDate &&
                                    this.endDate &&
                                    this.hoverDate &&
                                    this.hoverDate <= this.startDate;

                                const pickingEnd =
                                    this.startDate && this.endDate && this.hoverDate && this.hoverDate >= this.endDate;

                                const inHoverRange =
                                    (!hasFinalRange &&
                                        this.startDate &&
                                        this.hoverDate &&
                                        isBetween(d, this.startDate, this.hoverDate)) ||
                                    (pickingStart && this.hoverDate && isBetween(d, this.hoverDate, this.startDate!)) ||
                                    (pickingEnd && this.hoverDate && isBetween(d, this.endDate!, this.hoverDate));

                                const hoverEnd =
                                    this.hoverDate &&
                                    ((pickingStart && isEqual(d, this.hoverDate)) ||
                                        (!hasFinalRange &&
                                            this.startDate &&
                                            this.hoverDate &&
                                            isEqual(d, this.hoverDate)) ||
                                        (pickingEnd && isEqual(d, this.hoverDate)));

                                const firstInRow = colIndex === 0;
                                const lastInRow = colIndex === 6;
                                const isCurrentMonthDay = d.getMonth() === monthDate.getMonth();
                                const isStartOfMonth = isCurrentMonthDay && d.getDate() === 1;
                                const isEndOfMonth = isCurrentMonthDay && d.getDate() === endOfMonth.getDate();

                                let visualRangeStart = false;
                                let visualRangeEnd = false;
                                let visualHoverStart = false;
                                let visualHoverEnd = false;

                                if (inFinalRange || isStart || isEnd) {
                                    if (isStart || firstInRow || isStartOfMonth) visualRangeStart = true;
                                    if (isEnd || lastInRow || isEndOfMonth) visualRangeEnd = true;
                                }

                                if (inHoverRange || hoverEnd) {
                                    if (this.activeField === 'start') {
                                        if (this.hoverDate && isEqual(d, this.hoverDate)) visualHoverStart = true;
                                        if (this.hoverDate && (firstInRow || isStartOfMonth)) visualHoverStart = true;
                                        if (this.startDate && isEqual(d, this.startDate)) visualHoverEnd = true;
                                        if (this.hoverDate && (lastInRow || isEndOfMonth)) visualHoverEnd = true;
                                    } else {
                                        if (isStart || firstInRow || isStartOfMonth) visualHoverStart = true;
                                        if (hoverEnd || lastInRow || isEndOfMonth) visualHoverEnd = true;
                                    }
                                }

                                const classes: string[] = [];

                                if (muted) classes.push('invisible-day');
                                if (today) classes.push('today');

                                if (inFinalRange || isStart || isEnd) {
                                    classes.push('in-range');
                                    if (isStart) classes.push('range-start');
                                    if (isEnd) classes.push('range-end');
                                    if (inFinalRange && !isStart && !isEnd) classes.push('range-middle');
                                    if (visualRangeStart) classes.push('range-start-visual');
                                    if (visualRangeEnd) classes.push('range-end-visual');
                                }

                                if (inHoverRange || hoverEnd) {
                                    classes.push('hover-in-range');
                                    if (visualHoverStart) classes.push('hover-range-start-visual');
                                    if (visualHoverEnd) classes.push('hover-range-end-visual');
                                    if (!visualHoverStart && !visualHoverEnd) classes.push('hover-range-middle');
                                }

                                if (isStart || isEnd) classes.push('selected');

                                const dateLabel = muted
                                    ? ''
                                    : d.toLocaleDateString(this.locale, {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                      });

                                const isTabStop = !!(!muted && focusDate && isEqual(d, focusDate));

                                return html`
                                    <button
                                        class=${classes.join(' ') + ' grid-item'}
                                        data-date=${this.isoDay(d)}
                                        tabindex=${isTabStop ? 0 : -1}
                                        ?disabled=${muted}
                                        @click=${() => {
                                            if (muted) return;
                                            this.keyboardFocusDate = d;
                                            this.handleSelect(d);
                                            this.focusDay(d);
                                        }}
                                        @mouseenter=${() => !muted && this.handleHover(d)}
                                        @keydown=${(e: KeyboardEvent) => {
                                            if (muted) return;
                                            this.onDayKeydown(e, d);
                                        }}
                                        aria-label=${dateLabel || nothing}
                                        aria-hidden=${muted ? 'true' : 'false'}
                                    >
                                        <div class="layer-selected"></div>
                                        <div class="layer-hover"></div>
                                        <div class="layer-days">${muted ? '' : d.getDate()}</div>
                                    </button>
                                `;
                            })}
                        </div>
                    `,
                )}
            </div>
        `;
    }

    override render() {
        const i18n = getCalendarLocale(this.locale) as CalendarI18n;
        const aria = getCalendarAriaLabels(this.locale);
        const monthNames = i18n.months?.length ? i18n.months : i18n.monthsShort;

        return html`
            <div class="calendar-container">
                <div class="header">
                    <div class="month-label">
                        ${monthNames[this.focusedDate.getMonth()]} ${this.focusedDate.getFullYear()}
                    </div>

                    <div class="nav">
                        <ts-icon-button
                            name="arrow_forward_ios"
                            class="previous-month"
                            aria-label=${aria.previousMonth}
                            size="20"
                            hover
                            @click=${this.onPrevMonthClick}
                        ></ts-icon-button>

                        <ts-icon-button
                            name="arrow_forward_ios"
                            class="next-month"
                            aria-label=${aria.nextMonth}
                            size="20"
                            hover
                            @click=${this.onNextMonthClick}
                        ></ts-icon-button>
                    </div>
                </div>

                <div class="calendar">${this.renderDays(this.focusedDate, i18n)}</div>
            </div>
        `;
    }
}

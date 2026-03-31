import { LitElement, html, type CSSResultGroup } from 'lit';
import { property, query } from 'lit/decorators.js';
import { TsIconButton } from '../../icon-button/index.js';
import { TsInput } from '../../input/index.js';
import TsDateInputStart from '../date-input-range/date-input-start.component.js';
import TsDateInputEnd from '../date-input-range/date-input-end.component.js';
import TsDateCalendarRangeMobile from '../date-calendar-range-mobile/date-calendar-range-mobile.component.js';
import { DaysOfWeek } from '../../../utils/date/date-utils.js';
import { forwardProps } from '../../../utils/directive/forward-props.directive.js';
import { TsDialog } from '../../dialog/index.js';
import { TsButton } from '../../button/index.js';
import styles from './TsDateDialogRangeStyle.js';
import {
    fallbackLabels,
    getCalendarButtons,
    getCalendarAriaLabels,
    getRangeDialogLabels,
} from '../../../utils/date/calendar-i18n.js';
import { formatDateByLocale, formatShortRangeDate, parseByLocale } from '../../../utils/date/date-format.js';
import { fire } from '../src/events-range.helpers.js';
import { languageOf } from '../../../utils/date/locale.js';

type SelectEvent = CustomEvent<{ start?: Date; end?: Date }>;
type MonthChangeEvent = CustomEvent<{ focused: Date }>;

/**
 * @summary Internal mobile-oriented date range dialog that wraps a full-screen dialog with a
 * single-month calendar, date shortcuts, and OK/Cancel footer actions. Used by `ts-date-range`
 * on small viewports.
 * @documentation https://create.tuvsud.com/latest/components/date-range-picker/develop-vo4zlBb4
 * @status stable
 * @since 1.0
 * @access private
 *
 * @dependency ts-icon-button
 * @dependency ts-input
 * @dependency ts-date-input-start
 * @dependency ts-date-input-end
 * @dependency ts-dialog
 * @dependency ts-date-calendar-range-mobile
 * @dependency ts-button
 *
 * @slot suffix - Suffix slot forwarded to the internal start/end date inputs for calendar icons.
 *
 * @event ts-date-range-select - Emitted when the user selects or completes a range. Detail: `{ start, end, clearEnd }`.
 * @event ts-date-apply - Emitted when the user confirms the selection via OK. Detail: `{ start, end, locale, meta }`.
 * @event ts-date-cancel - Emitted when the user cancels via Cancel button. Detail: `{ start, end, locale, meta }`.
 * @event ts-shortcut-select - Re-dispatched when a date shortcut is clicked. Detail: `{ index }`.
 *
 * @csspart base - The component's root wrapper.
 */
export default class TsDateDialogRangeComponent extends LitElement {
    static override styles: CSSResultGroup = [styles];

    static dependencies = {
        'ts-icon-button': TsIconButton,
        'ts-input': TsInput,
        'ts-date-input-start': TsDateInputStart,
        'ts-date-input-end': TsDateInputEnd,
        'ts-dialog': TsDialog,
        'ts-date-calendar-range-mobile': TsDateCalendarRangeMobile,
        'ts-button': TsButton,
    };

    /** Indicates whether the dialog is currently open. */
    @property({ type: Boolean }) open = false;
    /** The formatted start date value. */
    @property() valueStart = '';
    /** The formatted end date value. */
    @property() valueEnd = '';
    /** The active locale for date formatting and localization. */
    @property() locale = 'en';
    /** When `true`, dates are handled in UTC rather than the local timezone. */
    @property({ type: Boolean }) utc = false;

    /** The size variant of the input fields (`'small'`, `'medium'`, or `'large'`). */
    @property() size: string | number | undefined;
    /** Indicates which field is being selected: `'start'` or `'end'`. */
    @property({ attribute: false }) activeField: 'start' | 'end' = 'start';
    /** Properties forwarded to the internal date inputs. */
    @property({ attribute: false }) forwardedProps: Record<string, unknown> = {};
    /** The currently focused date determining the visible month. */
    @property({ type: Object }) focusedDate: Date = new Date();
    /** When `true`, makes the input fields read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** Layout direction for the start/end inputs (`'horizontal'` or `'vertical'`). */
    @property() inputsDirection: 'horizontal' | 'vertical' = 'horizontal';
    /** Callback invoked when the trigger input is clicked. */
    @property({ attribute: false }) onTriggerClick!: (e: Event) => void;

    @query('ts-date-input-start') private triggerStart!: TsDateInputStart;
    @query('ts-date-input-end') private triggerEnd!: TsDateInputEnd;

    /** Callback invoked on input or change events from the start date input. */
    @property({ attribute: false }) onInputOrChangeStart!: (e: Event) => void;
    /** Callback invoked on input or change events from the end date input. */
    @property({ attribute: false }) onInputOrChangeEnd!: (e: Event) => void;
    /** Callback invoked when either date input loses focus. */
    @property({ attribute: false }) onInputBlur!: () => void;
    /** Callback invoked when the start date input loses focus (parent-level blur validation). */
    @property({ attribute: false }) onBlurStart!: () => void;
    /** Callback invoked when the end date input loses focus (parent-level blur validation). */
    @property({ attribute: false }) onBlurEnd!: () => void;
    /** Callback invoked when the calendar month changes. */
    @property({ attribute: false }) monthChangeHandler!: (e: MonthChangeEvent) => void;
    /** Callback invoked when a date range is selected from the calendar. */
    @property({ attribute: false }) selectHandler!: (e: SelectEvent) => void;

    /** Numeric shortcut identifiers for quick date range selection. */
    @property({ type: Array }) shortcuts: number[] = [];

    private justSelectedEnd = false;
    private originalValueStart = '';
    private originalValueEnd = '';

    @query('ts-date-calendar-range-mobile') private calendar!: TsDateCalendarRangeMobile;

    private blockInputClick(e: MouseEvent) {
        const path = e.composedPath();
        const isIcon = path.some(t => t instanceof HTMLElement && t.tagName === 'TS-ICON-BUTTON');
        if (!isIcon) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    private applyFocus(target: 'start' | 'end') {
        const s = this.valueStart ? parseByLocale(this.valueStart, this.locale) : undefined;
        const e = this.valueEnd ? parseByLocale(this.valueEnd, this.locale) : undefined;
        const monthOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

        if (!s && !e) {
            this.focusedDate = new Date();
            return;
        }

        if (target === 'start') {
            if (s) this.focusedDate = monthOf(s);
            else if (e) this.focusedDate = monthOf(e);
            else this.focusedDate = new Date();
            return;
        }

        if (target === 'end') {
            if (e) this.focusedDate = monthOf(e);
            else if (s) this.focusedDate = monthOf(s);
            else this.focusedDate = new Date();
            return;
        }

        this.focusedDate = new Date();
    }

    private openDialog(target: 'start' | 'end') {
        this.originalValueStart = this.valueStart;
        this.originalValueEnd = this.valueEnd;
        this.activeField = target;
        this.applyFocus(target);
        this.open = true;
    }

    private handleTriggerClickStart = () => {
        if (this.readonly) return;
        this.openDialog('start');
    };

    private handleTriggerClickEnd = () => {
        if (this.readonly) return;
        this.openDialog('end');
    };

    private sendSyntheticStart() {
        if (typeof this.onInputOrChangeStart === 'function') {
            const ev = new CustomEvent('synthetic', { detail: { value: this.valueStart } });
            this.onInputOrChangeStart(ev);
        }
    }

    private sendSyntheticEnd() {
        if (typeof this.onInputOrChangeEnd === 'function') {
            const ev = new CustomEvent('synthetic', { detail: { value: this.valueEnd } });
            this.onInputOrChangeEnd(ev);
        }
    }

    // PUBLIC: emits ts-date-range-select
    private normalizeRange(detail: { start?: Date; end?: Date }) {
        const clicked = detail.end ?? detail.start;
        if (!clicked) return;

        const startObj = this.valueStart ? parseByLocale(this.valueStart, this.locale) : undefined;
        const endObj = this.valueEnd ? parseByLocale(this.valueEnd, this.locale) : undefined;
        const format = (d: Date) => formatDateByLocale(d, this.locale);

        let newStart = this.valueStart;
        let newEnd = this.valueEnd;

        let eventStart: Date | undefined;
        let eventEnd: Date | undefined;
        let clearEnd = false;

        if (this.activeField === 'start') {
            newStart = format(clicked);
            if (endObj && clicked > endObj) newEnd = '';
            eventStart = clicked;
            clearEnd = newEnd === '';
            this.activeField = 'end';
        } else {
            if (!startObj || clicked < startObj) {
                newStart = format(clicked);
                newEnd = '';
                eventStart = clicked;
                clearEnd = true;
            } else {
                newStart = formatDateByLocale(startObj, this.locale);
                newEnd = format(clicked);
                eventStart = startObj;
                eventEnd = clicked;
            }
        }

        this.valueStart = newStart;
        this.valueEnd = newEnd;

        this.sendSyntheticStart();
        this.sendSyntheticEnd();

        if (eventStart) {
            this.dispatchEvent(
                new CustomEvent('ts-date-range-select', {
                    detail: { start: eventStart, end: eventEnd, clearEnd },
                    bubbles: true,
                    composed: true,
                }),
            );
        }
    }

    // PUBLIC: emits ts-date-apply and ts-date-range-select
    private handleOkClick = () => {
        const start = this.calendar.startDate;
        const end = this.calendar.endDate;

        this.valueStart = start ? formatDateByLocale(start, this.locale) : '';
        this.valueEnd = end ? formatDateByLocale(end, this.locale) : '';

        this.sendSyntheticStart();
        this.sendSyntheticEnd();

        fire(this, 'ts-date-apply', this.valueStart || '', this.valueEnd || '', this.locale, this.utc);

        this.dispatchEvent(
            new CustomEvent('ts-date-range-select', {
                detail: { start, end, clearEnd: !end },
                bubbles: true,
                composed: true,
            }),
        );

        this.open = false;
    };

    // PUBLIC: emits ts-date-cancel
    private handleCancelClick = () => {
        this.valueStart = this.originalValueStart;
        this.valueEnd = this.originalValueEnd;

        this.sendSyntheticStart();
        this.sendSyntheticEnd();

        fire(this, 'ts-date-cancel', this.valueStart || '', this.valueEnd || '', this.locale, this.utc);

        this.open = false;
    };

    private get labels() {
        return getCalendarButtons(this.locale);
    }

    private get rangeLabel() {
        return getRangeDialogLabels(this.locale);
    }

    private get dialogRangeParts() {
        const start = this.calendar?.startDate;
        const end = this.calendar?.endDate;
        const lang = languageOf(this.locale);
        const fallback = fallbackLabels[lang];

        const customStart = this.forwardedProps.labelStart ?? '';
        const customEnd = this.forwardedProps.labelEnd ?? '';

        const startText = start ? formatShortRangeDate(start, this.locale) : customStart || fallback.start;
        const endText = end ? formatShortRangeDate(end, this.locale) : customEnd || fallback.end;

        return {
            startText,
            endText,
            startClass: 'range-start--always-active',
            endClass: this.activeField === 'start' ? 'range-end--inactive' : 'range-end--active',
        };
    }

    // PUBLIC: emits ts-shortcut-select
    private onShortcutSelected(e: CustomEvent<{ index: number }>) {
        this.dispatchEvent(
            new CustomEvent('ts-shortcut-select', {
                detail: { index: e.detail.index },
                bubbles: true,
                composed: true,
            }),
        );
    }

    private focusStartInput() {
        this.updateComplete.then(() => {
            const input = this.triggerStart?.shadowRoot?.querySelector('ts-input') as TsInput | null;
            input?.focus();
        });
    }

    private focusEndInput() {
        this.updateComplete.then(() => {
            const input = this.triggerEnd?.shadowRoot?.querySelector('ts-input') as TsInput | null;
            input?.focus();
        });
    }

    override updated() {
        const start = this.valueStart ? parseByLocale(this.valueStart, this.locale) : undefined;
        const end = this.valueEnd ? parseByLocale(this.valueEnd, this.locale) : undefined;

        let newFocus: Date | undefined;

        if (!this.justSelectedEnd) {
            if (this.activeField === 'start' && start) {
                newFocus = new Date(start.getFullYear(), start.getMonth(), 1);
            }
            if (this.activeField === 'end' && end) {
                newFocus = new Date(end.getFullYear(), end.getMonth(), 1);
            }
        }

        if (
            newFocus &&
            (newFocus.getFullYear() !== this.focusedDate.getFullYear() ||
                newFocus.getMonth() !== this.focusedDate.getMonth())
        ) {
            this.focusedDate = newFocus;
        }

        this.justSelectedEnd = false;

        if (this.calendar) {
            this.calendar.startDate = start;
            this.calendar.endDate = end;
            this.calendar.focusedDate = this.focusedDate;
            this.calendar.activeField = this.activeField;
            this.calendar.locale = this.locale;
        }
    }

    private get iconSize() {
        switch (this.size) {
            case 'small':
                return '16';
            case 'large':
                return '24';
            default:
                return '20';
        }
    }

    override render() {
        const startDate = this.valueStart ? parseByLocale(this.valueStart, this.locale) : undefined;
        const endDate = this.valueEnd ? parseByLocale(this.valueEnd, this.locale) : undefined;
        const aria = getCalendarAriaLabels(this.locale);

        return html`
            <div class="date-inputs-container ${this.inputsDirection}">
                <ts-date-input-start
                    .value=${this.valueStart}
                    .locale=${this.locale}
                    aria-haspopup="dialog"
                    @click=${(e: MouseEvent) => {
                        this.blockInputClick(e);
                        this.activeField = 'start';
                        this.applyFocus('start');
                        this.onTriggerClick?.(e);
                        this.focusStartInput();
                    }}
                    @input=${this.onInputOrChangeStart}
                    @change=${this.onInputOrChangeStart}
                    @blur=${() => {
                        this.onInputBlur?.();
                        this.onBlurStart?.();
                    }}
                    ${forwardProps(this.forwardedProps)}
                >
                    <ts-icon-button
                        @click=${this.handleTriggerClickStart}
                        slot="suffix"
                        name="calendar_month"
                        label=${aria.calendarIconStart}
                        style-type="rounded"
                        size=${this.iconSize}
                    ></ts-icon-button>
                </ts-date-input-start>

                <ts-date-input-end
                    .value=${this.valueEnd}
                    .locale=${this.locale}
                    aria-haspopup="dialog"
                    @click=${(e: MouseEvent) => {
                        this.blockInputClick(e);
                        this.activeField = 'end';
                        this.applyFocus('end');
                        this.onTriggerClick?.(e);
                        this.focusEndInput();
                    }}
                    @input=${this.onInputOrChangeEnd}
                    @change=${this.onInputOrChangeEnd}
                    @blur=${() => {
                        this.onInputBlur?.();
                        this.onBlurEnd?.();
                    }}
                    ${forwardProps(this.forwardedProps)}
                >
                    <ts-icon-button
                        @click=${this.handleTriggerClickEnd}
                        slot="suffix"
                        name="calendar_month"
                        label=${aria.calendarIconEnd}
                        style-type="rounded"
                        size=${this.iconSize}
                    ></ts-icon-button>
                </ts-date-input-end>
            </div>

            <ts-dialog
                class="date-picker"
                no-header="true"
                no-body-padding
                prevent-overlay-close="true"
                width="auto"
                .open=${this.open}
                @ts-after-hide=${() => (this.open = false)}
            >
                <div class="dialog-header">
                    <div class="label-title">${this.rangeLabel}</div>
                    <div class="label-range">
                        <span class=${this.dialogRangeParts.startClass}>${this.dialogRangeParts.startText}</span>
                        <span> - </span>
                        <span class=${this.dialogRangeParts.endClass}>${this.dialogRangeParts.endText}</span>
                    </div>
                </div>

                ${this.shortcuts.length
                    ? html`
                          <ts-date-shortcuts
                              .shortcuts=${this.shortcuts}
                              .locale=${this.locale}
                              .size=${'small'}
                              @ts-shortcut-select=${this.onShortcutSelected}
                          ></ts-date-shortcuts>
                      `
                    : null}

                <div class="dialog-divider-top"></div>

                <ts-date-calendar-range-mobile
                    .focusedDate=${this.focusedDate}
                    .startDate=${startDate}
                    .endDate=${endDate}
                    .activeField=${this.activeField}
                    .locale=${this.locale}
                    .firstDayOfWeek=${DaysOfWeek.Monday}
                    @ts-month-change=${(e: MonthChangeEvent) => this.monthChangeHandler?.(e)}
                    @ts-date-range-select=${(e: SelectEvent) => this.normalizeRange(e.detail)}
                ></ts-date-calendar-range-mobile>

                <div class="dialog-divider"></div>

                <div class="date-picker__footer-actions">
                    <ts-button variant="text" @click=${this.handleCancelClick}>${this.labels.cancel}</ts-button>
                    <ts-button variant="text" @click=${this.handleOkClick}>${this.labels.ok}</ts-button>
                </div>
            </ts-dialog>
        `;
    }
}

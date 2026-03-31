// -----------------------------------------------
// PUBLIC API EVENTS (OUTGOING)
// -----------------------------------------------
// ts-date-change: unified change event exposing raw & Date objects
// ts-date-apply: fired when the user confirms the selection

// ------------------------------
// INTERNAL EVENTS (INCOMING)
// ------------------------------
// onRangeSelect: internal selection from calendar or dialog
// onInputOrChangeStart: internal start input change
// onInputOrChangeEnd: internal end input change
// onMonthChange: internal month focus change
// onShortcutApply: internal shortcut index selection

import { html } from 'lit';
import { query, state } from 'lit/decorators.js';
import DateFieldRangeComponent from './date-field-range.component.js';
import TsDateDropdownRangeComponent from '../date-dropdown-range/date-dropdown-range.component.js';
import TsDateDialogRangeComponent from '../date-dialog-range/date-dialog-range.component.js';
import { forwardProps } from '../../../utils/directive/forward-props.directive.js';
import { getShortcutRange } from '../../../utils/date/date-shortcuts-utils.js';
import TsTagComponent from '../../tag/src/tag.component.js';
import { fire } from './events-range.helpers.js';
import { formatDateByLocale, parseByLocale } from '../../../utils/date/date-format.js';
import { validateDateValue } from '../../../utils/date/date-validation.js';
import { formatCalendarError } from '../../../utils/date/calendar-i18n.js';

/**
 * @summary Date range picker that allows users to select a start and end date. Uses a
 * dual-calendar dropdown on desktop viewports and a full-screen dialog on mobile. Inherits
 * all shared range-field properties from `DateFieldRangeComponent`.
 * @documentation https://create.tuvsud.com/latest/components/date-range-picker/develop-vo4zlBb4
 * @status stable
 * @since 1.0
 * @access public
 *
 * @dependency ts-date-dropdown-range
 * @dependency ts-date-dialog-range
 * @dependency ts-tag
 *
 * @slot - Default slot inherited from the internal input components for suffix icons.
 *
 * @event ts-date-change - Emitted whenever the start or end date changes. Detail: `{ start, end, locale, meta }`.
 * @event ts-date-apply - Emitted when the user confirms the selection (OK button or shortcut). Detail: `{ start, end, locale, meta }`.
 * @event ts-date-cancel - Emitted when the user cancels the selection. Detail: `{ start, end, locale, meta }`.
 * @event ts-shortcut-select - Re-dispatched when a date shortcut tag is clicked. Detail: `{ index }`.
 *
 * @csspart base - The component's base wrapper (inherited from DateFieldRangeComponent).
 */
export default class TsDateRangeComponent extends DateFieldRangeComponent {
    static override dependencies = {
        'ts-date-dropdown-range': TsDateDropdownRangeComponent,
        'ts-date-dialog-range': TsDateDialogRangeComponent,
        'ts-tag': TsTagComponent,
    };

    @query('ts-date-dropdown-range') private dropdown!: TsDateDropdownRangeComponent;
    @state() private isSmall = false;

    private mql?: MediaQueryList;
    private onResize = () => (this.isSmall = this.mql ? this.mql.matches : false);

    private focused = new Date();
    private initializedFromProp = false;

    // ============================================================================
    // VALIDATION - Following Input Component Pattern
    // ============================================================================
    // Simple approach like ts-input:
    // 1. Validate on change/blur
    // 2. Set error/errorMessage properties
    // 3. Pass errors down to input components
    // 4. Custom validation: Developer sets error/errorMessage directly
    // ============================================================================

    /**
     * Validates a date value and returns error message if invalid.
     * Returns empty string if valid.
     */
    private async getValidationError(value: string, fieldName: 'start' | 'end'): Promise<string> {
        // Skip if empty and not required
        if (!value && !this.required) {
            return '';
        }

        // Native validation: Format and required check
        const result = await validateDateValue(value, {
            locale: this.locale,
            required: this.required,
        });

        if (!result.valid) {
            return result.errors[0]?.message ?? '';
        }

        // Range validation: Check start <= end
        if (fieldName === 'start' && value && this.valueEnd) {
            const startDate = parseByLocale(value, this.locale);
            const endDate = parseByLocale(this.valueEnd, this.locale);

            if (startDate && endDate && startDate > endDate) {
                return formatCalendarError(this.locale, 'startAfterEnd');
            }
        }

        // Range validation: Check end >= start
        if (fieldName === 'end' && value && this.valueStart) {
            const startDate = parseByLocale(this.valueStart, this.locale);
            const endDate = parseByLocale(value, this.locale);

            if (startDate && endDate && endDate < startDate) {
                return formatCalendarError(this.locale, 'endBeforeStart');
            }
        }

        return '';
    }

    /**
     * Validates and updates error state for both fields.
     * Called on change events (input typing or calendar selection).
     */
    private async validateBothFields(): Promise<void> {
        // Validate start date
        if (this.valueStart) {
            const errorMessage = await this.getValidationError(this.valueStart, 'start');
            this.errorStart = !!errorMessage;
            this.errorMessageStart = errorMessage;
        } else if (this.required) {
            // Empty but required
            const errorMessage = await this.getValidationError('', 'start');
            this.errorStart = !!errorMessage;
            this.errorMessageStart = errorMessage;
        } else {
            // Empty and not required - clear error
            this.errorStart = false;
            this.errorMessageStart = '';
        }

        // Validate end date
        if (this.valueEnd) {
            const errorMessage = await this.getValidationError(this.valueEnd, 'end');
            this.errorEnd = !!errorMessage;
            this.errorMessageEnd = errorMessage;
        } else if (this.required) {
            // Empty but required
            const errorMessage = await this.getValidationError('', 'end');
            this.errorEnd = !!errorMessage;
            this.errorMessageEnd = errorMessage;
        } else {
            // Empty and not required - clear error
            this.errorEnd = false;
            this.errorMessageEnd = '';
        }
    }

    private syncFromValue() {
        this.requestUpdate();
    }

    // -----------------------------------------------
    // PUBLIC API EVENTS (OUTGOING)
    // -----------------------------------------------

    // PUBLIC: emits ts-date-change unified event
    private emitUnified() {
        fire(this, 'ts-date-change', this.valueStart || '', this.valueEnd || '', this.locale, this.utc);
    }

    // PUBLIC: emits ts-date-apply
    private emitApply() {
        fire(this, 'ts-date-apply', this.valueStart || '', this.valueEnd || '', this.locale, this.utc);
    }

    // ------------------------------
    // INTERNAL EVENTS (INCOMING)
    // ------------------------------

    // INTERNAL: runs after any internal update
    private onInternalUpdate() {
        this.emitUnified();
    }

    // INTERNAL: calendar month focus change
    private onMonthChange = (e: CustomEvent<{ focused: Date }>) => {
        this.focused = e.detail.focused;
        this.requestUpdate();
    };

    // INTERNAL: main range selection handler
    private onRangeSelect = async (
        e: CustomEvent<{
            start?: string;
            end?: string;
            clearEnd?: boolean;
            clearStart?: boolean;
            preset?: string;
            apply?: boolean;
        }>,
    ) => {
        const { start, end, clearEnd, clearStart, apply } = e.detail;

        const parsedStart = start ? parseByLocale(start, this.locale) : undefined;
        const parsedEnd = end ? parseByLocale(end, this.locale) : undefined;

        if (clearStart) {
            this.valueStart = '';
        } else if (parsedStart) {
            this.valueStart = formatDateByLocale(parsedStart, this.locale);
        }

        if (clearEnd) {
            this.valueEnd = '';
        } else if (parsedEnd) {
            this.valueEnd = formatDateByLocale(parsedEnd, this.locale);
        }

        // Validate after calendar selection
        await this.validateBothFields();

        this.onInternalUpdate();

        if (apply) {
            this.emitApply();
        }
    };

    // INTERNAL: start input direct typing/change
    private onInputOrChangeStart = (e: Event | CustomEvent<{ value: string }>) => {
        this.valueStart = (e as CustomEvent).detail?.value ?? (e.currentTarget as HTMLInputElement | null)?.value ?? '';

        // Don't validate on input - only on blur
        this.onInternalUpdate();
    };

    // INTERNAL: end input direct typing/change
    private onInputOrChangeEnd = (e: Event | CustomEvent<{ value: string }>) => {
        this.valueEnd = (e as CustomEvent).detail?.value ?? (e.currentTarget as HTMLInputElement | null)?.value ?? '';

        // Don't validate on input - only on blur
        this.onInternalUpdate();
    };

    // INTERNAL: validates start input on blur
    private onBlurStart = async () => {
        await this.validateBothFields();
    };

    // INTERNAL: validates end input on blur
    private onBlurEnd = async () => {
        await this.validateBothFields();
    };

    // INTERNAL: sets shortcut range and emits apply + unified
    private onShortcutApply = (e: CustomEvent<{ index: number }>) => {
        const index = e.detail.index;
        const { start, end } = getShortcutRange(index, this.locale);
        this.valueStart = start;
        this.valueEnd = end;
        this.emitUnified();
        this.emitApply();
    };

    override connectedCallback() {
        super.connectedCallback();
        this.mql = window.matchMedia('(max-width: 1024px)');
        this.isSmall = this.mql.matches;
        this.mql.addEventListener('change', this.onResize);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.mql?.removeEventListener('change', this.onResize);
    }

    override willUpdate() {
        if (!this.initializedFromProp) {
            this.syncFromValue();
            this.initializedFromProp = true;
        }
    }

    override render() {
        const commonProps = {
            valueStart: this.valueStart,
            valueEnd: this.valueEnd,
            focused: this.focused,
            locale: this.locale,
            size: this.size,
            disabled: this.disabled,
            forwardedProps: this.forwardedProps,
            onInputOrChangeStart: this.onInputOrChangeStart,
            onInputOrChangeEnd: this.onInputOrChangeEnd,
            onMonthChange: this.onMonthChange,
            onSelect: this.onRangeSelect,
            closeOnSelect: this.closeOnSelect,
            readonly: this.readonly,
            clearable: this.clearable,
            inputsDirection: this.inputsDirection,
            labelVisuallyHidden: this.labelVisuallyHidden,
            shortcuts: this.shortcuts,
            utc: this.utc,
            footerAction: this.footerAction,
            onBlurStart: this.onBlurStart,
            onBlurEnd: this.onBlurEnd,
        };

        return this.isSmall
            ? html`<ts-date-dialog-range
                  .valueStart=${commonProps.valueStart}
                  .valueEnd=${commonProps.valueEnd}
                  .focused=${commonProps.focused}
                  .locale=${commonProps.locale}
                  .size=${commonProps.size}
                  .disabled=${commonProps.disabled}
                  .forwardedProps=${commonProps.forwardedProps}
                  .onInputOrChangeStart=${commonProps.onInputOrChangeStart}
                  .onInputOrChangeEnd=${commonProps.onInputOrChangeEnd}
                  .onMonthChange=${commonProps.onMonthChange}
                  .onSelect=${commonProps.onSelect}
                  .onBlurStart=${commonProps.onBlurStart}
                  .onBlurEnd=${commonProps.onBlurEnd}
                  @ts-shortcut-select=${this.onShortcutApply}
                  .readonly=${commonProps.readonly}
                  .clearable=${commonProps.clearable}
                  ${forwardProps(this.forwardedProps)}
              ></ts-date-dialog-range>`
            : html`<ts-date-dropdown-range
                  .valueStart=${commonProps.valueStart}
                  .valueEnd=${commonProps.valueEnd}
                  .focused=${commonProps.focused}
                  .locale=${commonProps.locale}
                  .size=${commonProps.size}
                  .disabled=${commonProps.disabled}
                  .forwardedProps=${commonProps.forwardedProps}
                  .onInputOrChangeStart=${commonProps.onInputOrChangeStart}
                  .onInputOrChangeEnd=${commonProps.onInputOrChangeEnd}
                  .onMonthChange=${commonProps.onMonthChange}
                  .onSelect=${commonProps.onSelect}
                  .closeOnSelect=${commonProps.closeOnSelect}
                  .readonly=${commonProps.readonly}
                  .clearable=${commonProps.clearable}
                  .footerAction=${commonProps.footerAction}
                  .onBlurStart=${commonProps.onBlurStart}
                  .onBlurEnd=${commonProps.onBlurEnd}
                  @ts-shortcut-select=${this.onShortcutApply}
                  ${forwardProps(this.forwardedProps)}
              ></ts-date-dropdown-range>`;
    }
}

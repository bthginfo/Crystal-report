import { property } from 'lit/decorators.js';
import ComponentElement from '../../../utils/internal/component-element.js';

/**
 * @summary Base class for date-related form fields providing shared props and configuration.
 * @documentation https://create.tuvsud.com/latest/components/date-picker/develop-TSyJ1k6n
 * @status stable
 * @since 1.0
 * @access public
 *
 * @csspart base - The component's main wrapper.
 *
 * @property locale - The active locale for date formatting.
 * @property name - The field name.
 * @property value - The current input value.
 * @property defaultValue - The default input value.
 * @property size - The input size variant.
 * @property label - The input label text.
 * @property helpText - The helper or assistive text.
 * @property clearable - Enables a clear button when true.
 * @property disabled - Disables the input field.
 * @property placeholder - The placeholder text.
 * @property readonly - Makes the field read-only.
 * @property form - The form association name.
 * @property required - Marks the field as required.
 * @property autofocus - Automatically focuses on mount.
 * @property enterkeyhint - Provides a hint for virtual keyboards.
 * @property minYear - Minimum selectable year in date pickers.
 * @property maxYear - Maximum selectable year in date pickers.
 */

export default class DateFieldComponent extends ComponentElement {
    /** The active locale for date formatting and localization. */
    @property({ reflect: true }) locale = 'en';

    /** The field name. */
    @property() name = '';

    /** The current input value. */
    @property() value = '';

    /** The default input value. */
    @property({ type: String, reflect: true, attribute: 'default-value' }) defaultValue = '';

    /** The input size variant. */
    @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /** The input label text. */
    @property() label: string | undefined;

    /** When `true`, the labels are visually hidden but remain accessible to assistive technologies. */
    @property({ type: Boolean, reflect: true, attribute: 'label-visually-hidden' })
    labelVisuallyHidden = false;

    /** The helper or assistive text. */
    @property({ type: String, reflect: true, attribute: 'help-text' }) helpText? = '';

    /** Enables a clear button when true. */
    @property({ type: Boolean, reflect: true }) clearable = false;

    /** Disables the input field. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** The placeholder text. */
    @property() placeholder = '';

    /** Makes the field read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** The form association name. */
    @property() form: string | undefined;

    /** Marks the field as required. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Automatically focuses on mount. */
    @property({ type: Boolean }) override autofocus = false;

    /** Provides a hint for virtual keyboards on what action the enter key should perform. */
    @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;

    /** Draws a pill-style input with rounded edges. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** Uses a filled input style. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** When `true`, dates are handled in UTC rather than the local timezone. */
    @property({ type: Boolean, reflect: true }) utc = true;

    /** Minimum selectable year in date pickers. */
    @property({ type: Number, reflect: true, attribute: 'min-year' }) minYear?: number;

    /** Maximum selectable year in date pickers. */
    @property({ type: Number, reflect: true, attribute: 'max-year' }) maxYear?: number;

    /** Disables selection of past dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-past' }) disablePast = false;

    /** Disables selection of future dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-future' }) disableFuture = false;

    /** The minimum selectable date in `YYYY-MM-DD` format. */
    @property({ type: String, reflect: true, attribute: 'min-date' }) minDate?: string;

    /** The maximum selectable date in `YYYY-MM-DD` format. */
    @property({ type: String, reflect: true, attribute: 'max-date' }) maxDate?: string;

    /** Indicates that the selected date is invalid. */
    @property({ type: Boolean, reflect: true, attribute: 'date-error' }) dateError = false;

    /** The error message to display when the selected date is invalid. */
    @property({ type: String, reflect: true, attribute: 'date-error-message' }) dateErrorMessage?: string;

    /** Disables selection of weekend dates when true. */
    @property({ type: Boolean, reflect: true, attribute: 'disable-weekend' }) disableWeekend = false;

    /** An array of specific dates to disable in `YYYY-MM-DD` format. */
    @property({ type: Array, attribute: 'disable-dates' }) disableDates: string[] = [];

    /** Shows OK/Cancel footer actions. The selection is only confirmed on OK click. */
    @property({ type: Boolean, reflect: true, attribute: 'footer-action' }) footerAction = false;

    /** Closes the dropdown immediately when a date is selected (only when footerAction is false). */
    @property({ type: Boolean, reflect: true, attribute: 'close-on-select' }) closeOnSelect = true;

    protected get forwardedProps() {
        return {
            locale: this.locale,
            name: this.name,
            value: this.value,
            defaultValue: this.defaultValue,
            size: this.size,
            label: this.label,
            helpText: this.helpText,
            clearable: this.clearable,
            disabled: this.disabled,
            placeholder: this.placeholder,
            readonly: this.readonly,
            form: this.form,
            required: this.required,
            autofocus: this.autofocus,
            enterkeyhint: this.enterkeyhint,
            minYear: this.minYear,
            maxYear: this.maxYear,
            pill: this.pill,
            filled: this.filled,
            utc: this.utc,
            disablePast: this.disablePast,
            disableFuture: this.disableFuture,
            minDate: this.minDate,
            maxDate: this.maxDate,
            dateError: this.dateError,
            dateErrorMessage: this.dateErrorMessage,
            disableWeekend: this.disableWeekend,
            disableDates: this.disableDates,
            labelVisuallyHidden: this.labelVisuallyHidden,
            footerAction: this.footerAction,
            closeOnSelect: this.closeOnSelect,
        };
    }
}

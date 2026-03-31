import { property } from 'lit/decorators.js';
import ComponentElement from '../../../utils/internal/component-element.js';

/**
 * @summary Base class for date-related range fields providing shared props and configuration.
 * @documentation https://create.tuvsud.com/latest/components/date-range-picker/develop-vo4zlBb4
 * @status stable
 * @since 1.0
 * @access public
 *
 * @property nameStart - The start field name.
 * @property valueStart - The start input value.
 * @property nameEnd - The end field name.
 * @property valueEnd - The end input value.
 * @property defaultValueStart - The default start input value.
 * @property defaultValueEnd - The default end input value.
 * @property labelStart - The label for the start input.
 * @property labelEnd - The label for the end input.
 * @property locale - The active locale for date formatting.
 * @property size - The input size variant.
 * @property helpText - The helper or assistive text.
 * @property clearable - Enables a clear button.
 * @property disabled - Disables the inputs.
 * @property placeholderStart - The placeholder for the start input.
 * @property placeholderEnd - The placeholder for the end input.
 * @property readonly - Makes the field read-only.
 * @property form - The form association name.
 * @property required - Marks the field as required.
 * @property enterkeyhint - Provides a hint for virtual keyboards.
 * @property pill - Applies pill style.
 * @property filled - Applies filled style.
 * @property errorStart - Indicates an error on the start input.
 * @property errorMessageStart - Error message for the start input.
 * @property errorEnd - Indicates an error on the end input.
 * @property errorMessageEnd - Error message for the end input.
 * @property closeOnSelect - Closes the popup on date selection.
 * @property inputsDirection - Layout direction for the inputs.
 * @property shortcuts - Numeric shortcuts for quick selection.
 * @property labelVisuallyHidden - Hides the labels visually while keeping them accessible.
 * @property utc - When `true`, uses UTC for date calculations.
 * @property footerAction - Shows OK/Cancel footer actions.
 */
export default class DateFieldRangeComponent extends ComponentElement {
    /** The active locale for date formatting and localization. */
    @property({ reflect: true }) locale = 'en';

    /** The name attribute for the start date input field. */
    @property({ type: String, reflect: true, attribute: 'name-start' }) nameStart = '';

    /** The name attribute for the end date input field. */
    @property({ type: String, reflect: true, attribute: 'name-end' }) nameEnd = '';

    /** The current value of the start date input. */
    @property({ type: String, reflect: true, attribute: 'value-start' }) valueStart = '';

    /** The current value of the end date input. */
    @property({ type: String, reflect: true, attribute: 'value-end' }) valueEnd = '';

    /** The default value for the start date input. */
    @property({ type: String, reflect: true, attribute: 'default-value-start' }) defaultValueStart = '';

    /** The default value for the end date input. */
    @property({ type: String, reflect: true, attribute: 'default-value-end' }) defaultValueEnd = '';

    /** The label text for the start date input. */
    @property({ type: String, reflect: true, attribute: 'label-start' }) labelStart: string | undefined;

    /** The label text for the end date input. */
    @property({ type: String, reflect: true, attribute: 'label-end' }) labelEnd: string | undefined;

    /** When `true`, the labels are visually hidden but remain accessible to assistive technologies. */
    @property({ type: Boolean, reflect: true, attribute: 'label-visually-hidden' })
    labelVisuallyHidden = false;

    /** The input size variant. */
    @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /** The helper or assistive text. */
    @property({ type: String, reflect: true, attribute: 'help-text' }) helpText = '';

    /** Enables a clear button to reset the input value. */
    @property({ type: Boolean, reflect: true }) clearable = false;

    /** Disables the inputs. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** The placeholder for the start input. */
    @property({ type: String, attribute: 'placeholder-start' }) placeholderStart = '';

    /** The placeholder for the end input. */
    @property({ type: String, attribute: 'placeholder-end' }) placeholderEnd = '';

    /** Makes the field read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** The form association name. */
    @property() form: string | undefined;

    /** Marks the field as required. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Provides a hint for virtual keyboards on what action the enter key should perform. */
    @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;

    /** Applies pill style to the inputs. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** Applies filled style to the inputs. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** Indicates an error on the start input. */
    @property({ type: Boolean, reflect: true, attribute: 'error-start' }) errorStart = false;

    /** Error message for the start input. */
    @property({ type: String, reflect: true, attribute: 'error-message-start' }) errorMessageStart?: string;

    /** Indicates an error on the end input. */
    @property({ type: Boolean, reflect: true, attribute: 'error-end' }) errorEnd = false;

    /** Error message for the end input. */
    @property({ type: String, reflect: true, attribute: 'error-message-end' }) errorMessageEnd?: string;

    /** Closes the popup when a date is selected. */
    @property({ type: Boolean, reflect: true, attribute: 'close-on-select' }) closeOnSelect = true;

    /** Layout direction for the inputs. */
    @property({ type: String, attribute: 'inputs-direction' }) inputsDirection?: 'horizontal' | 'vertical' | undefined =
        'horizontal';

    /** Numeric shortcuts for quick selection. */
    @property({ type: Array }) shortcuts: number[] = [];

    /** When `true`, uses UTC time for date calculations and formatting. */
    @property({ type: Boolean, reflect: true }) utc = true;

    /** When `true`, indicates that the field is used within a date range picker footer for styling purposes. */
    @property({ type: Boolean, reflect: true, attribute: 'footer-action' })
    footerAction = false;

    protected get forwardedProps() {
        return {
            nameStart: this.nameStart,
            nameEnd: this.nameEnd,
            valueStart: this.valueStart,
            valueEnd: this.valueEnd,
            defaultValueStart: this.defaultValueStart,
            defaultValueEnd: this.defaultValueEnd,
            labelStart: this.labelStart,
            labelEnd: this.labelEnd,
            locale: this.locale,
            size: this.size,
            helpText: this.helpText,
            clearable: this.clearable,
            disabled: this.disabled,
            placeholderStart: this.placeholderStart,
            placeholderEnd: this.placeholderEnd,
            readonly: this.readonly,
            form: this.form,
            required: this.required,
            enterkeyhint: this.enterkeyhint,
            pill: this.pill,
            filled: this.filled,
            errorStart: this.errorStart,
            errorMessageStart: this.errorMessageStart,
            errorEnd: this.errorEnd,
            errorMessageEnd: this.errorMessageEnd,
            closeOnSelect: this.closeOnSelect,
            inputsDirection: this.inputsDirection,
            shortcuts: this.shortcuts,
            labelVisuallyHidden: this.labelVisuallyHidden,
            footerAction: this.footerAction,
        };
    }
}

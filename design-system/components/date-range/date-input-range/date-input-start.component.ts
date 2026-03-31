import { html } from 'lit';
import { property } from 'lit/decorators.js';
import DateFieldRangeComponent from '../src/date-field-range.component.js';
import { TsInput } from '../../input/index.js';
import {
    getDatePlaceholder,
    getDatePattern,
    getDateSeparator,
    maskDateInput,
    parseByLocale,
    formatDateByLocale,
} from '../../../utils/date/date-format.js';

/**
 * @summary Internal masked date input for the **start** date in a range picker. Enforces
 * locale-aware formatting, character restrictions, and auto-validation on blur.
 * Used internally by `ts-date-dropdown-range` and `ts-date-dialog-range`.
 * @documentation https://create.tuvsud.com/latest/components/date-range-picker/develop-vo4zlBb4
 * @status stable
 * @since 1.0
 * @access private
 *
 * @dependency ts-input
 *
 * @slot suffix - Slot for trailing content such as a calendar icon button.
 *
 * @event input - Re-dispatched after masking the raw value. Detail: `{ value }`.
 * @event change - Re-dispatched after masking the raw value. Detail: `{ value }`.
 *
 * @csspart base - The component's base wrapper (inherited from DateFieldRangeComponent).
 */
export default class TsDateInputStart extends DateFieldRangeComponent {
    static override dependencies = { 'ts-input': TsInput };

    /** The current start date input value. */
    @property({ type: String }) override valueStart = '';

    private onBeforeInput(e: InputEvent) {
        if (e.inputType !== 'insertText') return;

        const sep = getDateSeparator(this.locale);
        const ch = e.data ?? '';

        const re = new RegExp(`^[0-9\\${sep}]$`);
        if (!re.test(ch)) {
            e.preventDefault();
            return;
        }

        const path = e.composedPath();
        const input = path.find(n => n instanceof HTMLInputElement) as HTMLInputElement | undefined;
        if (!input) return;

        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const selectedLen = Math.max(0, end - start);

        const nextLen = input.value.length - selectedLen + ch.length;
        if (nextLen > 10) e.preventDefault();
    }

    private onNative(e: Event) {
        const path = e.composedPath?.() ?? [];
        const target = path.find(n => n instanceof HTMLInputElement) as HTMLInputElement | undefined;
        const raw = target?.value ?? '';

        const cleaned = maskDateInput(raw, this.locale);
        if (cleaned !== raw && target) target.value = cleaned;

        this.valueStart = cleaned;
        this.dispatchEvent(
            new CustomEvent(e.type, {
                detail: { value: cleaned },
                bubbles: true,
                composed: false,
            }),
        );
    }

    private onFocusOut(e: FocusEvent) {
        const path = e.composedPath?.() ?? [];
        const input = path.find(n => n instanceof HTMLInputElement) as HTMLInputElement | undefined;

        const raw = input?.value ?? this.valueStart ?? '';
        const d = parseByLocale(raw, this.locale);

        if (d) {
            const formatted = formatDateByLocale(d, this.locale);
            this.valueStart = formatted;
            if (input) input.value = formatted;
        } else {
            this.valueStart = raw;
        }
    }

    private localPlaceholder(): string {
        return this.placeholderStart || getDatePlaceholder(this.locale);
    }

    private localPattern(): string {
        return getDatePattern(this.locale);
    }

    private localMaxLength(): number {
        return 10;
    }

    override updated(changed: Map<string, unknown>) {
        if (changed.has('locale')) {
            const oldLocale = changed.get('locale') as string | undefined;
            const parsed = parseByLocale(this.valueStart, oldLocale ?? this.locale);
            if (parsed) this.valueStart = formatDateByLocale(parsed, this.locale);
        }
    }

    override render() {
        // Only show help text on start input in horizontal layout
        // In vertical layout, help text is shown on end input (last item)
        const showHelpText = this.inputsDirection !== 'vertical' ? this.helpText : '';

        return html`
            <ts-input
                .value=${this.valueStart}
                .size=${this.size}
                .label=${this.labelStart}
                .helpText=${showHelpText}
                ?clearable=${this.clearable}
                ?disabled=${this.disabled}
                .placeholder=${this.localPlaceholder()}
                ?readonly=${this.readonly}
                .name=${this.nameStart}
                .form=${this.form}
                ?required=${this.required}
                .enterkeyhint=${this.enterkeyhint}
                ?pill=${this.pill}
                ?filled=${this.filled}
                .pattern=${this.localPattern()}
                .maxLength=${this.localMaxLength()}
                .inputMode=${'numeric'}
                ?label-visually-hidden=${this.labelVisuallyHidden}
                .error=${this.errorStart}
                .errorMessage=${this.errorMessageStart}
                @beforeinput=${this.onBeforeInput}
                @input=${this.onNative}
                @change=${this.onNative}
                @focusout=${this.onFocusOut}
            >
                <slot name="suffix" slot="suffix"></slot>
            </ts-input>
        `;
    }
}

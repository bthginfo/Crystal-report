import { classMap } from 'lit/directives/class-map.js';
import { html, type PropertyValues } from 'lit';
import { LocalizeController } from '../../../utils/internal/localize.js';
import { property } from 'lit/decorators.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import { TsIconButton } from '../../icon-button/index.js';
import styles from './TsTagStyle.js';
import type { CSSResultGroup } from 'lit';
import { SlotTextNormalizeController } from '../../../utils/slots/SlotTextNormalizeController.js';

/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://create.tuvsud.com/latest/components/tag/develop-HkFpTgIR
 * @status stable
 * @since 1.0
 *
 * @dependency ts-icon-button
 *
 * @slot - The tag's content.
 *
 * @event ts-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, an `<ts-icon-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 */
export default class TsTagComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];
    static override dependencies = { 'ts-icon-button': TsIconButton };

    private readonly localize = new LocalizeController(this);

    // Normalize whitespace in the default slot to prevent layout issues caused by unintended spaces.
    private readonly normalizeLabelSlot = new SlotTextNormalizeController(this, 'slot:not([name])', {
        trim: true,
        collapse: true,
    });

    /** The tag's theme variant. */
    @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text' = 'neutral';

    /** The tag's size. */
    @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /** Draws a pill-style tag with rounded edges. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** Makes the tag removable and shows a remove button. */
    @property({ type: Boolean }) removable = false;

    /** Controls whether the tag has a border. */
    @property({ type: Boolean, reflect: true, attribute: 'has-border' }) hasBorder = true;

    /** Custom background color for the tag. */
    @property({ type: String, reflect: true }) color = '';

    /** Custom font color for the tag text. */
    @property({ type: String, reflect: true, attribute: 'font-color' }) fontColor = '';

    @property({ type: String, reflect: true, attribute: 'border-color' }) borderColor = '';

    private handleRemoveClick() {
        this.emit('ts-remove');
    }

    protected override updated(changedProps: PropertyValues<this>) {
        super.updated(changedProps);

        if (changedProps.has('color')) {
            if (this.color) {
                this.style.setProperty('--ts-tag-bg-color', this.color);
            } else {
                this.style.removeProperty('--ts-tag-bg-color');
            }
        }

        if (changedProps.has('fontColor')) {
            if (this.fontColor) {
                this.style.setProperty('--ts-tag-font-color', this.fontColor);
            } else {
                this.style.removeProperty('--ts-tag-font-color');
            }
        }

        if (changedProps.has('borderColor')) {
            if (this.borderColor) {
                this.style.setProperty('--ts-tag-border-color', this.borderColor);
            } else {
                this.style.removeProperty('--ts-tag-border-color');
            }
        }
    }

    override render() {
        const hasCustomColors = !!(this.color || this.fontColor || this.borderColor);

        return html`
            <span
                part="base"
                class=${classMap({
                    tag: true,
                    'tag--primary': this.variant === 'primary',
                    'tag--success': this.variant === 'success',
                    'tag--neutral': this.variant === 'neutral',
                    'tag--warning': this.variant === 'warning',
                    'tag--danger': this.variant === 'danger',
                    'tag--text': this.variant === 'text',
                    'tag--small': this.size === 'small',
                    'tag--medium': this.size === 'medium',
                    'tag--large': this.size === 'large',
                    'tag--pill': this.pill,
                    'tag--removable': this.removable,
                    'tag--custom': hasCustomColors,
                    'tag--no-border': !this.hasBorder,
                })}
            >
                <slot name="prefix" part="prefix" class="tag__prefix"></slot>
                <slot part="content" class="tag__content"></slot>

                ${this.removable
                    ? html`
                          <ts-icon-button
                              part="remove-button"
                              exportparts="base:remove-button__base"
                              name="x-lg"
                              library="system"
                              label=${this.localize.term('remove')}
                              class="tag__remove"
                              size=${this.size === 'small' ? '14' : this.size === 'medium' ? '20' : '24'}
                              @click=${this.handleRemoveClick}
                          ></ts-icon-button>
                      `
                    : ''}
            </span>
        `;
    }
}

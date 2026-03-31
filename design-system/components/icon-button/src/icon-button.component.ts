import { classMap } from 'lit/directives/class-map.js';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, state } from 'lit/decorators.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import { TsIcon } from '../../icon/index.js';
import styles from './TsIconButtonStyle.js';
import type { CSSResultGroup } from 'lit';

export default class TsIconButtonComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];
    static override dependencies = { 'ts-icon': TsIcon };

    @query('.icon-button') button!: HTMLButtonElement | HTMLLinkElement;

    @state() private hasFocus = false;

    @property() name?: string;
    @property() library?: string;

    /** Container style variant */
    @property({ reflect: true }) variant: 'outline' | 'filled' = 'outline';

    /** Color intent */
    @property({ reflect: true }) intent:
        | 'default'
        | 'primary'
        | 'success'
        | 'accent01'
        | 'accent02'
        | 'neutral'
        | 'warning'
        | 'danger' = 'default';

    /** Corner style */
    @property({ reflect: true, attribute: 'style-type' })
    styleType: 'sharp' | 'rounded' = 'sharp';

    /** Circular shape */
    @property({ type: Boolean, reflect: true }) circle = false;

    /** Soft tinted background */
    @property({ type: Boolean, reflect: true }) tinted = false;
    @property({ type: Boolean, reflect: true }) hover = true;

    @property() src?: string;
    @property() href?: string;
    @property() target?: '_blank' | '_parent' | '_self' | '_top';
    @property() download?: string;
    @property() label = '';

    @property({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
    @property({ attribute: 'aria-labelledby' }) ariaLabelledby: string | null = null;

    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Number, reflect: true }) size = 16;

    private handleBlur() {
        this.hasFocus = false;
        this.emit('ts-blur');
    }

    private handleFocus() {
        this.hasFocus = true;
        this.emit('ts-focus');
    }

    private handleClick(event: MouseEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    override click() {
        this.button.click();
    }

    override focus(options?: FocusOptions) {
        this.button.focus(options);
    }

    override blur() {
        this.button.blur();
    }

    override render() {
        const isLink = !!this.href;
        const tag = isLink ? literal`a` : literal`button`;
        const accessibleName = (this.ariaLabel ?? this.label)?.trim();
        const ariaLabel = accessibleName || undefined;

        return html`
            <${tag}
                    part="base"
                    class=${classMap({
                        'icon-button': true,
                        'icon-button-hover': this.hover,

                        // states
                        'icon-button--disabled': !isLink && this.disabled,
                        'icon-button--focused': this.hasFocus,

                        // variant
                        'icon-button--outline': this.variant === 'outline',
                        'icon-button--filled': this.variant === 'filled',

                        // intent
                        'icon-button--default': this.intent === 'default',
                        'icon-button--primary': this.intent === 'primary',
                        'icon-button--success': this.intent === 'success',
                        'icon-button--accent01': this.intent === 'accent01',
                        'icon-button--accent02': this.intent === 'accent02',
                        'icon-button--neutral': this.intent === 'neutral',
                        'icon-button--warning': this.intent === 'warning',
                        'icon-button--danger': this.intent === 'danger',

                        // shape
                        'icon-button--sharp': this.styleType === 'sharp',
                        'icon-button--rounded': this.styleType === 'rounded',
                        'icon-button--circle': this.circle,

                        // tinted
                        'icon-button--tinted': this.tinted,
                    })}
                    ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
                    type=${ifDefined(isLink ? undefined : 'button')}
                    href=${ifDefined(isLink ? this.href : undefined)}
                    target=${ifDefined(isLink ? this.target : undefined)}
                    download=${ifDefined(isLink ? this.download : undefined)}
                    rel=${ifDefined(isLink && this.target ? 'noreferrer noopener' : undefined)}
                    aria-disabled=${this.disabled ? 'true' : 'false'}
                    aria-label=${ifDefined(ariaLabel)}
                    aria-labelledby=${ifDefined(this.ariaLabelledby)}
                    tabindex=${this.disabled ? '-1' : '0'}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    @click=${this.handleClick}
            >
                <ts-icon
                        part="icon"
                        class="icon-button__icon"
                        name=${this.name}
                        library=${ifDefined(this.library)}
                        src=${ifDefined(this.src)}
                        aria-hidden="true"
                        size=${this.size}
                        variant=${this.variant}
                        style-type=${this.styleType}
                ></ts-icon>
            </${tag}>
        `;
    }
}

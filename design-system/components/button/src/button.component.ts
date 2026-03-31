import { classMap } from 'lit/directives/class-map.js';
import { FormControlController, validValidityState } from '../../../utils/internal/form.js';
import { HasSlotController } from '../../../utils/internal/slot.js';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, state } from 'lit/decorators.js';
import { watch } from '../../../utils/internal/watch.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import { TsIcon } from '../../icon/index.js';
import { TsSpinner } from '../../spinner/index.js';
import styles from './TsButtonStyles.js';
import stylesLink from './TsButtonLinkStyles.js';
import { TsButtonSlottedLinkController } from './TsButtonSlottedLinkController.js';
import type { CSSResultGroup } from 'lit';
import type { ComponentFormControl } from '../../../utils/internal/component-element.js';
import { LocalizeController } from '../../../utils/internal/localize.js';
import { SlotTextNormalizeController } from '../../../utils/slots/SlotTextNormalizeController.js';

/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://create.tuvsud.com/latest/components/button/develop-UvtifbSS
 * @status stable
 * @since 1.0
 *
 * @dependency ts-icon
 * @dependency ts-spinner
 *
 * @event ts-blur - Emitted when the button loses focus.
 * @event ts-focus - Emitted when the button gains focus.
 * @event ts-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, an `<ts-icon>` element.
 * @csspart spinner - The spinner that shows when the button is in the loading state.
 */
export default class TsButtonComponent extends ComponentElement implements ComponentFormControl {
    static override styles: CSSResultGroup = [componentStyles, styles, stylesLink];

    static override dependencies = {
        'ts-icon': TsIcon,
        'ts-spinner': TsSpinner,
    };

    // Normalize whitespace in the default slot to prevent layout issues caused by unintended spaces.
    private readonly normalizeLabelSlot = new SlotTextNormalizeController(this, 'slot:not([name])', {
        trim: true,
        collapse: true,
    });

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ['click'],
    });

    private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');
    private readonly localize = new LocalizeController(this);

    @query('.button') button!: HTMLButtonElement | HTMLAnchorElement;
    @query('slot:not([name])') private defaultSlot!: HTMLSlotElement;

    @state() private hasFocus = false;
    @state() invalid = false;

    /** The button's title attribute. */
    @property() override title = '';

    /** The button's theme variant. */
    @property({ reflect: true }) variant:
        | 'default'
        | 'primary'
        | 'success'
        | 'neutral'
        | 'warning'
        | 'danger'
        | 'navbar'
        | 'accent01'
        | 'accent02'
        | 'text-inverted'
        | 'text' = 'default';

    /** The button's size. */
    @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /** Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. */
    @property({ type: Boolean, reflect: true }) caret = false;

    /** Disables the button. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Draws the button in a loading state. */
    @property({ type: Boolean, reflect: true }) loading = false;

    /** Draws an outlined button. */
    @property({ type: Boolean, reflect: true }) outline = false;

    /** Draws a pill-style button with rounded edges. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /**
     * Draws a circular icon button. When this attribute is present, the button expects a single `<ts-icon>` in the
     * default slot.
     */
    @property({ type: Boolean, reflect: true }) circle = false;

    /**
     * The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native
     * `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.
     */
    @property() type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.
     * This attribute is ignored when `href` is present.
     */
    @property() name = '';

    /**
     * The value of the button, submitted as a pair with the button's name as part of the form data, but only when this
     * button is the submitter. This attribute is ignored when `href` is present.
     */
    @property() value = '';

    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    @property() href = '';

    /** New optional flag to prevent anchor rendering */
    @property({ type: Boolean, reflect: true, attribute: 'prevent-anchor-tag' }) preventAnchorTag = false;

    @property() target!: '_blank' | '_parent' | '_self' | '_top';

    /**
     * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
     * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
     * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
     * setting the attribute to an empty string or a value of your choice, respectively.
     */
    @property() rel = 'noreferrer noopener';

    /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
    @property() download?: string;

    /**
     * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
     * value of this attribute must be an id of a form in the same document or shadow root as the button.
     */
    @property() form!: string;

    /** Used to override the form owner's `action` attribute. */
    @property({ attribute: 'formaction' }) formAction!: string;

    /** Used to override the form owner's `enctype` attribute.  */
    @property({ attribute: 'formenctype' })
    formEnctype!: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

    /** Used to override the form owner's `method` attribute.  */
    @property({ attribute: 'formmethod' }) formMethod!: 'post' | 'get';

    /** Used to override the form owner's `novalidate` attribute. */
    @property({ attribute: 'formnovalidate', type: Boolean }) formNoValidate!: boolean;

    /** Used to override the form owner's `target` attribute. */
    @property({ attribute: 'formtarget' }) formTarget!: '_self' | '_blank' | '_parent' | '_top' | string;

    /** Gets the validity state object */
    get validity() {
        if (this.isButton()) {
            return (this.getButtonElement() as HTMLButtonElement).validity;
        }

        return validValidityState;
    }

    /** Gets the validation message */
    get validationMessage() {
        if (this.isButton()) {
            return (this.getButtonElement() as HTMLButtonElement).validationMessage;
        }

        return '';
    }

    override firstUpdated() {
        if (this.isButton()) {
            this.formControlController.updateValidity();
        }

        this.slottedLinkController.handleSlotChange();
        this.syncSlottedIconSizes();

        this.shadowRoot?.querySelectorAll<HTMLSlotElement>('slot[name="prefix"], slot[name="suffix"]').forEach(slot => {
            slot.addEventListener('slotchange', () => this.syncSlottedIconSizes());
        });
    }

    /** Forces the correct icon size on any ts-icon elements slotted into prefix or suffix. */
    private syncSlottedIconSizes() {
        const iconSize = this.size === 'large' ? 24 : this.size === 'small' ? 16 : 20;

        (['prefix', 'suffix'] as const).forEach(slotName => {
            const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${slotName}"]`);
            slot?.assignedElements({ flatten: true }).forEach(el => {
                if (el.tagName.toLowerCase() === 'ts-icon') {
                    (el as unknown as { size: number }).size = iconSize;
                }
            });
        });
    }

    @watch('size', { waitUntilFirstUpdate: true })
    handleSizeChange() {
        this.syncSlottedIconSizes();
    }

    private handleBlur = () => {
        this.hasFocus = false;
        this.emit('ts-blur');
    };

    private handleFocus = () => {
        this.hasFocus = true;
        this.emit('ts-focus');
    };

    private navigateProgrammatically() {
        if (!this.href) return;

        if (this.target && this.target !== '_self') {
            window.open(this.href, this.target);
        } else {
            window.location.href = this.href;
        }
    }

    private handleClick = (event: MouseEvent) => {
        if (this.disabled || this.loading) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (this.href && this.preventAnchorTag) {
            event.preventDefault();
            this.navigateProgrammatically();
            return;
        }

        if (this.type === 'submit') {
            this.formControlController.submit(this);
        }

        if (this.type === 'reset') {
            this.formControlController.reset(this);
        }
    };

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private isButton() {
        return !this.href;
    }

    private isLink() {
        return !!this.href && !this.preventAnchorTag;
    }

    private getButtonElement(): HTMLButtonElement | HTMLAnchorElement {
        return this.slottedLinkController.getAnchor() ?? this.button;
    }

    private getButtonClasses() {
        return {
            button: true,
            'button--default': this.variant === 'default',
            'button--primary': this.variant === 'primary',
            'button--success': this.variant === 'success',
            'button--neutral': this.variant === 'neutral',
            'button--warning': this.variant === 'warning',
            'button--danger': this.variant === 'danger',
            'button--accent01': this.variant === 'accent01',
            'button--accent02': this.variant === 'accent02',
            'button--navbar': this.variant === 'navbar' || this.variant === 'text-inverted',
            'button--text': this.variant === 'text',
            'button--small': this.size === 'small',
            'button--medium': this.size === 'medium',
            'button--large': this.size === 'large',
            'button--caret': this.caret,
            'button--circle': this.circle,
            'button--disabled': this.disabled,
            'button--focused': this.hasFocus,
            'button--loading': this.loading,
            'button--standard': !this.outline,
            'button--outline': this.outline,
            'button--pill': this.pill,
            'button--rtl': this.localize.dir() === 'rtl',
            'button--has-label': this.hasSlotController.test('[default]'),
            'button--has-prefix': this.hasSlotController.test('prefix'),
            'button--has-suffix': this.hasSlotController.test('suffix'),
        };
    }

    @watch('disabled', { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.isButton()) {
            // Disabled form controls are always valid
            this.formControlController.setValidity(this.disabled);
        }
    }

    /** Simulates a click on the button. */
    override click() {
        this.getButtonElement().click();
    }

    /** Sets focus on the button. */
    override focus(options?: FocusOptions) {
        this.getButtonElement().focus(options);
    }

    /** Removes focus from the button. */
    override blur() {
        this.getButtonElement().blur();
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        if (this.isButton()) {
            return (this.getButtonElement() as HTMLButtonElement).checkValidity();
        }

        return true;
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        if (this.isButton()) {
            return (this.getButtonElement() as HTMLButtonElement).reportValidity();
        }

        return true;
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        if (this.isButton()) {
            (this.getButtonElement() as HTMLButtonElement).setCustomValidity(message);
            this.formControlController.updateValidity();
        }
    }

    private readonly slottedLinkController = new TsButtonSlottedLinkController(this, {
        getDefaultSlot: () => this.defaultSlot,
        getButtonClasses: () => this.getButtonClasses(),
        onClick: this.handleClick,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        isLink: () => this.isLink(),
    });

    override render() {
        const renderAsLink = this.isLink();
        const tag = renderAsLink ? literal`a` : literal`button`;
        const size = this.size === 'medium' ? '20' : this.size === 'large' ? '24' : '16';

        if (renderAsLink && this.slottedLinkController.hasSlottedAnchor) {
            return html`<slot @slotchange=${this.slottedLinkController.handleSlotChange}></slot>`;
        }

        return html`
            <${tag}
                    part="base"
                    class=${classMap(this.getButtonClasses())}
                    ?disabled=${ifDefined(renderAsLink ? undefined : this.disabled)}
                    type=${ifDefined(renderAsLink ? undefined : this.type)}
                    title=${this.title}
                    name=${ifDefined(renderAsLink ? undefined : this.name)}
                    value=${ifDefined(renderAsLink ? undefined : this.value)}
                    href=${ifDefined(renderAsLink && !this.disabled ? this.href : undefined)}
                    target=${ifDefined(renderAsLink ? this.target : undefined)}
                    download=${ifDefined(renderAsLink ? this.download : undefined)}
                    rel=${ifDefined(renderAsLink ? this.rel : undefined)}
                    role=${ifDefined(renderAsLink ? undefined : 'button')}
                    aria-disabled=${this.disabled ? 'true' : 'false'}
                    tabindex=${this.disabled ? '-1' : '0'}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    @invalid=${this.isButton() ? this.handleInvalid : null}
                    @click=${this.handleClick}
            >
                <slot name="prefix" part="prefix" class="button__prefix"></slot>
                <slot
                        part="label"
                        class="button__label"
                        @slotchange=${this.slottedLinkController.handleSlotChange}
                ></slot>
                <slot name="suffix" part="suffix" class="button__suffix"></slot>

                ${
                    this.caret
                        ? html`
                              <ts-icon
                                  size=${size}
                                  part="caret"
                                  class="button__caret"
                                  name="keyboard_arrow_down"
                              ></ts-icon>
                          `
                        : ''
                }

                ${this.loading ? html`<ts-spinner part="spinner"></ts-spinner>` : ''}
            </${tag}>
        `;
    }
}

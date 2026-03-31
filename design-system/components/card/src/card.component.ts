import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../../utils/internal/slot.js';
import { html } from 'lit';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import styles from './TsCardStyles.js';
import type { CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { SlotTextNormalizeController } from '../../../utils/slots/SlotTextNormalizeController.js';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://create.tuvsud.com/latest/components/card/develop-ByPoppKi
 * @status stable
 * @since 1.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for the card's edges.
 * @cssproperty --border-width - The width of the card's borders.
 * @cssproperty --padding - The padding to use for the card's sections.
 */

export default class TsCardComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];

    // Normalize whitespace in the default slot to prevent layout issues caused by unintended spaces.
    private readonly normalizeLabelSlot = new SlotTextNormalizeController(this, 'slot:not([name])', {
        trim: true,
        collapse: true,
    });

    /** When `true`, a divider is shown between the card's sections. */
    @property({
        reflect: true,
        attribute: 'show-divider',
        converter: {
            fromAttribute: v => v !== 'false',
            toAttribute: v => (v ? null : 'false'),
        },
    })
    showDivider = true;

    /** Optional URL to direct the user to when the card is activated. When set, the card becomes clickable. */
    @property({ type: String }) href?: string;

    /** Tells the browser where to open the link. Only used when `href` is set. */
    @property({ type: String }) target?: string;

    /** When `true`, prevents `rel="noopener"` from being added to links that open in a new tab. Only used when `href` is set and `target="_blank"`. */
    @property({ type: Boolean, attribute: 'nopopper' }) nopopper = false;

    private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');

    private isFromInteractive(ev: Event) {
        const sel = [
            'a',
            'button',
            'input',
            'select',
            'textarea',
            'summary',
            'details',
            '[role="button"]',
            '[contenteditable="true"]',
        ].join(',');
        const path = ev.composedPath() as Element[];
        return path.some(el => el instanceof Element && (el.matches(sel) || !!el.closest(sel)));
    }

    private navigate(ev?: MouseEvent | KeyboardEvent) {
        if (!this.href) return;
        const newTab = ev instanceof MouseEvent ? ev.button === 1 || ev.metaKey || ev.ctrlKey : false;
        const tgt = newTab ? '_blank' : this.target || '_self';
        if (tgt === '_blank' && this.nopopper) {
            const w = window.open(this.href, '_blank', 'noopener,noreferrer');
            if (w) w.opener = null;
        } else {
            window.open(this.href, tgt);
        }
    }

    private onClick = (ev: MouseEvent) => {
        if (!this.href) return;
        if (this.isFromInteractive(ev)) return;
        this.navigate(ev);
    };

    private onKeyDown = (ev: KeyboardEvent) => {
        if (!this.href) return;
        if (this.isFromInteractive(ev)) return;
        if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            this.navigate(ev);
        }
    };

    private renderContent() {
        return html`
            <slot name="image" part="image" class="card__image"></slot>
            <slot name="header" part="header" class="card__header"></slot>
            <slot part="body" class="card__body"></slot>
            <slot name="footer" part="footer" class="card__footer"></slot>
        `;
    }

    override render() {
        const clickable = !!this.href;
        return html`
            <div
                part="base"
                class=${classMap({
                    card: true,
                    'card--has-footer': this.hasSlotController.test('footer'),
                    'card--has-image': this.hasSlotController.test('image'),
                    'card--has-header': this.hasSlotController.test('header'),
                    'card--no-divider': !this.showDivider,
                    'card--clickable': clickable,
                })}
                role=${clickable ? 'link' : 'group'}
                tabindex=${clickable ? '0' : '-1'}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
            >
                ${this.renderContent()}
            </div>
        `;
    }
}

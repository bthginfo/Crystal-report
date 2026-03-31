import { html } from 'lit';
import { LocalizeController } from '../../../utils/internal/localize.js';
import { property, query, state } from 'lit/decorators.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import styles from './TsProgressRingStyles.js';
import type { CSSResultGroup } from 'lit';
import { SlotTextNormalizeController } from '../../../utils/slots/SlotTextNormalizeController.js';

/**
 * @summary Progress rings are used to show the progress of a determinate operation in a circular fashion.
 * @documentation https://create.tuvsud.com/latest/components/progress-ring/develop-TSsUbOqj
 * @status stable
 * @since 1.0
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-width - The width of the indicator. Defaults to the track width.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --indicator-transition-duration - The duration of the indicator's transition when the value changes.
 */
export default class TsProgressRingComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];

    private readonly localize = new LocalizeController(this);

    // Normalize whitespace in the default slot to prevent layout issues caused by unintended spaces.
    private readonly normalizeLabelSlot = new SlotTextNormalizeController(this, 'slot:not([name])', {
        trim: true,
        collapse: true,
    });

    @query('.progress-ring__indicator') indicator!: SVGCircleElement;

    @state() indicatorOffset!: string;

    /** The current progress as a percentage, 0 to 100. */
    @property({ type: Number, reflect: true }) value = 0;

    /** A custom label for assistive devices. */
    @property() label = '';

    override updated(changedProps: Map<string, unknown>) {
        super.updated(changedProps);

        //
        // This block is only required for Safari because it doesn't transition the circle when the custom properties
        // change, possibly because of a mix of pixel + unit-less values in the calc() function. It seems like a Safari bug,
        // but I couldn't pinpoint it so this works around the problem.
        //
        if (changedProps.has('value')) {
            const radius = parseFloat(getComputedStyle(this.indicator).getPropertyValue('r'));
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (this.value / 100) * circumference;

            this.indicatorOffset = `${offset}px`;
        }
    }

    override render() {
        return html`
            <div
                part="base"
                class="progress-ring"
                role="progressbar"
                aria-label=${this.label.length > 0 ? this.label : this.localize.term('progress')}
                aria-describedby="label"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${this.value}"
                style="--percentage: ${this.value / 100}"
            >
                <svg class="progress-ring__image">
                    <circle class="progress-ring__track"></circle>
                    <circle
                        class="progress-ring__indicator"
                        style="stroke-dashoffset: ${this.indicatorOffset}"
                    ></circle>
                </svg>

                <slot id="label" part="label" class="progress-ring__label"></slot>
            </div>
        `;
    }
}

import { html } from 'lit';
import { LocalizeController } from '../../../utils/internal/localize.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import styles from './TsSpinnerStyle.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @documentation https://create.tuvsud.com/latest/components/spinner/develop-1YkpDe5b
 * @status stable
 * @since 1.0
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
export default class TsSpinnerComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];

    private readonly localize = new LocalizeController(this);

    override render() {
        return html`
            <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term('loading')}>
                <circle class="spinner__track"></circle>
                <circle class="spinner__indicator"></circle>
            </svg>
        `;
    }
}

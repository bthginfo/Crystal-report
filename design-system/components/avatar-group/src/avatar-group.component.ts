import { html } from 'lit';
import { property, state, queryAssignedElements } from 'lit/decorators.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import type { CSSResultGroup } from 'lit';
import styles from './TsAvatarGroupStyle.js';
import { TsAvatar } from '../../avatar/index.js';

/**
 * @summary Avatar Group are used to represent a person or object.
 * @documentation https://create.tuvsud.com/latest/components/avatar/develop-noEc9UZw
 * @status stable
 * @since 1.0
 *
 * @dependency ts-avatar
 *
 * @cssproperty --size - The size of the avatar.
 * @cssproperty --overlap - The overlap distance between avatars.
 * @cssproperty --avatar-group-ring-width - The width of the ring around each avatar in the group.
 * @cssproperty --avatar-group-ring-color - The color of the ring around each avatar in the group.
 *
 */
export default class TsAvatarComponentGroup extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];
    static override dependencies = {
        'ts-avatar': TsAvatar,
    };

    /** The shape of the avatars in the group. */
    @property({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

    /** The maximum number of avatars to display. Excess avatars will be hidden and represented by a "+X" avatar. Set to 0 to show all avatars. */
    @property({ type: Number, reflect: true }) max = 0;

    /** The overlap distance between avatars. */
    @property({ reflect: true }) overlap = '0.75rem';

    @state() private hiddenCount = 0;

    @queryAssignedElements({ flatten: true, selector: 'ts-avatar' }) private avatars!: HTMLElement[];

    private sync() {
        const items = this.avatars ?? [];
        const limit = this.max > 0 ? this.max : items.length;

        items.forEach((a, i) => {
            a.setAttribute('shape', this.shape);
            (a as HTMLElement).style.display = i < limit ? '' : 'none';
            (a as HTMLElement).style.setProperty('--ts-avatar-ring-width', 'var(--avatar-group-ring-width)');
            (a as HTMLElement).style.setProperty('--ts-avatar-ring-color', 'var(--avatar-group-ring-color)');
            (a as HTMLElement).style.zIndex = String(i + 1);
        });

        this.hiddenCount = Math.max(0, items.length - limit);
    }

    protected override firstUpdated() {
        this.style.setProperty('--overlap', this.overlap);
        this.sync();
    }

    protected override updated(changed: Map<string, unknown>) {
        if (changed.has('overlap')) this.style.setProperty('--overlap', this.overlap);
        if (changed.has('shape') || changed.has('max') || changed.has('overlap')) this.sync();
    }

    override render() {
        return html`
            <div part="base" class="group" role="group">
                <slot @slotchange=${this.sync}></slot>
                ${this.hiddenCount > 0
                    ? html`<ts-avatar
                          class="overflow"
                          shape=${this.shape}
                          initials="+${this.hiddenCount}"
                          label="${this.hiddenCount} more"
                          style="z-index: ${String((this.avatars?.length ?? 0) + 1)};"
                      ></ts-avatar>`
                    : null}
            </div>
        `;
    }
}

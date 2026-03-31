import { html } from 'lit';
import { query } from 'lit/decorators.js';
import componentStyles from '../../../utils/styles/component-style.js';
import ComponentElement from '../../../utils/internal/component-element.js';
import styles from './TsMenuStyles.js';
import type { CSSResultGroup } from 'lit';
import type { TsMenuItem } from '../../menu-item/index.js';

/**
 * @summary Menus provide a list of options for the user to choose from.
 * @documentation https://create.tuvsud.com/latest/components/menu/develop-aTztVlqe
 * @status stable
 * @since 1.0
 *
 * @slot - The menu's content, including menu items, menu labels, and dividers.
 *
 * @event {{ item: TsMenuItem }} ts-select - Emitted when a menu item is selected.
 */

type PopupLike = Element & { active: boolean };

type MenuItemWithRenderRoot = TsMenuItem & {
    renderRoot: DocumentFragment;
    requestUpdate(): void;
};

type MenuLike = TsMenuComponent & {
    getAllItems(): TsMenuItem[];
    setCurrentItem(item: TsMenuItem): void;
};

export default class TsMenuComponent extends ComponentElement {
    static override styles: CSSResultGroup = [componentStyles, styles];

    @query('slot') defaultSlot!: HTMLSlotElement;

    private onDocPointerDown = (event: PointerEvent) => {
        const path = event.composedPath();
        if (path.includes(this)) return;
        this.resetToRoot();
    };

    override connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'menu');
        document.addEventListener('pointerdown', this.onDocPointerDown, true);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('pointerdown', this.onDocPointerDown, true);
    }

    private resetToRoot() {
        const allMenuItems = Array.from(this.querySelectorAll('ts-menu-item')) as MenuItemWithRenderRoot[];

        for (const item of allMenuItems) {
            const popup = item?.renderRoot?.querySelector?.('ts-popup') as PopupLike | undefined;
            if (popup && popup.active) {
                popup.active = false;
                item.requestUpdate?.();
            }
        }

        const allMenus = [this, ...Array.from(this.querySelectorAll('ts-menu'))] as MenuLike[];
        for (const menu of allMenus) {
            const items = menu.getAllItems?.() as TsMenuItem[] | undefined;
            if (items && items.length > 0) {
                menu.setCurrentItem?.(items[0]!);
            }
        }
    }

    private handleClick(event: MouseEvent) {
        const menuItemTypes = ['menuitem', 'menuitemcheckbox'];

        const composedPath = event.composedPath();
        const target = composedPath.find(el => {
            return el instanceof Element && menuItemTypes.includes(el.getAttribute('role') || '');
        });

        if (!target) return;

        const closestMenu = composedPath.find(el => {
            return el instanceof Element && el.getAttribute('role') === 'menu';
        });

        const clickHasSubmenu = closestMenu !== this;

        // Make sure we're the menu that supposed to be handling the click event.
        if (clickHasSubmenu) return;

        // This isn't true. But we use it for TypeScript checks below.
        const item = target as TsMenuItem;

        if (item.type === 'checkbox') {
            item.checked = !item.checked;
        }

        this.emit('ts-select', { detail: { item } });
    }

    private handleKeyDown(event: KeyboardEvent) {
        // Make a selection when pressing enter or space
        if (event.key === 'Enter' || event.key === ' ') {
            const item = this.getCurrentItem();
            event.preventDefault();
            event.stopPropagation();

            // Simulate a click to support @click handlers on menu items that also work with the keyboard
            item?.click();
        } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            const items = this.getAllItems();
            const activeItem = this.getCurrentItem();
            let index = activeItem ? items.indexOf(activeItem) : 0;

            if (items.length > 0) {
                event.preventDefault();
                event.stopPropagation();

                if (event.key === 'ArrowDown') index++;
                else if (event.key === 'ArrowUp') index--;
                else if (event.key === 'Home') index = 0;
                else if (event.key === 'End') index = items.length - 1;

                if (index < 0) index = items.length - 1;
                if (index > items.length - 1) index = 0;

                this.setCurrentItem(items[index]!);
                items[index]!.focus();
            }
        }
    }

    private handleMouseDown(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (this.isMenuItem(target)) {
            this.setCurrentItem(target as TsMenuItem);
        }
    }

    private handleSlotChange() {
        const items = this.getAllItems();

        // Reset the roving tab index when the slotted items change
        if (items.length > 0) {
            this.setCurrentItem(items[0]!);
        }
    }

    private isMenuItem(item: HTMLElement) {
        return (
            item.tagName.toLowerCase() === 'ts-menu-item' ||
            ['menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(item.getAttribute('role') ?? '')
        );
    }

    /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
    getAllItems() {
        return this.defaultSlot.assignedElements({ flatten: true }).filter((el): el is TsMenuItem => {
            return el instanceof HTMLElement && !el.inert && this.isMenuItem(el);
        });
    }

    /**
     * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
     * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
     */
    getCurrentItem() {
        return this.getAllItems().find(i => i.getAttribute('tabindex') === '0');
    }

    /**
     * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
     * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
     */
    setCurrentItem(item: TsMenuItem) {
        const items = this.getAllItems();

        // Update tab indexes
        items.forEach(i => {
            i.setAttribute('tabindex', i === item ? '0' : '-1');
        });
    }

    override render() {
        return html`
            <slot
                @slotchange=${this.handleSlotChange}
                @click=${this.handleClick}
                @keydown=${this.handleKeyDown}
                @mousedown=${this.handleMouseDown}
            ></slot>
        `;
    }
}

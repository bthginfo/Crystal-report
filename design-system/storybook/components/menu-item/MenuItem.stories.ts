import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsMenuItem } from '@tuvsud/design-system/menu-item';
import '@tuvsud/design-system/menu';
import '@tuvsud/design-system/menu-item';

const meta = {
    title: 'Components/Menu Item',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Menu items are interactive elements within a menu that allow users to select an option or trigger an action. They are always used as part of a Menu Group to ensure proper structure and accessibility.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(disabled|loading|checked)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-menu>
            <ts-menu-item
                .type=${args.type}
                type=${args.type}
                .checked=${args.checked}
                ?checked=${args.checked}
                .value=${args.value}
                value=${ifDefined(args.value)}
                .loading=${args.loading}
                ?loading=${args.loading}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                >${args.label}</ts-menu-item
            >
        </ts-menu>
    `,
    args: {
        type: 'normal',
        checked: false,
        value: '',
        loading: false,
        disabled: false,
        label: 'Menu item',
    },
    argTypes: {
        type: { control: 'select', options: ['normal', 'checkbox'], description: 'The type of menu item to render.' },
        checked: { control: 'boolean', description: 'Draws the item in a checked state. Only when type="checkbox".' },
        value: { control: 'text', description: 'A unique value to identify the menu item when selected.' },
        loading: { control: 'boolean', description: 'Draws the menu item in a loading state.' },
        disabled: { control: 'boolean', description: 'Prevents selection when true.' },
        label: { control: 'text', description: 'Visible text content of the menu item.' },
    },
} satisfies MetaWithLabel<TsMenuItem>;

export default meta;
type Story = StoryObjWithLabel<TsMenuItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the menu item is of `normal` type and enabled.',
            },
        },
    },
};

import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsDropdown } from '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/menu';
import '@tuvsud/design-system/menu-item';
import '@tuvsud/design-system/divider';
import '@tuvsud/design-system/avatar';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Dropdown',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Dropdowns expose extra content by expanding a panel that “drops down” from a trigger element.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(open|hoist|disabled|stay-open-on-select)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-dropdown
            .open=${args.open}
            ?open=${args.open}
            .placement=${args.placement}
            placement=${args.placement}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .stayOpenOnSelect=${args.stayOpenOnSelect}
            ?stay-open-on-select=${args.stayOpenOnSelect}
            .distance=${args.distance}
            distance=${args.distance}
            .skidding=${args.skidding}
            skidding=${args.skidding}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
            .sync=${args.sync}
            sync=${args.sync ?? ''}
            .containingElement=${args.containingElement}
            style="height: 180px"
        >
            <ts-button slot="trigger" caret>Dropdown</ts-button>
            <ts-menu>
                <ts-menu-item>Option 1</ts-menu-item>
                <ts-menu-item>Option 2</ts-menu-item>
                <ts-menu-item>Option 3</ts-menu-item>
                <ts-divider></ts-divider>
                <ts-menu-item>Separated Option</ts-menu-item>
            </ts-menu>
        </ts-dropdown>
    `,
    args: {
        open: false,
        placement: 'bottom-start',
        disabled: false,
        stayOpenOnSelect: false,
        distance: 0,
        skidding: 0,
        hoist: false,
        sync: undefined,
        containingElement: undefined,
    },
    argTypes: {
        open: {
            control: 'boolean',
            description:
                'Indicates whether or not the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you can use the show() and hide() methods and this attribute will reflect the dropdown’s open state.',
        },
        placement: {
            control: 'select',
            description:
                'The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel inside of the viewport.',
            options: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'right',
                'right-start',
                'right-end',
                'left',
                'left-start',
                'left-end',
            ],
        },
        disabled: { control: 'boolean', description: 'Disables the dropdown so the panel will not open.\t\t' },
        stayOpenOnSelect: {
            control: 'boolean',
            description:
                'By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for dropdowns that allow for multiple interactions.',
        },
        distance: {
            control: 'number',
            description: 'The distance in pixels from which to offset the panel away from its trigger.',
        },
        skidding: {
            control: 'number',
            description: 'The distance in pixels from which to offset the panel along its trigger.',
        },
        hoist: {
            control: 'boolean',
            description:
                'Enable this option to prevent the panel from being clipped when the component is placed inside a container with overflow: auto|scroll. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.',
        },
        sync: {
            control: 'select',
            options: [undefined, 'width', 'height'],
            description: 'Syncs the popup width or height to that of the trigger element.',
        },
        containingElement: {
            control: false,
            description:
                'The dropdown will close when the user interacts outside of this element (e.g. clicking). Useful for composing other components that use a dropdown internally.',
        },
    },
} satisfies MetaWithLabel<TsDropdown>;

export default meta;
type Story = StoryObjWithLabel<TsDropdown>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default dropdown with several menu options.',
            },
        },
    },
};

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A dropdown with menu items that include icons.',
            },
        },
    },
    render: args => html`
        <ts-dropdown
            .open=${args.open}
            ?open=${args.open}
            .placement=${args.placement}
            placement=${args.placement}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .stayOpenOnSelect=${args.stayOpenOnSelect}
            ?stay-open-on-select=${args.stayOpenOnSelect}
            .distance=${args.distance}
            distance=${args.distance}
            .skidding=${args.skidding}
            skidding=${args.skidding}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
            .sync=${args.sync}
            sync=${args.sync ?? ''}
            .containingElement=${args.containingElement}
            style="height: 180px"
        >
            <ts-button slot="trigger" caret>Menu</ts-button>
            <ts-menu>
                <ts-menu-item><ts-icon slot="prefix" name="home"></ts-icon>Home</ts-menu-item>
                <ts-menu-item><ts-icon slot="prefix" name="settings"></ts-icon>Settings</ts-menu-item>
                <ts-menu-item><ts-icon slot="prefix" name="person"></ts-icon>Profile</ts-menu-item>
                <ts-divider></ts-divider>
                <ts-menu-item><ts-icon slot="prefix" name="logout"></ts-icon>Sign Out</ts-menu-item>
            </ts-menu>
        </ts-dropdown>
    `,
};

export const Nested: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A dropdown with nested sub-menus for additional options.',
            },
        },
    },
    args: { hoist: true },
    render: args => html`
        <ts-dropdown
            .open=${args.open}
            ?open=${args.open}
            .placement=${args.placement}
            placement=${args.placement}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .stayOpenOnSelect=${args.stayOpenOnSelect}
            ?stay-open-on-select=${args.stayOpenOnSelect}
            .distance=${args.distance}
            distance=${args.distance}
            .skidding=${args.skidding}
            skidding=${args.skidding}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
            .sync=${args.sync}
            sync=${args.sync ?? ''}
            .containingElement=${args.containingElement}
            style="height: 200px"
        >
            <ts-button slot="trigger" caret>Nested</ts-button>
            <ts-menu>
                <ts-menu-item>Item 1</ts-menu-item>
                <ts-menu-item>Item 2</ts-menu-item>
                <ts-menu-item>
                    More Options
                    <ts-menu slot="submenu">
                        <ts-menu-item>Sub-item 1</ts-menu-item>
                        <ts-menu-item>Sub-item 2</ts-menu-item>
                        <ts-menu-item>
                            Even More
                            <ts-menu slot="submenu">
                                <ts-menu-item>Deep Option 1</ts-menu-item>
                                <ts-menu-item>Deep Option 2</ts-menu-item>
                            </ts-menu>
                        </ts-menu-item>
                    </ts-menu>
                </ts-menu-item>
            </ts-menu>
        </ts-dropdown>
    `,
};

export const CustomTrigger: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Dropdown using a custom trigger element (an avatar in this case).',
            },
        },
    },
    render: args => html`
        <ts-dropdown
            .open=${args.open}
            ?open=${args.open}
            .placement=${args.placement}
            placement=${args.placement}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .stayOpenOnSelect=${args.stayOpenOnSelect}
            ?stay-open-on-select=${args.stayOpenOnSelect}
            .distance=${args.distance}
            distance=${args.distance}
            .skidding=${args.skidding}
            skidding=${args.skidding}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
            .sync=${args.sync}
            sync=${args.sync ?? ''}
            .containingElement=${args.containingElement}
            style="height: 180px"
        >
            <div slot="trigger" style="cursor: pointer; user-select: none;">
                <ts-avatar
                    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=300"
                    label="Custom trigger"
                ></ts-avatar>
            </div>
            <ts-menu>
                <ts-menu-item>View Profile</ts-menu-item>
                <ts-menu-item>Settings</ts-menu-item>
                <ts-divider></ts-divider>
                <ts-menu-item>Sign Out</ts-menu-item>
            </ts-menu>
        </ts-dropdown>
    `,
};

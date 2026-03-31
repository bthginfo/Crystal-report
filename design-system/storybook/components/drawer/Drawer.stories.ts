import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsDrawer } from '@tuvsud/design-system/drawer';
import '@tuvsud/design-system/drawer';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/accordion';
import '@tuvsud/design-system/accordion-item';

type TsDrawerWithArgs = TsDrawer & { size?: string };

const meta = {
    title: 'Components/Drawer',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Drawers smoothly slide into view from their container, offering extra options and information while keeping the user in context.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(open|contained|no-header)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="min-height: 400px;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This is the drawer content.
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Drawer</ts-button>
            </div>
        `;
    },
    args: {
        open: false,
        label: 'Drawer',
        placement: 'end',
        contained: false,
        noHeader: false,
        size: '25rem',
    },
    argTypes: {
        open: {
            control: 'boolean',
            description:
                'Indicates whether or not the drawer is open. Can be toggled via attribute or show()/hide() methods.',
        },
        label: {
            control: 'text',
            description:
                'The drawer’s label shown in the header. Provide a meaningful label even with no-header; use the `label` slot for HTML.',
        },
        placement: {
            control: { type: 'select' },
            options: ['top', 'end', 'bottom', 'start'],
            description: 'The direction from which the drawer will open.',
        },
        contained: {
            control: 'boolean',
            description:
                'Slides the drawer out of its parent instead of the viewport. Add position: relative to the parent.',
        },
        noHeader: {
            control: 'boolean',
            description: 'Removes the header and default close button. Ensure an accessible way to dismiss the drawer.',
        },
        size: {
            control: 'text',
            description: 'Sets the drawer size via the --size custom property (e.g., 25rem, 40vw).',
        },
        modal: {
            control: false,
            table: { disable: false },
            description:
                'Exposes the internal modal utility for focus trapping. Use modal.activateExternal()/deactivateExternal() for third-party modals.',
        },
    },
} satisfies MetaWithLabel<TsDrawerWithArgs>;

export default meta;
type Story = StoryObjWithLabel<TsDrawerWithArgs>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default drawer slides in from the end (right) and contains a header with a title and close button, content area, and footer with a close button.',
            },
        },
    },
    args: {},
};

export const Position: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` property to start | end | top | bottom.',
            },
        },
    },
    args: { placement: 'end' },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="min-height: 400px;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This drawer slides in from the end (right).
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Drawer</ts-button>
            </div>
        `;
    },
};

export const Start: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, drawers slide in from the end. To make the drawer slide in from the start, set the placement property to `start`',
            },
        },
    },
    args: { placement: 'start' },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="min-height: 400px;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This drawer slides in from the start (left).
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Drawer</ts-button>
            </div>
        `;
    },
};

export const Top: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, drawers slide in from the end. To make the drawer slide in from the top, set the placement property to `top`',
            },
        },
    },
    args: { placement: 'top' },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="min-height: 400px;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This drawer slides in from the top.
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Drawer</ts-button>
            </div>
        `;
    },
};

export const Bottom: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, drawers slide in from the end. To make the drawer slide in from the bottom, set the placement property to `bottom`',
            },
        },
    },
    args: { placement: 'bottom' },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="min-height: 400px;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This drawer slides in from the bottom.
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Drawer</ts-button>
            </div>
        `;
    },
};

export const Contained: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, drawers slide out of their containing block, which is usually the viewport. To make a drawer slide out of a parent element, add the contained attribute to the drawer and apply position: relative to its parent.',
            },
        },
    },
    args: { contained: true },
    render: args => {
        const drawerRef = createRef<TsDrawer>();
        return html`
            <div style="position: relative; border: solid 2px; height: 400px; padding: 1rem;">
                <ts-drawer
                    ${ref(drawerRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .placement=${args.placement}
                    placement=${args.placement}
                    .contained=${args.contained}
                    ?contained=${args.contained}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    style="--size: ${args.size}"
                >
                    This drawer is contained within its parent element.
                    <ts-button slot="footer" variant="primary" @click=${() => drawerRef.value?.hide()}>Close</ts-button>
                </ts-drawer>
                <ts-button @click=${() => drawerRef.value?.show()}>Open Contained Drawer</ts-button>
            </div>
        `;
    },
};

import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsDialog } from '@tuvsud/design-system/dialog';
import '@tuvsud/design-system/dialog';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Dialog',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Dialogs, sometimes called “modals”, appear above the page and require the user’s immediate attention.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(open|no-header|prevent-overlay-close)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const dialogRef = createRef<TsDialog>();
        return html`
            <div style="height: 300px">
                <ts-dialog
                    ${ref(dialogRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                    .preventOverlayClose=${args.preventOverlayClose}
                    ?prevent-overlay-close=${args.preventOverlayClose}
                >
                    Default dialog content.
                    <ts-button slot="footer" variant="primary" @click=${() => dialogRef.value?.hide()}>Close</ts-button>
                </ts-dialog>

                <ts-button @click=${() => dialogRef.value?.show()}>Open Dialog</ts-button>
            </div>
        `;
    },
    args: {
        open: false,
        label: 'Dialog',
        noHeader: false,
    },
    argTypes: {
        open: {
            control: 'boolean',
            description:
                'Indicates whether or not the dialog is open. Can be toggled via attribute or show()/hide() methods.',
        },
        label: {
            control: 'text',
            description:
                'Label displayed in the header. Always provide a meaningful label, even with no-header; use the `label` slot for HTML.',
        },
        noHeader: {
            control: 'boolean',
            description:
                'Disables the header. Also removes the default close button—ensure an accessible way to dismiss the dialog.',
        },
        modal: {
            control: false,
            table: { disable: false },
            description:
                'Exposes the internal modal utility controlling focus trapping. Call modal.activateExternal() when opening a third-party modal, and modal.deactivateExternal() when it closes.',
        },
        preventOverlayClose: {
            control: 'boolean',
            description: 'Prevents the dialog from closing when clicking on the overlay',
        },
    },
} satisfies MetaWithLabel<TsDialog>;

export default meta;
type Story = StoryObjWithLabel<TsDialog>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default dialog contains a header with a title and close button, content area, and footer with a close button.',
            },
        },
    },
    args: { label: 'Dialog Title' },
};

export const NoHeader: Story = {
    parameters: {
        docs: {
            description: {
                story: 'If the label property is not provided, the header text will not be displayed. However, the header placeholder remains visible by default. To completely remove the header section (including the close button), set the no-header property to true.',
            },
        },
    },
    args: { noHeader: true },
    render: args => {
        const dialogRef = createRef<TsDialog>();
        return html`
            <div style="height: 300px">
                <ts-dialog
                    ${ref(dialogRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                >
                    This dialog has no header.
                    <ts-button slot="footer" variant="primary" @click=${() => dialogRef.value?.hide()}>Close</ts-button>
                </ts-dialog>

                <ts-button @click=${() => dialogRef.value?.show()}>Open Dialog</ts-button>
            </div>
        `;
    },
};

export const LongContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When the dialog contains long content that exceeds the available space, a scroll bar will automatically appear in the content section. This ensures the dialog remains within the viewport while allowing users to access all content without resizing the dialog.',
            },
        },
    },
    args: { label: 'Scrolling Dialog' },
    render: args => {
        const dialogRef = createRef<TsDialog>();
        return html`
            <div style="height: 300px">
                <ts-dialog
                    ${ref(dialogRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                >
                    ${Array(20)
                        .fill('This is a line of content that will cause the dialog to scroll.')
                        .map(line => html`<div>${line}</div>`)}
                    <ts-button slot="footer" variant="primary" @click=${() => dialogRef.value?.hide()}>Close</ts-button>
                </ts-dialog>

                <ts-button @click=${() => dialogRef.value?.show()}>Open Dialog</ts-button>
            </div>
        `;
    },
};

export const CustomFooter: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The dialog supports a custom footer that can contain any HTML content. This footer is implemented as a slot, allowing developers to insert buttons, links, or any other custom elements as needed.',
            },
        },
    },
    args: { label: 'Custom Footer' },
    render: args => {
        const dialogRef = createRef<TsDialog>();
        return html`
            <div style="height: 300px">
                <ts-dialog
                    ${ref(dialogRef)}
                    .open=${args.open}
                    ?open=${args.open}
                    .label=${args.label}
                    label=${args.label}
                    .noHeader=${args.noHeader}
                    ?no-header=${args.noHeader}
                >
                    This dialog has custom footer buttons.
                    <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end">
                        <ts-button variant="default" @click=${() => dialogRef.value?.hide()}>Cancel</ts-button>
                        <ts-button variant="primary">Save Changes</ts-button>
                    </div>
                </ts-dialog>

                <ts-button @click=${() => dialogRef.value?.show()}>Open Dialog</ts-button>
            </div>
        `;
    },
};

import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsAccordionItem } from '@tuvsud/design-system/accordion-item';
import '@tuvsud/design-system/accordion-item';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/link';

const meta = {
    title: 'Components/Accordion Item',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Accordion items are used inside the Accordion to organizes related content into collapsible sections, letting users expand or hide details within a limited space for easier scanning and navigation.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src
                        .replace(/\s(open|disabled)=""(?=[\s>])/g, ' $1')
                        .replace(/\s(truncate-summary)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-accordion-item
            .open=${args.open}
            ?open=${args.open}
            .summary=${args.summary}
            summary=${args.summary}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .variant=${args.variant}
            variant=${args.variant}
            .truncateSummary=${args.truncateSummary}
            ?truncate-summary=${args.truncateSummary}
        >
            <div>This is the content inside the accordion component.</div>
        </ts-accordion-item>
    `,
    args: {
        open: false,
        summary: 'Click to expand',
        disabled: false,
        variant: 'primary',
        truncateSummary: true,
    },
    argTypes: {
        open: {
            control: 'boolean',
            description:
                'Indicates whether the accordion-item is open. Can be toggled via attribute or show()/hide() methods.',
            table: { type: { summary: 'boolean' } },
        },
        summary: {
            control: 'text',
            description: 'The summary text shown in the header. Use the `summary` slot to display HTML.',
            table: { type: { summary: 'string' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the accordion-item so it cannot be toggled.',
            table: { type: { summary: 'boolean' } },
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'actions'],
            description:
                'Visual variant. Use `actions` to enable the `action` and `content` slots (custom header layout).',
            table: { type: { summary: '"primary" | "secondary" | "actions"' }, defaultValue: { summary: 'primary' } },
        },
        truncateSummary: {
            control: 'boolean',
            name: 'truncate-summary',
            description: 'When true, the summary is clamped to 1 lines and shows an ellipsis if it overflows.',
            table: { type: { summary: 'boolean' } },
        },
    },
} satisfies MetaWithLabel<TsAccordionItem>;

export default meta;
type Story = StoryObjWithLabel<TsAccordionItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default closed state with a simple text summary.',
            },
        },
    },
};

export const Open: Story = {
    args: { open: true },
    parameters: {
        docs: {
            description: {
                story: 'Use the `open` property to Indicates whether the accordion item is open or closed.',
            },
        },
    },
};

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable the accordion item so it cannot be toggled.',
            },
        },
    },
};

export const TruncatedSummary: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Enable `truncate-summary` to clamp the summary to 2 lines and show an ellipsis when the text is too long.',
            },
        },
    },
    args: {
        truncateSummary: true,
        summary:
            'This is a very long summary text intended to demonstrate the two-line clamp behavior. It should truncate with an ellipsis once it exceeds the available width and line count.',
    },
    render: args => html`
        <div style="max-width: 320px;">
            <ts-accordion-item
                .open=${args.open}
                ?open=${args.open}
                .summary=${args.summary}
                summary=${args.summary}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .variant=${args.variant}
                variant=${args.variant}
                .truncateSummary=${args.truncateSummary}
                ?truncate-summary=${args.truncateSummary}
            >
                This is the content inside the accordion component.
            </ts-accordion-item>
        </div>
    `,
};

export const MultiLineSummary: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Without `truncate-summary`, the summary will expand to show all text, even if it wraps to multiple lines.',
            },
        },
    },
    args: {
        truncateSummary: false,
        summary:
            'This is a very long summary text intended to demonstrate the two-line clamp behavior. It should truncate with an ellipsis once it exceeds the available width and line count.',
    },
    render: args => html`
        <div style="max-width: 320px;">
            <ts-accordion-item
                .open=${args.open}
                ?open=${args.open}
                .summary=${args.summary}
                summary=${args.summary}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .variant=${args.variant}
                variant=${args.variant}
                .truncateSummary=${args.truncateSummary}
                ?truncate-summary=${args.truncateSummary}
            >
                This is the content inside the accordion component.
            </ts-accordion-item>
        </div>
    `,
};

export const SummarySlot: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `slot="summary"` slot to provide custom markup for the accordion’s item summary area.',
            },
        },
    },
    args: {
        open: false,
        summary: '',
        disabled: false,
        variant: 'primary',
        truncateSummary: false,
    },
    render: args => html`
        <ts-accordion-item
            .open=${args.open}
            .disabled=${args.disabled}
            .variant=${args.variant}
            .truncateSummary=${args.truncateSummary}
            ?truncate-summary=${args.truncateSummary}
        >
            <div slot="summary"><strong>Custom Summary Content</strong> - Click to expand</div>
            Content inside accordion-item.
        </ts-accordion-item>
    `,
};

export const Actions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `variant="actions"` to render action buttons in the summary',
            },
        },
    },
    args: {
        open: false,
        disabled: false,
        variant: 'actions',
        truncateSummary: false,
    },
    render: args => html`
        <ts-accordion-item
            .variant=${args.variant}
            .open=${args.open}
            .disabled=${args.disabled}
            .truncateSummary=${args.truncateSummary}
            ?truncate-summary=${args.truncateSummary}
            summary="This is a very long summary text intended to demonstrate the two-line clamp behavior. It should truncate with an ellipsis once it exceeds the available width and line count."
        >
            <div slot="actions"><ts-button variant="primary" size="small">Ok</ts-button></div>
            <div>This is the content inside the accordion component.</div>
            <ts-button variant="primary" size="small">Ok</ts-button>
        </ts-accordion-item>
    `,
};

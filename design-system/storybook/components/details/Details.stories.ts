import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsDetails } from '@tuvsud/design-system/details';
import '@tuvsud/design-system/details';

const meta = {
    title: 'Components/Details',
    tags: ['autodocs', 'deprecated'],
    parameters: {
        badges: ['deprecated'],
        docs: {
            description: {
                component:
                    '⚠️ **Deprecated** — Do not use `<ts-details>`. Use `<ts-accordion>` and `<ts-accordion-item>` instead.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(open|disabled)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-details
            .open=${args.open}
            ?open=${args.open}
            .summary=${args.summary}
            summary=${args.summary}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .variant=${args.variant}
            variant=${args.variant}
        >
            This is the content inside the details component.
        </ts-details>
    `,
    args: {
        open: false,
        summary: 'Click to expand',
        disabled: false,
        variant: 'primary',
    },
    argTypes: {
        open: {
            control: 'boolean',
            description:
                'Indicates whether the details is open. Can be toggled via attribute or show()/hide() methods.',
        },
        summary: {
            control: 'text',
            description: 'The summary text shown in the header. Use the `summary` slot to display HTML.',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the details so it cannot be toggled.',
        },
        variant: {
            control: 'inline-radio',
            options: ['primary', 'secondary'],
            description: 'Visual variant.',
        },
    },
} satisfies MetaWithLabel<TsDetails>;

export default meta;
type Story = StoryObjWithLabel<TsDetails>;

export const Default: Story = {};

export const Open: Story = { args: { open: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const SummarySlot: Story = {
    render: () => html`
        <ts-details open>
            <div slot="summary">Custom summary slot</div>
            Content inside details.
        </ts-details>
    `,
};

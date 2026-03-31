import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsBadge } from '@tuvsud/design-system/badge';
import '@tuvsud/design-system/badge';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Badge',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Badges help draw attention to key information, such as statuses, alerts, or item counts.',
            },
            source: {
                transform: (src: string) => src.replace(/\s(pill|pulse)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    args: {
        variant: 'primary',
        pill: false,
        pulse: false,
    },
    render: args => html`
        <ts-badge .variant=${args.variant} variant=${args.variant} ?pill=${args.pill} ?pulse=${args.pulse}>
            Badge
        </ts-badge>
    `,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'success', 'neutral', 'warning', 'danger'],
            description: 'Visual style of the badge, representing its semantic meaning.',
        },
        pill: {
            control: 'boolean',
            description: 'Displays the badge with rounded, pill-shaped styling.',
        },
        pulse: {
            control: 'boolean',
            description: 'Enables a pulsing animation to draw attention.',
        },
    },
} satisfies MetaWithLabel<TsBadge>;

export default meta;
type Story = StoryObjWithLabel<TsBadge>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the badge is of `primary` variant.',
            },
        },
    },
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `variant` property to change the badge’s variant.',
            },
        },
    },
    args: { variant: 'success' },
    render: args => html`
        <ts-badge .variant=${args.variant} ?pill=${args.pill} ?pulse=${args.pulse}> Success Badge </ts-badge>
    `,
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pill` property to give badges rounded edges.',
            },
        },
    },
    args: { pill: true, pulse: true },
    render: args => html`
        <ts-badge .variant=${'primary'} ?pill=${args.pill} ?pulse=${args.pulse}>primary</ts-badge>
        <ts-badge .variant=${'success'} ?pill=${args.pill} ?pulse=${args.pulse}>success</ts-badge>
        <ts-badge .variant=${'neutral'} ?pill=${args.pill} ?pulse=${args.pulse}>neutral</ts-badge>
        <ts-badge .variant=${'warning'} ?pill=${args.pill} ?pulse=${args.pulse}>warning</ts-badge>
        <ts-badge .variant=${'danger'} ?pill=${args.pill} ?pulse=${args.pulse}>danger</ts-badge>
    `,
};

export const Pulse: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pulse` property to draw attention to the badge with a subtle animation.',
            },
        },
    },
    args: { pill: true, pulse: true },
    render: args => html`
        <ts-badge .variant=${'primary'} ?pill=${args.pill} ?pulse=${args.pulse}>1</ts-badge>
        <ts-badge .variant=${'success'} ?pill=${args.pill} ?pulse=${args.pulse}>1</ts-badge>
        <ts-badge .variant=${'neutral'} ?pill=${args.pill} ?pulse=${args.pulse}>1</ts-badge>
        <ts-badge .variant=${'warning'} ?pill=${args.pill} ?pulse=${args.pulse}>1</ts-badge>
        <ts-badge .variant=${'danger'} ?pill=${args.pill} ?pulse=${args.pulse}>1</ts-badge>
    `,
};

export const WithButton: Story = {
    parameters: {
        docs: {
            description: {
                story: 'One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they’re a child of a button.',
            },
        },
    },
    render: args => html`
        <ts-button>
            Requests
            <ts-badge .variant=${args.variant} ?pill=${args.pill} ?pulse=${args.pulse}>30</ts-badge>
        </ts-button>

        <ts-button style="margin-inline-start: 1rem;">
            Warnings
            <ts-badge .variant=${'warning'} ?pill=${args.pill} ?pulse=${args.pulse}>8</ts-badge>
        </ts-button>

        <ts-button style="margin-inline-start: 1rem;">
            Errors
            <ts-badge .variant=${'danger'} ?pill=${args.pill} ?pulse=${args.pulse}>6</ts-badge>
        </ts-button>
    `,
};

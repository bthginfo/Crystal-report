import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsAccordion } from '@tuvsud/design-system/accordion';
import '@tuvsud/design-system/accordion';
import '@tuvsud/design-system/accordion-item';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/link';

const meta = {
    title: 'Components/Accordion',
    component: 'ts-accordion',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'An accordion organizes related content into collapsible sections, letting users expand or hide details within a limited space for easier scanning and navigation.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(open)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-accordion behavior=${args.behavior} label=${args.label} .variant=${args.variant} variant=${args.variant}>
            <ts-accordion-item summary="Section 1">Content of section 1.</ts-accordion-item>
            <ts-accordion-item summary="Section 2">Content of section 2.</ts-accordion-item>
            <ts-accordion-item summary="Section 3">Content of section 3.</ts-accordion-item>
        </ts-accordion>
    `,
    args: {
        behavior: 'multiple',
        label: 'Accordion',
        variant: 'primary',
    },
    argTypes: {
        behavior: {
            control: { type: 'select' },
            options: ['single', 'multiple'],
            description: 'Defines whether one or multiple accordion items can be open at the same time.',
            table: {
                type: { summary: '"single" | "multiple"' },
            },
        },
        label: {
            control: 'text',
            description: 'Accessible label or heading for the accordion group.',
            table: {
                type: { summary: 'string' },
            },
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'actions'],
            description:
                'Visual variant. Use `actions` to enable the `action` and `content` slots (custom header layout).',
            table: { type: { summary: '"primary" | "secondary" | "actions"' }, defaultValue: { summary: 'primary' } },
        },
    },
} satisfies MetaWithLabel<TsAccordion>;

export default meta;
type Story = StoryObjWithLabel<TsAccordion>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default accordion allowing multiple sections to be open simultaneously.',
            },
        },
    },
};

export const SingleOpenItem: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `behaviour` property to control whether only one accordion item can be open at a time or multiple items can be expanded simultaneously.',
            },
        },
    },
    args: { behavior: 'single' },
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `variant` property to determine the visual style of the accordion.',
            },
        },
    },
    args: { variant: 'secondary' },
};

export const Actions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `variant="actions"` to render action buttons in the header',
            },
        },
    },
    args: { variant: 'actions' },
    render: args => html`
        <ts-accordion behavior=${args.behavior} label=${args.label} .variant=${args.variant} variant=${args.variant}>
            <ts-accordion-item summary="Section 1">
                <div slot="actions">
                    <ts-button variant="primary" size="small">Apply Now</ts-button>
                </div>

                Content of section 1.
            </ts-accordion-item>
            <ts-accordion-item summary="Section 2">
                <div slot="actions">
                    <ts-button variant="primary" size="small">Apply Now</ts-button>
                </div>
                Content of section 2.
            </ts-accordion-item>
            <ts-accordion-item summary="Section 3">
                <div slot="actions">
                    <ts-button variant="primary" size="small">Apply Now</ts-button>
                </div>
                Content of section 3.
            </ts-accordion-item>
        </ts-accordion>
    `,
};

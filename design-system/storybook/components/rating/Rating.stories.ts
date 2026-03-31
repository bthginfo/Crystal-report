import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsRating } from '@tuvsud/design-system/rating';
import '@tuvsud/design-system/rating';

const meta = {
    title: 'Components/Rating',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Rating component allows users to provide feedback or express preferences using visual indicators such as stars, hearts, or emojis.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(readonly|disabled)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-rating
            .label=${args.label}
            label=${args.label}
            .value=${args.value}
            value=${args.value}
            .max=${args.max}
            max=${args.max}
            .precision=${args.precision}
            precision=${args.precision}
            .readonly=${args.readonly}
            ?readonly=${args.readonly}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
        >
            rating
        </ts-rating>
    `,
    args: {
        label: '',
        value: 3,
        max: 5,
        precision: 1,
        readonly: false,
        disabled: false,
    },
    argTypes: {
        label: { control: 'text', description: 'A label that describes the rating to assistive devices.' },
        value: { control: { type: 'number', min: 0, max: 10, step: 0.5 }, description: 'The current rating.' },
        max: { control: { type: 'number', min: 1, max: 10, step: 1 }, description: 'The highest rating to show.' },
        precision: {
            control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
            description: 'Increment/decrement precision (e.g., 0.5 for half steps).',
        },
        readonly: { control: 'boolean', description: 'Makes the rating readonly.' },
        disabled: { control: 'boolean', description: 'Disables the rating.' },
    },
} satisfies MetaWithLabel<TsRating>;

export default meta;
type Story = StoryObjWithLabel<TsRating>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default rating component.',
            },
        },
    },
};

export const Readonly: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `readonly` property to display a rating that users can’t change.',
            },
        },
    },
    args: { readonly: true },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disable` property to disable the rating.',
            },
        },
    },
    args: { disabled: true },
};

export const CustomMax: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `max` property to change the default count of the rating.',
            },
        },
    },
    args: { max: 10, value: 7 },
};

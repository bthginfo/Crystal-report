import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsRadio } from '@tuvsud/design-system/radio';
import '@tuvsud/design-system/radio';
import '@tuvsud/design-system/radio-button';
import '@tuvsud/design-system/radio-group';

const meta = {
    title: 'Components/Radio',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A radio is a single selectable option within a set, representing one mutually exclusive choice.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\sdisabled| error=""(?=[\s>])/g, ' disabled'),
            },
        },
    },
    render: args => html`
        <ts-radio-group label="Select an option" name="a" .value=${args.value} value=${args.value}>
            <ts-radio
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                value="1"
                error=${args.error}
                ?error=${args.error}
                aria-label=${args.ariaLabel}
            >
                Option 1
            </ts-radio>
            <ts-radio
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                value="2"
                error=${args.error}
                ?error=${args.error}
                aria-label=${args.ariaLabel}
            >
                Option 2
            </ts-radio>
            <ts-radio
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                value="3"
                error=${args.error}
                ?error=${args.error}
                aria-label=${args.ariaLabel}
            >
                Option 3
            </ts-radio>
        </ts-radio-group>
    `,
    args: {
        size: 'medium',
        label: 'Select an option',
        value: '1',
        disabled: false,
        error: false,
        ariaLabel: '',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'The radio’s size. In a group, the group’s size wins.',
        },
        value: { control: 'select', options: ['1', '2', '3'], description: 'Selected value of the radio group.' },
        disabled: { control: 'boolean', description: 'Disables the radio.' },
        error: { control: 'boolean', description: 'Puts the radio in an error state.' },
        ariaLabel: {
            control: 'text',
            description:
                'The radio’s aria-label attribute for accessibility. Required when the radio has no visible label.',
        },
    },
} satisfies MetaWithLabel<TsRadio>;

export default meta;
type Story = StoryObjWithLabel<TsRadio>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the radio is unselected.',
            },
        },
    },
    args: { label: 'Default Radio' },
};

export const InitialValue: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To set the initial value and checked state, use the `value` property on the containing radio group.',
            },
        },
    },
    args: { label: 'Checked Radio', value: '3' },
};

export const DisabledOption: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the disabled property to disable a radio.',
            },
        },
    },
    render: () => html`
        <ts-radio-group name="favorite-pet" label="Select an animal">
            <ts-radio value="dogs">Dogs</ts-radio>
            <ts-radio value="cats" checked>Cats</ts-radio>
            <ts-radio value="birds">Birds</ts-radio>
            <ts-radio value="other" disabled>Other</ts-radio>
        </ts-radio-group>
    `,
};

export const Error: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the error property to show a radio in an error state with a red border.',
            },
        },
    },
    args: { error: true, label: 'Error Radio' },
    render: args => html`
        <ts-radio-group name="favorite-pet" label="Select an animal" ?error=${args.error}>
            <ts-radio value="dogs" ?error=${args.error}>Dogs</ts-radio>
            <ts-radio value="cats" checked>Cats</ts-radio>
            <ts-radio value="birds">Birds</ts-radio>
        </ts-radio-group>
    `,
};

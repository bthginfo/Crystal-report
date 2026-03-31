import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsRadioButton } from '@tuvsud/design-system/radio-button';
import '@tuvsud/design-system/radio';
import '@tuvsud/design-system/radio-button';
import '@tuvsud/design-system/radio-group';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Radio Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A radio button is the interactive UI element that lets users pick exactly one option from a group.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(disabled|pill)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-radio-group label="Select an option" name="a" .value=${args.value} value=${args.value}>
            <ts-radio-button
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .pill=${args.pill}
                ?pill=${args.pill}
                value="1"
                >Option 1</ts-radio-button
            >
            <ts-radio-button
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .pill=${args.pill}
                ?pill=${args.pill}
                value="2"
                >Option 2</ts-radio-button
            >
            <ts-radio-button
                .size=${args.size}
                size=${args.size}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .pill=${args.pill}
                ?pill=${args.pill}
                value="3"
                >Option 3</ts-radio-button
            >
        </ts-radio-group>
    `,
    args: {
        size: 'medium',
        value: '1',
        disabled: false,
        pill: false,
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Radio button size (group size overrides inside a group).',
        },
        value: { control: 'select', options: ['1', '2', '3'], description: 'Selected value of the radio group.' },
        disabled: { control: 'boolean', description: 'Disables the radio button(s).' },
        pill: { control: 'boolean', description: 'Draws pill-style radio button(s) with rounded edges.' },
    },
} satisfies MetaWithLabel<TsRadioButton>;

export default meta;
type Story = StoryObjWithLabel<TsRadioButton>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the radio button is unselected.',
            },
        },
    },
    args: { label: 'Default Radio' },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable a radio button.',
            },
        },
    },
    render: () => html`
        <ts-radio-group label="Select an option" name="a" value="1">
            <ts-radio-button value="1">Option 1</ts-radio-button>
            <ts-radio-button value="2" disabled>Option 2</ts-radio-button>
            <ts-radio-button value="3">Option 3</ts-radio-button>
        </ts-radio-group>
    `,
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `size` property to change a radio button’s size.',
            },
        },
    },
    render: () => html`
        <ts-radio-group size="small" label="Select an option" name="a" value="1">
            <ts-radio-button value="1">Option 1</ts-radio-button>
            <ts-radio-button value="2">Option 2</ts-radio-button>
            <ts-radio-button value="3">Option 3</ts-radio-button>
        </ts-radio-group>

        <br />

        <ts-radio-group size="medium" label="Select an option" name="a" value="1">
            <ts-radio-button value="1">Option 1</ts-radio-button>
            <ts-radio-button value="2">Option 2</ts-radio-button>
            <ts-radio-button value="3">Option 3</ts-radio-button>
        </ts-radio-group>

        <br />

        <ts-radio-group size="large" label="Select an option" name="a" value="1">
            <ts-radio-button value="1">Option 1</ts-radio-button>
            <ts-radio-button value="2">Option 2</ts-radio-button>
            <ts-radio-button value="3">Option 3</ts-radio-button>
        </ts-radio-group>
    `,
};

export const PillButtons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pill` property to give radio buttons rounded edges.',
            },
        },
    },
    render: () => html`
        <ts-radio-group size="small" label="Select an option" name="a" value="1">
            <ts-radio-button pill value="1">Option 1</ts-radio-button>
            <ts-radio-button pill value="2">Option 2</ts-radio-button>
            <ts-radio-button pill value="3">Option 3</ts-radio-button>
        </ts-radio-group>

        <br />

        <ts-radio-group size="medium" label="Select an option" name="a" value="1">
            <ts-radio-button pill value="1">Option 1</ts-radio-button>
            <ts-radio-button pill value="2">Option 2</ts-radio-button>
            <ts-radio-button pill value="3">Option 3</ts-radio-button>
        </ts-radio-group>

        <br />

        <ts-radio-group size="large" label="Select an option" name="a" value="1">
            <ts-radio-button pill value="1">Option 1</ts-radio-button>
            <ts-radio-button pill value="2">Option 2</ts-radio-button>
            <ts-radio-button pill value="3">Option 3</ts-radio-button>
        </ts-radio-group>
    `,
};

export const PrefixAndSuffixIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `prefix` and `suffix` slots to add icons.',
            },
        },
    },
    render: () => html`
        <ts-radio-group label="Select an option" name="a" value="1">
            <ts-radio-button value="1">
                <ts-icon slot="prefix" name="archive"></ts-icon>
                Option 1
            </ts-radio-button>

            <ts-radio-button value="2">
                <ts-icon slot="suffix" name="shopping_bag"></ts-icon>
                Option 2
            </ts-radio-button>

            <ts-radio-button value="3">
                <ts-icon slot="prefix" name="featured_seasonal_and_gifts"></ts-icon>
                <ts-icon slot="suffix" name="shopping_cart_checkout"></ts-icon>
                Option 3
            </ts-radio-button>
        </ts-radio-group>
    `,
};

export const ButtonsWithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can omit button labels and use icons instead. Make sure to set a label attribute on each icon so screen readers will announce each option correctly.',
            },
        },
    },
    render: () => html`
        <ts-radio-group label="Select an option" name="a" value="neutral">
            <ts-radio-button value="angry">
                <ts-icon name="sentiment_very_dissatisfied" label="Angry"></ts-icon>
            </ts-radio-button>

            <ts-radio-button value="sad">
                <ts-icon name="sentiment_dissatisfied" label="Sad"></ts-icon>
            </ts-radio-button>

            <ts-radio-button value="neutral">
                <ts-icon name="sentiment_neutral" label="Neutral"></ts-icon>
            </ts-radio-button>

            <ts-radio-button value="happy">
                <ts-icon name="mood" label="Happy"></ts-icon>
            </ts-radio-button>

            <ts-radio-button value="laughing">
                <ts-icon name="sentiment_very_satisfied" label="Laughing"></ts-icon>
            </ts-radio-button>
        </ts-radio-group>
    `,
};

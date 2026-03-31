import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsOption } from '@tuvsud/design-system/option';
import '@tuvsud/design-system/select';
import '@tuvsud/design-system/option';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Option',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Options specify the selectable entries contained within form controls, including select elements.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(multiple|clearable|disabled|required|hoist|open|filled|pill)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const { disabled, value } = args;
        return html`
            <ts-select label="Select an option">
                <ts-option .value=${value} ?value=${value}>Option 1</ts-option>
                <ts-option value="option-2" ?disabled=${disabled} .disabled=${disabled}>Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
        `;
    },
    args: {
        disabled: true,
        value: 'option-1',
    },
    argTypes: {
        value: {
            control: 'object',
            description:
                'Current value. String for single select; array when multiple=true. Attribute uses space-delimited values.',
        },
        disabled: { control: 'boolean', description: 'Disables the select control.' },
    },
} satisfies Meta<TsOption>;

export default meta;
type Story = StoryObj<TsOption>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the option component is used within a select component to provide selectable options.',
            },
        },
    },
    args: {},
};

export const Prefix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Options can include icons as prefixes to enhance visual identification.',
            },
        },
    },
    render: () => {
        return html`
            <ts-select label="Select one">
                <ts-option value="option-1">
                    <ts-icon slot="prefix" name="mail"></ts-icon>
                    Email
                </ts-option>

                <ts-option value="option-2">
                    <ts-icon slot="prefix" name="phone_callback"></ts-icon>
                    Phone
                </ts-option>

                <ts-option value="option-3">
                    <ts-icon slot="prefix" name="chat"></ts-icon>
                    Chat
                </ts-option>
            </ts-select>
        `;
    },
};

export const Suffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Options can also include icons as suffixes for additional context or actions.',
            },
        },
    },
    render: () => {
        return html`
            <ts-select label="Select one">
                <ts-option value="option-1">
                    Option 1
                    <ts-icon slot="suffix" name="check"></ts-icon>
                </ts-option>

                <ts-option value="option-2">
                    Option 2
                    <ts-icon slot="suffix" name="check"></ts-icon>
                </ts-option>

                <ts-option value="option-3">
                    Option 3
                    <ts-icon slot="suffix" name="check"></ts-icon>
                </ts-option>
            </ts-select>
        `;
    },
};

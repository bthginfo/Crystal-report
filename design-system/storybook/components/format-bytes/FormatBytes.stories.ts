import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsFormatBytes } from '@tuvsud/design-system/format-bytes';
import '@tuvsud/design-system/format-bytes';

const meta: Meta<TsFormatBytes> = {
    title: 'Components/Format Bytes',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Converts a numeric value into a human‑readable byte format (e.g., KB, MB, GB).',
            },
            source: { type: 'dynamic' },
        },
    },
    render: args => {
        const { value, unit, display } = args;
        return html`
            <ts-format-bytes
                .value=${value}
                value=${value}
                .unit=${unit}
                unit=${unit}
                .display=${display}
                display=${display}
                .lang=${args.lang}
                lang=${args.lang}
            ></ts-format-bytes>
        `;
    },
    args: {
        value: 0,
        unit: 'byte',
        display: 'short',
        lang: 'en',
    },
    argTypes: {
        value: { control: { type: 'number', min: 0, step: 1 }, description: 'The number to format in bytes.' },
        unit: { control: 'select', options: ['byte', 'bit'], description: 'The unit to display.' },
        display: {
            control: 'select',
            options: ['long', 'short', 'narrow'],
            description: 'How the result is displayed.',
        },
        lang: {
            control: 'select',
            description: 'Sets the language via the standard HTML lang attribute (BCP-47).',
            options: [
                'en',
                'de',
                'fr',
                'es',
                'it',
                'pt',
                'nl',
                'pl',
                'ru',
                'tr',
                'ar',
                'he',
                'zh-CN',
                'zh-TW',
                'ja',
                'ko',
                'hi',
                'th',
            ],
        },
    },
};

export default meta;
type Story = StoryObj<TsFormatBytes>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the component formats the number as bytes in short display format.',
            },
        },
    },
};

export const FormattingBytes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `value` property to a number to get the value in bytes.',
            },
        },
    },
    render: () => {
        return html`
            <ts-format-bytes value="12"></ts-format-bytes><br />
            <ts-format-bytes value="1200"></ts-format-bytes><br />
            <ts-format-bytes value="1200000"></ts-format-bytes><br />
            <ts-format-bytes value="1200000000"></ts-format-bytes>
        `;
    },
};

export const FormattingBits: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To get the value in bits, set the `unit` property to bit',
            },
        },
    },
    render: () => {
        return html`
            <ts-format-bytes value="12" unit="bit"></ts-format-bytes><br />
            <ts-format-bytes value="1200" unit="bit"></ts-format-bytes><br />
            <ts-format-bytes value="1200000" unit="bit"></ts-format-bytes><br />
            <ts-format-bytes value="1200000000" unit="bit"></ts-format-bytes>
        `;
    },
};

export const Localization: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `lang` property to set the number formatting locale.',
            },
        },
    },
    render: () => {
        return html`
            <ts-format-bytes value="12" lang="de"></ts-format-bytes><br />
            <ts-format-bytes value="1200" lang="de"></ts-format-bytes><br />
            <ts-format-bytes value="1200000" lang="de"></ts-format-bytes><br />
            <ts-format-bytes value="1200000000" lang="de"></ts-format-bytes>
        `;
    },
};

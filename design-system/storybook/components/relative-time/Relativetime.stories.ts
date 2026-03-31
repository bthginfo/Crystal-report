import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsRelativeTime } from '@tuvsud/design-system/relative-time';
import '@tuvsud/design-system/relative-time';

const meta: Meta<TsRelativeTime> = {
    title: 'Components/Relative Time',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Generates a human‑friendly, localized time phrase based on how the given date relates to the current moment.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(sync)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const { date, format, numeric, sync } = args;
        return html`
            <ts-relative-time
                .date=${date}
                date=${date}
                .format=${format}
                format=${format}
                .numeric=${numeric}
                numeric=${numeric}
                .sync=${sync}
                ?sync=${sync}
                .lang=${args.lang}
                lang=${args.lang}
            ></ts-relative-time>
        `;
    },
    args: {
        date: new Date().toISOString(),
        format: 'long',
        numeric: 'auto',
        sync: false,
        lang: 'en',
    },
    argTypes: {
        date: {
            control: 'text',
            description: 'The date to calculate from. Prefer ISO 8601 strings.',
        },
        format: {
            control: 'select',
            options: ['long', 'short', 'narrow'],
            description: 'Formatting style.',
        },
        numeric: {
            control: 'select',
            options: ['auto', 'always'],
            description: 'Use words like “yesterday” or numeric values.',
        },
        sync: {
            control: 'boolean',
            description: 'Keeps the value updated as time passes.',
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
type Story = StoryObj<TsRelativeTime>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default relative time component.',
            },
        },
    },
};

export const FormattingStyles: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `sync` property to update the displayed value automatically as time passes.',
            },
        },
    },
    render: () => {
        return html`
            <ts-relative-time date="2020-07-15T09:17:00-04:00" format="narrow"></ts-relative-time><br />
            <ts-relative-time date="2020-07-15T09:17:00-04:00" format="short"></ts-relative-time><br />
            <ts-relative-time date="2020-07-15T09:17:00-04:00" format="long"></ts-relative-time>
        `;
    },
};

export const Localization: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `lang` property to set the desired locale.',
            },
        },
    },
    render: () => {
        return html`
            <ts-relative-time date="2020-07-15T09:17:00-04:00" lang="de"></ts-relative-time><br />
            <ts-relative-time date="2020-07-15T09:17:00-04:00" lang="en-US"></ts-relative-time><br />
        `;
    },
};

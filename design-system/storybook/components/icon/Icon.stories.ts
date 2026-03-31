import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsIcon } from '@tuvsud/design-system/icon';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Icon',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Icons provide intuitive visual cues that represent actions and options, helping users navigate your application with ease.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(\w+)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-icon
            name=${ifDefined(args.name)}
            size=${ifDefined(args.size)}
            label=${ifDefined(args.label && args.label.trim() !== '' ? args.label : undefined)}
            variant=${args.variant}
            style-type=${ifDefined(args.styleType)}
        ></ts-icon>
    `,
    args: {
        name: 'home',
        label: '',
        size: 32,
        variant: 'outline',
        styleType: 'sharp',
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'The name of the icon to draw. Available names depend on the icon library being used.',
            table: { type: { summary: 'string | undefined' } },
        },
        label: {
            control: 'text',
            description: 'Alternate description for assistive devices. If empty, icon is presentational.',
            table: { type: { summary: 'string' }, defaultValue: { summary: "''" } },
        },
        size: {
            control: 'number',
            description: 'The size of the icon in pixels.',
            table: { type: { summary: 'number' }, defaultValue: { summary: '16' } },
        },
        variant: {
            control: 'select',
            options: ['outline', 'filled'],
            description: 'The visual style of the icon.',
            table: { type: { summary: "'outline' | 'filled'" }, defaultValue: { summary: "'outline'" } },
        },
        styleType: {
            control: 'select',
            options: ['sharp', 'rounded'],
            description: 'The shape style of the icon.',
            table: { type: { summary: "'sharp' | 'rounded'" }, defaultValue: { summary: "'sharp'" } },
        },
    },
} satisfies Meta<TsIcon>;

export default meta;
type Story = StoryObj<TsIcon>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the icon component displays the "home" icon without an accessible label, making it purely decorative.',
            },
        },
    },
    args: {},
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example showcases the icon component rendered in various sizes, ranging from 16px to 72px.',
            },
        },
    },
    render: () => html`
        <div>
            <ts-icon size="16" name="mood"></ts-icon>
            <ts-icon size="24" name="mood"></ts-icon>
            <ts-icon size="32" name="mood"></ts-icon>
            <ts-icon size="48" name="mood"></ts-icon>
            <ts-icon size="60" name="mood"></ts-icon>
            <ts-icon size="72" name="mood"></ts-icon>
        </div>
    `,
};

export const Color: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates how to customize the color of the icon using CSS variables. Different colors are applied to each icon instance.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: row; gap: 1rem;">
            <ts-icon size="32" name="favorite" style="--icon-color: #ff7272"></ts-icon>
            <ts-icon size="32" name="favorite" style="--icon-color: #74f2a180"></ts-icon>
            <ts-icon size="32" name="favorite" style="--icon-color: #ffd239"></ts-icon>
            <ts-icon size="32" name="favorite" style="--icon-color: #1d4fd7"></ts-icon>
        </div>
    `,
};

export const Variant: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the two visual styles of the icon button: "outline" and "filled".',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: row; gap: 1rem;">
            <ts-icon size="32" name="home" target="_blank" variant="outline"></ts-icon>
            <ts-icon size="32" name="home_filled" target="_blank" variant="filled"></ts-icon>
            <ts-icon size="32" name="home" style="--icon-color: #ff7272" target="_blank" variant="outline"></ts-icon>
            <ts-icon
                size="32"
                style="--icon-color: #ff7272"
                name="home_filled"
                target="_blank"
                variant="filled"
            ></ts-icon>
        </div>
    `,
};

export const StyleType: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the two visual styles of the icon button: "rounded" and "sharp".',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: row; gap: 1rem;">
            <ts-icon size="32" name="home" target="_blank" variant="filled" style-type="sharp"></ts-icon>
            <ts-icon size="32" name="home_filled" target="_blank" variant="filled" style-type="rounded"></ts-icon>
        </div>
    `,
};

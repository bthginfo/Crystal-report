import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsIconButton } from '@tuvsud/design-system/icon-button';
import '@tuvsud/design-system/icon';
import '@tuvsud/design-system/icon-button';

const meta = {
    title: 'Components/Icon Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Icon buttons are minimalist, icon-only controls designed for quick actions and commonly used in toolbars or compact UI spaces.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(disabled)=""(?=[\s>])/g, ' $1').replace(/\s+\w+=""(?=[\s>])/g, ''),
            },
        },
    },

    render: args => html`
        <ts-icon-button
            .name=${args.name}
            name=${args.name ?? nothing}
            .src=${args.src || undefined}
            src=${args.src ?? nothing}
            .href=${args.href || undefined}
            href=${args.href ?? nothing}
            .target=${args.target || undefined}
            target=${ifDefined(args.target)}
            .download=${args.download || undefined}
            download=${args.download ?? nothing}
            .label=${args.label}
            label=${args.label ?? nothing}
            ?disabled=${args.disabled}
            .size=${args.size}
            size=${ifDefined(args.size)}
            .variant=${args.variant}
            variant=${ifDefined(args.variant)}
            .intent=${args.intent}
            intent=${ifDefined(args.intent)}
            .styleType=${args.styleType}
            style-type=${ifDefined(args.styleType)}
            ?circle=${args.circle}
            ?tinted=${args.tinted}
            ?hover=${args.hover}
        ></ts-icon-button>
    `,

    args: {
        name: 'home',
        src: '',
        href: '',
        target: '_self',
        download: '',
        label: 'Open home',
        disabled: false,
        size: 32,
        variant: 'outline',
        intent: 'default',
        styleType: 'sharp',
        circle: false,
        tinted: false,
        hover: false,
    },

    argTypes: {
        name: { control: 'text', description: 'Icon name.' },
        src: { control: 'text', description: 'External SVG URL.' },
        href: { control: 'text', description: 'Renders as <a> with this href.' },
        target: {
            control: { type: 'select' },
            options: ['_self', '_blank', '_parent', '_top', undefined],
            description: 'Where to open the link. Used only when href is set.',
        },
        download: { control: 'text', description: 'Filename to download when href is set.' },
        label: { control: 'text', description: 'Accessible label.' },
        disabled: { control: 'boolean', description: 'Disables the button.' },

        size: {
            control: 'number',
            description: 'The size of the icon in pixels.',
            table: { type: { summary: 'number' }, defaultValue: { summary: '16' } },
        },

        variant: {
            control: 'select',
            options: ['outline', 'filled'],
            description: 'The visual style of the icon button container.',
            table: { type: { summary: "'outline' | 'filled'" }, defaultValue: { summary: "'outline'" } },
        },

        intent: {
            control: 'select',
            options: ['default', 'primary', 'success', 'accent01', 'accent02', 'neutral', 'warning', 'danger'],
            description: 'Color intent (aligned with button styles).',
            table: {
                type: {
                    summary:
                        "'default' | 'primary' | 'success' | 'accent01' | 'accent02' | 'neutral' | 'warning' | 'danger'",
                },
                defaultValue: { summary: "'default'" },
            },
        },

        styleType: {
            control: 'select',
            options: ['sharp', 'rounded'],
            description: 'The corner style of the icon button.',
            table: { type: { summary: "'sharp' | 'rounded'" }, defaultValue: { summary: "'sharp'" } },
        },

        circle: {
            control: 'boolean',
            description: 'When true, forces the button to be circular (border-radius: 50%).',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },

        tinted: {
            control: 'boolean',
            description: 'When true, applies a soft tinted background based on the current intent (CSS-only).',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        hover: {
            control: 'boolean',
            description: 'Forces hover state styles to be visible (CSS-only).',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<TsIconButton>;

export default meta;
type Story = StoryObj<TsIconButton>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'An icon button with the "home" icon, an accessible label, and enabled state.',
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
        <div style="display:flex; flex-direction:row; gap:1rem; align-items:center;">
            <ts-icon-button label="xs-icon" size="16" name="mood"></ts-icon-button>
            <ts-icon-button label="sm-icon" size="24" name="mood"></ts-icon-button>
            <ts-icon-button label="md-icon" size="32" name="mood"></ts-icon-button>
            <ts-icon-button label="lg-icon" size="48" name="mood"></ts-icon-button>
            <ts-icon-button label="xl-icon" size="60" name="mood"></ts-icon-button>
            <ts-icon-button label="xxl-icon" size="72" name="mood"></ts-icon-button>
        </div>
    `,
};

export const Variant: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the two visual styles of the icon button container: "outline" and "filled".',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-direction:row; gap:1rem; align-items:center;">
            <ts-icon-button label="Outline" size="32" name="home" variant="outline"></ts-icon-button>
            <ts-icon-button label="Filled" size="32" name="home_filled" variant="filled"></ts-icon-button>
        </div>
    `,
};

export const StyleType: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the corner styles: "sharp" and "rounded".',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-direction:row; gap:1rem; align-items:center;">
            <ts-icon-button label="Sharp" size="32" name="home" variant="filled" style-type="sharp"></ts-icon-button>
            <ts-icon-button
                label="Rounded"
                size="32"
                name="home_filled"
                variant="filled"
                style-type="rounded"
            ></ts-icon-button>
        </div>
    `,
};

export const Intent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the available intents (default, primary, success, accent01, accent02, neutral, warning, danger).',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
            <ts-icon-button label="Default" name="home" size="24" variant="outline" intent="default"></ts-icon-button>
            <ts-icon-button label="Primary" name="home" size="24" variant="outline" intent="primary"></ts-icon-button>
            <ts-icon-button label="Success" name="home" size="24" variant="outline" intent="success"></ts-icon-button>
            <ts-icon-button label="Neutral" name="home" size="24" variant="outline" intent="neutral"></ts-icon-button>
            <ts-icon-button label="Warning" name="home" size="24" variant="outline" intent="warning"></ts-icon-button>
            <ts-icon-button label="Danger" name="home" size="24" variant="outline" intent="danger"></ts-icon-button>
            <ts-icon-button label="Accent01" name="home" size="24" variant="outline" intent="accent01"></ts-icon-button>
            <ts-icon-button label="Accent02" name="home" size="24" variant="outline" intent="accent02"></ts-icon-button>
        </div>
    `,
};

export const Tinted: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Same intents as above, but with the `tinted` modifier enabled.',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
            <ts-icon-button
                label="Default"
                name="home"
                size="24"
                variant="outline"
                intent="default"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Primary"
                name="home"
                size="24"
                variant="outline"
                intent="primary"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Success"
                name="home"
                size="24"
                variant="outline"
                intent="success"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Neutral"
                name="home"
                size="24"
                variant="outline"
                intent="neutral"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Warning"
                name="home"
                size="24"
                variant="outline"
                intent="warning"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Danger"
                name="home"
                size="24"
                variant="outline"
                intent="danger"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Accent01"
                name="home"
                size="24"
                variant="outline"
                intent="accent01"
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Accent02"
                name="home"
                size="24"
                variant="outline"
                intent="accent02"
                tinted
            ></ts-icon-button>
        </div>
    `,
};

export const CircleTinted: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Circular + tinted combination.',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-direction:row; gap:.75rem; align-items:center;">
            <ts-icon-button
                label="Home"
                name="home"
                size="24"
                variant="outline"
                intent="default"
                circle
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Search"
                name="search"
                size="24"
                variant="outline"
                intent="primary"
                circle
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Confirm"
                name="check"
                size="24"
                variant="outline"
                intent="success"
                circle
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Warn"
                name="warning"
                size="24"
                variant="outline"
                intent="warning"
                circle
                tinted
            ></ts-icon-button>
            <ts-icon-button
                label="Delete"
                name="delete"
                size="24"
                variant="outline"
                intent="danger"
                circle
                tinted
            ></ts-icon-button>
        </div>
    `,
};

export const Circle: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Circular icon buttons using the boolean `circle` property.',
            },
        },
    },
    render: () => html`
        <div style="display:flex; flex-direction:row; gap:.75rem; align-items:center;">
            <ts-icon-button
                label="Home"
                name="home"
                size="24"
                variant="outline"
                intent="default"
                circle
            ></ts-icon-button>
            <ts-icon-button
                label="Search"
                name="search"
                size="24"
                variant="outline"
                intent="primary"
                circle
            ></ts-icon-button>
            <ts-icon-button
                label="Confirm"
                name="check"
                size="24"
                variant="outline"
                intent="success"
                circle
            ></ts-icon-button>
            <ts-icon-button
                label="Warn"
                name="warning"
                size="24"
                variant="outline"
                intent="warning"
                circle
            ></ts-icon-button>
            <ts-icon-button
                label="Delete"
                name="delete"
                size="24"
                variant="outline"
                intent="danger"
                circle
            ></ts-icon-button>
        </div>
    `,
};

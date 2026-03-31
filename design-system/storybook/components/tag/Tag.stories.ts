import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsTag } from '@tuvsud/design-system/tag';
import '@tuvsud/design-system/tag';
import '@tuvsud/design-system/icon';

const meta: Meta<TsTag> = {
    title: 'Components/Tag',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Tag is a compact UI element used to categorize, label, or organize content. Tags can be interactive (removable) or static, and they help users quickly identify attributes or groupings.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(pill|removable|has-border|color|font-color|border-color)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const { variant, size, pill, removable, hasBorder, color, fontColor, borderColor } = args;
        return html`
            <ts-tag
                .variant=${variant}
                variant=${variant}
                .size=${size}
                size=${size}
                .pill=${pill}
                ?pill=${pill}
                .removable=${removable}
                ?removable=${removable}
                .has-border=${hasBorder}
                ?has-border=${hasBorder}
                .color=${color}
                color=${color}
                .font-color=${fontColor}
                font-color=${fontColor}
                .border-color=${borderColor}
                border-color=${borderColor}
            >
                <ts-icon slot="prefix" name="settings"></ts-icon>
                Tag
            </ts-tag>
        `;
    },
    args: {
        variant: 'primary',
        size: 'medium',
        pill: false,
        removable: false,
        hasBorder: true,
        color: '',
        fontColor: '',
        borderColor: '',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'success', 'neutral', 'warning', 'danger', 'text'],
            description: 'The tag’s theme variant.',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'The tag’s size.',
        },
        pill: {
            control: 'boolean',
            description: 'Draws a pill-style tag with rounded edges.',
        },
        removable: {
            control: 'boolean',
            description: 'Makes the tag removable and shows a remove button.',
        },
        hasBorder: {
            control: 'boolean',
            description: 'Shows the border when true; hides it when false.',
        },
        color: {
            control: 'color',
            description: 'Custom background color. Overrides variant background when set.',
        },
        fontColor: {
            control: 'color',
            description: 'Custom text color. Overrides variant text color when set.',
        },
        borderColor: {
            control: 'color',
            description: 'Custom text borderColor. Overrides variant text borderColor when set.',
        },
    },
};

export default meta;
type Story = StoryObj<TsTag>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default tag component.',
            },
        },
    },
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Different variant styles of the tag component.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag variant="primary">Primary</ts-tag>
            <ts-tag variant="success">Success</ts-tag>
            <ts-tag variant="neutral">Neutral</ts-tag>
            <ts-tag variant="warning">Warning</ts-tag>
            <ts-tag variant="danger">Danger</ts-tag>
        `;
    },
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `size` property to change a tag’s size.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag size="small">Small</ts-tag>
            <ts-tag size="medium">Medium</ts-tag>
            <ts-tag size="large">Large</ts-tag>
        `;
    },
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pill` property to give tags rounded edges.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag size="small" variant="success" pill>Small</ts-tag>
            <ts-tag size="medium" variant="success" pill>Medium</ts-tag>
            <ts-tag size="large" variant="success" pill>Large</ts-tag>
        `;
    },
};

export const Removable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `removable` property to add a remove button to the tag.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag size="small" removable>Small</ts-tag>
            <ts-tag size="medium" removable>Medium</ts-tag>
            <ts-tag size="large" removable>Large</ts-tag>
        `;
    },
};

export const withIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add icons to the prefix using slots.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag size="large" variant="success" pill>
                <ts-icon slot="prefix" name="refresh"></ts-icon>
                Refresh
            </ts-tag>
            <ts-tag size="large" variant="primary">
                <ts-icon slot="prefix" name="settings"></ts-icon>
                settings
            </ts-tag>
        `;
    },
};

export const NoBorder: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `has-border` property to remove or add the border to the tag component.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag hasBorder="false" variant="success" .hasBorder=${false}>No border</ts-tag>
            <ts-tag hasBorder="false" variant="primary" .hasBorder=${false} pill>Primary no border</ts-tag>
        `;
    },
};

export const WithCustomColors: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `color` and `font-color` properties to customize the tag component.',
            },
        },
    },
    render: () => {
        return html`
            <ts-tag color="#0ea5e9" font-color="#001b26">Custom bg + text</ts-tag>
            <ts-tag color="rebeccapurple" font-color="white" pill>Purple pill</ts-tag>
            <ts-tag color="var(--ts-semantic-color-background-success-default)" font-color="black">Token color</ts-tag>
        `;
    },
};

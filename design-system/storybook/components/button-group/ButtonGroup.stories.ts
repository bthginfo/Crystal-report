import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsButtonGroup } from '@tuvsud/design-system/button-group';
import '@tuvsud/design-system/button-group';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/menu';
import '@tuvsud/design-system/menu-item';
import '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/tooltip';

const meta: Meta<TsButtonGroup> = {
    title: 'Components/ButtonGroup',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Button Group is a set of related buttons displayed together in a horizontal or vertical layout. It allows users to select one or multiple options within a defined context.',
            },
            source: {
                transform: (src: string) => src.replace(/\s(pill|caret|loading|disabled)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: () => html`
        <ts-button-group>
            <ts-button variant="primary">Left</ts-button>
            <ts-button variant="primary">Center</ts-button>
            <ts-button variant="primary">Right</ts-button>
        </ts-button-group>
    `,
    args: {
        label: 'label',
    },
    argTypes: {
        label: {
            control: 'boolean',
            description:
                'A label to use for the button group. This won’t be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is strongly recommended.',
        },
    },
};

export default meta;
type Story = StoryObj<TsButtonGroup>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the button group contains three primary buttons labeled "Left," "Center," and "Right."',
            },
        },
    },
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Theme buttons are supported through the button’s `variant` property.',
            },
        },
    },
    render: () => html`
        <ts-button-group label="Alignment">
            <ts-button variant="primary">Left</ts-button>
            <ts-button variant="primary">Center</ts-button>
            <ts-button variant="primary">Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button variant="success">Left</ts-button>
            <ts-button variant="success">Center</ts-button>
            <ts-button variant="success">Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button variant="neutral">Left</ts-button>
            <ts-button variant="neutral">Center</ts-button>
            <ts-button variant="neutral">Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button variant="warning">Left</ts-button>
            <ts-button variant="warning">Center</ts-button>
            <ts-button variant="warning">Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button variant="danger">Left</ts-button>
            <ts-button variant="danger">Center</ts-button>
            <ts-button variant="danger">Right</ts-button>
        </ts-button-group>

        <br /><br />
        <ts-button-group label="Alignment">
            <ts-button variant="accent01">Left</ts-button>
            <ts-button variant="accent01">Center</ts-button>
            <ts-button variant="accent01">Right</ts-button>
        </ts-button-group>

        <br /><br />
        <ts-button-group label="Alignment">
            <ts-button variant="accent02">Left</ts-button>
            <ts-button variant="accent02">Center</ts-button>
            <ts-button variant="accent02">Center</ts-button>
            <ts-button variant="accent02">Center</ts-button>
            <ts-button variant="accent02">Center</ts-button>
            <ts-button variant="accent02">Right</ts-button>
        </ts-button-group>
    `,
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Pill buttons are supported through the button’s `pill` property.',
            },
        },
    },
    render: () => html`
        <ts-button-group label="Alignment">
            <ts-button size="small" pill>Left</ts-button>
            <ts-button size="small" pill>Center</ts-button>
            <ts-button size="small" pill>Center</ts-button>
            <ts-button size="small" pill>Center</ts-button>
            <ts-button size="small" pill>Center</ts-button>
            <ts-button size="small" pill>Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button size="medium" pill>Left</ts-button>
            <ts-button size="medium" pill>Center</ts-button>
            <ts-button size="medium" pill>Center</ts-button>
            <ts-button size="medium" pill>Center</ts-button>
            <ts-button size="medium" pill>Right</ts-button>
        </ts-button-group>

        <br /><br />

        <ts-button-group label="Alignment">
            <ts-button size="large" pill>Left</ts-button>
            <ts-button size="large" pill>Center</ts-button>
            <ts-button size="large" pill>Right</ts-button>
        </ts-button-group>
    `,
};

export const SplitButtons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Create a split button using a button and a dropdown. Use a visually hidden label to ensure the dropdown is accessible to users with assistive devices.',
            },
        },
    },
    render: () => html`
        <ts-button-group label="Example Button Group" style="height: 150px">
            <ts-button variant="primary">Save</ts-button>
            <ts-dropdown>
                <ts-button slot="trigger" variant="primary" caret></ts-button>
                <ts-menu>
                    <ts-menu-item>Save</ts-menu-item>
                    <ts-menu-item>Save as</ts-menu-item>
                    <ts-menu-item>Save all</ts-menu-item>
                </ts-menu>
            </ts-dropdown>
        </ts-button-group>
    `,
};

export const Tooltip: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.',
            },
        },
    },
    render: () => html`
        <ts-button-group label="Alignment">
            <ts-tooltip content="I'm on the left">
                <ts-button>Left</ts-button>
            </ts-tooltip>
            <ts-tooltip content="I'm in the middle">
                <ts-button>Center</ts-button>
            </ts-tooltip>
            <ts-tooltip content="I'm on the right">
                <ts-button>Right</ts-button>
            </ts-tooltip>
        </ts-button-group>
    `,
};

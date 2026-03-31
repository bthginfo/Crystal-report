import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsBreadcrumbItem } from '@tuvsud/design-system/breadcrumb-item';
import '@tuvsud/design-system/breadcrumb';
import '@tuvsud/design-system/breadcrumb-item';
import '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/menu';
import '@tuvsud/design-system/menu-item';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Breadcrumb',
    parameters: {
        docs: {
            description: {
                component:
                    'The breadcrumb is a secondary navigation pattern that helps a user understand the hierarchy among levels and navigate back through them.',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Main breadcrumb navigation',
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Accessible label describing the breadcrumb navigation.',
        },
    },

    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>Home</ts-breadcrumb-item>
            <ts-breadcrumb-item>Library</ts-breadcrumb-item>
            <ts-breadcrumb-item>Data</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
} satisfies MetaWithLabel<TsBreadcrumbItem>;

export default meta;
type Story = StoryObjWithLabel<TsBreadcrumbItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A basic breadcrumb with three items representing a typical navigation path.',
            },
        },
    },
};

export const WithOneItem: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A breadcrumb with a single item, representing the home or root level of navigation.',
            },
        },
    },
    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>Home</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
};

export const DeepPath: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A breadcrumb with multiple items, illustrating a deeper navigation path within a website.',
            },
        },
    },
    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>Home</ts-breadcrumb-item>
            <ts-breadcrumb-item>Projects</ts-breadcrumb-item>
            <ts-breadcrumb-item>2025</ts-breadcrumb-item>
            <ts-breadcrumb-item>Q3</ts-breadcrumb-item>
            <ts-breadcrumb-item>Report</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
};

export const WithDropdown: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A breadcrumb that includes a dropdown menu within one of its items, allowing for additional navigation options.',
            },
        },
    },
    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>Homepage</ts-breadcrumb-item>
            <ts-breadcrumb-item>
                <ts-dropdown>
                    <ts-button slot="trigger" size="small" circle>
                        <ts-icon label="More options" name="more_horiz"></ts-icon>
                    </ts-button>
                    <ts-menu>
                        <ts-menu-item type="checkbox" checked>Web Design</ts-menu-item>
                        <ts-menu-item type="checkbox">Web Development</ts-menu-item>
                        <ts-menu-item type="checkbox">Marketing</ts-menu-item>
                    </ts-menu>
                </ts-dropdown>
            </ts-breadcrumb-item>
            <ts-breadcrumb-item>Our Services</ts-breadcrumb-item>
            <ts-breadcrumb-item>Digital Media</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
};

export const Prefixes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `prefix` slot to add content before any breadcrumb item.',
            },
        },
    },
    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>
                <ts-icon slot="prefix" name="home"></ts-icon>
                Home
            </ts-breadcrumb-item>
            <ts-breadcrumb-item>Library</ts-breadcrumb-item>
            <ts-breadcrumb-item>Data</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
};

export const Suffixes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `suffix` slot to add content after any breadcrumb item.',
            },
        },
    },
    render: args => html`
        <ts-breadcrumb label=${args.label}>
            <ts-breadcrumb-item>Documents</ts-breadcrumb-item>
            <ts-breadcrumb-item>Policies</ts-breadcrumb-item>
            <ts-breadcrumb-item>
                Security
                <ts-icon slot="suffix" name="security"></ts-icon>
            </ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
};

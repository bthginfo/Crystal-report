import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsBreadcrumbItem } from '@tuvsud/design-system/breadcrumb-item';
import '@tuvsud/design-system/breadcrumb';
import '@tuvsud/design-system/breadcrumb-item';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Breadcrumb Item',
    parameters: {
        docs: {
            description: {
                component:
                    'Breadcrumb items serve as the individual links that make up a breadcrumb navigation structure.',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        href: '/',
        target: '_self',
        rel: 'noopener noreferrer',
    },
    render: args => html`
        <ts-breadcrumb>
            <ts-breadcrumb-item href=${args.href} target=${args.target} rel=${args.rel}>
                <ts-icon slot="prefix" name="house"></ts-icon>
                Home
            </ts-breadcrumb-item>
            <ts-breadcrumb-item>Clothing</ts-breadcrumb-item>
            <ts-breadcrumb-item>Shirts</ts-breadcrumb-item>
        </ts-breadcrumb>
    `,
    argTypes: {
        href: {
            control: 'text',
            description: 'URL the breadcrumb item links to.',
        },
        target: {
            control: 'select',
            options: ['_blank', '_parent', '_self', '_top', undefined],
            description: 'Specifies where the linked document is opened.',
        },
        rel: {
            control: 'text',
            description: 'Specifies the relationship between the current document and the linked document.',
        },
    },
} satisfies MetaWithLabel<TsBreadcrumbItem>;

export default meta;
type Story = StoryObjWithLabel<TsBreadcrumbItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A breadcrumb item linking to the home page with an icon prefix, followed by two additional items.',
            },
        },
    },
};

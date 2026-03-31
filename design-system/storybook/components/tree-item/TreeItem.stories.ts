import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsTreeItem } from '@tuvsud/design-system/tree-item';
import '@tuvsud/design-system/tree';
import '@tuvsud/design-system/tree-item';

const meta = {
    title: 'Components/Tree Item',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tree items act as the building blocks of a tree, representing each node in your hierarchical navigation or data structure.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(expanded|selected|disabled|lazy)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-tree>
            <ts-tree-item
                .expanded=${args.expanded}
                ?expanded=${args.expanded}
                .selected=${args.selected}
                ?selected=${args.selected}
                .disabled=${args.disabled}
                ?disabled=${args.disabled}
                .lazy=${args.lazy}
                ?lazy=${args.lazy}
            >
                Item 1
                <ts-tree-item>Subitem 1</ts-tree-item>
                <ts-tree-item>Subitem 2</ts-tree-item>
            </ts-tree-item>
            <ts-tree-item>Item 2</ts-tree-item>
            <ts-tree-item>Item 3</ts-tree-item>
        </ts-tree>
    `,
    args: {
        expanded: false,
        selected: false,
        disabled: false,
        lazy: false,
    },
    argTypes: {
        expanded: { control: 'boolean', description: 'Expands the tree item.' },
        selected: { control: 'boolean', description: 'Marks the tree item as selected.' },
        disabled: { control: 'boolean', description: 'Disables the tree item.' },
        lazy: { control: 'boolean', description: 'Enables lazy loading behavior.' },
    },
} satisfies MetaWithLabel<TsTreeItem>;

export default meta;
type Story = StoryObjWithLabel<TsTreeItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This is the default tree item used inside a tree.',
            },
        },
    },
};

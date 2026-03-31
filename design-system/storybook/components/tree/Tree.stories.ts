import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsTree } from '@tuvsud/design-system/tree';
import type { TsTreeItem } from '@tuvsud/design-system/tree-item';
import '@tuvsud/design-system/tree';
import '@tuvsud/design-system/tree-item';
import '@tuvsud/design-system/badge';
import '@tuvsud/design-system/spinner';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Tree',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Tree component displays hierarchical data in a structured, expandable list. It allows users to navigate and select nested items efficiently.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(expanded|selected|disabled|lazy)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-tree .selection=${args.selection} selection=${ifDefined(args.selection)}>
            <ts-tree-item>
                Item 1
                <ts-tree-item>Subitem 1</ts-tree-item>
                <ts-tree-item>Subitem 2</ts-tree-item>
            </ts-tree-item>
            <ts-tree-item>Item 2</ts-tree-item>
            <ts-tree-item>Item 3</ts-tree-item>
        </ts-tree>
    `,
    args: {
        selection: 'single',
    },
    argTypes: {
        selection: { control: 'select', options: ['single', 'multiple', 'leaf'], description: 'Tree selection mode.' },
    },
} satisfies MetaWithLabel<TsTree>;

export default meta;
type Story = StoryObjWithLabel<TsTree>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default tree with single selection mode.',
            },
        },
    },
};

export const WithSelection: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The selection property lets you change the selection behavior of the tree.',
            },
        },
    },
    args: { selection: 'multiple' },
};

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Decorative icons can be used before labels to provide hints for each node.',
            },
        },
    },
    render: () => html`
        <ts-tree selection="single">
            <ts-tree-item>
                <ts-icon slot="expand-icon" name="folder"></ts-icon>
                <ts-icon slot="collapse-icon" name="folder_open"></ts-icon>
                Documents
                <ts-tree-item>
                    <ts-icon slot="expand-icon" name="folder"></ts-icon>
                    <ts-icon slot="collapse-icon" name="folder_open"></ts-icon>
                    Photos
                    <ts-tree-item><ts-icon slot="icon" name="image"></ts-icon>vacation.jpg</ts-tree-item>
                    <ts-tree-item><ts-icon slot="icon" name="image"></ts-icon>family.jpg</ts-tree-item>
                </ts-tree-item>
                <ts-tree-item>
                    <ts-icon slot="expand-icon" name="folder"></ts-icon>
                    <ts-icon slot="collapse-icon" name="folder_open"></ts-icon>
                    Documents
                    <ts-tree-item><ts-icon slot="icon" name="lab_profile"></ts-icon>report.pdf</ts-tree-item>
                    <ts-tree-item><ts-icon slot="icon" name="lab_profile"></ts-icon>presentation.pptx</ts-tree-item>
                </ts-tree-item>
            </ts-tree-item>
            <ts-tree-item>
                <ts-icon slot="expand-icon" name="folder"></ts-icon>
                <ts-icon slot="collapse-icon" name="folder_open"></ts-icon>
                Downloads
                <ts-tree-item><ts-icon slot="icon" name="file_open"></ts-icon>software.exe</ts-tree-item>
            </ts-tree-item>
        </ts-tree>
    `,
};

export const WithCustomContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can customize the content of tree items using any HTML elements, such as icons and badges.',
            },
        },
    },
    render: () => html`
        <ts-tree selection="single">
            <ts-tree-item>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <ts-icon name="home"></ts-icon>
                    <span>Home</span>
                    <ts-badge variant="primary">New</ts-badge>
                </div>
            </ts-tree-item>
            <ts-tree-item>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <ts-icon name="settings"></ts-icon>
                    <span>Settings</span>
                </div>
                <ts-tree-item>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <ts-icon name="person"></ts-icon>
                        <span>Profile</span>
                    </div>
                </ts-tree-item>
                <ts-tree-item>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <ts-icon name="notification_important"></ts-icon>
                        <span>Notifications</span>
                        <ts-badge variant="danger">3</ts-badge>
                    </div>
                </ts-tree-item>
            </ts-tree-item>
        </ts-tree>
    `,
};

export const Expanded: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Tree items can be expanded or collapsed by default using the `expanded` attribute.',
            },
        },
    },
    render: () => html`
        <ts-tree>
            <ts-tree-item expanded>
                Expanded Item
                <ts-tree-item>Child 1</ts-tree-item>
                <ts-tree-item>Child 2</ts-tree-item>
                <ts-tree-item>Child 3</ts-tree-item>
            </ts-tree-item>
            <ts-tree-item>
                Collapsed Item
                <ts-tree-item>Child 1</ts-tree-item>
                <ts-tree-item>Child 2</ts-tree-item>
            </ts-tree-item>
        </ts-tree>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can disable individual tree items using the `disabled` attribute.',
            },
        },
    },
    render: () => html`
        <ts-tree selection="single">
            <ts-tree-item>
                Regular Item
                <ts-tree-item>Subitem 1</ts-tree-item>
                <ts-tree-item>Subitem 2</ts-tree-item>
            </ts-tree-item>
            <ts-tree-item disabled>
                Disabled Item
                <ts-tree-item>Subitem 1</ts-tree-item>
                <ts-tree-item>Subitem 2</ts-tree-item>
            </ts-tree-item>
            <ts-tree-item>
                Mixed Item
                <ts-tree-item>Regular Subitem</ts-tree-item>
                <ts-tree-item disabled>Disabled Subitem</ts-tree-item>
            </ts-tree-item>
        </ts-tree>
    `,
};

export const WithLazyLoading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Tree items can load their children lazily using the `lazy` attribute. When a lazy item is expanded, a loading spinner is shown until the child items are loaded.',
            },
        },
    },
    render: () => {
        const handleExpand = (event: CustomEvent) => {
            const item = event.target as TsTreeItem;
            const loading = item.querySelector('ts-spinner');
            if (loading) {
                setTimeout(() => {
                    loading.remove();
                    item.innerHTML += `
            <ts-tree-item>Async Child 1</ts-tree-item>
            <ts-tree-item>Async Child 2</ts-tree-item>
          `;
                }, 1000);
            }
        };
        return html`
            <ts-tree @ts-expand=${handleExpand}>
                <ts-tree-item>
                    Regular Item
                    <ts-tree-item>Child 1</ts-tree-item>
                    <ts-tree-item>Child 2</ts-tree-item>
                </ts-tree-item>
                <ts-tree-item lazy> Lazy Loaded Items </ts-tree-item>
            </ts-tree>
        `;
    },
};

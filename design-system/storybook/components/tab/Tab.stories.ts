import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsTab } from '@tuvsud/design-system/tab';
import '@tuvsud/design-system/tab';
import '@tuvsud/design-system/tab-group';
import '@tuvsud/design-system/tab-panel';
import '@tuvsud/design-system/badge';

const meta: Meta<TsTab> = {
    title: 'Components/Tab',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tabs live inside tab groups, letting users seamlessly switch between panels of organized, tabbed content.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(active|disabled|closable)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const { panel, active, disabled, closable } = args;
        return html`
            <ts-tab-group>
                <ts-tab
                    slot="nav"
                    .panel=${panel}
                    panel=${panel}
                    .active=${active}
                    ?active=${active}
                    .disabled=${disabled}
                    ?disabled=${disabled}
                    .closable=${closable}
                    ?closable=${closable}
                    >Tab 1</ts-tab
                >
                <ts-tab-panel name=${panel}>Tab 1 content</ts-tab-panel>
            </ts-tab-group>
        `;
    },
    args: {
        panel: 'panel-1',
        active: false,
        disabled: false,
        closable: false,
    },
    argTypes: {
        panel: { control: 'text', description: 'Associated panel name in the same tab group.' },
        active: { control: 'boolean', description: 'Draws the tab in an active state.' },
        closable: { control: 'boolean', description: 'Shows a close button and makes the tab closable.' },
        disabled: { control: 'boolean', description: 'Disables the tab and prevents selection.' },
    },
};

export default meta;
type Story = StoryObj<TsTab>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This is the default tab component used within a tab group. You can set the associated panel, active state, disabled state, and whether the tab is closable.',
            },
        },
    },
};

export const EventLogs: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story logs the `ts-tab-click` event to the console when the tab is clicked.',
            },
        },
    },
    render: args => {
        const { panel, active, disabled } = args;
        return html`
            <ts-tab-group>
                <ts-tab
                    slot="nav"
                    .panel=${panel}
                    panel=${panel}
                    .active=${active}
                    ?active=${active}
                    .disabled=${disabled}
                    ?disabled=${disabled}
                    .closable=${true}
                    @ts-close=${(e: CustomEvent) => {
                        e.stopPropagation();
                        console.log('Tab closed!', e);
                    }}
                    @ts-tab-click=${(e: CustomEvent) => {
                        console.log('Tab clicked!', e);
                    }}
                    >Tab 1</ts-tab
                >
                <ts-tab-panel name=${panel}>Tab 1 content</ts-tab-panel>
            </ts-tab-group>
        `;
    },
};

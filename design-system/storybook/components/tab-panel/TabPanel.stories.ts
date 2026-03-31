import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsTabPanel } from '@tuvsud/design-system/tab-panel';
import '@tuvsud/design-system/tab';
import '@tuvsud/design-system/tab-group';
import '@tuvsud/design-system/tab-panel';
import '@tuvsud/design-system/badge';

const meta: Meta<TsTabPanel> = {
    title: 'Components/Tab Panel',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tab panels live inside tab groups and reveal the content tied to each tab, creating a clean, organized navigation experience.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\sactive=""(?=[\s>])/g, ' active'),
            },
        },
    },
    render: args => {
        const { name, active } = args as { name: string; active: boolean };
        return html`
            <ts-tab-group>
                <ts-tab slot="nav" panel=${name}>Tab 1</ts-tab>
                <ts-tab-panel .name=${name} name=${name} .active=${active} ?active=${active}>
                    Tab 1 content
                </ts-tab-panel>
            </ts-tab-group>
        `;
    },
    args: {
        name: 'panel-1',
        active: false,
    },
    argTypes: {
        name: { control: 'text', description: 'The tab panel’s name.' },
        active: { control: 'boolean', description: 'When true, the tab panel will be shown.' },
    },
};

export default meta;
type Story = StoryObj<TsTabPanel>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This is the default tab panel used inside a tab group.',
            },
        },
    },
};

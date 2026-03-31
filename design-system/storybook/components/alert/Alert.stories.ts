import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsAlert } from '@tuvsud/design-system/alert';
import '@tuvsud/design-system/alert';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Alert',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The Alert component is used to inform users about important information, warnings, or errors. It supports user guidance and improves transparency within the interface.',
            },
            source: {
                transform: (src: string) => src.replace(/\s(open|closable)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    args: {
        variant: 'primary',
        open: true,
        closable: true,
        duration: Infinity,
        placement: 'inline',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'success', 'neutral', 'warning', 'danger'],
            description: 'Visual style of the alert, defining its semantic meaning.',
        },
        open: {
            control: 'boolean',
            description: 'Controls whether the alert is visible.',
        },
        closable: {
            control: 'boolean',
            description: 'If true, the alert can be dismissed by the user.',
        },
        duration: {
            control: 'number',
            description: 'Time in milliseconds before the alert auto-closes. Use Infinity to disable auto-close.',
        },
        placement: {
            control: { type: 'select' },
            options: ['inline', 'top'],
            description: 'Defines the placement of the alert within the application layout.',
        },
    },
} satisfies MetaWithLabel<TsAlert>;

export default meta;
type Story = StoryObjWithLabel<TsAlert>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the alert is of `primary` variant.',
            },
        },
    },
    render: args => html`
        <ts-alert
            variant=${args.variant}
            .open=${args.open}
            ?open=${args.open}
            .closable=${args.closable}
            ?closable=${args.closable}
            .duration=${args.duration}
            duration=${ifDefined(args.duration)}
            placement=${args.placement}
        >
            <ts-icon slot="icon" name="info" size="24"></ts-icon>
            Alert message goes here.
        </ts-alert>
    `,
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `variant` property to change the alert’s variant.',
            },
        },
    },
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <ts-alert
                variant="primary"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="info" size="24"></ts-icon>
                Primary alert
            </ts-alert>
            <ts-alert
                variant="success"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="task_alt" size="24"></ts-icon>
                Success alert
            </ts-alert>

            <ts-alert
                variant="warning"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="warning" size="24"></ts-icon>
                Warning alert
            </ts-alert>

            <ts-alert
                variant="danger"
                .open=${args.open}
                ?open=${args.open}
                closable="false"
                .duration=${args.duration}
                duration=${args.duration}
            >
                <ts-icon slot="icon" name="error" size="24"></ts-icon>
                Danger alert
            </ts-alert>

            <ts-alert
                variant="neutral"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="lightbulb_circle" size="24"></ts-icon>
                Neutral alert
            </ts-alert>
        </div>
    `,
};

export const ShortBody: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `variant` property to change the alert’s variant.',
            },
        },
    },
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <ts-alert
                variant="success"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="task_alt" size="24"></ts-icon>
                <strong>Success header</strong>
                <div>This is a more detailed message body for the success alert.</div>
            </ts-alert>
        </div>
    `,
};

export const LongBody: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `variant` property to change the alert’s variant.',
            },
        },
    },
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <ts-alert
                variant="success"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
            >
                <ts-icon slot="icon" name="info" size="24"></ts-icon>
                <strong>Success header</strong>
                <div>This is a more detailed message body for the success alert.</div>
                <div>This is a more detailed message body for the success alert.</div>
                <div>This is a more detailed message body for the success alert.</div>
                <div>This is a more detailed message body for the success alert.</div>
                <div>This is a more detailed message body for the success alert.</div>
            </ts-alert>
        </div>
    `,
};

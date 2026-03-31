import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsToast } from '@tuvsud/design-system/toast';
import '@tuvsud/design-system/toast';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Toast',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The Toast component is used to show brief, non-blocking messages. It supports variants, optional dismiss actions, loading state and stacked placements.',
            },
            source: {
                transform: (src: string) => src.replace(/\s(open|closable|loading)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    args: {
        variant: 'primary',
        open: true,
        closable: true,
        loading: false,
        duration: Infinity,
        placement: 'inline',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'success', 'neutral', 'warning', 'danger'],
            description: 'Visual style of the toast, defining its semantic meaning.',
        },
        open: {
            control: 'boolean',
            description: 'Controls whether the toast is visible.',
        },
        closable: {
            control: 'boolean',
            description: 'If true, the toast can be dismissed by the user.',
        },
        loading: {
            control: 'boolean',
            description: 'If true, shows a spinner and disables auto-hide and close action.',
        },
        duration: {
            control: 'number',
            description: 'Time in milliseconds before the toast auto-hides. Use Infinity to disable auto-hide.',
        },
        placement: {
            control: { type: 'select' },
            options: [
                'inline',
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left',
                'top-center',
                'bottom-center',
                'top',
            ],
            description:
                'Defines where the toast is rendered. Non-inline placements will mount into a stack in document.body.',
        },
    },
} satisfies MetaWithLabel<TsToast>;

export default meta;
type Story = StoryObjWithLabel<TsToast>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the toast is `primary`, open, and inline.',
            },
        },
    },
    render: args => html`
        <ts-toast
            variant=${args.variant}
            .open=${args.open}
            ?open=${args.open}
            .closable=${args.closable}
            ?closable=${args.closable}
            .loading=${args.loading}
            ?loading=${args.loading}
            .duration=${args.duration}
            duration=${ifDefined(args.duration)}
            placement=${args.placement}
        >
            <ts-icon slot="icon" name="info" size="24"></ts-icon>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <strong>Toast</strong>
                <span>Toast message goes here.</span>
            </div>
        </ts-toast>
    `,
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `variant` property to change the toast’s semantic meaning.',
            },
        },
    },
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <ts-toast
                variant="primary"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .loading=${args.loading}
                ?loading=${args.loading}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
                placement="inline"
            >
                <ts-icon slot="icon" name="info" size="24"></ts-icon>
                Primary toast
            </ts-toast>

            <ts-toast
                variant="success"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .loading=${args.loading}
                ?loading=${args.loading}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
                placement="inline"
            >
                <ts-icon slot="icon" name="task_alt" size="24"></ts-icon>
                Success toast
            </ts-toast>

            <ts-toast
                variant="warning"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .loading=${args.loading}
                ?loading=${args.loading}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
                placement="inline"
            >
                <ts-icon slot="icon" name="warning" size="24"></ts-icon>
                Warning toast
            </ts-toast>

            <ts-toast
                variant="danger"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .loading=${args.loading}
                ?loading=${args.loading}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
                placement="inline"
            >
                <ts-icon slot="icon" name="error" size="24"></ts-icon>
                Danger toast
            </ts-toast>

            <ts-toast
                variant="neutral"
                .open=${args.open}
                ?open=${args.open}
                .closable=${args.closable}
                ?closable=${args.closable}
                .loading=${args.loading}
                ?loading=${args.loading}
                .duration=${args.duration}
                duration=${ifDefined(args.duration)}
                placement="inline"
            >
                <ts-icon slot="icon" name="lightbulb_circle" size="24"></ts-icon>
                Neutral toast
            </ts-toast>
        </div>
    `,
};

export const AutoHide: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use a finite `duration` to auto-hide.',
            },
        },
    },
    render: () => html`
        <ts-toast variant="primary" open closable .duration=${3000} duration="3000" placement="inline">
            <ts-icon slot="icon" name="info" size="24"></ts-icon>
            This toast will auto-hide after 3 seconds.
        </ts-toast>
    `,
};

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When `loading` is true, the spinner is shown and auto-hide/closing are disabled.',
            },
        },
    },
    render: args => html`
        <ts-toast
            variant=${args.variant}
            .open=${args.open}
            ?open=${args.open}
            .closable=${args.closable}
            ?closable=${args.closable}
            loading
            .duration=${args.duration}
            duration=${ifDefined(args.duration)}
            placement="inline"
        >
            <ts-icon slot="icon" name="info" size="24"></ts-icon>
            Loading…
        </ts-toast>
    `,
};

export const LongBody: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The toast body can contain multiple lines and custom markup.',
            },
        },
    },
    render: args => html`
        <ts-toast
            variant=${args.variant}
            .open=${args.open}
            ?open=${args.open}
            .closable=${args.closable}
            ?closable=${args.closable}
            .loading=${args.loading}
            ?loading=${args.loading}
            .duration=${args.duration}
            duration=${ifDefined(args.duration)}
            placement=${args.placement}
        >
            <ts-icon slot="icon" name="info" size="24"></ts-icon>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </ts-toast>
    `,
};

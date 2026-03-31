import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsCopyButton } from '@tuvsud/design-system/copy-button';
import '@tuvsud/design-system/copy-button';

const meta = {
    title: 'Components/Copy Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Copy Button allows users to quickly copy text or content to their clipboard with a single click. It provides immediate feedback through visual states and tooltips.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(disabled|hoist)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-copy-button
            .value=${args.value}
            value=${ifDefined(args.value)}
            .from=${args.from}
            from=${ifDefined(args.from)}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .copyLabel=${args.copyLabel}
            copy-label=${ifDefined(args.copyLabel)}
            .successLabel=${args.successLabel}
            success-label=${ifDefined(args.successLabel)}
            .errorLabel=${args.errorLabel}
            error-label=${ifDefined(args.errorLabel)}
            .feedbackDuration=${args.feedbackDuration}
            feedback-duration=${ifDefined(args.feedbackDuration)}
            .tooltipPlacement=${args.tooltipPlacement}
            tooltip-placement=${ifDefined(args.tooltipPlacement)}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
        >
            Copy
        </ts-copy-button>
    `,
    args: {
        value: 'this value will be copied to clipboard',
        from: '',
        disabled: false,
        copyLabel: '',
        successLabel: '',
        errorLabel: '',
        feedbackDuration: 1000,
        tooltipPlacement: 'top',
        hoist: false,
    },
    argTypes: {
        value: { control: 'text', description: 'The text value to copy.' },
        from: {
            control: 'text',
            description:
                'Element id to copy from. Supports attribute via [attr] and property via .prop (e.g., "el[value]" or "el.value"). Takes precedence over value.',
        },
        disabled: { control: 'boolean', description: 'Disables the copy button.' },
        copyLabel: { control: 'text', description: 'Custom tooltip label.' },
        successLabel: { control: 'text', description: 'Tooltip label shown after copying.' },
        errorLabel: { control: 'text', description: 'Tooltip label shown when a copy error occurs.' },
        feedbackDuration: {
            control: 'number',
            description: 'Duration in ms to show feedback before restoring the default trigger.',
        },
        tooltipPlacement: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Preferred placement of the tooltip.',
        },
        hoist: {
            control: 'boolean',
            description: 'Prevents tooltip clipping in scrollable containers by using fixed positioning.',
        },
    },
} satisfies MetaWithLabel<TsCopyButton>;

export default meta;
type Story = StoryObjWithLabel<TsCopyButton>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default copy button state is enabled and ready to copy the preset value.',
            },
        },
    },
};

export const FromElements: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The copy button can copy text from other elements by specifying the element ID using the `from` attribute.',
            },
        },
    },
    render: () => html`
        <span id="phone-number" style="color: var(--ts-semantic-color-text-base-default);">+1 (234) 456-7890</span>
        <ts-copy-button from="phone-number"></ts-copy-button>
    `,
};

export const Error: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The copy button can copy text from other elements by specifying the element ID using the `from` attribute.',
            },
        },
    },
    render: () => html` <ts-copy-button error-label="Can't be copied" from="id"></ts-copy-button> `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The copy button can copy text from other elements by specifying the element ID using the `from` attribute.',
            },
        },
    },
    render: () => html` <ts-copy-button disabled></ts-copy-button> `,
};

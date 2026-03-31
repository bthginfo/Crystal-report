import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsSwitch } from '@tuvsud/design-system/switch';
import '@tuvsud/design-system/switch';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Switch',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Switch is a toggle control that allows users to turn an option on or off. It represents a binary state and is commonly used for settings or preferences.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(checked|disabled|required|default-checked|label-visually-hidden)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => html`
        <ts-switch
            label=${args.label}
            .size=${args.size}
            size=${args.size}
            .checked=${args.checked}
            ?checked=${args.checked}
            .defaultChecked=${args.defaultChecked}
            ?default-checked=${args.defaultChecked}
            .required=${args.required}
            ?required=${args.required}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .name=${args.name}
            name=${ifDefined(args.name || undefined)}
            .value=${args.value}
            value=${ifDefined(args.value || undefined)}
            .form=${args.form}
            form=${ifDefined(args.form || undefined)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText || undefined)}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            aria-label=${ifDefined(args.ariaLabel)}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        >
            Switch
        </ts-switch>
    `,
    args: {
        label: 'Switch',
        size: 'medium',
        checked: true,
        defaultChecked: false,
        required: false,
        disabled: false,
        name: 'switch',
        value: 'switch-value',
        form: '',
        helpText: '',
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        name: { control: 'text', description: 'The name of the switch, submitted with form data.' },
        label: { control: 'text', description: 'The switch label. Use the `label` slot for HTML.' },
        value: { control: 'text', description: 'The current value of the switch, submitted with form data.' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'The switch’s size.' },
        disabled: { control: 'boolean', description: 'Disables the switch.' },
        checked: { control: 'boolean', description: 'Draws the switch in a checked state.' },
        defaultChecked: { control: 'boolean', description: 'Default checked state for form resets.' },
        form: {
            control: 'text',
            description: 'Associate with a form by id when placed outside a form (same document or shadow root).',
        },
        required: { control: 'boolean', description: 'Makes the switch a required field.' },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        error: { control: 'boolean', description: 'Shows the input in an error state with a red border.' },
        errorMessage: { control: 'text', description: 'Error text shown below the input when provided.' },
        ariaLabel: {
            control: 'text',
            description: 'The aria-label attribute provides an accessible name for the input.',
        },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides the label but keeps it accessible to screen readers.',
        },
        validity: { control: false, table: { disable: false }, description: 'Gets the validity state object.' },
        validationMessage: { control: false, table: { disable: false }, description: 'Gets the validation message.' },
    },
} satisfies MetaWithLabel<TsSwitch>;

export default meta;
type Story = StoryObjWithLabel<TsSwitch>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the switch is unchecked.',
            },
        },
    },
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the switch is unchecked.',
            },
        },
    },
    args: {},
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ts-switch size="small" .disabled=${args.disabled} label="small"> Small </ts-switch>
            <ts-switch size="medium" .disabled=${args.disabled}> Medium </ts-switch>
            <ts-switch size="large" .disabled=${args.disabled}> Large </ts-switch>
        </div>
    `,
};

export const HelpText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `help-text` slot or property to provide additional information about the switch.',
            },
        },
    },
    args: {},
    render: args => html`
        <ts-switch size="medium" .disabled=${args.disabled}>
            Switch
            <span slot="help-text">Help text</span>
        </ts-switch>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `help-text` slot or property to provide additional information about the switch.',
            },
        },
    },
    args: { disabled: true },
    render: args => html`
        <ts-switch size="medium" .disabled=${args.disabled}>
            Switch
            <span slot="help-text">Help text</span>
        </ts-switch>
    `,
};

export const Validation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `help-text` slot or property to provide additional information about the switch.',
            },
        },
    },
    args: { disabled: true, error: true, errorMessage: 'This field is required.' },
    render: args => html`
        <ts-switch size="medium" error=${args.error} error-message=${args.errorMessage}>
            Switch
            <span slot="help-text">Help text</span>
        </ts-switch>
    `,
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example shows how to use the switch with form validation. The switch will show an error state if the form is submitted without it being checked.',
            },
        },
    },
    args: {
        required: true,
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('ts-switch') as TsSwitch;

                input.error = false;
                input.errorMessage = '';
                input.setCustomValidity('');

                const valid = input.checkValidity();

                if (!valid) {
                    input.error = true;
                    input.errorMessage = 'Accept the terms to proceed.';
                }
            }}
        >
            <ts-switch .required=${args.required}>
                Switch
                <span slot="help-text">Help text</span>
            </ts-switch>

            <ts-button style="float: right; padding-top: 1rem" type="submit" variant="primary">Submit</ts-button>
        </form>
    `,
};

export const LabelHidden: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `labelVisuallyHidden` property to visually hide the label while keeping it accessible to screen readers.',
            },
        },
    },
    args: { labelVisuallyHidden: true },
};

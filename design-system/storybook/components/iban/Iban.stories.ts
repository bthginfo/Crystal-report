import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsIban } from '@tuvsud/design-system/iban';
import '@tuvsud/design-system/iban';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Iban',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Formats the input value into the standard IBAN format.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(clearable|disabled|readonly|required|pill|label-visually-hidden)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => html`
        <ts-iban
            .value=${args.value}
            value=${ifDefined(args.value)}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .size=${args.size}
            size=${ifDefined(args.size)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .placeholder=${args.placeholder}
            placeholder=${ifDefined(args.placeholder)}
            .clearable=${args.clearable}
            ?clearable=${args.clearable}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .readonly=${args.readonly}
            ?readonly=${args.readonly}
            .required=${args.required}
            ?required=${args.required}
            .pill=${args.pill}
            ?pill=${args.pill}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            error-message=${ifDefined(args.errorMessage || undefined)}
            aria-label=${ifDefined(args.ariaLabel)}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        ></ts-iban>
    `,
    args: {
        value: '',
        label: 'Your account number',
        helpText: '',
        placeholder: 'Type something',
        clearable: false,
        disabled: false,
        readonly: false,
        required: false,
        pill: false,
        size: 'medium',
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'The input’s size.' },
        value: { control: 'text', description: 'The current value, submitted with form data.' },
        label: { control: 'text', description: 'The input’s label. Use the `label` slot for HTML.' },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        placeholder: { control: 'text', description: 'Placeholder text shown when empty.' },
        clearable: { control: 'boolean', description: 'Adds a clear button when the input is not empty.' },
        disabled: { control: 'boolean', description: 'Disables the input.' },
        readonly: { control: 'boolean', description: 'Makes the input readonly.' },
        required: { control: 'boolean', description: 'Marks the input as required.' },
        pill: { control: 'boolean', description: 'Draws a pill-style input with rounded edges.' },
        error: { control: 'boolean', description: 'Shows the input in an error state.' },
        errorMessage: { control: 'text', description: 'Error text shown below the input when provided.' },
        ariaLabel: {
            control: 'text',
            description:
                'The aria-label attribute provides an accessible name for the input when there is no visible label.',
        },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides the label but keeps it accessible to screen readers.',
        },
    },
} satisfies MetaWithLabel<TsIban>;

export default meta;

type Story = StoryObjWithLabel<TsIban>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the IBAN input is empty and ready for user input.',
            },
        },
    },
    args: {},
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates validation for the IBAN input on form submit. The IBAN format is validated when the form is submitted.',
            },
        },
    },
    args: {
        label: 'Bank Account',
        helpText: 'Enter a valid IBAN (e.g., DE89 3704 0044 0532 0130 00)',
        required: true,
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const iban = form.querySelector('ts-iban') as TsIban;

                // Reset error state
                iban.error = false;
                iban.errorMessage = '';
                iban.setCustomValidity('');

                const valid = iban.checkValidity();

                if (!valid) {
                    iban.error = true;
                    iban.errorMessage = 'Please enter a valid IBAN.';
                }
            }}
        >
            <ts-iban
                .label=${args.label}
                label=${args.label}
                .helpText=${args.helpText}
                help-text=${args.helpText}
                .required=${args.required}
                ?required=${args.required}
            ></ts-iban>

            <ts-button style="float: right; padding-top: 1rem" type="submit">Submit</ts-button>
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

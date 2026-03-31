import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsRadioGroup } from '@tuvsud/design-system/radio-group';
import '@tuvsud/design-system/radio';
import '@tuvsud/design-system/radio-button';
import '@tuvsud/design-system/radio-group';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Radio Group',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A radio group is the container that organizes related radio options and ensures only one can be selected at a time.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(required|label-visually-hidden)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-radio-group
            .label=${args.label}
            label=${args.label}
            .helpText=${args.helpText}
            help-text=${args.helpText}
            .name=${args.name}
            name=${args.name}
            .value=${args.value}
            value=${args.value}
            .size=${args.size}
            size=${args.size}
            .form=${args.form}
            form=${args.form}
            .required=${args.required}
            ?required=${args.required}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            error-message=${args.errorMessage}
            .direction=${args.direction}
            direction=${args.direction}
            aria-label=${ifDefined(args.ariaLabel)}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        >
            <ts-radio .size=${args.size} size=${args.size} value="1">Option 1</ts-radio>
            <ts-radio .size=${args.size} size=${args.size} value="2">Option 2</ts-radio>
            <ts-radio .size=${args.size} size=${args.size} value="3">Option 3</ts-radio>
        </ts-radio-group>
    `,
    args: {
        label: 'Select an option',
        helpText: '',
        name: 'option',
        value: '',
        size: 'medium',
        form: '',
        required: false,
        error: false,
        errorMessage: '',
        direction: 'vertical',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        label: { control: 'text', description: 'The radio group’s label. Use the `label` slot for HTML.' },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        name: { control: 'text', description: 'The group’s name, submitted with form data.' },
        value: { control: 'select', options: ['', '1', '2', '3'], description: 'The group’s current value.' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Applied to all child radios/buttons.',
        },
        form: { control: 'text', description: 'Associates the group with a form by ID when outside a form.' },
        required: { control: 'boolean', description: 'Requires a child radio to be checked before form submission.' },
        validity: {
            control: false,
            table: { disable: false },
            description: 'Gets the validity state object (read-only).',
        },
        validationMessage: {
            control: false,
            table: { disable: false },
            description: 'Gets the validation message (read-only).',
        },
        error: { control: 'boolean', description: 'Shows the input in an error state with a red border.' },
        errorMessage: { control: 'text', description: 'Error text shown below the input when provided.' },
        direction: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'The direction to layout the child radios.',
        },
        ariaLabel: {
            control: 'text',
            description:
                'The aria-label attribute provides an accessible name for the radio group when there is no visible label.',
        },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides the label but keeps it accessible to screen readers.',
        },
    },
} satisfies MetaWithLabel<TsRadioGroup>;

export default meta;
type Story = StoryObjWithLabel<TsRadioGroup>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates required validation for the radio group on submit.',
            },
        },
    },
    args: {
        label: 'Required Validation',
        helpText: 'Please choose an option.',
        name: 'validation',
        value: '',
        size: 'medium',
        form: '',
        required: true,
        error: false,
        errorMessage: '',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const radioGroup = form.querySelector('ts-radio-group') as TsRadioGroup | null;

                if (!radioGroup) return;

                radioGroup.error = false;
                radioGroup.errorMessage = '';
                radioGroup.setCustomValidity('');

                const valid = radioGroup.checkValidity();

                if (!valid) {
                    radioGroup.error = true;
                    radioGroup.errorMessage = 'Please choose an option.';
                    radioGroup.setCustomValidity('Please choose an option.');
                    radioGroup.reportValidity();
                }
            }}
        >
            <ts-radio-group
                .label=${args.label}
                label=${args.label}
                .helpText=${args.helpText}
                help-text=${args.helpText}
                .name=${args.name}
                name=${args.name}
                .value=${args.value}
                value=${args.value}
                .size=${args.size}
                size=${args.size}
                .form=${args.form}
                form=${args.form}
                .required=${args.required}
                ?required=${args.required}
                .error=${args.error}
                ?error=${args.error}
                .errorMessage=${args.errorMessage}
                error-message=${args.errorMessage}
            >
                <ts-radio .size=${args.size} size=${args.size} value="1">Option 1</ts-radio>
                <ts-radio .size=${args.size} size=${args.size} value="2">Option 2</ts-radio>
                <ts-radio .size=${args.size} size=${args.size} value="3">Option 3</ts-radio>
            </ts-radio-group>

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

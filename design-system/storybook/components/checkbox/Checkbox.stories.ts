import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsCheckbox } from '@tuvsud/design-system/checkbox';
import '@tuvsud/design-system/checkbox';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Checkbox',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Checkboxes are used when there are multiple items to select in a list. Users can select zero, one, or any number of items.',
            },
            source: {
                transform: (src: string) =>
                    src.replace(
                        /\s(checked|disabled|indeterminate|required|label-visually-hidden)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => html`
        <ts-checkbox
            .name=${args.name}
            name=${args.name}
            .value=${args.value}
            value=${args.value}
            .size=${args.size}
            size=${args.size}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .checked=${args.checked}
            ?checked=${args.checked}
            .indeterminate=${args.indeterminate}
            ?indeterminate=${args.indeterminate}
            .defaultChecked=${args.defaultChecked}
            ?defaultChecked=${args.defaultChecked}
            .form=${args.form}
            form=${args.form}
            .required=${args.required}
            ?required=${args.required}
            .helpText=${args.helpText}
            help-text=${args.helpText}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        >
            Checkbox
        </ts-checkbox>
    `,
    args: {
        name: '',
        value: '',
        size: 'medium',
        disabled: false,
        checked: false,
        indeterminate: false,
        defaultChecked: false,
        form: '',
        required: false,
        helpText: '',
        error: false,
        errorMessage: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'The name of the checkbox, submitted as a name/value pair with form data.',
        },
        value: { control: 'text', description: 'The current value of the checkbox, submitted with form data.' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'The checkbox’s size.',
        },
        disabled: { control: 'boolean', description: 'Disables the checkbox.' },
        checked: { control: 'boolean', description: 'Draws the checkbox in a checked state.' },
        indeterminate: {
            control: 'boolean',
            description:
                'Draws the checkbox in an indeterminate state, usually for “select all/none” behavior when children are mixed.',
        },
        defaultChecked: { control: 'boolean', description: 'The default value of the form control (used for resets).' },
        form: {
            control: 'text',
            description:
                'Associates the checkbox with a form by ID. Allows the checkbox to be placed outside the form element.',
        },
        required: { control: 'boolean', description: 'Makes the checkbox a required field.' },
        helpText: {
            control: 'text',
            description: 'Help text for the checkbox. For HTML content, use the `help-text` slot instead.',
        },
        error: { control: 'boolean', description: 'Shows the input in an error state with a red border.' },
        errorMessage: { control: 'text', description: 'Error text shown below the input when provided.' },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides the label but keeps it accessible to screen readers.',
        },
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
    },
} satisfies MetaWithLabel<TsCheckbox>;

export default meta;
type Story = StoryObjWithLabel<TsCheckbox>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default checkbox state is unchecked and enabled.',
            },
        },
    },
};

export const Checked: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `checked` property to activate the checkbox.',
            },
        },
    },
    args: { checked: true },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable the checkbox.',
            },
        },
    },
    args: { disabled: true },
};

export const Indeterminate: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `indeterminate` property to make the checkbox indeterminate.',
            },
        },
    },
    args: { indeterminate: true },
};

export const HelperText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add descriptive help text to a switch with the `help-text` property. For help texts that contain HTML, use the help-text slot instead.',
            },
        },
    },
    args: { helpText: 'What should the user know about the checkbox?' },
};

export const Required: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `required` attribute to make the checkbox required. The error state is shown after submit.',
            },
        },
    },
    args: {
        required: true,
        error: false,
        errorMessage: '',
        helpText: '',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const checkbox = form.querySelector('ts-checkbox') as TsCheckbox;

                checkbox.error = false;
                checkbox.errorMessage = '';
                checkbox.setCustomValidity('');

                const valid = checkbox.checkValidity();

                if (!valid) {
                    checkbox.error = true;
                    checkbox.errorMessage = 'This field is required.';
                    checkbox.setCustomValidity('This field is required.');
                }
            }}
        >
            <ts-checkbox
                .required=${args.required}
                ?required=${args.required}
                .helpText=${args.helpText}
                help-text=${args.helpText}
            >
                Accept terms
            </ts-checkbox>

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

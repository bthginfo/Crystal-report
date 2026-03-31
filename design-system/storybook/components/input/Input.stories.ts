import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsInput } from '@tuvsud/design-system/input';
import '@tuvsud/design-system/input';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Input',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The Input component allows users to enter and edit text or numeric values. It is a fundamental element for forms, search bars, and data entry interfaces.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(clearable|disabled|readonly|required|password-toggle|pill|filled|password-visible|no-spin-buttons|autofocus|label-visually-hidden)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => html`
        <ts-input
            .type=${args.type}
            type=${args.type}
            .name=${args.name}
            name=${ifDefined(args.name)}
            .value=${args.value}
            value=${ifDefined(args.value)}
            .defaultValue=${args.defaultValue}
            default-value=${ifDefined(args.defaultValue)}
            .size=${args.size}
            size=${args.size}
            .filled=${args.filled}
            ?filled=${args.filled}
            .pill=${args.pill}
            ?pill=${args.pill}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .clearable=${args.clearable}
            ?clearable=${args.clearable}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .placeholder=${args.placeholder}
            placeholder=${ifDefined(args.placeholder)}
            .readonly=${args.readonly}
            ?readonly=${args.readonly}
            .passwordToggle=${args.passwordToggle}
            ?password-toggle=${args.passwordToggle}
            .passwordVisible=${args.passwordVisible}
            ?password-visible=${args.passwordVisible}
            .noSpinButtons=${args.noSpinButtons}
            ?no-spin-buttons=${args.noSpinButtons}
            .form=${args.form}
            form=${ifDefined(args.form)}
            .required=${args.required}
            ?required=${args.required}
            .pattern=${args.pattern}
            pattern=${ifDefined(args.pattern || undefined)}
            .minlength=${args.minlength}
            minlength=${ifDefined(args.minlength)}
            .maxlength=${args.maxlength}
            maxlength=${ifDefined(args.maxlength)}
            .min=${args.min}
            min=${ifDefined(args.min === '' ? undefined : args.min)}
            .max=${args.max}
            max=${ifDefined(args.max === '' ? undefined : args.max)}
            .step=${args.step}
            step=${ifDefined(args.step)}
            .autocapitalize=${args.autocapitalize}
            autocapitalize=${ifDefined(args.autocapitalize)}
            .autocorrect=${args.autocorrect}
            autocorrect=${ifDefined(args.autocorrect)}
            .autocomplete=${args.autocomplete}
            autocomplete=${ifDefined(args.autocomplete)}
            .autofocus=${args.autofocus}
            ?autofocus=${args.autofocus}
            .enterkeyhint=${args.enterkeyhint}
            enterkeyhint=${ifDefined(args.enterkeyhint)}
            .spellcheck=${args.spellcheck}
            spellcheck=${String(args.spellcheck)}
            .inputmode=${args.inputmode}
            inputmode=${ifDefined(args.inputmode)}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            aria-label=${ifDefined(args.ariaLabel)}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        ></ts-input>
    `,
    args: {
        type: 'text',
        name: '',
        value: '',
        defaultValue: '',
        size: 'medium',
        filled: false,
        pill: false,
        label: 'Label',
        helpText: '',
        clearable: false,
        disabled: false,
        placeholder: 'Type something',
        readonly: false,
        passwordToggle: false,
        passwordVisible: false,
        noSpinButtons: false,
        form: '',
        required: false,
        pattern: '',
        minlength: undefined,
        maxlength: undefined,
        min: '',
        max: '',
        step: 'any',
        autocapitalize: 'off',
        autocomplete: 'off',
        autofocus: false,
        enterkeyhint: undefined,
        spellcheck: true,
        inputmode: 'text',
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['email', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'],
            description: 'The type of input. Only a subset of native types is supported.',
        },
        name: { control: 'text', description: 'The name of the input, submitted with form data.' },
        value: { control: 'text', description: 'The current value, submitted with form data.' },
        defaultValue: { control: 'text', description: 'Default value of the control, useful for form resets.' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'The input’s size.' },
        filled: { control: 'boolean', description: 'Draws a filled input.' },
        pill: { control: 'boolean', description: 'Draws a pill-style input with rounded edges.' },
        label: { control: 'text', description: 'The input’s label. Use the `label` slot for HTML.' },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        clearable: { control: 'boolean', description: 'Adds a clear button when the input is not empty.' },
        disabled: { control: 'boolean', description: 'Disables the input.' },
        placeholder: { control: 'text', description: 'Placeholder text shown when empty.' },
        readonly: { control: 'boolean', description: 'Makes the input readonly.' },
        passwordToggle: {
            control: 'boolean',
            description: 'Adds a button to toggle password visibility. Applies to password type.',
        },
        passwordVisible: {
            control: 'boolean',
            description: 'Whether the password is currently visible. Applies to password type.',
        },
        noSpinButtons: {
            control: 'boolean',
            description: 'Hides native spin buttons for number inputs.',
        },
        form: {
            control: 'text',
            description:
                'Associates the control with a form by ID when placed outside a form. Must be in the same document or shadow root.',
        },
        required: { control: 'boolean', description: 'Marks the input as required.' },
        pattern: { control: 'text', description: 'Regex pattern to validate input against.' },
        minlength: { control: 'number', description: 'Minimum length of input that will be considered valid.' },
        maxlength: { control: 'number', description: 'Maximum length of input that will be considered valid.' },
        min: { control: 'text', description: 'Minimum value. Applies to date and number types.' },
        max: { control: 'text', description: 'Maximum value. Applies to date and number types.' },
        step: {
            control: 'text',
            description:
                'Granularity the value must adhere to, or "any" for no stepping. Applies to date and number types.',
        },
        autocapitalize: {
            control: 'select',
            options: ['off', 'none', 'on', 'sentences', 'words', 'characters'],
            description: 'Controls automatic capitalization.',
        },
        autocorrect: { control: 'select', options: ['off', 'on'], description: 'Toggles browser autocorrect.' },
        autocomplete: {
            control: 'text',
            description: 'Autocomplete hint to the browser (see MDN for valid values).',
        },
        autofocus: { control: 'boolean', description: 'Focus the input on page load.' },
        enterkeyhint: {
            control: 'select',
            options: ['enter', 'done', 'go', 'next', 'previous', 'search', 'send'],
            description: 'Customize the Enter key label on virtual keyboards.',
        },
        spellcheck: { control: 'boolean', description: 'Enables spell checking on the input.' },
        inputmode: {
            control: 'select',
            options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
            description: 'Hints the expected type of data for virtual keyboards.',
        },
        valueAsDate: {
            control: false,
            table: { disable: false },
            description:
                'Gets/sets the current value as a Date. Uses the native input implementation and may throw for invalid conversions.',
        },
        valueAsNumber: {
            control: false,
            table: { disable: false },
            description: 'Gets/sets the current value as a number. Returns NaN if it cannot be converted.',
        },
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
        validity: {
            control: false,
            table: { disable: false },
            description: 'Gets the validity state object. Native browser validation state',
        },
        validationMessage: {
            control: false,
            table: { disable: false },
            description: 'Gets the validation message. Human-readable error string generated by browser',
        },
    },
} satisfies MetaWithLabel<TsInput>;

export default meta;
type Story = StoryObjWithLabel<TsInput>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default input is a basic text input with a label and help text.',
            },
        },
    },
    args: {
        label: 'Default Input',
        helpText: 'This is a basic text input',
    },
};

export const Password: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add the password-toggle property to add a toggle button that will show the password when activated.',
            },
        },
    },
    args: { type: 'password', label: 'Password', passwordToggle: true, helpText: 'Enter your password' },
};

export const WithPrefix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `prefix` slots to add icons.',
            },
        },
    },
    args: { label: 'Username', placeholder: 'Enter your username' },
    render: args => html`
        <ts-input
            .type=${args.type}
            type=${args.type}
            .size=${args.size}
            size=${args.size}
            .value=${args.value}
            value=${ifDefined(args.value)}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .placeholder=${args.placeholder}
            placeholder=${ifDefined(args.placeholder)}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
        >
            <ts-icon slot="prefix" name="person"></ts-icon>
        </ts-input>
    `,
};

export const WithSuffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `suffix` slots to add icons.',
            },
        },
    },
    args: { type: 'email', label: 'Email', placeholder: 'Enter your email' },
    render: args => html`
        <ts-input
            .type=${args.type}
            type=${args.type}
            .size=${args.size}
            size=${args.size}
            .value=${args.value}
            value=${ifDefined(args.value)}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .placeholder=${args.placeholder}
            placeholder=${ifDefined(args.placeholder)}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
        >
            <ts-icon slot="suffix" name="mail" style-type="rounded"></ts-icon>
        </ts-input>
    `,
};

export const Clearable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add the `clearable` attribute to add a clear button when the input has content.',
            },
        },
    },
    args: { label: 'Clearable Input', clearable: true, value: 'Clear me!' },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` attribute to disable an input.',
            },
        },
    },
    args: { label: 'Disabled Input', disabled: true, value: 'You cannot edit this' },
};

export const Readonly: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `readonly` attribute to make an input readonly.',
            },
        },
    },
    args: { label: 'Readonly Input', readonly: true, value: 'You cannot edit this' },
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `size` property to change an input’s size.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ts-input size="small" label="Small" placeholder="Small input"></ts-input>
            <ts-input size="medium" label="Medium" placeholder="Medium input"></ts-input>
            <ts-input size="large" label="Large" placeholder="Large input"></ts-input>
        </div>
    `,
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add the `pill` attribute to create a pill-style input with rounded edges.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ts-input size="small" label="Small" placeholder="Small input" pill></ts-input>
            <ts-input size="medium" label="Medium" placeholder="Medium input" pill></ts-input>
            <ts-input size="large" label="Large" placeholder="Large input" pill></ts-input>
        </div>
    `,
};

export const Required: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add the `required` attribute to mark an input as required.',
            },
        },
    },
    args: { label: 'Required Input', required: true, helpText: 'Some help text', placeholder: 'some placeholder' },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('ts-input') as TsInput;

                input.error = false;
                input.errorMessage = '';
                input.setCustomValidity('');

                const valid = input.checkValidity();

                if (!valid) {
                    input.error = true;
                    input.errorMessage = 'This field is required';
                }
            }}
        >
            <ts-input
                .label=${args.label}
                label=${ifDefined(args.label)}
                .helpText=${args.helpText}
                help-text=${ifDefined(args.helpText)}
                .required=${args.required}
                ?required=${args.required}
                placeholder=${ifDefined(args.placeholder)}
            ></ts-input>

            <ts-button style="float: right; padding-top: 1rem" type="submit">Submit</ts-button>
        </form>
    `,
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pattern` property to add custom validation to an input. In this example, the input requires exactly 4 digits.',
            },
        },
    },
    args: {
        label: 'Pattern Validation',
        pattern: '[0-9]{4}',
        helpText: 'Please enter your birth year',
        required: true,
        placeholder: 'YYYY',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('ts-input') as TsInput;

                input.error = false;
                input.errorMessage = '';
                input.setCustomValidity('');

                const valid = input.checkValidity();

                if (!valid) {
                    input.error = true;
                    input.errorMessage = 'Enter exactly 4 digits.';
                }
            }}
        >
            <ts-input
                .pattern=${args.pattern}
                pattern=${ifDefined(args.pattern)}
                .label=${args.label}
                label=${ifDefined(args.label)}
                .helpText=${args.helpText}
                help-text=${ifDefined(args.helpText)}
                .required=${args.required}
                ?required=${args.required}
                placeholder=${ifDefined(args.placeholder)}
            ></ts-input>

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

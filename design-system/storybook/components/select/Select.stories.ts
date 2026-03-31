import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsSelect } from '@tuvsud/design-system/select';
import '@tuvsud/design-system/select';
import '@tuvsud/design-system/option';
import '@tuvsud/design-system/divider';
import '@tuvsud/design-system/icon';
import '@tuvsud/design-system/tag';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Select',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Select component allows users to choose one option from a list in a dropdown menu. It is commonly used in forms, filters, and settings where a predefined set of choices is required.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(multiple|clearable|disabled|required|hoist|open|filled|pill|label-visually-hidden)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => {
        const {
            label,
            helpText,
            placeholder,
            size,
            multiple,
            clearable,
            disabled,
            required,
            placement,
            hoist,
            maxOptionsVisible,
            open,
            filled,
            pill,
            name,
            value,
            defaultValue,
            form,
            getTag,
        } = args;
        return html`
            <ts-select
                .label=${label}
                label=${ifDefined(label)}
                .helpText=${helpText}
                help-text=${ifDefined(helpText || undefined)}
                .placeholder=${placeholder}
                placeholder=${ifDefined(placeholder || undefined)}
                .size=${size}
                size=${size}
                .multiple=${multiple}
                ?multiple=${multiple}
                .clearable=${clearable}
                ?clearable=${clearable}
                .disabled=${disabled}
                ?disabled=${disabled}
                .required=${required}
                ?required=${required}
                .placement=${placement}
                placement=${placement}
                .hoist=${hoist}
                ?hoist=${hoist}
                .maxOptionsVisible=${maxOptionsVisible}
                max-options-visible=${ifDefined(maxOptionsVisible)}
                .open=${open}
                ?open=${open}
                .filled=${filled}
                ?filled=${filled}
                .pill=${pill}
                ?pill=${pill}
                .name=${name}
                name=${ifDefined(name || undefined)}
                .value=${value}
                value=${Array.isArray(value) ? value.join(' ') : ifDefined(value as string)}
                .defaultValue=${defaultValue}
                default-value=${Array.isArray(defaultValue)
                    ? defaultValue.join(' ')
                    : ifDefined(defaultValue as string)}
                .form=${form}
                form=${ifDefined(form || undefined)}
                .getTag=${getTag}
                .error=${args.error}
                ?error=${args.error}
                .errorMessage=${args.errorMessage}
                aria-label=${ifDefined(args.ariaLabel)}
                .labelVisuallyHidden=${args.labelVisuallyHidden}
                ?label-visually-hidden=${args.labelVisuallyHidden}
                style="height: 180px"
            >
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
        `;
    },
    args: {
        label: 'Select',
        helpText: '',
        placeholder: 'Choose an option',
        size: 'medium',
        multiple: false,
        clearable: false,
        disabled: false,
        required: false,
        placement: 'bottom',
        hoist: false,
        maxOptionsVisible: 3,
        open: false,
        filled: false,
        pill: false,
        name: '',
        value: '',
        defaultValue: '',
        form: '',
        getTag: undefined,
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        name: { control: 'text', description: 'The name of the select, submitted with form data.' },
        value: {
            control: 'object',
            description:
                'Current value. String for single select; array when multiple=true. Attribute uses space-delimited values.',
        },
        defaultValue: {
            control: 'object',
            description: 'Default value for form resets. String or string[] when multiple=true.',
        },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'The select’s size.' },
        placeholder: { control: 'text', description: 'Hint text shown when the select is empty.' },
        multiple: { control: 'boolean', description: 'Allows more than one option to be selected.' },
        maxOptionsVisible: {
            control: 'number',
            description:
                'Max selected options to display when multiple=true. 0 removes the limit, showing all selected.',
        },
        disabled: { control: 'boolean', description: 'Disables the select control.' },
        clearable: { control: 'boolean', description: 'Adds a clear button when the select is not empty.' },
        open: { control: 'boolean', description: 'Controls whether the menu is open.' },
        hoist: {
            control: 'boolean',
            description: 'Prevents clipping in scrollable containers by using a fixed positioning strategy.',
        },
        filled: { control: 'boolean', description: 'Draws a filled select.' },
        pill: { control: 'boolean', description: 'Draws a pill-style select with rounded edges.' },
        label: { control: 'text', description: 'The select’s label. Use the `label` slot for HTML.' },
        placement: {
            control: 'select',
            options: ['top', 'bottom'],
            description: 'Preferred placement of the menu; may adjust to stay in view.',
        },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        form: {
            control: 'text',
            description: 'Associate with a form by id when the control is outside a form (same document/shadow root).',
        },
        required: { control: 'boolean', description: 'Marks the control as required.' },
        getTag: {
            control: false,
            description:
                'Custom tag renderer for multiple=true: (option, index) => TemplateResult | string | HTMLElement.',
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
        validity: { control: false, table: { disable: false }, description: 'Gets the validity state object.' },
        validationMessage: { control: false, table: { disable: false }, description: 'Gets the validation message.' },
    },
} satisfies Meta<TsSelect>;

export default meta;
type Story = StoryObj<TsSelect>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default select component.',
            },
        },
    },
    args: {
        label: 'Default Select',
        helpText: 'Choose from the available options',
    },
};

export const Multiple: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To allow multiple options to be selected, use the multiple attribute. It’s a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values.',
            },
        },
    },
    render: () => {
        return html`
            <ts-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable style="height: 180px">
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
                <ts-option value="option-4">Option 4</ts-option>
                <ts-option value="option-5">Option 5</ts-option>
                <ts-option value="option-6">Option 6</ts-option>
            </ts-select>
        `;
    },
};

export const WithGroups: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use <ts-divider> to group listbox items visually. You can also use <small> to provide labels, but they won’t be announced by most assistive devices.',
            },
        },
    },
    render: args => {
        const { label, helpText, placeholder, clearable } = args;
        return html`
            <ts-select
                .label=${label}
                label=${ifDefined(label)}
                .placeholder=${placeholder}
                placeholder=${ifDefined(placeholder)}
                .helpText=${helpText}
                help-text=${ifDefined(helpText)}
                .clearable=${clearable}
                ?clearable=${clearable}
                style="height: 260px"
            >
                <small>Section 1</small>
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-divider></ts-divider>
                <small>Section 2</small>
                <ts-option value="option-3">Option 3</ts-option>
                <ts-option value="option-4">Option 4</ts-option>
            </ts-select>
        `;
    },
    args: {
        label: 'Grouped Select',
        helpText: 'Options are organized in groups',
        clearable: true,
    },
};

export const PrefixAndSuffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the prefix and suffix slots to add presentational icons and text. Avoid slotting in interactive elements, such as buttons, links, etc.',
            },
        },
    },
    render: args => {
        const { label, helpText, placeholder, clearable } = args;
        return html`
            <ts-select
                .label=${label}
                label=${ifDefined(label)}
                .placeholder=${placeholder}
                placeholder=${ifDefined(placeholder)}
                .helpText=${helpText}
                help-text=${ifDefined(helpText)}
                .clearable=${clearable}
                ?clearable=${clearable}
                style="height: 180px"
            >
                <ts-option value="home"><ts-icon slot="prefix" name="home"></ts-icon>Home</ts-option>
                <ts-option value="settings"><ts-icon slot="prefix" name="settings"></ts-icon>Settings</ts-option>
                <ts-option value="profile"><ts-icon slot="prefix" name="person"></ts-icon>Profile</ts-option>
            </ts-select>
        `;
    },
    args: {
        label: 'Select with Icons',
        helpText: 'Options with prefix icons',
        clearable: true,
    },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable a select.',
            },
        },
    },
    render: args => {
        const { label, helpText, disabled } = args;
        return html`
            <ts-select
                .label=${label}
                label=${ifDefined(label)}
                .helpText=${helpText}
                help-text=${ifDefined(helpText)}
                .disabled=${disabled}
                ?disabled=${disabled}
            >
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2" disabled>Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
        `;
    },
    args: {
        label: 'Disabled Select',
        disabled: true,
        helpText: 'This select is disabled',
    },
};

export const Required: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `required` property to make a select required.',
            },
        },
    },
    args: {
        label: 'Required Select',
        required: true,
        helpText: 'This field is required',
    },
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `size` property to change a select’s size. Note that size does not apply to listbox options.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ts-select size="small" label="Small">
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
            <ts-select size="medium" label="Medium">
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
            <ts-select size="large" label="Large" style="height: 180px">
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>
        </div>
    `,
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates required validation for the select on form submit.',
            },
        },
    },
    args: {
        label: 'Select an Option',
        required: true,
        helpText: 'Please select an option from the list.',
        error: false,
        errorMessage: '',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const select = form.querySelector('ts-select') as TsSelect;

                // Reset error state
                select.error = false;
                select.errorMessage = '';
                select.setCustomValidity('');

                const valid = select.checkValidity();

                if (!valid) {
                    select.error = true;
                    select.errorMessage = 'Please select an option.';
                    select.setCustomValidity('Please select an option.');
                }
            }}
        >
            <ts-select
                .label=${args.label}
                label=${args.label}
                .helpText=${args.helpText}
                help-text=${args.helpText}
                .required=${args.required}
                ?required=${args.required}
                .error=${args.error}
                ?error=${args.error}
                .errorMessage=${args.errorMessage}
                error-message=${args.errorMessage}
                style="height: 220px"
            >
                <ts-option value="option-1">Option 1</ts-option>
                <ts-option value="option-2">Option 2</ts-option>
                <ts-option value="option-3">Option 3</ts-option>
            </ts-select>

            <ts-button style="margin-top: 1rem" type="submit" variant="primary">Submit</ts-button>
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

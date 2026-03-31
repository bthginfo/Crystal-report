import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsTextarea } from '@tuvsud/design-system/textarea';
import '@tuvsud/design-system/textarea';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Textarea',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Textareas provide a flexible, multi‑line input field that lets users express more detailed information with ease.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(disabled|readonly|required|filled|autofocus)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-textarea
            .name=${args.name}
            name=${ifDefined(args.name || undefined)}
            .value=${args.value}
            value=${ifDefined(args.value || undefined)}
            .size=${args.size}
            size=${args.size}
            .filled=${args.filled}
            ?filled=${args.filled}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText || undefined)}
            .placeholder=${args.placeholder}
            placeholder=${ifDefined(args.placeholder || undefined)}
            .rows=${args.rows}
            rows=${ifDefined(args.rows)}
            .resize=${args.resize}
            resize=${args.resize}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .readonly=${args.readonly}
            ?readonly=${args.readonly}
            .required=${args.required}
            ?required=${args.required}
            .minlength=${args.minlength}
            minlength=${ifDefined(args.minlength)}
            .maxlength=${args.maxlength}
            maxlength=${ifDefined(args.maxlength)}
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
            .form=${args.form}
            form=${ifDefined(args.form || undefined)}
            .defaultValue=${args.defaultValue}
            default-value=${ifDefined(args.defaultValue)}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            error-message=${ifDefined(args.errorMessage || undefined)}
            aria-label=${ifDefined(args.ariaLabel)}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
        ></ts-textarea>
    `,
    args: {
        name: '',
        value: '',
        size: 'medium',
        filled: false,
        label: 'Label',
        helpText: '',
        placeholder: 'Type something',
        rows: 4,
        resize: 'auto',
        disabled: false,
        readonly: false,
        required: false,
        minlength: 0,
        maxlength: 200,
        autocapitalize: 'off',
        autocomplete: 'off',
        autofocus: false,
        enterkeyhint: undefined,
        spellcheck: false,
        inputmode: 'text',
        form: '',
        defaultValue: '',
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        name: { control: 'text', description: 'Name for form submission.' },
        value: { control: 'text', description: 'Current value of the textarea.' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Textarea size.' },
        filled: { control: 'boolean', description: 'Draws a filled textarea.' },
        label: { control: 'text', description: 'Accessible label; use slot for HTML.' },
        helpText: { control: 'text', description: 'Help text; use slot for HTML.' },
        placeholder: { control: 'text', description: 'Hint text when empty.' },
        rows: { control: 'number', description: 'Default visible row count.' },
        resize: { control: 'select', options: ['none', 'vertical', 'auto'], description: 'Resize behavior.' },
        disabled: { control: 'boolean', description: 'Disables the textarea.' },
        readonly: { control: 'boolean', description: 'Makes the textarea readonly.' },
        required: { control: 'boolean', description: 'Marks the textarea as required.' },
        minlength: { control: 'number', description: 'Minimum input length.' },
        maxlength: { control: 'number', description: 'Maximum input length.' },
        autocapitalize: {
            control: 'select',
            options: ['off', 'none', 'on', 'sentences', 'words', 'characters'],
            description: 'Automatic capitalization mode.',
        },
        autocorrect: { control: 'select', options: ['off', 'on'], description: 'Browser autocorrect setting.' },
        autocomplete: { control: 'text', description: 'Autocomplete hint (MDN keywords).' },
        autofocus: { control: 'boolean', description: 'Focus on page load.' },
        enterkeyhint: {
            control: 'select',
            options: ['enter', 'done', 'go', 'next', 'previous', 'search', 'send', undefined],
            description: 'Virtual keyboard Enter key hint.',
        },
        spellcheck: { control: 'boolean', description: 'Enable spell checking.' },
        inputmode: {
            control: 'select',
            options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
            description: 'Intended data type for virtual keyboards.',
        },
        form: { control: 'text', description: 'ID of associated form element.' },
        defaultValue: { control: 'text', description: 'Default value for form resets.' },
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
    },
} satisfies MetaWithLabel<TsTextarea>;

export default meta;
type Story = StoryObjWithLabel<TsTextarea>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the textarea is empty and ready for user input.',
            },
        },
    },
    args: {
        label: 'Comments',
        helpText: 'Please enter your comments',
        placeholder: 'Type your comments here',
    },
};

export const Filled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add the `filled` property to draw a filled textarea.',
            },
        },
    },
    args: {
        label: 'User Story',
        filled: true,
        value: 'As a user, I want to be able to input multiple lines of text so that I can provide detailed feedback.',
        helpText: 'Describe your user story',
    },
};

export const WithCharacterCount: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `maxlength` property to set a character limit and display a character counter.',
            },
        },
    },
    args: {
        label: 'Limited Input',
        maxlength: 100,
        helpText: 'Maximum 100 characters',
        value: 'This textarea has a character counter that appears when you start typing.',
    },
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ts-textarea size="small" label="Small"></ts-textarea>
            <ts-textarea size="medium" label="Medium"></ts-textarea>
            <ts-textarea size="large" label="Large"></ts-textarea>
        </div>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable a textarea.',
            },
        },
    },
    args: {
        label: 'Disabled Textarea',
        disabled: true,
        value: 'This textarea is disabled and cannot be edited.',
        helpText: 'This field is disabled',
    },
};

export const Readonly: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `readonly` property to make a textarea readonly.',
            },
        },
    },
    args: {
        label: 'Readonly Textarea',
        readonly: true,
        value: 'This textarea is readonly and cannot be edited, but you can still copy the text.',
        helpText: 'This field is readonly',
    },
};

export const NoResize: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `resize` property to `none` to prevent users from resizing the textarea.',
            },
        },
    },
    args: {
        label: 'Fixed Size Textarea',
        resize: 'none',
        helpText: 'This textarea cannot be resized',
        rows: 3,
    },
};

export const WithCustomHeight: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `rows` property to increase the height of the textarea.',
            },
        },
    },
    args: {
        label: 'Taller Textarea',
        rows: 8,
        helpText: 'This textarea has 8 rows',
        placeholder: 'This textarea is taller than the default',
    },
};

export const Required: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `required` property to make a textarea required. The form will not submit until the field is filled out.',
            },
        },
    },
    render: () => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('ts-textarea') as TsTextarea;

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
            <ts-textarea
                label="Feedback"
                required
                minlength="1"
                maxlength="200"
                help-text="Please provide feedback"
            ></ts-textarea>
            <ts-button type="submit" variant="primary" style="margin-top: 1rem;">Submit</ts-button>
        </form>
    `,
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
    render: () => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('ts-textarea') as TsTextarea;

                input.error = false;
                input.errorMessage = '';
                input.setCustomValidity('');

                const valid = input.checkValidity();

                if (!valid) {
                    input.error = true;
                    input.errorMessage = 'Enter at lease 20 characters.';
                }
            }}
        >
            <ts-textarea
                label="Feedback"
                required
                minlength="10"
                maxlength="200"
                help-text="Please provide feedback (20-200 characters)"
            ></ts-textarea>
            <ts-button type="submit" variant="primary" style="margin-top: 1rem;">Submit</ts-button>
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
    args: {
        label: 'Taller Textarea',
        labelVisuallyHidden: true,
        placeholder: 'This textarea has hidden label',
    },
};

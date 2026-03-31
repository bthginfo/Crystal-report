import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsDateRange } from '@tuvsud/design-system/date-range';
import '@tuvsud/design-system/date-range';
import '@tuvsud/design-system/button';
import type { StoryContext } from 'storybook/internal/types';
import type { WebComponentsRenderer } from '@storybook/web-components';

type DateRangeArgs = StoryContext<WebComponentsRenderer>['args'];

const renderRange = (args: DateRangeArgs) => html`
    <ts-date-range
        locale=${args.locale}
        value-start=${args.valueStart}
        value-end=${args.valueEnd}
        name-start=${args.nameStart}
        name-end=${args.nameEnd}
        label-start=${args.labelStart}
        label-end=${args.labelEnd}
        placeholder-start=${args.placeholderStart}
        placeholder-end=${args.placeholderEnd}
        size=${args.size}
        .disabled=${args.disabled}
        ?disabled=${args.disabled}
        .readonly=${args.readonly}
        ?readonly=${args.readonly}
        .required=${args.required}
        ?required=${args.required}
        .helpText=${args.helpText}
        help-text=${args.helpText}
        .pill=${args.pill}
        ?pill=${args.pill}
        .filled=${args.filled}
        ?filled=${args.filled}
        .closeOnSelect=${args.closeOnSelect}
        ?close-on-select=${args.closeOnSelect}
        .inputsDirection=${args.inputsDirection}
        inputs-direction=${args.inputsDirection}
        .shortcuts=${args.shortcuts}
        error-message-start=${args.errorMessageStart}
        error-message-end=${args.errorMessageEnd}
        ?error-start=${args.errorStart}
        ?error-end=${args.errorEnd}
        .labelVisuallyHidden=${args.labelVisuallyHidden}
        ?label-visually-hidden=${args.labelVisuallyHidden}
        .footer-action=${args.footerAction}
        ?footer-action=${args.footerAction}
    ></ts-date-range>
`;

const meta = {
    title: 'Components/Date Range Picker',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Date Range Picker allows users to select a start and end date within a calendar interface. It is commonly used for filtering data, booking periods, or scheduling events.',
            },
        },
    },
    args: {
        locale: 'en',
        valueStart: '',
        valueEnd: '',
        nameStart: 'date-start',
        nameEnd: 'date-end',
        labelStart: 'Start date',
        labelEnd: 'End date',
        placeholderStart: '',
        placeholderEnd: '',
        size: 'medium',
        disabled: false,
        readonly: false,
        required: false,
        helpText: '',
        pill: false,
        filled: false,
        utc: false,
        closeOnSelect: true,
        footerAction: false,
        inputsDirection: 'horizontal',
        shortcuts: [],
        labelVisuallyHidden: false,
        errorStart: false,
        errorMessageStart: '',
        errorEnd: false,
        errorMessageEnd: '',
    },
    render: args => renderRange(args),
    argTypes: {
        locale: {
            control: 'text',
            description:
                'Locale used for labels, month/day names, and formatting. See how dates are formatted for different locales (<a href="/?path=/docs/foundation-localization--docs" target="_top">Foundation/Localization</a>).',
        },
        valueStart: { control: 'text', description: 'Start date value (typically ISO string like YYYY-MM-DD).' },
        valueEnd: { control: 'text', description: 'End date value (typically ISO string like YYYY-MM-DD).' },
        nameStart: { control: 'text', description: 'Form field name for the start date input.' },
        nameEnd: { control: 'text', description: 'Form field name for the end date input.' },
        labelStart: { control: 'text', description: 'Visible label for the start date input.' },
        labelEnd: { control: 'text', description: 'Visible label for the end date input.' },
        placeholderStart: { control: 'text', description: 'Placeholder text for the start date input.' },
        placeholderEnd: { control: 'text', description: 'Placeholder text for the end date input.' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Visual size of the inputs.' },
        disabled: { control: 'boolean', description: 'Disables both inputs and prevents interaction.' },
        readonly: { control: 'boolean', description: 'Makes both inputs read-only (no manual edits).' },
        required: { control: 'boolean', description: 'Marks the range as required for form validation.' },
        helpText: { control: 'text', description: 'Helper text displayed below the inputs.' },
        pill: { control: 'boolean', description: 'Applies pill-shaped styling.' },
        filled: { control: 'boolean', description: 'Applies filled input styling variant.' },
        utc: {
            control: 'boolean',
            description: 'If false, interpret/emit dates in locale time instead of UTC. Default is true.',
        },
        inputsDirection: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: 'Layout direction of the start/end inputs.',
        },
        shortcuts: {
            control: 'object',
            description: 'Preset shortcuts shown in the picker (component-specific format).',
        },
        footerAction: {
            control: 'boolean',
            description:
                'Indicates the field is used within a date range picker footer, applying specific styling. Does not affect functionality.',
        },
        closeOnSelect: { control: 'boolean', description: 'Closes the calendar after selecting the end date.' },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides labels while keeping them accessible to screen readers.',
        },
        errorStart: { control: 'boolean', description: 'Shows error state for the start date input.' },
        errorMessageStart: { control: 'text', description: 'Error message shown for the start date input.' },
        errorEnd: { control: 'boolean', description: 'Shows error state for the end date input.' },
        errorMessageEnd: { control: 'text', description: 'Error message shown for the end date input.' },
    },
} satisfies MetaWithLabel<TsDateRange>;

export default meta;
type Story = StoryObjWithLabel<TsDateRange>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default date range picker with start and end date inputs.',
            },
        },
    },
};

export const Localization: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Defines the locale property used to format dates and labels.',
            },
        },
    },
    args: { locale: 'de', labelStart: 'Start', labelEnd: 'End' },
    render: args => renderRange(args),
};

export const Placeholder: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Sets `placeholder` text for both start and end date inputs.',
            },
        },
    },
    args: {
        placeholderStart: 'Select start date',
        placeholderEnd: 'Select end date',
        locale: 'en-gb',
        labelStart: 'Start',
        labelEnd: 'End',
    },
    render: args => renderRange(args),
};

export const ErrorMessage: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `error-start`, `error-message-start`, `error-end`, and `error-message-end` properties to display static error messages on the start and/or end inputs. This is useful when controlling error state externally (e.g. from server-side validation).',
            },
        },
    },
    args: {
        errorStart: true,
        errorMessageStart: 'Please provide valid dates',
        labelStart: 'Start',
        labelEnd: 'End',
    },
    render: args => renderRange(args),
};

export const ErrorOnBothInputs: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Both the start and end inputs can show error messages independently. Each input has its own `error-start`/`error-end` and `error-message-start`/`error-message-end` properties.',
            },
        },
    },
    args: {
        errorStart: true,
        errorMessageStart: 'Start date is required',
        errorEnd: true,
        errorMessageEnd: 'End date is required',
        labelStart: 'Check-in',
        labelEnd: 'Check-out',
    },
    render: args => renderRange(args),
};

export const RequiredValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `required` property to mark both range inputs as required. When the form is submitted without values, validation errors are displayed. Errors clear automatically when the user starts typing.',
            },
        },
    },
    args: {
        required: true,
        labelStart: 'Start date',
        labelEnd: 'End date',
        helpText: 'Please select a date range',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const range = form.querySelector('ts-date-range') as TsDateRange;

                let hasError = false;

                if (!range.valueStart || range.valueStart.trim() === '') {
                    range.errorStart = true;
                    range.errorMessageStart = 'Start date is required';
                    hasError = true;
                } else {
                    range.errorStart = false;
                    range.errorMessageStart = '';
                }

                if (!range.valueEnd || range.valueEnd.trim() === '') {
                    range.errorEnd = true;
                    range.errorMessageEnd = 'End date is required';
                    hasError = true;
                } else {
                    range.errorEnd = false;
                    range.errorMessageEnd = '';
                }

                if (!hasError) {
                    console.log('[submit]', { start: range.valueStart, end: range.valueEnd });
                }
            }}
        >
            ${renderRange(args)}
            <ts-button style="float: right; padding-top: 1rem" type="submit">Submit</ts-button>
        </form>
    `,
};

export const BlurValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The date range picker validates each input automatically when the field loses focus (blur). If the entered text is not a valid date, an error is shown below the corresponding input. Type an invalid value such as `99/99/9999` and click outside to see the error.',
            },
        },
    },
    args: {
        labelStart: 'Start date',
        labelEnd: 'End date',
        required: true,
    },
    render: args => renderRange(args),
};

export const HelpTextWithError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When both `help-text` and an error are present, the error message takes precedence and replaces the help text. The dropdown positioning adjusts automatically so it does not overlap the error text.',
            },
        },
    },
    args: {
        helpText: 'Select your travel dates',
        errorStart: true,
        errorMessageStart: 'Departure date is not available',
        labelStart: 'Departure',
        labelEnd: 'Return',
        valueStart: '2025-12-25',
    },
    render: args => renderRange(args),
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `pill` property to true to render the input with a pill-shaped style.',
            },
        },
    },
    args: { pill: true, labelStart: 'Start', labelEnd: 'End' },
    render: args => renderRange(args),
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the different `size` options for the date range picker inputs.',
            },
        },
    },
    render: args => html`
        <div style="display:flex;gap:1rem;flex-direction:column">
            ${renderRange({ ...args, size: 'small' })} ${renderRange({ ...args, size: 'medium' })}
            ${renderRange({ ...args, size: 'large' })}
        </div>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disables the date range picker, preventing user interaction.',
            },
        },
    },
    args: { disabled: true, labelStart: 'Start', labelEnd: 'End' },
    render: args => renderRange(args),
};

export const HelpText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `help-Text` property to display additional guidance or information below the input field. This is useful for clarifying expected input or providing contextual hints.',
            },
        },
    },
    args: { helpText: 'Please select valid dates', labelStart: 'Start', labelEnd: 'End' },
    render: args => renderRange(args),
};

export const Events: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Logs custom events emitted by the date range picker component.',
            },
        },
    },
    args: { shortcuts: [0, 1, 2, 3, 4, 5, 6], labelStart: 'Start', labelEnd: 'End', locale: 'de-at', utc: false },
    render: args => {
        const log = (name: string) => (e: CustomEvent) => console.log(`[${name}]`, e.detail);
        return html`
            <ts-date-range
                label-start=${args.labelStart}
                label-end=${args.labelEnd}
                locale=${args.locale}
                .shortcuts=${args.shortcuts}
                .utc=${args.utc}
                @ts-date-change=${log('ts-date-change')}
                @ts-date-apply=${log('ts-date-apply')}
                @ts-date-cancel=${log('ts-date-cancel')}
            ></ts-date-range>
        `;
    },
};

export const DateShortcuts: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates preset date range shortcuts for quick selection.',
            },
        },
    },
    args: { shortcuts: [0, 1, 2, 3, 4, 5, 6], locale: 'de', labelStart: 'Start', labelEnd: 'End' },
    render: args => renderRange(args),
};

export const FooterActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Logs custom events emitted by the date range picker component.',
            },
        },
    },
    args: { labelStart: 'Start', labelEnd: 'End', locale: 'de-at', utc: false, footerAction: true },
    render: args => {
        const log = (name: string) => (e: CustomEvent) => console.log(`[${name}]`, e.detail);
        return html`
            <ts-date-range
                label-start=${args.labelStart}
                label-end=${args.labelEnd}
                locale=${args.locale}
                .utc=${args.utc}
                .footer-action=${args.footerAction}
                ?footer-action=${args.footerAction}
                @ts-date-apply=${log('ts-date-apply')}
                @ts-date-cancel=${log('ts-date-cancel')}
            ></ts-date-range>
        `;
    },
};

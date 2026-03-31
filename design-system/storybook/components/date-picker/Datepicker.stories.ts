import { html, nothing } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsDatePicker } from '@tuvsud/design-system/date-picker';
import '@tuvsud/design-system/date-picker';
import '@tuvsud/design-system/button';
import type { StoryContext } from 'storybook/internal/types';
import type { WebComponentsRenderer } from '@storybook/web-components';

type DatePickerArgs = StoryContext<WebComponentsRenderer>['args'];

const renderDatePicker = (args: DatePickerArgs) => html`
    <ts-date-picker
        locale=${args.locale}
        value=${args.value}
        name=${args.name}
        label=${args.label}
        placeholder=${args.placeholder}
        size=${args.size}
        .disabled=${args.disabled}
        ?disabled=${args.disabled}
        .readonly=${args.readonly}
        ?readonly=${args.readonly}
        .required=${args.required}
        ?required=${args.required}
        .autofocus=${args.autofocus}
        ?autofocus=${args.autofocus}
        .helpText=${args.helpText}
        help-text=${args.helpText}
        .clearable=${args.clearable}
        ?clearable=${args.clearable}
        .pill=${args.pill}
        ?pill=${args.pill}
        .filled=${args.filled}
        ?filled=${args.filled}
        .minYear=${args.minYear}
        min-year=${args.minYear ?? nothing}
        .maxYear=${args.maxYear}
        max-year=${args.maxYear ?? nothing}
        .disablePast=${args.disablePast}
        ?disable-past=${args.disablePast}
        .disableFuture=${args.disableFuture}
        ?disable-future=${args.disableFuture}
        .disableWeekend=${args.disableWeekend}
        ?disable-weekend=${args.disableWeekend}
        .disableDates=${args.disableDates}
        .minDate=${args.minDate}
        min-date=${args.minDate}
        .maxDate=${args.maxDate}
        max-date=${args.maxDate}
        .dateError=${args.dateError}
        ?date-error=${args.dateError}
        .dateErrorMessage=${args.dateErrorMessage}
        date-error-message=${args.dateErrorMessage}
        .labelVisuallyHidden=${args.labelVisuallyHidden}
        ?label-visually-hidden=${args.labelVisuallyHidden}
        .footerAction=${args.footerAction}
        ?footer-action=${args.footerAction}
        .closeOnSelect=${args.closeOnSelect}
        ?close-on-select=${args.closeOnSelect}
        style="height: 400px"
    ></ts-date-picker>
`;

const meta = {
    title: 'Components/Date Picker',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Date Picker allows users to select a single date from a calendar interface. It simplifies date input and ensures consistency in formatting.',
            },
        },
    },
    args: {
        locale: 'en',
        value: '',
        name: 'date',
        label: 'Date',
        placeholder: '',
        size: 'medium',
        disabled: false,
        readonly: false,
        required: false,
        autofocus: false,
        helpText: '',
        clearable: false,
        pill: false,
        filled: false,
        utc: true,
        labelVisuallyHidden: false,
        minYear: undefined,
        maxYear: undefined,
        footerAction: false,
        closeOnSelect: true,
        disablePast: false,
        disableFuture: false,
        disableWeekend: false,
        disableDates: ['2025-10-25', '2025-10-24'],
        minDate: '',
        maxDate: '',
        dateError: false,
        dateErrorMessage: '',
    },
    render: args => renderDatePicker(args),
    argTypes: {
        locale: {
            control: 'text',
            description:
                'Locale used for labels, month/day names, and formatting. See how dates are formatted for different locales (<a href="/?path=/docs/foundation-localization--docs" target="_top">Foundation/Localization</a>).',
        },
        value: { control: 'text', description: 'Selected date value (typically ISO string like YYYY-MM-DD).' },
        name: { control: 'text', description: 'Form field name attribute.' },
        label: { control: 'text', description: 'Visible label for the date picker.' },
        placeholder: { control: 'text', description: 'Placeholder text shown when no value is selected.' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Visual size of the input.' },
        disabled: { control: 'boolean', description: 'Disables the input and prevents interaction.' },
        readonly: { control: 'boolean', description: 'Makes the input read-only (no manual edits).' },
        required: { control: 'boolean', description: 'Marks the field as required for form validation.' },
        autofocus: { control: 'boolean', description: 'Automatically focuses the input on load.' },
        helpText: { control: 'text', description: 'Helper text displayed below the input.' },
        clearable: { control: 'boolean', description: 'Shows a clear button to reset the selected date.' },
        pill: { control: 'boolean', description: 'Applies pill-shaped styling.' },
        filled: { control: 'boolean', description: 'Applies filled input styling variant.' },
        utc: {
            control: 'boolean',
            description: 'If false, interpret/emit dates in locale time instead of UTC. Default is true.',
        },
        minYear: { control: 'number', description: 'Minimum year selectable in the calendar.' },
        maxYear: { control: 'number', description: 'Maximum year selectable in the calendar.' },
        disablePast: { control: 'boolean', description: 'Disables dates before today.' },
        disableFuture: { control: 'boolean', description: 'Disables dates after today.' },
        disableWeekend: { control: 'boolean', description: 'Disables Saturdays and Sundays.' },
        disableDates: { control: 'object', description: 'List of specific dates to disable (e.g. ["2025-10-24"]).' },
        minDate: { control: 'text', description: 'Minimum selectable date (typically YYYY-MM-DD).' },
        maxDate: { control: 'text', description: 'Maximum selectable date (typically YYYY-MM-DD).' },
        footerAction: {
            control: 'boolean',
            description:
                'Shows OK/Cancel footer buttons. When true, the dropdown stays open until the user confirms with OK or reverts with Cancel.',
        },
        closeOnSelect: {
            control: 'boolean',
            description:
                'Closes the dropdown immediately when a date is selected. Only applies when `footer-action` is false. Default is true.',
        },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides labels while keeping them accessible to screen readers.',
        },
        dateError: { control: 'boolean', description: 'Forces the component into an error state.' },
        dateErrorMessage: { control: 'text', description: 'Error message shown when dateError is true.' },
    },
} satisfies MetaWithLabel<TsDatePicker>;

export default meta;
type Story = StoryObjWithLabel<TsDatePicker>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default date picker with no preset value.',
            },
        },
    },
};

export const Localization: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Defines the `locale` property used to format dates and labels.',
            },
        },
    },
    args: { locale: 'de' },
    render: args => renderDatePicker(args),
};

export const Placeholder: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `placeholder` property to define your own text. If no custom placeholder is provided, the component will display a default placeholder based on the date format for the current locale.',
            },
        },
    },
    args: { placeholder: 'Please select a date', locale: 'en-gb' },
    render: args => renderDatePicker(args),
};

export const DateValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `date-error` and `date-error-message` properties to display a static error state. This is useful when you need to control the error externally (e.g. from server-side validation).',
            },
        },
    },
    args: {
        value: '2025-02-28',
        locale: 'en-gb',
        dateError: true,
        dateErrorMessage: 'Please provide a valid date',
    },
    render: args => renderDatePicker(args),
};

export const RequiredValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `required` property to mark the date picker as required. When the form is submitted without a value, a validation error is displayed. The error clears automatically when the user starts typing.',
            },
        },
    },
    args: {
        label: 'Appointment date',
        required: true,
        helpText: 'Please select a date for your appointment',
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const picker = form.querySelector('ts-date-picker') as TsDatePicker;

                if (!picker.value || picker.value.trim() === '') {
                    picker.dateError = true;
                    picker.dateErrorMessage = 'This field is required';
                } else {
                    picker.dateError = false;
                    picker.dateErrorMessage = '';
                    console.log('[submit]', picker.value);
                }
            }}
        >
            ${renderDatePicker(args)}
            <ts-button style="float: right; padding-top: 1rem" type="submit">Submit</ts-button>
        </form>
    `,
};

export const BlurValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The date picker validates the input automatically when the field loses focus (blur). If the entered text is not a valid date, an error is shown below the input. Type an invalid value such as `99/99/9999` and click outside to see the error.',
            },
        },
    },
    args: {
        label: 'Date of birth',
        locale: 'en',
        helpText: 'Enter your date of birth',
    },
    render: args => renderDatePicker(args),
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
        helpText: 'Select your preferred date',
        dateError: true,
        dateErrorMessage: 'The selected date is not available',
        value: '2025-12-25',
    },
    render: args => renderDatePicker(args),
};

export const DisablePastValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When `disable-past` is enabled, selecting or typing a past date triggers a validation error on blur. Past dates are also visually disabled in the calendar.',
            },
        },
    },
    args: {
        disablePast: true,
        label: 'Future date only',
    },
    render: args => renderDatePicker(args),
};

export const MinMaxDateValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `min-date` and `max-date` to restrict the selectable date range. Dates outside the range are disabled in the calendar and trigger a validation error on blur.',
            },
        },
    },
    args: {
        minDate: '2025-03-01',
        maxDate: '2025-03-31',
        label: 'March 2025 only',
        helpText: 'Select a date in March 2025',
    },
    render: args => renderDatePicker(args),
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `pill` property to true to render the input with a pill-shaped style.',
            },
        },
    },
    args: { pill: true },
    render: args => renderDatePicker(args),
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The component supports three size options: small medium large. Use the size property to set the desired size.',
            },
        },
    },
    render: args => html`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${renderDatePicker({ ...args, size: 'small' })} ${renderDatePicker({ ...args, size: 'medium' })}
            ${renderDatePicker({ ...args, size: 'large' })}
        </div>
    `,
};

export const Clearable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Enable the `clearable` property to allow users to clear the selected date using a clear icon within the input field.',
            },
        },
    },
    args: { clearable: true, value: '2022-01-01' },
    render: args => renderDatePicker(args),
};

export const Disable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `disabled` property to true to make the input non-editable. When disabled, users cannot select or modify the date.',
            },
        },
    },
    args: { disabled: true },
    render: args => renderDatePicker(args),
};

export const HelpText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `help-Text` property to display additional guidance or information below the input field. This is useful for clarifying expected input or providing contextual hints.',
            },
        },
    },
    args: { helpText: 'Please provide a valid date' },
    render: args => renderDatePicker(args),
};

export const DisablePastDate: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `disable-past-dates` property to true to prevent users from selecting dates that occur before the current day.',
            },
        },
    },
    args: { disablePast: true },
    render: args => renderDatePicker(args),
};

export const DisableFutureDate: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `disable-future-dates` property to true to prevent users from selecting dates that occur after the current day.',
            },
        },
    },
    args: { disableFuture: true },
    render: args => renderDatePicker(args),
};

export const MaxYear: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `max-year` property to set the maximum year that can be selected in the date picker.',
            },
        },
    },
    args: { maxYear: 2030 },
    render: args => renderDatePicker(args),
};

export const MinYear: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
    args: { minYear: 2010 },
    render: args => renderDatePicker(args),
};

export const DisableWeekend: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `disable-weekends` property to true to prevent users from selecting Saturdays and Sundays.',
            },
        },
    },
    args: { disableWeekend: true },
    render: args => renderDatePicker(args),
};

export const DisableSpecificDates: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled-dates` property to provide an array of dates that should be disabled. Users will not be able to select any date included in this array.',
            },
        },
    },
    args: {
        disableDates: ['2025-10-24', '2025-10-25', '2025-10-30'],
        value: '2025-10-22',
    },
    render: args => renderDatePicker(args),
};

export const DisableWeekendAndSpecificDates: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Combine the `disable-weekends` and `disabled-dates` properties to restrict date selection on weekends as well as specific dates you want to disable.',
            },
        },
    },
    args: {
        disableWeekend: true,
        disableDates: ['2025-10-29', '2025-10-27'],
    },
    render: args => renderDatePicker(args),
};

export const FooterAction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `footer-action` property to true to show OK/Cancel footer buttons. The dropdown stays open until the user clicks OK (confirm) or Cancel (revert). Selecting a date previews it in the input, but only OK commits the value.',
            },
        },
    },
    args: { footerAction: true },
    render: args => renderDatePicker(args),
};

export const CloseOnSelectDisabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `close-on-select` property to false to keep the dropdown open after selecting a date. The user can click outside or use the calendar icon to close it. This is useful when combined with other interactions.',
            },
        },
    },
    args: { closeOnSelect: false },
    render: args => renderDatePicker(args),
};

export const LogEvents: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Listen to various events emitted by the date picker component and log their details to the console for debugging or informational purposes.',
            },
        },
    },
    render: () => {
        const log = (name: string) => (e: CustomEvent) => console.log(`[${name}]`, e.detail);
        return html`
            <ts-date-picker
                label-start="start"
                label-end="end"
                locale="de-at"
                .utc=${false}
                footer-action
                @ts-date-apply=${log('ts-date-apply')}
                @ts-date-cancel=${log('ts-date-cancel')}
            ></ts-date-picker>
        `;
    },
};

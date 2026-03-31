import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsRange } from '@tuvsud/design-system/range';
import '@tuvsud/design-system/range';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Range Slider',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Ranges allow the user to select a single value within a given range using a slider.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(disabled|label-visually-hidden)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-range
            .value=${args.value}
            value=${args.value}
            .min=${args.min}
            min=${args.min}
            .max=${args.max}
            max=${args.max}
            .step=${args.step}
            step=${args.step}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .tooltip=${args.tooltip}
            tooltip=${args.tooltip}
            .tooltipFormatter=${args.tooltipFormatter}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText || undefined)}
            .name=${args.name}
            name=${ifDefined(args.name || undefined)}
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
        ></ts-range>
    `,
    args: {
        name: '',
        value: 50,
        label: 'Range Slider',
        helpText: '',
        disabled: false,
        min: 0,
        max: 100,
        step: 1,
        tooltip: 'top',
        tooltipFormatter: (v: number) => `${v}`,
        form: '',
        defaultValue: 50,
        error: false,
        errorMessage: '',
        ariaLabel: '',
        labelVisuallyHidden: false,
    },
    argTypes: {
        name: { control: 'text', description: 'The name of the range, submitted with form data.' },
        value: { control: 'number', description: 'The current value as a number.' },
        label: { control: 'text', description: 'The range’s label. Use the `label` slot for HTML.' },
        helpText: { control: 'text', description: 'Help text. Use the `help-text` slot for HTML.' },
        disabled: { control: 'boolean', description: 'Disables the range.' },
        min: { control: 'number', description: 'Minimum acceptable value.' },
        max: { control: 'number', description: 'Maximum acceptable value.' },
        step: { control: 'number', description: 'Increment/decrement interval.' },
        tooltip: {
            control: 'select',
            options: ['top', 'bottom', 'none'],
            description: 'Preferred placement of the tooltip.',
        },
        tooltipFormatter: {
            control: false,
            description: 'Function to format the tooltip value: (value: number) => string.',
        },
        form: {
            control: 'text',
            description:
                'Associate with a form by id when outside a form (must be in the same document or shadow root).',
        },
        defaultValue: { control: 'number', description: 'Default value for form resets.' },
        error: { control: 'boolean', description: 'Shows the input in an error state.' },
        errorMessage: { control: 'text', description: 'Error text shown below the input when provided.' },
        ariaLabel: {
            control: 'text',
            description:
                'The aria-label attribute provides an accessible name for the range when there is no visible label.',
        },
        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Visually hides the label but keeps it accessible to screen readers.',
        },
        validity: { control: false, table: { disable: false }, description: 'Gets the validity state object.' },
        validationMessage: { control: false, table: { disable: false }, description: 'Gets the validation message.' },
    },
} satisfies MetaWithLabel<TsRange>;

export default meta;
type Story = StoryObjWithLabel<TsRange>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the range slider allows selection between 0 and 100.',
            },
        },
    },
    args: { label: 'Default Range', helpText: 'Drag the slider to adjust the value' },
};

export const WithSteps: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the step attribute to define the increment between allowed values within the range. This ensures that users can only select values that align with the specified step size.',
            },
        },
    },
    args: { label: 'Step Range', min: 0, max: 100, step: 20, helpText: 'This slider moves in steps of 20' },
};

export const CustomMinMax: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the min and max attributes to set the range’s minimum and maximum values, respectively. The step attribute determines the value’s interval when increasing and decreasing.',
            },
        },
    },
    args: { label: 'Temperature', min: -20, max: 50, value: 25, helpText: 'Select temperature in Celsius' },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
    args: { label: 'Disabled Range', disabled: true, value: 70, helpText: 'This range slider is disabled' },
};

export const WithoutTooltip: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To disable the tooltip, set tooltip to none.',
            },
        },
    },
    args: { label: 'No Tooltip', tooltip: 'none', helpText: 'This slider has no tooltip' },
};

export const CustomStyles: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can customize the active and inactive portions of the track using the `--track-color-active` and `--track-color-inactive` custom properties.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <ts-range
                label="Primary"
                value="50"
                style="--track-color-active: var(--ts-semantic-color-background-primary-default); 
                        --thumb-color: var(--ts-semantic-color-background-primary-default);
                        --thumb-color-hover: var(--ts-semantic-color-background-primary-hover);
                        --thumb-color-active: var(--ts-semantic-color-background-primary-active);
                        "
            ></ts-range>
            <ts-range
                label="Success"
                value="50"
                style="--track-color-active: var(--ts-semantic-color-background-success-default);
                --thumb-color: var(--ts-semantic-color-background-success-default);
                --thumb-color-hover: var(--ts-semantic-color-background-success-hover);
                --thumb-color-active: var(--ts-semantic-color-background-success-active);"
            ></ts-range>
            <ts-range
                label="Warning"
                value="50"
                style="--track-color-active: var(--ts-semantic-color-background-warning-default);
                --thumb-color: var(--ts-semantic-color-background-warning-default);
                --thumb-color-hover: var(--ts-semantic-color-background-warning-hover);
                --thumb-color-active: var(--ts-semantic-color-background-warning-active);"
            ></ts-range>
            <ts-range
                label="Danger"
                value="50"
                style="--track-color-active: var(--ts-semantic-color-background-danger-default);
                --thumb-color: var(--ts-semantic-color-background-danger-default);
                --thumb-color-hover: var(--ts-semantic-color-background-danger-hover);
                --thumb-color-active: var(--ts-semantic-color-background-danger-active);"
            ></ts-range>
        </div>
    `,
};

export const WithValidation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates validation for the range slider. In this example, the value must be at least 25.',
            },
        },
    },
    args: {
        label: 'Volume Level',
        helpText: 'Select a volume level of at least 25.',
        min: 0,
        max: 100,
        value: 10,
    },
    render: args => html`
        <form
            novalidate
            @submit=${(e: SubmitEvent) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const range = form.querySelector('ts-range') as TsRange;

                range.error = false;
                range.errorMessage = '';
                range.setCustomValidity('');

                if (range.value < 25) {
                    range.error = true;
                    range.errorMessage = 'Volume must be at least 25.';
                    range.setCustomValidity('Volume must be at least 25.');
                }
            }}
        >
            <ts-range
                .label=${args.label}
                label=${args.label}
                .helpText=${args.helpText}
                help-text=${args.helpText}
                .min=${args.min}
                min=${args.min}
                .max=${args.max}
                max=${args.max}
                .value=${args.value}
                value=${args.value}
            ></ts-range>

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

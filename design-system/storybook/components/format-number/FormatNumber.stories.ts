import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TsFormatNumber } from '@tuvsud/design-system/format-number';
import '@tuvsud/design-system/format-number';

/**
 * this component is hidden in the storybook docs
 * because it still needs confirmation about the locale handling
 * */

const meta: Meta<TsFormatNumber> = {
    title: 'Components/Format Number',
    tags: ['autodocs', 'hidden'],
    parameters: {
        description: {
            component: 'Formats a number using the specified locale and options.',
        },
        docs: { disable: true },
    },
    excludeStories: /.*/,
    render: args => html`
        <ts-format-number
            .value=${Number(args.value)}
            .type=${args.type}
            .noGrouping=${args.noGrouping}
            .currency=${args.currency}
            .currencyDisplay=${args.currencyDisplay}
            .minimumIntegerDigits=${args.minimumIntegerDigits ?? undefined}
            .minimumFractionDigits=${args.minimumFractionDigits ?? undefined}
            .maximumFractionDigits=${args.maximumFractionDigits ?? undefined}
            .minimumSignificantDigits=${args.minimumSignificantDigits ?? undefined}
            .maximumSignificantDigits=${args.maximumSignificantDigits ?? undefined}
        ></ts-format-number>
    `,
    args: {
        value: 12345.678,
        type: 'currency',
        noGrouping: false,
        currency: 'EUR',
        currencyDisplay: 'symbol',
        minimumIntegerDigits: undefined,
        minimumFractionDigits: undefined,
        maximumFractionDigits: undefined,
        minimumSignificantDigits: undefined,
        maximumSignificantDigits: undefined,
    },
    argTypes: {
        value: { control: { type: 'number' }, description: 'The number to format.' },
        type: { control: 'select', options: ['currency', 'decimal', 'percent'], description: 'Formatting style.' },
        noGrouping: { control: 'boolean', description: 'Turn off grouping separators.' },
        currency: { control: 'text', description: 'ISO 4217 currency code (used when type=currency).' },
        currencyDisplay: {
            control: 'select',
            options: ['symbol', 'narrowSymbol', 'code', 'name'],
            description: 'How to display the currency.',
        },
        minimumIntegerDigits: {
            control: { type: 'number', min: 1, max: 21, step: 1 },
            description: 'Minimum integer digits.',
        },
        minimumFractionDigits: {
            control: { type: 'number', min: 0, max: 20, step: 1 },
            description: 'Minimum fraction digits.',
        },
        maximumFractionDigits: {
            control: { type: 'number', min: 0, max: 20, step: 1 },
            description: 'Maximum fraction digits.',
        },
        minimumSignificantDigits: {
            control: { type: 'number', min: 1, max: 21, step: 1 },
            description: 'Minimum significant digits.',
        },
        maximumSignificantDigits: {
            control: { type: 'number', min: 1, max: 21, step: 1 },
            description: 'Maximum significant digits.',
        },
    },
};

export default meta;
type Story = StoryObj<TsFormatNumber>;
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the component formats the number as currency in the specified locale.',
            },
        },
    },
};

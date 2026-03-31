import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TsFormatDate } from '@tuvsud/design-system/format-date';
import '@tuvsud/design-system/format-date';

/**
 * this component is hidden in the storybook docs
 * because it still needs confirmation about the locale handling
 * */

const meta: Meta<TsFormatDate> = {
    title: 'Components/Format Date',
    tags: ['autodocs', 'hidden'],
    parameters: {
        description: {
            component: 'Formats a date/time using the specified locale and options.',
        },
        docs: { disable: true },
    },
    excludeStories: /.*/,
    render: args => {
        const { date, weekday, era, year, month, day, hour, minute, second, timeZoneName, timeZone, hourFormat } = args;
        return html`
            <ts-format-date
                .date=${date}
                date=${ifDefined(date)}
                .weekday=${weekday}
                weekday=${ifDefined(weekday)}
                .era=${era}
                era=${ifDefined(era)}
                .year=${year}
                year=${ifDefined(year)}
                .month=${month}
                month=${ifDefined(month)}
                .day=${day}
                day=${ifDefined(day)}
                .hour=${hour}
                hour=${ifDefined(hour)}
                .minute=${minute}
                minute=${ifDefined(minute)}
                .second=${second}
                second=${ifDefined(second)}
                .timeZoneName=${timeZoneName}
                time-zone-name=${ifDefined(timeZoneName)}
                .timeZone=${timeZone}
                time-zone=${ifDefined(timeZone)}
                .hourFormat=${hourFormat}
                hour-format=${hourFormat}
            ></ts-format-date>
        `;
    },
    args: {
        date: new Date().toISOString(),
        weekday: 'long',
        era: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: 'UTC',
        hourFormat: 'auto',
    },
    argTypes: {
        date: { control: 'text' },
        weekday: { control: 'select', options: [undefined, 'narrow', 'short', 'long'] },
        era: { control: 'select', options: [undefined, 'narrow', 'short', 'long'] },
        year: { control: 'select', options: [undefined, 'numeric', '2-digit'] },
        month: { control: 'select', options: [undefined, 'numeric', '2-digit', 'narrow', 'short', 'long'] },
        day: { control: 'select', options: [undefined, 'numeric', '2-digit'] },
        hour: { control: 'select', options: [undefined, 'numeric', '2-digit'] },
        minute: { control: 'select', options: [undefined, 'numeric', '2-digit'] },
        second: { control: 'select', options: [undefined, 'numeric', '2-digit'] },
        timeZoneName: { control: 'select', options: [undefined, 'short', 'long'] },
        timeZone: { control: 'text' },
        hourFormat: { control: 'select', options: ['auto', '12', '24'] },
    },
};

export default meta;
type Story = StoryObj<TsFormatDate>;
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the component formats the current date and time in UTC timezone with long weekday and month names, numeric year, day, hour, minute, and second, along with a short time zone name.',
            },
        },
    },
};

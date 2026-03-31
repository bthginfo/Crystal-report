import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsCalendarStatic } from '@tuvsud/design-system/calendar-static';
import '@tuvsud/design-system/calendar-static';
import '@tuvsud/design-system/date-picker';
import type { StoryContext } from 'storybook/internal/types';
import type { WebComponentsRenderer } from '@storybook/web-components';

type CalendarStaticArgs = StoryContext<WebComponentsRenderer>['args'];

const toDate = (v: unknown): Date | undefined => {
    if (v instanceof Date) return v;
    if (typeof v === 'number') return new Date(v);
    return undefined;
};

const renderCalendar = (args: CalendarStaticArgs) => {
    const log = (name: string) => (e: CustomEvent) => console.log(`[${name}]`, e.detail);
    return html`
        <ts-calendar-static
            locale=${args.locale}
            .selected=${toDate(args.selected)}
            .focused=${toDate(args.focused)}
            .min=${toDate(args.min)}
            .max=${toDate(args.max)}
            .minYear=${args.minYear}
            .maxYear=${args.maxYear}
            ?utc=${args.utc}
            ?disable-past=${args.disablePast}
            ?disable-future=${args.disableFuture}
            min-date=${args.minDate || ''}
            max-date=${args.maxDate || ''}
            ?disable-weekend=${args.disableWeekend}
            .disableDates=${args.disableDates || []}
            ?footer-action=${args.footerAction}
            @ts-date-select=${log('ts-date-select')}
            @ts-date-apply=${log('ts-date-apply')}
            @ts-date-cancel=${log('ts-date-cancel')}
            @ts-date-change-month=${log('ts-date-change-month')}
            @ts-year-change=${log('ts-year-change')}
            @ts-month-change=${log('ts-month-change')}
        ></ts-calendar-static>
    `;
};

const meta = {
    title: 'Components/Calendar Static',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A standalone calendar component that allows users to select a single date. It includes OK/Cancel footer actions. The selection is only confirmed when the user clicks "OK".',
            },
        },
    },
    args: {
        locale: 'en',
        selected: undefined,
        focused: undefined,
        min: undefined,
        max: undefined,
        minYear: undefined,
        maxYear: undefined,
        utc: true,
        disablePast: false,
        disableFuture: false,
        minDate: undefined,
        maxDate: undefined,
        disableWeekend: false,
        disableDates: [],
        footerAction: true,
    },
    render: args => renderCalendar(args),
    argTypes: {
        locale: {
            control: 'text',
            description:
                'BCP 47 locale tag used for month/day names and button labels. See (<a href="/?path=/docs/foundation-localization--docs" target="_top">Foundation/Localization</a>).',
        },
        selected: {
            control: 'date',
            description: 'The currently selected date. Pass a `Date` object.',
        },
        focused: {
            control: 'date',
            description: 'The month/year currently in view. If not set, defaults to the selected date or today.',
        },
        min: {
            control: 'date',
            description: 'Minimum selectable date.',
        },
        max: {
            control: 'date',
            description: 'Maximum selectable date.',
        },
        minYear: {
            control: 'number',
            description: 'Minimum selectable year in the year picker.',
        },
        maxYear: {
            control: 'number',
            description: 'Maximum selectable year in the year picker.',
        },
        utc: {
            control: 'boolean',
            description: 'When `true`, dates are handled in UTC rather than the local timezone.',
        },
        disablePast: {
            control: 'boolean',
            description: 'Disables selection of past dates when true.',
        },
        disableFuture: {
            control: 'boolean',
            description: 'Disables selection of future dates when true.',
        },
        minDate: {
            control: 'text',
            description: 'The minimum selectable date in `YYYY-MM-DD` format.',
        },
        maxDate: {
            control: 'text',
            description: 'The maximum selectable date in `YYYY-MM-DD` format.',
        },
        disableWeekend: {
            control: 'boolean',
            description: 'Disables selection of weekend dates when true.',
        },
        disableDates: {
            control: 'object',
            description: 'An array of specific dates to disable in `YYYY-MM-DD` format.',
        },
        footerAction: {
            control: 'boolean',
            description: 'Shows OK/Cancel footer actions. The selection is only confirmed on OK click.',
        },
    },
} satisfies MetaWithLabel<TsCalendarStatic>;

export default meta;
type Story = StoryObjWithLabel<TsCalendarStatic>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default calendar with no preset selection. Today is highlighted. Click a day to select it, then confirm with "OK" or revert with "Cancel".',
            },
        },
    },
};

export const PreselectedDate: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A calendar with a preselected date. The selected day is highlighted with a primary background.',
            },
        },
    },
    args: {
        selected: new Date(2026, 2, 15), // March 15, 2026
    },
};

export const Localization: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set the `locale` property to change month/day names and button labels. This example uses German (`de`).',
            },
        },
    },
    args: {
        locale: 'de',
        selected: new Date(2026, 2, 15),
    },
};

export const MinAndMaxDate: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `min` and `max` to restrict the selectable date range. Days outside the range are disabled.',
            },
        },
    },
    args: {
        min: new Date(2026, 2, 5),
        max: new Date(2026, 2, 25),
        focused: new Date(2026, 2, 1),
    },
};

export const MinAndMaxYear: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `minYear` and `maxYear` to restrict the year picker range.',
            },
        },
    },
    args: {
        minYear: 2020,
        maxYear: 2030,
    },
};

export const FocusedMonth: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set `focused` to control which month/year is initially displayed without preselecting a date.',
            },
        },
    },
    args: {
        focused: new Date(2027, 5, 1), // June 2027
    },
};

export const LocaleFrench: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Calendar with French locale (`fr`). Month names, weekday abbreviations, and button labels are localized.',
            },
        },
    },
    args: {
        locale: 'fr',
        selected: new Date(2026, 6, 14), // July 14, 2026
    },
};

export const LogEvents: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Open the browser console to see events logged when interacting with the calendar. Events: `ts-date-select` (date clicked), `ts-date-apply` (OK clicked), `ts-date-cancel` (Cancel clicked), `ts-date-change-month` (month navigation), `ts-year-change` (year navigation), `ts-month-change` (month navigation).',
            },
        },
    },
    render: () => {
        const log = (name: string) => (e: CustomEvent) => console.log(`[${name}]`, e.detail);
        return html`
            <ts-calendar-static
                locale="en"
                .selected=${new Date(2026, 2, 2)}
                @ts-date-select=${log('ts-date-select')}
                @ts-date-apply=${log('ts-date-apply')}
                @ts-date-cancel=${log('ts-date-cancel')}
                @ts-date-change-month=${log('ts-date-change-month')}
                @ts-year-change=${log('ts-year-change')}
                @ts-month-change=${log('ts-month-change')}
            ></ts-calendar-static>
        `;
    },
};

export const DisableWeekends: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `disable-weekend` to prevent selection of Saturdays and Sundays.',
            },
        },
    },
    args: {
        disableWeekend: true,
        selected: new Date(2026, 2, 16), // Monday, March 16, 2026
    },
};

export const DisableSpecificDates: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `disable-dates` to disable specific dates. Pass an array of dates in `YYYY-MM-DD` format.',
            },
        },
    },
    args: {
        disableDates: ['2026-03-10', '2026-03-15', '2026-03-20'],
        focused: new Date(2026, 2, 1),
    },
};

export const DisablePast: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `disable-past` to prevent selection of dates before today.',
            },
        },
    },
    args: {
        disablePast: true,
    },
};

export const DisableFuture: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `disable-future` to prevent selection of dates after today.',
            },
        },
    },
    args: {
        disableFuture: true,
    },
};

export const MinMaxDateString: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use `min-date` and `max-date` properties with `YYYY-MM-DD` format strings to restrict the selectable range.',
            },
        },
    },
    args: {
        minDate: '2026-03-10',
        maxDate: '2026-03-25',
        focused: new Date(2026, 2, 1),
    },
};

export const WithoutFooterActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set `footer-action` to `false` to hide the OK/Cancel buttons. Dates are selected immediately on click.',
            },
        },
    },
    args: {
        footerAction: false,
        selected: new Date(2026, 2, 15),
    },
};

export const UTCMode: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, `utc` is `true`. Set it to `false` to use local timezone instead of UTC.',
            },
        },
    },
    args: {
        utc: false,
        selected: new Date(2026, 2, 15),
    },
};

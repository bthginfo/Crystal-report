import { createComponent, type EventName } from '@lit/react';
import * as React from 'react';

import { TsCalendarStatic as CalendarStatic } from '../index.js';
import type { TsDateChangeMonth } from '../../../utils/events/ts-date-change-month.js';
import type { TsDateChangeYearEvent } from '../../../utils/events/ts-date-change-year.js';
import type { TsDateSelectEvent } from '../../../utils/events/ts-date-select.js';
import type { TsCancelEvent } from '../../../utils/events/ts-cancel.js';

// Define custom event types for calendar-static specific events
export type TsDateApplyEvent = CustomEvent<{ value: string; locale: string; meta: unknown }>;
export type TsMonthChangeEvent = CustomEvent<{ focused: Date }>;
export type TsYearChangeEvent = CustomEvent<{ focused: Date }>;

export const TsCalendarStatic = createComponent({
    tagName: 'ts-calendar-static',
    elementClass: CalendarStatic,
    react: React,
    events: {
        onTsDateChangeMonth: 'ts-date-change-month' as EventName<TsDateChangeMonth>,
        onTsDateChangeYear: 'ts-date-change-year' as EventName<TsDateChangeYearEvent>,
        onTsDateSelect: 'ts-date-select' as EventName<TsDateSelectEvent>,
        onTsDateApply: 'ts-date-apply' as EventName<TsDateApplyEvent>,
        onTsDateCancel: 'ts-date-cancel' as EventName<TsCancelEvent>,
        onTsYearChange: 'ts-year-change' as EventName<TsYearChangeEvent>,
        onTsMonthChange: 'ts-month-change' as EventName<TsMonthChangeEvent>,
    },
});

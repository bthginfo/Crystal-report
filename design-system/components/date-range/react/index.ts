import { createComponent, type EventName } from '@lit/react';
import * as React from 'react';

import { TsDateRange as DateRange } from '../index.js';

import type { TsDateChangeEvent } from '../../../utils/events/ts-date-change.js';
import type { TsBlurEvent } from '../../../utils/events/ts-blur.js';
export type TsDateApplyEvent = CustomEvent<{ start: string; end: string }>;
export type TsDateCancelEvent = CustomEvent<{ start: string; end: string }>;

export const TsDateRange = createComponent({
    tagName: 'ts-date-range',
    elementClass: DateRange,
    react: React,
    events: {
        onTsDateChange: 'ts-date-change' as EventName<TsDateChangeEvent>,
        onTsDateApply: 'ts-date-apply' as EventName<TsDateApplyEvent>,
        onTsDateCancel: 'ts-date-cancel' as EventName<TsDateCancelEvent>,
        onTsDateBlur: 'ts-blur' as EventName<TsBlurEvent>,
    },
});

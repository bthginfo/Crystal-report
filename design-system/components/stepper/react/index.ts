import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsStepper as Stepper } from '../index.js';
import type { TsSelectStepEvent } from '../../../utils/events/ts-select-step.js';

export const TsStepper = createComponent({
    tagName: 'ts-stepper',
    elementClass: Stepper,
    react: React,
    events: {
        onTsSelectStep: 'ts-select-step' as EventName<TsSelectStepEvent>,
        onTsNextStep: 'ts-next-step' as EventName<TsSelectStepEvent>,
        onTsPrevStep: 'ts-prev-step' as EventName<TsSelectStepEvent>,
    },
});

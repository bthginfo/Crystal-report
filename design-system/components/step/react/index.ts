import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsStep as Step } from '../index.js';
import type { TsSelectStepEvent } from '../../../utils/events/ts-select-step.js';

export const TsStep = createComponent({
    tagName: 'ts-step',
    elementClass: Step,
    react: React,
    events: {
        onTsSelectStep: 'ts-select-step' as EventName<TsSelectStepEvent>,
    },
});

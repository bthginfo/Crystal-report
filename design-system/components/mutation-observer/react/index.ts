import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsMutationObserver as MutationObserver } from '../index.js';
import type { TsMutationEvent } from '../../../utils/events/ts-mutation.js';

export const TsMutationObserver = createComponent({
    tagName: 'ts-mutation-observer',
    elementClass: MutationObserver,
    react: React,
    events: {
        onTsMutation: 'ts-mutation' as EventName<TsMutationEvent>,
    },
});

import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsRating as Rating } from '../index.js';
import type { TsChangeEvent } from '../../../utils/events/ts-change.js';
import type { TsHoverEvent } from '../../../utils/events/ts-hover.js';

export const TsRating = createComponent({
    tagName: 'ts-rating',
    elementClass: Rating,
    react: React,
    events: {
        onTsChange: 'ts-change' as EventName<TsChangeEvent>,
        onTsHover: 'ts-hover' as EventName<TsHoverEvent>,
    },
});

import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsPopup as Popup } from '../index.js';
import type { TsRepositionEvent } from '../../../utils/events/ts-reposition.js';

export const TsPopup = createComponent({
    tagName: 'ts-popup',
    elementClass: Popup,
    react: React,
    events: {
        onTsReposition: 'ts-reposition' as EventName<TsRepositionEvent>,
    },
});

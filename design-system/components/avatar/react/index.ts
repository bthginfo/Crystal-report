import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsAvatar as Avatar } from '../index.js';
import type { TsErrorEvent } from '../../../utils/events/ts-error.js';

export const TsAvatar = createComponent({
    tagName: 'ts-avatar',
    elementClass: Avatar,
    react: React,
    events: {
        onTsError: 'ts-error' as EventName<TsErrorEvent>,
    },
});

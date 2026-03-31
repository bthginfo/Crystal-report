import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsCopyButton as CopyButton } from '../index.js';
import type { TsCopyEvent } from '../../../utils/events/ts-copy.js';
import type { TsErrorEvent } from '../../../utils/events/ts-error.js';

export const TsCopyButton = createComponent({
    tagName: 'ts-copy-button',
    elementClass: CopyButton,
    react: React,
    events: {
        onTsCopy: 'ts-copy' as EventName<TsCopyEvent>,
        onTsError: 'ts-error' as EventName<TsErrorEvent>,
    },
});

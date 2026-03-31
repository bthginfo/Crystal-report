import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsAnimatedImage as AnimatedImage } from '../index.js';
import type { TsLoadEvent } from '../../../utils/events/ts-load.js';
import type { TsErrorEvent } from '../../../utils/events/ts-error.js';

export const TsAnimatedImage = createComponent({
    tagName: 'ts-animated-image',
    elementClass: AnimatedImage,
    react: React,
    events: {
        onTsLoad: 'ts-load' as EventName<TsLoadEvent>,
        onTsError: 'ts-error' as EventName<TsErrorEvent>,
    },
});

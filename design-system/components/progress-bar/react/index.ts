import { createComponent } from '@lit/react';
import * as React from 'react';

import { TsProgressBar as ProgressBar } from '../index.js';

export const TsProgressBar = createComponent({
    tagName: 'ts-progress-bar',
    elementClass: ProgressBar,
    react: React,
    events: {},
});

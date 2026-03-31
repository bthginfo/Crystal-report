import { createComponent } from '@lit/react';
import * as React from 'react';

import { TsFormatBytes as FormatBytes } from '../index.js';

export const TsFormatBytes = createComponent({
    tagName: 'ts-format-bytes',
    elementClass: FormatBytes,
    react: React,
    events: {},
});

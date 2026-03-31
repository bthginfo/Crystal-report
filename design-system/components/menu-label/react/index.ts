import { createComponent } from '@lit/react';
import * as React from 'react';

import { TsMenuLabel as MenuLabel } from '../index.js';

export const TsMenuLabel = createComponent({
    tagName: 'ts-menu-label',
    elementClass: MenuLabel,
    react: React,
    events: {},
});

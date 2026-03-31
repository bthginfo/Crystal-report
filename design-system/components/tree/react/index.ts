import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsTree as Tree } from '../index.js';
import type { TsSelectionChangeEvent } from '../../../utils/events/ts-selection-change.js';

export const TsTree = createComponent({
    tagName: 'ts-tree',
    elementClass: Tree,
    react: React,
    events: {
        onTsSelectionChange: 'ts-selection-change' as EventName<TsSelectionChangeEvent>,
    },
});

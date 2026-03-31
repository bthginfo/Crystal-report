import { createComponent } from '@lit/react';
import { type EventName } from '@lit/react';
import * as React from 'react';

import { TsSwitch as Switch } from '../index.js';
import type { TsBlurEvent } from '../../../utils/events/ts-blur.js';
import type { TsChangeEvent } from '../../../utils/events/ts-change.js';
import type { TsInputEvent } from '../../../utils/events/ts-input.js';
import type { TsFocusEvent } from '../../../utils/events/ts-focus.js';
import type { TsInvalidEvent } from '../../../utils/events/ts-invalid.js';

export const TsSwitch = createComponent({
    tagName: 'ts-switch',
    elementClass: Switch,
    react: React,
    events: {
        onTsBlur: 'ts-blur' as EventName<TsBlurEvent>,
        onTsChange: 'ts-change' as EventName<TsChangeEvent>,
        onTsInput: 'ts-input' as EventName<TsInputEvent>,
        onTsFocus: 'ts-focus' as EventName<TsFocusEvent>,
        onTsInvalid: 'ts-invalid' as EventName<TsInvalidEvent>,
    },
});

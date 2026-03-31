import { createComponent } from '@lit/react';
import * as React from 'react';

import { TsIban as Iban } from '../index.js';

export const TsIban = createComponent({
    tagName: 'ts-iban',
    elementClass: Iban,
    react: React,
    events: {},
});

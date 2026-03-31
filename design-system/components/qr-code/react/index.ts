import { createComponent } from '@lit/react';
import * as React from 'react';

import { TsQrCode as QrCode } from '../index.js';

export const TsQrCode = createComponent({
    tagName: 'ts-qr-code',
    elementClass: QrCode,
    react: React,
    events: {},
});

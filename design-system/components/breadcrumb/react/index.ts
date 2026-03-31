import { createComponent } from '@lit/react';
import * as React from 'react';
import { TsBreadcrumb as Breadcrumb } from '../index.js';

export const TsBreadcrumb = createComponent({
    tagName: 'ts-breadcrumb',
    elementClass: Breadcrumb,
    react: React,
    events: {},
});

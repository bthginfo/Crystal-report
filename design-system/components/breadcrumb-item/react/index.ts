import { createComponent } from '@lit/react';
import * as React from 'react';
import { TsBreadcrumbItem as BreadcrumbItem } from '../index.js';

export const TsBreadcrumbItem = createComponent({
    tagName: 'ts-breadcrumb-item',
    elementClass: BreadcrumbItem,
    react: React,
    events: {},
});

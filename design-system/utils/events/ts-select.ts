import type { TsMenuItem } from '../../components/menu-item/index.js';

export type TsSelectEvent = CustomEvent<{ item: TsMenuItem }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-select': TsSelectEvent;
    }
}

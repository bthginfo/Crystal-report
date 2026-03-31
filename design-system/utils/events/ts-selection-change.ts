import type { TsTreeItem } from '../../components/tree-item/index.js';

export type TsSelectionChangeEvent = CustomEvent<{ selection: TsTreeItem[] }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-selection-change': TsSelectionChangeEvent;
    }
}

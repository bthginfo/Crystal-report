export type TsSelectStepEvent = CustomEvent<{ index: number; previousIndex?: number }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-select-step': TsSelectStepEvent;
    }
}

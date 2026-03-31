export type TsPrevStepEvent = CustomEvent<{ index: number; previousIndex?: number }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-prev-step': TsPrevStepEvent;
    }
}

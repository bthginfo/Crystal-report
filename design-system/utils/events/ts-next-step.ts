export type TsNextStepEvent = CustomEvent<{ index: number; previousIndex?: number }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-next-step': TsNextStepEvent;
    }
}

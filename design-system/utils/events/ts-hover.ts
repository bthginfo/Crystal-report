export type TsHoverEvent = CustomEvent<{
    phase: 'start' | 'move' | 'end';
    value: number;
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-hover': TsHoverEvent;
    }
}

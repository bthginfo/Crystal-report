export type TsCopyEvent = CustomEvent<{ value: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-copy': TsCopyEvent;
    }
}

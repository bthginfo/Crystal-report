export type TsDateChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-date-change': TsDateChangeEvent;
    }
}

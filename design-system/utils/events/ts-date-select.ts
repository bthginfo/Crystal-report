export type TsDateSelectEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-date-select': TsDateSelectEvent;
    }
}

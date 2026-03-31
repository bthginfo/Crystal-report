export type TsDateChangeYearEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-date-change-year': TsDateChangeYearEvent;
    }
}

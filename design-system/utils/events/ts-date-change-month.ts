export type TsDateChangeMonth = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-date-change-month': TsDateChangeMonth;
    }
}

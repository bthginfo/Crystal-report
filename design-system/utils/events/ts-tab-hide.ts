export type TsTabHideEvent = CustomEvent<{ name: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-tab-hide': TsTabHideEvent;
    }
}

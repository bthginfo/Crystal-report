export type TsTabShowEvent = CustomEvent<{ name: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-tab-show': TsTabShowEvent;
    }
}

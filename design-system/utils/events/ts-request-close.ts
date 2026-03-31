export type TsRequestCloseEvent = CustomEvent<{
    source: 'close-button' | 'keyboard' | 'overlay';
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-request-close': TsRequestCloseEvent;
    }
}

import type { TsCarouselItem } from '../../components/carousel-item/index.js';

export type TsClickPreviousEvent = CustomEvent<{
    index: number;
    slide: TsCarouselItem;
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-click-previous': TsClickPreviousEvent;
    }
}

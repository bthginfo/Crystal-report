import type { TsCarouselItem } from '../../components/carousel-item/index.js';

export type TsClickNextEvent = CustomEvent<{
    index: number;
    slide: TsCarouselItem;
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-click-next': TsClickNextEvent;
    }
}

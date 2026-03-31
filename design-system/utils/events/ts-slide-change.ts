import type { TsCarouselItem } from '../../components/carousel-item/index.js';

export type TsSlideChangeEvent = CustomEvent<{
    index: number;
    slide: TsCarouselItem;
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        'ts-slide-change': TsSlideChangeEvent;
    }
}

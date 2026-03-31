import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsCarousel } from '@tuvsud/design-system/carousel';
import '@tuvsud/design-system/carousel';
import '@tuvsud/design-system/carousel-item';

const meta = {
    title: 'Components/Carousel',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Carousels let you showcase as many content slides as you need, navigable along either a horizontal or vertical axis.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(/\s(autoplay|pagination|navigation|loop|mouseDragging)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    args: {
        autoplay: false,
        autoplayInterval: 3000,
        pagination: true,
        navigation: true,
        loop: true,
        mouseDragging: true,
        slidesPerPage: 1,
        slidesPerMove: 1,
        orientation: 'horizontal',
    },
    argTypes: {
        loop: {
            control: 'boolean',
            description: 'If true, the carousel wraps around from last slide to first.',
        },
        navigation: {
            control: 'boolean',
            description: 'Shows previous/next navigation controls.',
        },
        pagination: {
            control: 'boolean',
            description: 'Displays pagination indicators for the slides.',
        },
        autoplay: {
            control: 'boolean',
            description: 'Automatically advances slides at a fixed interval.',
        },
        autoplayInterval: {
            control: 'number',
            description: 'Time in milliseconds between slide changes when autoplay is enabled.',
        },
        slidesPerPage: {
            control: 'number',
            description: 'Number of slides visible at the same time.',
        },
        slidesPerMove: {
            control: 'number',
            description: 'Number of slides advanced per navigation step.',
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Direction in which the carousel scrolls.',
        },
        mouseDragging: {
            control: 'boolean',
            description: 'Allows dragging slides with the mouse or touch gestures.',
        },
    },

    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            ?loop=${args.loop}
            .navigation=${args.navigation}
            ?navigation=${args.navigation}
            .pagination=${args.pagination}
            ?pagination=${args.pagination}
            .autoplay=${args.autoplay}
            ?autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            autoplay-interval=${String(args.autoplayInterval)}
            .slidesPerPage=${args.slidesPerPage}
            slides-per-page=${String(args.slidesPerPage)}
            .slidesPerMove=${args.slidesPerMove}
            slides-per-move=${String(args.slidesPerMove)}
            .orientation=${args.orientation}
            orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
            mouse-dragging=${args.mouseDragging}
            style="--aspect-ratio: 16/9;"
        >
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide1.jpg"
                    alt="slide1"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide2.jpg"
                    alt="slide2"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide3.jpg"
                    alt="slide3"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide4.jpg"
                    alt="slide4"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
        </ts-carousel>
    `,
} satisfies MetaWithLabel<TsCarousel>;

export default meta;
type Story = StoryObjWithLabel<TsCarousel>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A basic carousel with navigation and pagination enabled, displaying one slide at a time.',
            },
        },
    },
};

export const ScrollHint: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The scroll hint indicates that additional content is available beyond the visible area, prompting users to scroll for more information.',
            },
        },
    },
    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            .navigation=${args.navigation}
            .pagination=${args.pagination}
            .autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            .slidesPerPage=${args.slidesPerPage}
            .slidesPerMove=${args.slidesPerMove}
            .orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
            class="scroll-hint"
            style="--scroll-hint: 10%;"
        >
            <ts-carousel-item><img src="/assets/carousel/slide1.jpg" alt="slide1" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide2.jpg" alt="slide2" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide3.jpg" alt="slide3" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide4.jpg" alt="slide4" /></ts-carousel-item>
        </ts-carousel>
    `,
};

export const ManySlides: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Testing loop functionality with many slides. The pagination indicators are scrollable and the carousel should loop infinitely without jumping back to the first slide.',
            },
        },
    },
    args: { loop: true, pagination: true, navigation: true, autoplay: false },
    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            ?loop=${args.loop}
            .navigation=${args.navigation}
            ?navigation=${args.navigation}
            .pagination=${args.pagination}
            ?pagination=${args.pagination}
            .autoplay=${args.autoplay}
            ?autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            autoplay-interval=${String(args.autoplayInterval)}
            .slidesPerPage=${args.slidesPerPage}
            slides-per-page=${String(args.slidesPerPage)}
            .slidesPerMove=${args.slidesPerMove}
            slides-per-move=${String(args.slidesPerMove)}
            .orientation=${args.orientation}
            orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
            mouse-dragging=${args.mouseDragging}
            style="--aspect-ratio: 16/9;"
        >
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-sky-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 1
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-pink-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 2
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-green-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 3
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-orange-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 4
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-purple-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 5
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-teal-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 6
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-yellow-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 7
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-red-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 8
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-blue-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 9
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-lime-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 10
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-indigo-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 11
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-cyan-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 12
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-amber-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 13
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-emerald-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 14
                </div>
            </ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-violet-400);">
                <div
                    style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;"
                >
                    Slide 15
                </div>
            </ts-carousel-item>
        </ts-carousel>
    `,
};

export const Vertical: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When enabled, the navigation elements of the component are displayed vertically instead of horizontally.',
            },
        },
    },
    args: { orientation: 'vertical', pagination: true },
    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            .navigation=${args.navigation}
            .pagination=${args.pagination}
            .autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            .slidesPerPage=${args.slidesPerPage}
            .slidesPerMove=${args.slidesPerMove}
            .orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
            class="vertical"
        >
            <ts-carousel-item><img src="/assets/carousel/slide1.jpg" alt="slide1" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide2.jpg" alt="slide2" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide3.jpg" alt="slide3" /></ts-carousel-item>
            <ts-carousel-item><img src="/assets/carousel/slide4.jpg" alt="slide4" /></ts-carousel-item>
        </ts-carousel>

        <style>
            .vertical {
                max-height: 400px;
            }
            .vertical::part(base) {
                grid-template-areas: 'slides slides pagination';
            }
            .vertical::part(pagination) {
                flex-direction: column;
            }
            .vertical::part(navigation) {
                transform: rotate(90deg);
                display: flex;
            }
        </style>
    `,
};

export const MultipleSlidesPerView: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The card’s content area can include any custom HTML without requiring slots. You have full flexibility to structure and style the content as needed.',
            },
        },
    },
    args: { slidesPerPage: 2, slidesPerMove: 2 },
    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            .navigation=${args.navigation}
            .pagination=${args.pagination}
            .autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            .slidesPerPage=${args.slidesPerPage}
            .slidesPerMove=${args.slidesPerMove}
            .orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
        >
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-sky-400);">Slide 1</ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-pink-400);">Slide 2</ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-sky-400);">Slide 3</ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-pink-400);">Slide 4</ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-sky-400);">Slide 5</ts-carousel-item>
            <ts-carousel-item style="background: var(--ts-semantic-color-charts-pink-400);">Slide 6</ts-carousel-item>
        </ts-carousel>
    `,
};

export const Log: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Logs `ts-click-next` and `ts-click-previous` events to the console.',
            },
        },
    },
    render: args => html`
        <ts-carousel
            .loop=${args.loop}
            ?loop=${args.loop}
            .navigation=${true}
            ?navigation=${true}
            .pagination=${args.pagination}
            ?pagination=${args.pagination}
            .autoplay=${args.autoplay}
            ?autoplay=${args.autoplay}
            .autoplayInterval=${args.autoplayInterval}
            autoplay-interval=${String(args.autoplayInterval)}
            .slidesPerPage=${args.slidesPerPage}
            slides-per-page=${String(args.slidesPerPage)}
            .slidesPerMove=${args.slidesPerMove}
            slides-per-move=${String(args.slidesPerMove)}
            .orientation=${args.orientation}
            orientation=${args.orientation}
            .mouseDragging=${args.mouseDragging}
            mouse-dragging=${args.mouseDragging}
            style="--aspect-ratio: 16/9;"
            @ts-click-next=${(e: CustomEvent) => console.log('ts-next', e.detail)}
            @ts-click-previous=${(e: CustomEvent) => console.log('ts-previous', e.detail)}
        >
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide1.jpg"
                    alt="slide1"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide2.jpg"
                    alt="slide2"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide3.jpg"
                    alt="slide3"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
            <ts-carousel-item>
                <img
                    src="/assets/carousel/slide4.jpg"
                    alt="slide4"
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </ts-carousel-item>
        </ts-carousel>
    `,
};

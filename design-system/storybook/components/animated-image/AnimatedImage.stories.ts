import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsAnimatedImage } from '@tuvsud/design-system/animated-image';
import '@tuvsud/design-system/animated-image';

const meta: Meta<TsAnimatedImage> = {
    title: 'Components/Animated Image',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A UI component that handles GIF and WEBP animation playback, enabling play/pause control through user interaction.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(play)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const { src, alt, play } = args;
        return html`
            <ts-animated-image
                .src=${src}
                src=${src}
                .alt=${alt}
                alt=${alt}
                .play=${play}
                ?play=${play}
            ></ts-animated-image>
        `;
    },
    args: {
        src: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
        alt: 'Animated example',
        play: true,
    },
    argTypes: {
        src: { control: 'text', description: 'The path to the image.' },
        alt: { control: 'text', description: 'Description for assistive devices.' },
        play: { control: 'boolean', description: 'Play or pause the animation.' },
    },
};

export default meta;
type Story = StoryObj<TsAnimatedImage>;

export const Default: Story = {};

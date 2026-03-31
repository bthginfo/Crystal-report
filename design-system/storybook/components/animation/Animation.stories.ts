import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsAnimation } from '@tuvsud/design-system/animation';
import '@tuvsud/design-system/animation';

const meta: Meta<TsAnimation> = {
    title: 'Components/Animation',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Support declarative element animation through almost 100 predefined presets, with the option to implement custom keyframes as needed.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(play)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => {
        const {
            name,
            play,
            delay,
            direction,
            duration,
            easing,
            endDelay,
            fill,
            iterations,
            iterationStart,
            keyframes,
            playbackRate,
            currentTime,
        } = args;

        return html`
            <ts-animation
                .name=${name}
                name=${name}
                .play=${play}
                ?play=${play}
                .delay=${delay}
                delay=${delay}
                .direction=${direction}
                direction=${direction}
                .duration=${duration}
                duration=${duration}
                .easing=${easing}
                easing=${easing}
                .endDelay=${endDelay}
                end-delay=${endDelay}
                .fill=${fill}
                fill=${fill}
                .iterations=${iterations}
                iterations=${iterations}
                .iterationStart=${iterationStart}
                iteration-start=${iterationStart}
                .keyframes=${keyframes}
                .playbackRate=${playbackRate}
                playback-rate=${playbackRate}
                .currentTime=${currentTime}
            >
                <div
                    style="
            width: 96px;
            height: 96px;
            border-radius: 12px;
            background: var(--ts-semantic-color-background-primary-default);
          "
                ></div>
            </ts-animation>
        `;
    },
    args: {
        name: 'bounce',
        play: true,
        delay: 0,
        direction: 'normal',
        duration: 1000,
        easing: 'linear',
        endDelay: 0,
        fill: 'auto',
        iterations: Infinity,
        iterationStart: 0,
        keyframes: undefined,
        playbackRate: 1,
        currentTime: undefined,
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Preset animation name, or a custom animation name supported by the component.',
        },
        play: { control: 'boolean', description: 'If true, the animation plays.' },
        delay: { control: 'number', description: 'Delay before the animation starts (ms).' },
        direction: {
            control: 'select',
            options: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
            description: 'Playback direction of the animation.',
        },
        duration: { control: 'number', description: 'Animation duration (ms).' },
        easing: { control: 'text', description: 'CSS timing function (e.g. "linear", "ease-in-out").' },
        endDelay: { control: 'number', description: 'Delay after the animation ends before finishing (ms).' },
        fill: {
            control: 'select',
            options: ['auto', 'none', 'forwards', 'backwards', 'both'],
            description: 'Controls how styles are applied before/after the animation.',
        },
        iterations: {
            control: 'number',
            description: 'Number of times the animation repeats. Use Infinity for endless looping.',
        },
        iterationStart: { control: 'number', description: 'Start offset for the animation iteration count.' },
        keyframes: {
            control: 'object',
            description: 'Custom keyframes to run instead of a preset (Web Animations keyframes format).',
        },
        playbackRate: { control: 'number', description: 'Playback speed multiplier (1 = normal speed).' },
        currentTime: { control: 'number', description: 'Sets the animation current time position (ms).' },
    },
};

export default meta;
type Story = StoryObj<TsAnimation>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default animation using the `bounce` preset.',
            },
        },
    },
};

export const Animation: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates all of the baked-in animations and easings. Animations are based on those found in the popular Animate.css library.',
            },
        },
    },
    render: args => html`
        <div class="animation-overview">
            <ts-animation
                .name=${args.name}
                .duration=${args.duration}
                .play=${args.play}
                .delay=${args.delay}
                .direction=${args.direction}
                .easing=${args.easing}
                .endDelay=${args.endDelay}
                .fill=${args.fill}
                .iterations=${args.iterations}
                .iterationStart=${args.iterationStart}
                .keyframes=${args.keyframes}
                .playbackRate=${args.playbackRate}
                .currentTime=${args.currentTime}
            >
                <div class="box"></div>
            </ts-animation>

            <ts-animation .name=${'jello'} .duration=${args.duration} .play=${args.play}>
                <div class="box"></div>
            </ts-animation>

            <ts-animation .name=${'heartBeat'} .duration=${args.duration} .play=${args.play}>
                <div class="box"></div>
            </ts-animation>

            <ts-animation .name=${'flip'} .duration=${args.duration} .play=${args.play}>
                <div class="box"></div>
            </ts-animation>
        </div>

        <style>
            .animation-overview .box {
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: var(--ts-semantic-color-background-primary-default);
                margin: 1.5rem;
            }
        </style>
    `,
};

const useChromatic = process.env.STORYBOOK_CHROMATIC === '1';

const config = {
    stories: [
        '../storybook/documentation/*.mdx',
        '../storybook/foundation/*.mdx',
        '../storybook/components/*/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../storybook/examples/*/**/*.mdx',
        '../storybook/examples/*/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    staticDirs: [
        { from: '../storybook/assets', to: 'assets' },
        { from: './public', to: '/' },
    ],

    addons: [
        ...(useChromatic ? ['@chromatic-com/storybook'] : []),
        '@storybook/addon-themes',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/web-components-vite',
        options: {},
    },
    core: {
        disableTelemetry: true,
        builder: '@storybook/builder-vite',
    },
};

export default config;

import { html } from 'lit';
import type { Preview } from '@storybook/web-components-vite';
import type { StoryFn, StoryContext } from 'storybook/internal/types';
import './global.css';
import '../dist/theme/fonts.css';

// ?raw is a Vite specific thing, it imports the CSS as a raw string
// unfortunately `with { type: 'css' }` import attribute is not supported yet in Vite,
// this would normally import it as a CSSStyleSheet instance
// so preferred to do this in a render-blocking script to prevent flash of unstyled or inaccurate theme.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import lightStyles from '../dist/tokens/bundle-light.css?raw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import darkStyles from '../dist/tokens/bundle-dark.css?raw';

type MarkedCSSStyleSheet = CSSStyleSheet & { theme?: boolean };

const themeStyles = { light: [lightStyles], dark: [darkStyles] };

function setThemeSheet(theme: keyof typeof themeStyles) {
    const sheets = themeStyles[theme].map(str => {
        const s = new CSSStyleSheet() as MarkedCSSStyleSheet;
        s.theme = true;
        s.replaceSync(str);
        return s;
    });
    document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets.filter(s => !(s as MarkedCSSStyleSheet).theme),
        ...sheets,
    ];
}

function applyThemeClass(theme: 'light' | 'dark') {
    const root = document.documentElement;
    root.classList.toggle('ts-theme-light', theme === 'light');
    root.classList.toggle('ts-theme-dark', theme === 'dark');
}

const withTheme = (story: StoryFn, context: StoryContext) => {
    const theme = ((context.parameters.theme || context.globals.theme) as 'light' | 'dark') || 'light';
    setThemeSheet(theme);
    applyThemeClass(theme);
    const storyEl = ((context.canvasElement as HTMLCanvasElement).closest('.docs-story') ||
        (context.canvasElement as HTMLCanvasElement).closest('.sb-show-main')) as HTMLElement;
    if (storyEl) storyEl.style.setProperty('background', theme === 'dark' ? '#333' : '#fff', 'important');
    return html`${story(context.arg, context)}`;
};

const preview: Preview = {
    decorators: [withTheme],
    parameters: {
        controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
        storySort: { order: ['get-started', 'Components'] },
        docs: {
            codePanel: true,
        },
    },
};

export default preview;

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'contrast',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'dark', icon: 'circle', title: 'dark' },
            ],
        },
    },
};

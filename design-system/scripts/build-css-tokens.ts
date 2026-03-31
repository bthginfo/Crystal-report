import StyleDictionary from 'style-dictionary';
import { register, permutateThemes } from '@tokens-studio/sd-transforms';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studioExportDir = path.resolve(__dirname, '..', 'studio-export');
const studioExportStylesDir = path.resolve(studioExportDir, 'styles');

register(StyleDictionary, { 'ts/color/modifiers': { format: 'hex' } });

interface Token {
    filePath: string;
    [key: string]: unknown;
}

function selectorFor(name: string): string {
    return name.includes('light') ? ':root,\n:host,\n.ts-theme-light' : ':host,\n.ts-theme-dark';
}

const $themes = JSON.parse(readFileSync(path.resolve(studioExportDir, '$themes.json'), 'utf-8'));

const themes = permutateThemes($themes, { separator: '_' });

const configs = Object.entries(themes).map(([name, tokensets]) => {
    const isLight = name.includes('light');
    const destination = `bundle-${isLight ? 'light' : 'dark'}.css`;

    return {
        source: (tokensets as string[]).map(tokenset => path.resolve(studioExportDir, 'tokens', `${tokenset}.json`)),
        preprocessors: ['tokens-studio'],
        platforms: {
            css: {
                prefix: 'ts',
                transformGroup: 'tokens-studio',
                transforms: ['name/kebab'],
                buildPath: 'dist/tokens/',
                files: [
                    {
                        destination,
                        format: 'css/variables',
                        options: { selector: selectorFor(name) },
                        filter: (token: Token) => !token.filePath.includes('tokens/src/Core'),
                    },
                ],
            },
        },
    };
});

for (const cfg of configs) {
    const sd = new StyleDictionary(cfg);
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
}

// Create studio-export/styles directory if it doesn't exist
mkdirSync(studioExportStylesDir, { recursive: true });

// Copy generated CSS files to studio-export/styles
const distTokensDir = path.resolve(__dirname, '..', 'dist', 'tokens');
copyFileSync(path.resolve(distTokensDir, 'bundle-light.css'), path.resolve(studioExportStylesDir, 'bundle-light.css'));
copyFileSync(path.resolve(distTokensDir, 'bundle-dark.css'), path.resolve(studioExportStylesDir, 'bundle-dark.css'));

console.log('✓ CSS files copied to studio-export/styles/');

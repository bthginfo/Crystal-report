import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';
import wc from 'eslint-plugin-wc';

export default [
    {
        ignores: [
            'coverage',
            'dist',
            'dist-figma',
            'node_modules',
            'storybook-static',
            'package.json',
            'package-lock.json',
            '**/*.yml',
            '**/*.yaml',
            'tsconfig.json',
            'README.md',
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        rules: {
            indent: 'off',
            quotes: 'off',
            'max-len': 'off',
        },
    },

    {
        files: ['**/*.{js,ts}'],
        plugins: {
            lit,
            'lit-a11y': litA11y,
            wc,
        },
    },

    {
        files: ['**/*.test.ts'],
        plugins: {
            'chai-friendly': chaiFriendly,
        },
        languageOptions: {
            globals: { ...globals.browser, ...globals.mocha },
        },
        rules: {
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'chai-friendly/no-unused-expressions': 'error',
        },
    },

    {
        files: ['**/*.{cjs,mjs}'],
        languageOptions: {
            sourceType: 'script',
            globals: globals.node,
        },
    },
];

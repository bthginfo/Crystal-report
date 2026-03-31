// web-test-runner.config.mjs
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { globbySync } from 'globby';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const filesGlob = 'components/**/*.test.ts';

const dsSourceAlias = {
    name: 'ds-source-alias',
    resolveImport({ source }) {
        if (source === '@tuvsud/design-system') return '/components/index.ts';
        if (source.startsWith('@tuvsud/design-system/'))
            return source.replace('@tuvsud/design-system/', '/components/') + '/index.ts';
    },
};

const serveAssetsFromDist = {
    name: 'serve-assets-from-dist',
    serve(context) {
        if (context.path.startsWith('/assets/')) {
            const p = join(process.cwd(), 'dist', context.path);
            try {
                return { body: readFileSync(p), type: 'application/octet-stream' };
                // eslint-disable-next-line
            } catch {}
        }
    },
};

export default {
    rootDir: '.',
    files: filesGlob,
    concurrentBrowsers: 3,
    nodeResolve: { exportConditions: ['production', 'default'] },
    testFramework: { config: { timeout: 30000, retries: 1 } },
    plugins: [
        esbuildPlugin({ ts: true, target: 'es2020', sourcemap: true, tsconfig: 'tsconfig.json' }),
        dsSourceAlias,
        serveAssetsFromDist,
    ],
    browsers: [playwrightLauncher({ product: 'chromium' }), playwrightLauncher({ product: 'webkit' })],
    testRunnerHtml: testFramework => `
    <html lang="en-US">
      <head></head>
      <body>
        <link rel="stylesheet" href="/dist/tokens/bundle-light.css">
        <script>window.process = { env: { NODE_ENV: "production" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
    groups: globbySync(filesGlob).map(path => {
        const file = path.replaceAll('\\', '/').match(/^.*\/(.*)\.test\.ts$/)[1];
        return { name: file, files: path };
    }),
    coverage: true,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        reporters: ['text', 'html', 'lcov'],
        threshold: { statements: 80, branches: 75, functions: 80, lines: 80 },
        exclude: [
            '**/dist/**',
            '**/*.test.*',
            '**/*.stories.*',
            'scripts/**',
            'node_modules/**',
            'utils/**',
            'components/**/src/*.component.ts',
            'components/menu-item/src/submenu-controller.ts',
            'components/color-picker/src/color-converter.ts',
            'components/icon/src/library.ts',
        ],
    },
};

import { expect, fixture, html } from '@open-wc/testing';
import type { TsProgressRing } from './index.js';
import '@tuvsud/design-system/progress-ring';
import { getCssText } from '../../utils/internal/test.js';

describe('progress ring component <ts-progress-ring>', () => {
    let el: TsProgressRing;

    describe('when provided just a value parameter', () => {
        before(async () => {
            el = await fixture<TsProgressRing>(html`<ts-progress-ring value="25"></ts-progress-ring>`);
        });

        it('should pass accessibility tests', async () => {
            await expect(el).to.be.accessible();
        });
    });

    describe('when provided a title, and value parameter', () => {
        let base: HTMLDivElement;

        before(async () => {
            el = await fixture<TsProgressRing>(
                html`<ts-progress-ring title="Titled Progress Ring" value="25"></ts-progress-ring>`,
            );
            base = el.shadowRoot!.querySelector('[part~="base"]')!;
        });

        it('should pass accessibility tests', async () => {
            await expect(el).to.be.accessible();
        });

        it('uses the value parameter on the base, as aria-valuenow', () => {
            expect(base).attribute('aria-valuenow', '25');
        });

        it('translates the value parameter to a percentage, and uses translation on the base, as percentage css variable', () => {
            expect(base).attribute('style', '--percentage: 0.25');
        });
    });

    describe('when provided a ariaLabel, and value parameter', () => {
        before(async () => {
            el = await fixture<TsProgressRing>(
                html`<ts-progress-ring ariaLabel="Labelled Progress Ring" value="25"></ts-progress-ring>`,
            );
        });

        it('should pass accessibility tests', async () => {
            await expect(el).to.be.accessible();
        });
    });

    describe('when provided a ariaLabelledBy, and value parameter', () => {
        before(async () => {
            el = await fixture<TsProgressRing>(html`
                <label id="labelledby">Progress Ring Label</label>
                <ts-progress-ring ariaLabelledBy="labelledby" value="25"></ts-progress-ring>
            `);
        });

        it('should pass accessibility tests', async () => {
            await expect(el).to.be.accessible();
        });
    });

    describe('<ts-progress-ring> css variables', () => {
        it('uses the correct CSS variables in styles', async () => {
            const el = await fixture<TsProgressRing>(html`<ts-progress-ring></ts-progress-ring>`);
            const cssText = getCssText(el);

            // host custom props
            expect(cssText).to.include('--size: 128px;');
            expect(cssText).to.include('--track-width: 4px;');
            expect(cssText).to.include('--track-color: var(--ts-semantic-color-border-base-default);');
            expect(cssText).to.include('--indicator-width: var(--track-width);');
            expect(cssText).to.include('--indicator-color: var(--ts-semantic-color-border-primary-default);');
            expect(cssText).to.include('--indicator-transition-duration: 0.35s;');

            // track + indicator geometry
            expect(cssText).to.include(
                '--radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);',
            );
            expect(cssText).to.include('--circumference: calc(var(--radius) * 2 * 3.141592654);');

            // track
            expect(cssText).to.include('stroke: var(--track-color);');
            expect(cssText).to.include('stroke-width: var(--track-width);');

            // indicator
            expect(cssText).to.include('stroke: var(--indicator-color);');
            expect(cssText).to.include('stroke-width: var(--indicator-width);');
            expect(cssText).to.include('transition-duration: var(--indicator-transition-duration);');
            expect(cssText).to.include('stroke-dasharray: var(--circumference) var(--circumference);');
            expect(cssText).to.include(
                'stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));',
            );
        });
    });
});
